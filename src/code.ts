import { dispatch, handleEvent } from "./codeMessageHandler";
import makeCropComponent from "./makeCropComponent";
import loadUniqueFonts from "./fontUtils";
import { onlyUnique } from "./util";

//Make it always show the relaunch button
figma.root.setRelaunchData({
  Update: "Launch the text crop plugin to resize text crop components",
});




type ContainerNode = BaseNode & ChildrenMixin;
const isContainerNode = (n: BaseNode): n is ContainerNode =>
  !!(n as any).children;
import { prompt } from "./prompt";

var documentName = (node: any) =>
  node.type == "DOCUMENT" ? node.name : documentName(node.parent);
switch (figma.command) {
  case "Create":
    makeCropComponent();
    figma.closePlugin();
    //  figma.showUI(__uiFiles__.create, {
    // 	 width: 240,
    // 	 height: 100
    //  })
    break;
  case "Update":
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
      let grid = await getGridSize()
      let key = await figma.clientStorage.getAsync("componentKey");
      dispatch("gridSize", grid);
      if (key) {
        dispatch("componentKey", key);
      }

      let sel = figma.currentPage.selection;
      let instances = sel.filter(
        (n) =>
          n.getSharedPluginData("TextCrop", "multiline") && n.type == "INSTANCE"
      );

      console.log("showing the ui now...", grid, key);

      figma.ui.show();
    }
    loadUI();
    break;
  case "UpdateSelected":
    updateInstances(true);
    break;
  case "SwapText":
    // //Disabled for now, we'll do it in a later version
    // //figma.clientStorage.setAsync('componentKey', undefined)
    // async function doTextSwap() {
    //   console.log(
    //     figma.currentPage.findOne(
    //       (node) =>
    //         node.type == "INSTANCE" ||
    //         (node.type == "COMPONENT" &&
    //           node.getSharedPluginData("TextCrop", "TextCrop") == "true")
    //     )
    //   );
    //   // async function runPrompt(){
    //   // 	let value = await prompt('Prompt Title','Some Description Text','placeholder',true)
    //   // 	console.log('the value of prompt is:',value)
    //   // }
    //   // runPrompt()

    //   //We need a component key to import and switch
    //   var key: string = await figma.clientStorage.getAsync("componentKey");
    //   console.log(key);
    //   if (key == undefined) {
    //     //There is no key - a nice UXey solution would be great here...
    //     //If they have already updated an instance, we store the key.
    //     //Maybe they haven't made a text crop component.. we should tell them to do that maybe?
    //     //figma.notify("You've never made one..") -- they could be in a team where someone else has made one..
    //     //Lets try and find one in their current page..
    //     try {
    //       let node = figma.currentPage.findOne(
    //         (node) =>
    //           node.type == "INSTANCE" ||
    //           (node.type == "COMPONENT" &&
    //             node.getSharedPluginData("TextCrop", "TextCrop") == "true")
    //       ) as InstanceNode as InstanceNode | ComponentNode;
    //       let comp: ComponentNode =
    //         node.type == "INSTANCE"
    //           ? (node as InstanceNode).mainComponent
    //           : (node as ComponentNode);
    //       let key: string = comp.key;
    //       let status: PublishStatus = await comp.getPublishStatusAsync();
    //       switch (status) {
    //         case "UNPUBLISHED":
    //           figma.notify(
    //             "Your Text Crop Component is unpublished, it is recommended to publish the library"
    //           );
    //           break;
    //         case "CHANGED":
    //           figma.notify(
    //             "Text Crop component has unpublished changes, it is recommended to publish these changes"
    //           );
    //           break;
    //         default:
    //           break;
    //       }
    //       //replaceTextNodes(key)
    //       if (comp.remote) {
    //         replaceTextNodes(await figma.importComponentByKeyAsync(key));
    //       } else {
    //         replaceTextNodes(comp);
    //       }
    //     } catch (e) {
    //       console.log(e);
    //       figma.notify(
    //         `Couldn't find a TextCrop component to swap with, insert one on the page and try again`,
    //         { timeout: 5000 }
    //       );
    //       figma.closePlugin();
    //     }
    //   } else {
    //     replaceTextNodes(await figma.importComponentByKeyAsync(key));
    //   }
    // }
    // doTextSwap();
    // break;
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

let waitingClock = false; //Boolean to handle the clock, if the clock is faster than the script..

async function promptGrid() {
  let value = await prompt(
    "Grid Size",
    "Set your grid size, use 0 for no rounding",
    (await figma.clientStorage.getAsync("gridSize")) || 1,
    false
  );
    if(isNaN(value)){promptGrid()}
    else{
      figma.clientStorage.setAsync("gridSize", value);
      figma.closePlugin();

    } 
}

handleEvent("resizeUI", (size) => {
  figma.ui.resize(size[0], size[1]);
});

handleEvent("gridSize", (size) => {
  figma.clientStorage.setAsync("gridSize", size);
});

