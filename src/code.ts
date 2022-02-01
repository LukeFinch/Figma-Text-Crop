import { dispatch, handleEvent } from "./codeMessageHandler";
import makeCropComponent from "./makeCropComponent";
import {loadUniqueFonts, getLineHeight} from "./fontUtils";
import { onlyUnique, addProps } from "./util";


interface cropData {
  pT: number;
  pB: number;
}


//Make it always show the relaunch button
figma.root.setRelaunchData({
  Update: "Launch the text crop plugin to resize text crop components",
});

figma.skipInvisibleInstanceChildren = true  

let newDataCount = 0;

type ContainerNode = BaseNode & ChildrenMixin;

import { prompt } from "./prompt";


var documentName = (node: any) =>
  node.type == "DOCUMENT" ? node.name : documentName(node.parent);

switch (figma.command) {
  case "Create":
    makeCropComponent()
    break;
  case "Update":
    figma.notify('Cropping page - this may take a few seconds')
    async function handleUpdate() {
      await updateInstances(true);
    }
    handleUpdate();
    break;
  case "UpdateMenu":
    async function loadUI() {
      figma.showUI(__uiFiles__.update, {
        width: 400,
        height: 300,
        visible: false,
      });
      let grid = await getGridSize();
      let key = await figma.clientStorage.getAsync("componentKey");
      dispatch("gridSize", grid);
      if (key) {
        dispatch("componentKey", key);
      }
      figma.ui.show();
    }
    loadUI();
    break;
  case "UpdateSelected":
    updateInstances(true);
    break;
  case "ChangeGrid":
    promptGrid();
    break;
  default:
    figma.showUI(__uiFiles__.update);
}

handleEvent("ready", () => {
  let sel = figma.currentPage.selection;
  let instances = sel.filter(
    (n) =>
      n.getSharedPluginData("TextCrop", "multiline") && n.type == "INSTANCE"
  );
  dispatch("selection", instances.length);
});

handleEvent("updateInstances", async (data) => {
  // console.log('Crop message handler')
  if (data == "clock") {
    updateInstances(false);
  } else {
    updateInstances(false);
  }
});

async function promptGrid() {
  let value = await prompt(
    "Grid Size",
    "Set your grid size, use 0 for no rounding",
    (await figma.clientStorage.getAsync("gridSize")) || 1,
    false
  );
  if (isNaN(value)) {
    promptGrid();
  } else {
    figma.clientStorage.setAsync("gridSize", value);
    figma.closePlugin();
  }
}

