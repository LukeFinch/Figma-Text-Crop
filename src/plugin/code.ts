import {getGridSize, roundNearest} from './lib/grid';
import {getTextCropInstances} from './lib/getTextCropInstances';
import makeCropComponent from './makeCropComponent';

import {prompt} from './lib/prompt';
import {loadFonts, getLineHeight} from './lib/util';
import {setTarget} from './lib/setTargetNode';

import {
  on as registerMessageHandler,
  emit as emitMessage,
} from '@create-figma-plugin/utilities/lib/events';

interface cropData {
  paddingTop: number;
  paddingBottom: number;
}
type ContainerNode = BaseNode & ChildrenMixin;

//TODO: Listen for doc changes and auto crop
// figma.on('documentchange', async event => {
//   console.log(event);
//   for (const change of event.documentChanges) {
//     if (
//       change.type === 'PROPERTY_CHANGE' &&
//       change.properties.some(prop => prop === 'height' || 'width')
//     ) {
//       const node = figma.getNodeById(change.id);
//       if (node?.type === 'INSTANCE' && hasTextCropData(node)) {
//         crop(node, await getGridSize());
//       }
//     }
//   }
// });

//Make it always show the relaunch button
figma.root.setRelaunchData({
  Update: 'Launch the text crop plugin to resize text crop components',
});

figma.skipInvisibleInstanceChildren = true;
const commandSwitch = async () => {
  switch (figma.command) {
    case 'Create':
      makeCropComponent();
      break;
    case 'Update':
      figma.notify('Cropping page - this may take a few seconds');
      await updateInstances(true);
      break;
    case 'UpdateMenu':
      let grid = await getGridSize();
      let key = await figma.clientStorage.getAsync('componentKey');
      figma.showUI(__html__, {
        themeColors: true,
        width: 240,
        height: 320,
        visible: true,
      });
      figma.ui.show();
      emitMessage('GRID_SIZE', grid);
      if (key !== undefined) {
        emitMessage('componentKey', key);
      }

      break;
    case 'UpdateSelected':
      updateInstances(true);
      break;
    case 'ChangeGrid':
      promptGrid();
      break;
    case 'SetTarget':
      setTarget();
      break;

    default:
      figma.showUI(__html__);
  }
};
commandSwitch();

registerMessageHandler('UI_READY', () => {
  let sel = figma.currentPage.selection;
  let instances = sel.filter(
    n => n.getSharedPluginData('TextCrop', 'multiline') && n.type == 'INSTANCE',
  );
  emitMessage('selection', instances.length);
});

registerMessageHandler('RESIZE_UI', (data: DOMRect) => {
  figma.ui.resize(data.width, data.height);
});

async function promptGrid() {
  let value = await prompt(
    'Grid Size',
    'Set your grid size, use 0 for no rounding',
    (await figma.clientStorage.getAsync('gridSize')) || 1,
    false,
  );
  if (isNaN(value)) {
    promptGrid();
  } else {
    figma.clientStorage.setAsync('gridSize', value);
    figma.closePlugin();
  }
}

export async function crop(node: InstanceNode, gridSize: number) {
  let cropFrame = node.children[0] as FrameNode;
  let textNode = cropFrame.children[0] as TextNode;

  //Force to be fixed height
  cropFrame.layoutMode == 'VERTICAL'
    ? (cropFrame.primaryAxisSizingMode = 'FIXED')
    : (cropFrame.counterAxisSizingMode = 'FIXED');

  await loadFonts(textNode);

  //Get Crop Profiles
  let profileTop = '';
  let profileBottom = '';
  switch (node.getSharedPluginData('TextCrop', 'top')) {
    case 'ascender':
      profileTop = 'f';
      break;
    case 'capheight':
      profileTop = 'T';
      break;
    case 'xheight':
      profileTop = 'x';
      break;
    default:
      profileTop = 'T';
      break;
  }
  if (node.getSharedPluginData('TextCrop', 'bottom') == 'descender') {
    profileBottom = 'y';
  }

  let lH = await getLineHeight(textNode);

  //Copy the text outside the instance so we can manipulate it

  const clone = textNode.clone();

  await loadFonts(clone);
  clone.characters = profileTop + profileBottom; //We use the letter T to get an accurate baseline and line height

  figma.currentPage.insertChild(0, clone);
  clone.visible = true;
  clone.opacity = 0; //Hide the layer - doesn't work if invisible

  clone.x = figma.viewport.bounds.x + figma.viewport.bounds.width; //Not necessary as such, but cleaner
  clone.y = 0; //Sets the Y value to 0, so we have a reference point when flattening
  clone.textAutoResize = 'WIDTH_AND_HEIGHT'; // Make it take up the true line height

  //We know the top and bottom config
  let height = clone.height;

  let textClone = figma.flatten([clone]);
  let paddingTop = height / 2 - textClone.y;
  let paddingBottom = textClone.height - paddingTop;

  textClone.remove(); // Delete the clones, clean up our mess as soon as we are done with it
  let cropData: cropData = {
    paddingTop,
    paddingBottom,
  };

  cropNodeWithData(node, cropData, gridSize, lH);
}