handleEvent("createNode", (_) => {
  makeCropComponent();
});

handleEvent("updateInstances", async (data) => {
  if (data == "clock" && waitingClock == false) {
    updateInstances(false);
  } else {
    updateInstances(false);
  }
});


handleEvent("cropProfile", (data) => {
  console.log("crop profile", data);
  let sel = figma.currentPage.selection;
  let instances = sel.filter(
    (n) => n.getSharedPluginData("TextCrop", "TextCrop") && n.type == "INSTANCE"
  );
  console.log("crop profile", instances.length);
  instances.forEach((instance) => {
    instance.setSharedPluginData("TextCrop", "top", data.top);
    instance.setSharedPluginData("TextCrop", "bottom", data.bottom);
  });
});

async function updateInstances(shouldClose) {
  console.log("Updating instances....");
  const t0 = Date.now();
  let keys = new Set();

  
  var grid = await getGridSize()


  var instances: InstanceNode[];

  waitingClock = true;

  //Update the text we're editing
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
        ...(figma.currentPage.findAll(
          (n) =>
            n.type == "INSTANCE" &&
            n.getSharedPluginData("TextCrop", "TextCrop") == "true"
        ) as InstanceNode[]),
      ]; //New style
    }
    if (
      figma.currentPage.selection.length > 0 &&
      figma.command == "UpdateSelected"
    ) {
      let inst: InstanceNode[] = [];

      figma.currentPage.selection.forEach((n) => {
        if (n.type == "INSTANCE") {
          inst.push(n);
        } else {
          if (n.parent.type == "INSTANCE") {
            inst.push(n.parent);
          } else {
            if ((n.parent.parent as any).type == "INSTANCE") {
              inst.push(n.parent.parent as InstanceNode);
            }
          }
        }
      });
      instances = inst;
    }

    let listOfIds = [];
    const croppableInstances = instances.map((instance) => {
      listOfIds.push(instance.id);
      keys.add(instance.mainComponent.key);
      return crop(instance, grid);
    });

    waitingClock = false;

    if (keys.size > 1) {
      console.log(
        "There's more than one component, its probably a bad idea right??"
      );
    }
    figma.clientStorage.setAsync("componentKey", keys[0]);

    Promise.all(croppableInstances).then((_) => {
      console.log("ALL DONE");
      let unique = listOfIds.filter(onlyUnique);
      console.log(unique.length);
      figma.currentPage.setSharedPluginData(
        "TextCrop",
        "nodeIds",
        JSON.stringify(unique)
      );
      if (shouldClose) {
        figma.closePlugin(
          `Cropped ${instances.length} instances, took ${Date.now() - t0} ms`
        );
      }
    });
  }
}

//New Crop Methods
async function crop(node: InstanceNode, gridSize) {


  // figma.root.setSharedPluginData("TextCrop", "gridSize", gridSize.toString());
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

  let cropData = figma.root.getSharedPluginData(
    "TextCrop",
    "fontData"
  );

  if (cropData === "") {
    console.log("No data exists");
    //No data at all- lets initialise some
    let dataStore = {};
    figma.root.setSharedPluginData(
      "TextCrop",
      "fontData",
      JSON.stringify(dataStore)
    );
    cropData = "{}";
  }

  if (cropData !== "") {
    //Object Exists
    let data = JSON.parse(cropData) as cropData;

    let lH = await getLineHeight(textNode);

    var nodeCropData = function (data) {
      let nodeData = null;
      try {
        nodeData = data[JSON.stringify(textNode.fontName)][textNode.fontSize][lH][profileTop + profileBottom];
      } catch (e) {
        nodeData = null;
      }
      return nodeData;
    };

    let nodeData = nodeCropData(data);
    if (nodeData) {
      cropNodeWithData(node, nodeData, gridSize, lH);
    } else {
      //We don't have data for this config
      //Initalise the objects to store the data
      !!data[JSON.stringify(textNode.fontName)] ? null : data[JSON.stringify(textNode.fontName)] = {}
      !!data[JSON.stringify(textNode.fontName)][textNode.fontSize] ? null : (data[JSON.stringify(textNode.fontName)][textNode.fontSize] = {});
      !!data[JSON.stringify(textNode.fontName)][textNode.fontSize][lH] ? null : (data[JSON.stringify(textNode.fontName)][textNode.fontSize][lH] = {});
      !!data[JSON.stringify(textNode.fontName)][textNode.fontSize][lH][profileTop + profileBottom] ? null : {};

      //Copy the text outside the instance so we can manipulate it

      const clone = textNode.clone();


      figma.currentPage.insertChild(0, clone);
      clone.name = "Text Crop Clone";
      clone.visible = true;
      clone.opacity = 0; //Hide the layer - doesn't work if invisible
      clone.x = 0; //Not necessary as such, but cleaner
      clone.y = 0; //Sets the Y value to 0, so we have a reference point when flattening
      await loadUniqueFonts([clone]);
      clone.textAutoResize = "WIDTH_AND_HEIGHT"; // Make it take up the true line height

      //We know the top and bototm config

      clone.characters = profileTop + profileBottom; //We use the letter T to get an accurate baseline and line height

      let H = clone.height;
      let C = clone.fontSize;

      let T = figma.flatten([clone]);

      let pT = (T.height/2)
      let pB = T.height - pT

      T.remove(); // Delete the clones, clean up our mess as soon as we are done with it
      let cropData: cropData;
      T ? (cropData = { A: null, B: null, pT: pT, pB: pB }) : null;
      data[JSON.stringify(textNode.fontName)][textNode.fontSize][lH][profileTop + profileBottom] = cropData;

      figma.root.setSharedPluginData(
        "TextCrop",
        "fontData",
        JSON.stringify(data)
      );
      return cropNodeWithData(node, cropData, gridSize, lH);
    }

  } else {

  }
}