async function crop(node: InstanceNode, gridSize) {
  let textNode = (node.children[0] as ContainerNode).children[0] as TextNode;
  let fontName = textNode.getRangeFontName(0, 1) as FontName;
  await loadUniqueFonts([textNode]);
  //Get Crop Profiles
  let profileTop = "";
  let profileBottom = "";
  switch (node.getSharedPluginData("TextCrop", "top")) {
    case "ascender":
      profileTop = "f";
      break;
    case "capheight":
      profileTop = "T";
      break;
    case "xheight":
      profileTop = "x";
      break;
    default:
      profileTop = "T";
      break;
  }
  if (node.getSharedPluginData("TextCrop", "bottom") == "descender") {
    profileBottom = "y";
  }

  let cropData = figma.root.getSharedPluginData("TextCrop", "fontData");
  let data =  cropData ? JSON.parse(cropData) : null;


    let lH = await getLineHeight(textNode);

    var nodeCropData = function (data) {
      let nodeData = null;
      try {
        nodeData =
          data[JSON.stringify(fontName)][textNode.fontSize][
            profileTop + profileBottom
          ];
      } catch (e) {
        nodeData = null;
      }
      return nodeData;
    };

    let nodeData = nodeCropData(data);
    if (nodeData) {
      cropNodeWithData(node, nodeData, gridSize, lH);
    }
    else {
      //Data doesn't exist
      //Actually currently it never exists..
      newDataCount++;
      let data = {}
      let lH = await getLineHeight(textNode)
      //We don't have data for this config
      //Initalise the objects to store the data
      !!data[JSON.stringify(textNode.fontName)]
        ? null
        : (data[JSON.stringify(textNode.fontName)] = {});
      !!data[JSON.stringify(textNode.fontName)][textNode.fontSize]
        ? null
        : (data[JSON.stringify(textNode.fontName)][textNode.fontSize] = {});
      !!data[JSON.stringify(textNode.fontName)][textNode.fontSize][
        profileTop + profileBottom
      ]
        ? null
        : {};

      //Copy the text outside the instance so we can manipulate it

      const clone = textNode.clone();
      // console.log('Clone',clone)
      await loadUniqueFonts([clone]);
      clone.characters = profileTop + profileBottom; //We use the letter T to get an accurate baseline and line height

      figma.currentPage.insertChild(0, clone);
      clone.visible = true;
      clone.opacity = 0; //Hide the layer - doesn't work if invisible
      clone.x = 0; //Not necessary as such, but cleaner
      clone.y = 0; //Sets the Y value to 0, so we have a reference point when flattening
      clone.textAutoResize = "WIDTH_AND_HEIGHT"; // Make it take up the true line height

      //We know the top and bottom config
      let H = clone.height;

      let T = figma.flatten([clone]);
      let pT = H / 2 - T.y;
      let pB = T.height - pT;

      T.remove(); // Delete the clones, clean up our mess as soon as we are done with it
      let cropData: cropData;
      T ? (cropData = { pT: pT, pB: pB }) : null;
      data[JSON.stringify(textNode.fontName)][textNode.fontSize][
        profileTop + profileBottom
      ] = cropData;

      cropNodeWithData(node, cropData, gridSize, lH);
      return {
        fontName,
        size: textNode.getRangeFontSize(0, 1) as number,
        cropData,
        profile: profileTop + profileBottom,
      }; //Data we need to save to the root

    }
  }
    





async function cropNodeWithData(
  node: InstanceNode,
  data: cropData,
  gridSize: number,
  lineHeight?: number
) {
  isNaN(gridSize) ? (gridSize = await getGridSize()) : null;

  let pT = data.pT;
  let pB = data.pB;
  let n: number; //number of lines
  let textNode = (node.children[0] as ContainerNode).children[0] as TextNode;

  let sizing = textNode.textAutoResize;
  console.log(sizing)

  lineHeight
    ? (lineHeight = lineHeight)
    : (lineHeight = await getLineHeight(textNode));
  if (sizing == "HEIGHT") {
    //Only need if multiline ?
    //This method gets the actual height of the text
    textNode.textAutoResize = "HEIGHT";
    let textHeight = textNode.height; //Actual Height of the text
    console.log(textHeight)
    textNode.textAutoResize = sizing; //"NONE"
    let nodeSize = textNode.height; //The height of the container when its fixed.
    n = Math.ceil(textHeight / lineHeight); // Number of lines. Should always be a whole number...
    console.log(n,lineHeight,nodeSize)
  } else {
    n = 1;
  }

  let fontSize = textNode.getRangeFontSize(0, 1) as number;

  //  //the extra height we add for multiple lines
  let halfLeading = (lineHeight / fontSize - 1) / 2;

  let paddingTop = pT + ((n - 1) / 2) * lineHeight;
  let paddingBottom = pB + ((n - 1) / 2) * lineHeight;

  //TODO: Check the alignment of text in the text box, let users center, top or bottom align
  node.paddingTop = paddingTop;
  node.paddingBottom =
    gridSize == 0
      ? paddingBottom
      : gridRound(paddingBottom + paddingTop, gridSize) - paddingTop;
}

function gridRound(number, gridSize) {
  return Math.round(number / gridSize) * gridSize;
}