async function cropNodeWithData(
  node: InstanceNode,
  data: cropData,
  gridSize: number,
  lineHeight?: number,
) {
  const {paddingTop, paddingBottom} = data;

  let n: number; //number of lines
  let textNode = (node.children[0] as ContainerNode).children[0] as TextNode;

  let sizing = textNode.textAutoResize;

  lineHeight
    ? (lineHeight = lineHeight)
    : (lineHeight = await getLineHeight(textNode));
  if (sizing == 'HEIGHT') {
    //Only need if multiline ?
    //This method gets the actual height of the text
    textNode.textAutoResize = 'HEIGHT';
    let textHeight = textNode.height; //Actual Height of the text
    textNode.textAutoResize = sizing; //"NONE"
    n = Math.round(textHeight / lineHeight); // Number of lines. Should always be a whole number...
  } else {
    n = 1;
  }

  let nodePaddingTop = paddingTop + ((n - 1) / 2) * lineHeight;
  let nodePaddingBottom = paddingBottom + ((n - 1) / 2) * lineHeight;

  let totalHeight = nodePaddingTop + nodePaddingBottom;
  let roundedHeight =
    gridSize !== 0 ? roundNearest(totalHeight, gridSize) : totalHeight;

  //TODO: Check the alignment of text in the text box, let users center, top or bottom align
  node.paddingTop = nodePaddingTop;

  //if paddingBottom is less than 0 it will bug out..
  let bottomValue = roundedHeight - node.paddingTop;

  if (bottomValue < 0) {
    bottomValue = (bottomValue % gridSize) + gridSize;
  }

  node.paddingBottom = bottomValue;
}

async function updateInstances(shouldClose: boolean) {
  const t0 = Date.now();
  var grid = await getGridSize();

  let instances: InstanceNode[];

  //User is editing a text node
  if (
    figma.currentPage.selectedTextRange &&
    'node' in figma.currentPage.selectedTextRange
  ) {
    let node = figma.currentPage.selectedTextRange.node;
    node.parent?.getSharedPluginData('TextCrop', 'TextCrop') == 'true';

    instances = [
      figma.currentPage.selectedTextRange.node.parent as InstanceNode,
    ];
  } else {
    instances = [];
    //User clicked update page
    if (figma.command == 'Update') {
      instances = getTextCropInstances([figma.currentPage]);
    }
    if (figma.command == 'UpdateSelected') {
      instances = getTextCropInstances(figma.currentPage.selection);
    }

    if (figma.currentPage.selection.length > 0 && shouldClose == false) {
      instances = getTextCropInstances(figma.currentPage.selection);
    }

    Promise.all([...instances.map(i => crop(i, grid))]).then(res => {
      if (shouldClose) {
        const t1 = Date.now();
        console.log(`Cropped ${res.length} instances, took ${t1 - t0} ms`);
        figma.closePlugin(
          `Cropped ${res.length} instances, took ${t1 - t0} ms`,
        );
      }
    });
  }
}

figma.on('selectionchange', () => {
  //Update the count in the UI
  let sel = figma.currentPage.selection;
  // let instances = sel.filter(
  //   n => n.getSharedPluginData('TextCrop', 'multiline') && n.type == 'INSTANCE',
  // );
  let instances = getTextCropInstances(sel);
  emitMessage('selection', instances.length);
});

registerMessageHandler(
  'CROP_PROFILE',
  (data: {top: string; bottom: string}) => {
    console.log(data, 'cropProfile');
    let sel = figma.currentPage.selection;
    let instances = getTextCropInstances(sel);

    instances.forEach(instance => {
      console.log('Setting data for...', instance, data);
      instance.setSharedPluginData('TextCrop', 'top', data.top);
      instance.setSharedPluginData('TextCrop', 'bottom', data.bottom);
    });
  },
);

registerMessageHandler('GRID_SIZE', (size: number) => {
  figma.clientStorage.setAsync('gridSize', size);
});

registerMessageHandler('CROP_INSTANCES', () => {
  updateInstances(false).then(() => figma.notify('done'));
});