interface cropData {
  A: number;
  B: number;
  pT: number;
  pB: number;
}

async function cropNodeWithData(
  node: InstanceNode,
  data: cropData,
  gridSize: number,
  lineHeight?: number
) {


  
  
  isNaN(gridSize) ? gridSize = await getGridSize() : null;

  let A = data.A;
  let B = data.B;
  let pT = data.pT;
  let pB = data.pB;
  let n: number; //number of lines
  let textNode = (node.children[0] as ContainerNode).children[0] as TextNode;

  let sizing = textNode.textAutoResize;

  lineHeight
    ? (lineHeight = lineHeight)
    : (lineHeight = await getLineHeight(textNode));
  if (sizing == "HEIGHT") {
    //Only need if multiline ?
    //This method gets the actual height of the text
    textNode.textAutoResize = "HEIGHT";
    let textHeight = textNode.height; //Actual Height of the text
    textNode.textAutoResize = sizing; //"NONE"
    let nodeSize = textNode.height; //The height of the container when its fixed.
    n = Math.ceil(textHeight / lineHeight); // Number of lines. Should always be a whole number...
  } else {
    n = 1;
  }



  //this works for single lines!
  //node.paddingBottom = pB
  //node.paddingTop = pT

  //pT - topHeight from middle
  //pB - bottomHeight from middle



  let fontSize = textNode.getRangeFontSize(0, 1) as number; 


  //  //the extra height we add for multiple lines
  let halfLeading = (lineHeight / fontSize - 1) / 2;

 

  //let paddingTop = pT + (n - 1) * (lineHeight / 2); // - (nodeSize/2) 
  // console.log(paddingTop)

  // let paddingBottom =
  //   Math.ceil(n / 2) * pB +
  //   Math.floor(n / 2) * pT +
  //   Math.floor(n / 2) * A +
  //   (Math.ceil(n / 2) - 1) * B +
  //   (n - 1) * halfLeading;

  let paddingTop = pT + (((n-1)/2)*lineHeight)
  let paddingBottom = pB + (((n-1)/2)*lineHeight)

  //TODO: Check the alignment of text in the text box, let users center, top or bottom align
  node.paddingTop = paddingTop;
  node.paddingBottom =
    gridSize == 0
      ? paddingBottom
      : gridRound(paddingBottom + paddingTop, gridSize) - paddingTop;
}

async function getLineHeight(node: TextNode) {
  let lineHeight = node.getRangeLineHeight(0, 1);
  let L;
  if (typeof lineHeight == "object") {
    if (lineHeight.unit == "PIXELS") {
      L = lineHeight.value;
    }
    if (lineHeight.unit == "PERCENT") {
      L = lineHeight.value * (node.getRangeFontSize(0, 1) as number);
    }
    if (lineHeight.unit == "AUTO") {
      let c = node.clone();
      await loadUniqueFonts([c]);
      //await figma.loadFontAsync(node.getRangeFontName(0,1) as FontName)
      c.characters = "T";
      c.textAutoResize = "WIDTH_AND_HEIGHT";
      L = c.height;
      c.remove();
    }
  }
  return L;
}





function gridRound(number, gridSize) {
  return Math.round(number / gridSize) * gridSize;
}

figma.on("selectionchange", () => {
  let sel = figma.currentPage.selection;
  let instances = sel.filter(
    (n) =>
      n.getSharedPluginData("TextCrop", "multiline") && n.type == "INSTANCE"
  );
  if (figma.ui) {
    dispatch("selection", instances.length);
  }
});


async function getGridSize(){
  let gs = await figma.clientStorage.getAsync('gridSize')
  console.log(isNaN(gs))
  if(isNaN(gs)){
    gs = await prompt(
      "Grid Size",
      "Set your grid size, use 0 for no rounding",
      1,
      false
    )
    figma.clientStorage.setAsync("gridSize", gs);
    getGridSize()
    } else {
      return gs
    }
}