async function getGridSize() {
  let gs = await figma.clientStorage.getAsync("gridSize");
  if (isNaN(gs)) {
    gs = await prompt(
      "Grid Size",
      "Set your grid size, use 0 for no rounding",
      1,
      false
    );
    figma.clientStorage.setAsync("gridSize", gs);
    getGridSize();
  } else {
    return gs;
  }
}

async function updateInstances(shouldClose) {
  const t0 = Date.now();
  let keys = new Set();
  var grid = await getGridSize();

  var instances: InstanceNode[];
  var newInstances: InstanceNode[]; //When we search page for instances not in storage

  //User is editing a text node
  if (
    figma.currentPage.selectedTextRange &&
    figma.currentPage.selectedTextRange.node.parent.getSharedPluginData(
      "TextCrop",
      "TextCrop"
    ) == "true"
  ) {
    instances = [
      figma.currentPage.selectedTextRange.node.parent as InstanceNode,
    ];
  } else {
    //User clicked update page
    if (figma.command == "Update") {
      instances = [
        ...(figma.currentPage.findAllWithCriteria({ types: ["INSTANCE"] }).filter(n => n.getSharedPluginData("TextCrop", "TextCrop") == "true"))
      ]
    }
    if (figma.command == "UpdateSelected") {
      let selectedInstances: InstanceNode[] = [];

      figma.currentPage.selection.forEach((n) => {
        if (n.type == "INSTANCE") {
          selectedInstances.push(n);
        } else {
          if (n.parent.type == "INSTANCE") {
            selectedInstances.push(n.parent);
          } else {
            if ((n.parent.parent as any).type == "INSTANCE") {
              selectedInstances.push(n.parent.parent as InstanceNode);
            }
          }
        }
      });
      // console.log(selectedInstances)
      instances = selectedInstances;
    }


    if (figma.currentPage.selection.length > 0 && shouldClose == false) {
      // console.log("Call from the UI")
      let selectedInstances: InstanceNode[] = [];

      figma.currentPage.selection.forEach((n) => {
        if (n.type == "INSTANCE") {
          selectedInstances.push(n);
        } else {
          if (n.parent.type == "INSTANCE") {
            selectedInstances.push(n.parent);
          } else {
            if ((n.parent.parent as any).type == "INSTANCE") {
              selectedInstances.push(n.parent.parent as InstanceNode);
            }
          }
        }
      });
      // console.log(selectedInstances)
      instances = selectedInstances;
    }


    if (keys.size > 1) {
      //Conflicting libraries - ultimately we should only have one of these..
    }
    figma.clientStorage.setAsync("componentKey", keys[0]);

    Promise.all([
    ...instances.map(i => crop(i, grid))
  ]).then(

      (res) => {

        if (shouldClose) {
          const t1 = Date.now();
          console.log(
            `Cropped ${
              res.length
            } instances, took ${t1 - t0} ms`
          );
          figma.closePlugin(
            `Cropped ${
              res.length
            } instances, took ${t1 - t0} ms`
          );
        }
      }
    );
  }
}



figma.on("selectionchange", () => {
  //Update the count in the UI
  let sel = figma.currentPage.selection;
  let instances = sel.filter(
    (n) =>
      n.getSharedPluginData("TextCrop", "multiline") && n.type == "INSTANCE"
  );

  if (figma.ui) {
    console.log(console.log(figma.ui))
    dispatch("selection", instances.length);
  }
});
handleEvent("cropProfile", (data) => {
  let sel = figma.currentPage.selection;
  let instances = sel.filter(
    (n) => n.getSharedPluginData("TextCrop", "TextCrop") && n.type == "INSTANCE"
  );

  instances.forEach((instance) => {
    instance.setSharedPluginData("TextCrop", "top", data.top);
    instance.setSharedPluginData("TextCrop", "bottom", data.bottom);
  });
});

handleEvent("resizeUI", (size) => {
  figma.ui.resize(size[0], size[1]);
});

handleEvent("gridSize", (size) => {
  figma.clientStorage.setAsync("gridSize", size);
});


