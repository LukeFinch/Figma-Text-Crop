function zeroResize(node, width, height) {
  //Workaround to resize a node, if its size is less than 0.01
  node.resize(width < 0.01 ? 1 : width, height < 0.01 ? 1 : height);
  if (width < 0.01 || height < 0.01) {
    let dummy = figma.createRectangle();
    dummy.resize(
      width < 0.01 ? 1 / width : width,
      height < 0.01 ? 1 / height : height
    );
    let group: GroupNode = figma.group([node, dummy], figma.currentPage);
    group.resize(width < 0.01 ? 1 : width, height < 0.01 ? 1 : height);
    group.parent.appendChild(node);
    group.remove();
  }
}

export default async function makeCropComponent() {
  figma
    .loadFontAsync({
      family: "Roboto",
      style: "Regular",
    })
    .then(() => {
      // Create COMPONENT
      var componentAutoWidth = figma.createComponent();
      componentAutoWidth.resize(52.0, 8.5399999619);
      componentAutoWidth.name = "Flow=Auto Width";
      componentAutoWidth.relativeTransform = [
        [1, 0, 20],
        [0, 1, 20],
      ];
      componentAutoWidth.x = 20;
      componentAutoWidth.y = 20;
      componentAutoWidth.fills = [];
      componentAutoWidth.paddingTop = 4.53000020980835;
      componentAutoWidth.paddingBottom = 4;
      componentAutoWidth.backgrounds = [];
      componentAutoWidth.layoutMode = "HORIZONTAL";
      componentAutoWidth.counterAxisSizingMode = "AUTO";
      componentAutoWidth.description = "";

      // Create FRAME
      var autoWidthFrame = figma.createFrame();
      //autoWidthFrame.resizeWithoutConstraints(52.0000000000, 0.01)

      zeroResize(autoWidthFrame, 52, 1 / Number.MAX_SAFE_INTEGER);

      autoWidthFrame.name = "Crop";
      autoWidthFrame.relativeTransform = [
        [1, 0, 0],
        [0, 1, 4.5299987793],
      ];
      autoWidthFrame.y = 4.529998779296875; 
      autoWidthFrame.fills = [
        {
          type: "SOLID",
          visible: false,
          opacity: 1,
          blendMode: "NORMAL",
          color: { r: 1, g: 1, b: 1 },
        },
      ];
      autoWidthFrame.paddingTop = 8;
      autoWidthFrame.paddingBottom = 8;
      autoWidthFrame.counterAxisAlignItems = "CENTER";
      autoWidthFrame.backgrounds = [
        {
          type: "SOLID",
          visible: false,
          opacity: 1,
          blendMode: "NORMAL",
          color: { r: 1, g: 1, b: 1 },
        },
      ];
      autoWidthFrame.clipsContent = false;
      autoWidthFrame.layoutMode = "HORIZONTAL";
      autoWidthFrame.itemSpacing = 10;
      componentAutoWidth.appendChild(autoWidthFrame);

      // Create TEXT
	  var textAutoWidth = figma.createText()
	  textAutoWidth.resize(52.0000000000, 16.0000000000)
	  textAutoWidth.relativeTransform = [[1,0,0],[0,1,-7.9949998856]]
	  textAutoWidth.y = -7.994999885559082
	  textAutoWidth.autoRename = false

      textAutoWidth.fontName = {
        family: "Roboto",
        style: "Regular",
      };
	  textAutoWidth.characters = "Text Crop"
	  textAutoWidth.textAlignVertical = "CENTER"
	  textAutoWidth.textAutoResize = "WIDTH_AND_HEIGHT"
	  textAutoWidth.lineHeight = {"unit":"PIXELS","value":16}

      autoWidthFrame.appendChild(textAutoWidth);

      // Create COMPONENT
      var componentAutoHeight = figma.createComponent();
      componentAutoHeight.resize(52.0, 8.5300006866);
      componentAutoHeight.name = "Flow=Auto Height";
      componentAutoHeight.relativeTransform = [
        [1, 0, 84],
        [0, 1, 16],
      ];
      componentAutoHeight.x = 84;
      componentAutoHeight.y = 16;
      componentAutoHeight.fills = [];
      componentAutoHeight.paddingTop = 4.53000020980835;
      componentAutoHeight.paddingBottom = 4;
      componentAutoHeight.backgrounds = [];
      componentAutoHeight.layoutMode = "HORIZONTAL";
      componentAutoHeight.counterAxisSizingMode = "AUTO";
      componentAutoHeight.primaryAxisSizingMode = "FIXED";
      componentAutoHeight.description = "";

      // Create FRAME

      var cropFrame = figma.createFrame();
      zeroResize(cropFrame, 52, 1 / Number.MAX_SAFE_INTEGER);
      cropFrame.name = "Crop";
      cropFrame.relativeTransform = [
        [1, 0, 0],
        [0, 1, 4.5299987793],
      ];
      cropFrame.y = 4.529998779296875;
      cropFrame.fills = [
        {
          type: "SOLID",
          visible: false,
          opacity: 1,
          blendMode: "NORMAL",
          color: { r: 1, g: 1, b: 1 },
        },
      ];
      cropFrame.paddingTop = 0;
      cropFrame.paddingBottom = 0;
      cropFrame.counterAxisAlignItems = "CENTER";
      cropFrame.primaryAxisSizingMode = "FIXED";
      cropFrame.backgrounds = [
        {
          type: "SOLID",
          visible: false,
          opacity: 1,
          blendMode: "NORMAL",
          color: { r: 1, g: 1, b: 1 },
        },
      ];
      cropFrame.clipsContent = false;
      cropFrame.layoutMode = "HORIZONTAL";
      cropFrame.layoutGrow = 1;
      cropFrame.itemSpacing = 0;
      componentAutoHeight.appendChild(cropFrame);

      // Create TEXT
      var textAutoHeight = figma.createText();
      textAutoHeight.resize(52.0, 16.0);
      textAutoHeight.relativeTransform = [
        [1, 0, 0],
        [0, 1, -8],
      ];
      textAutoHeight.y = -8;
      textAutoHeight.autoRename = false;
      textAutoHeight.layoutGrow = 1;

      console.log("Loaded fonts");
      textAutoHeight.fontName = {
        family: "Roboto",
        style: "Regular",
      };
      textAutoHeight.characters = "Text Crop";
      textAutoHeight.textAlignVertical = "CENTER";
      textAutoHeight.textAutoResize = "HEIGHT";
      textAutoHeight.lineHeight = { unit: "PIXELS", value: 16 };

      cropFrame.appendChild(textAutoHeight);

      // Create COMPONENT_SET
      var componentSet = figma.combineAsVariants(
        [componentAutoWidth, componentAutoHeight],
        figma.currentPage
      );
      componentSet.resize(165.0, 48.5400009155);
      componentSet.name = "Text Crop";
      componentSet.visible = true;
      componentSet.locked = false;
      componentSet.opacity = 1;
      componentSet.blendMode = "PASS_THROUGH";
      componentSet.isMask = false;
      componentSet.effects = [];
      componentSet.relativeTransform = [
        [1, 0, -49],
        [0, 1, -232],
      ];

      componentSet.x = figma.viewport.center.x;
      componentSet.y = figma.viewport.center.y;

      componentSet.rotation = 0;
      componentSet.layoutAlign = "INHERIT";
      componentSet.constrainProportions = false;
      componentSet.layoutGrow = 0;
      componentSet.exportSettings = [];
      componentSet.fills = [];
      componentSet.strokes = [
        {
          type: "SOLID",
          visible: true,
          opacity: 1,
          blendMode: "NORMAL",
          color: { r: 0.48235294222831726, g: 0.3803921639919281, b: 1 },
        },
      ];
      componentSet.strokeWeight = 1;
      componentSet.strokeAlign = "INSIDE";
      componentSet.strokeCap = "NONE";
      componentSet.strokeJoin = "MITER";
      componentSet.strokeMiterLimit = 4;
      componentSet.dashPattern = [10, 5];
      componentSet.cornerRadius = 5;
      componentSet.cornerSmoothing = 0;
      componentSet.paddingLeft = 16;
      componentSet.paddingRight = 16;
      componentSet.paddingTop = 16;
      componentSet.paddingBottom = 16;
      componentSet.primaryAxisAlignItems = "MIN";
      componentSet.counterAxisAlignItems = "MIN";
      componentSet.primaryAxisSizingMode = "AUTO";
      componentSet.layoutGrids = [];
      componentSet.backgrounds = [];
      componentSet.clipsContent = true;
      componentSet.guides = [];
      componentSet.expanded = true;
      componentSet.constraints = { horizontal: "MIN", vertical: "MIN" };
      componentSet.layoutMode = "HORIZONTAL";
      componentSet.counterAxisSizingMode = "AUTO";
      componentSet.itemSpacing = 16;
      componentSet.description = "";

      componentAutoWidth.setSharedPluginData("TextCrop", "TextCrop", "true");
      componentAutoHeight.setSharedPluginData("TextCrop", "TextCrop", "true");
      componentAutoWidth.setSharedPluginData("TextCrop", "multiline", "false");
      componentAutoHeight.setSharedPluginData("TextCrop", "multiline", "true");

      textAutoHeight.setRelaunchData({
        UpdateSelected: "Resize Selected",
        Update: "Resize All Instances",
      });
      textAutoWidth.setRelaunchData({
        UpdateSelected: "Resize Selected",
        Update: "Resize All Instances",
      });

      componentAutoWidth.setRelaunchData({
        UpdateSelected: "Resize Selected",
        Update: "Resize All Instances",
      });
      componentAutoHeight.setRelaunchData({
        UpdateSelected: "Resize Selected",
        Update: "Resize All Instances",
      });

      figma.clientStorage.setAsync("componentKey", componentSet.key);

      // 	let sel = figma.currentPage.selection
      // 	if( sel.length == 1 &&
      // 		sel[0].getPluginData('TextCrop') &&
      // 		sel[0].type == "COMPONENT"){
      // 			sel[0].setSharedPluginData('TextCrop','TextCrop','true')
      // 			if(Boolean(sel[0].getPluginData('multiline'))){
      // 				sel[0].setSharedPluginData('TextCrop','multiline','true')
      // 			} else {
      // 				sel[0].setSharedPluginData('TextCrop','multiline','false')
      // 			}
      // 	} else {
      // 		console.log(sel[0].getPluginData('TextCrop'))
      // 	}
      // }

figma.closePlugin('Made new components')

    });
}

// handleEvent('updateLegacyComponent',(){
// 	if(figma.currentPage.selection[0].getPluginData('TextCrop') && figma.currentPage.selection[0].type == "COMPONENT"){
// 		figma.currentPage.selection[0].setSharedPluginData('TextCrop',)
// 	}
// })




// // Load FONTS
// async function loadFonts() {
// 	await Promise.all([
// 		figma.loadFontAsync({
// 			family: "Roboto",
// 			style: "Regular"
// 			})
// 	])
// }


// // Create COMPONENT
// var component_102_59 = figma.createComponent()
// component_102_59.resize(52.0000000000, 8.5300006866)
// component_102_59.counterAxisSizingMode = "AUTO"
// component_102_59.name = "MultiLine=True"
// component_102_59.widgetEvents = []
// component_102_59.relativeTransform = [[1,0,84],[0,1,16]]
// component_102_59.x = 84
// component_102_59.y = 16
// component_102_59.fills = []
// component_102_59.paddingTop = 4.53000020980835
// component_102_59.paddingBottom = 4
// component_102_59.primaryAxisSizingMode = "FIXED"
// component_102_59.backgrounds = []
// component_102_59.layoutMode = "HORIZONTAL"
// component_102_59.counterAxisSizingMode = "AUTO"
// component_102_59.description = ""
// component_102_59.documentationLinks = []

// // Create FRAME
// var frame_102_60 = figma.createFrame()
// frame_102_60.resizeWithoutConstraints(52.0000000000, 0.01)
// frame_102_60.name = "Crop"
// frame_102_60.widgetEvents = []
// frame_102_60.relativeTransform = [[1,0,0],[0,1,4.5299987793]]
// frame_102_60.y = 4.529998779296875
// frame_102_60.layoutGrow = 1
// frame_102_60.fills = [{"type":"SOLID","visible":false,"opacity":1,"blendMode":"NORMAL","color":{"r":1,"g":1,"b":1}}]
// frame_102_60.counterAxisAlignItems = "CENTER"
// frame_102_60.primaryAxisSizingMode = "FIXED"
// frame_102_60.backgrounds = [{"type":"SOLID","visible":false,"opacity":1,"blendMode":"NORMAL","color":{"r":1,"g":1,"b":1}}]
// frame_102_60.clipsContent = false
// frame_102_60.layoutMode = "HORIZONTAL"
// component_102_59.appendChild(frame_102_60)

// // Create TEXT
// var text_102_63 = figma.createText()
// text_102_63.resize(52.0000000000, 16.0000000000)
// text_102_63.widgetEvents = []
// text_102_63.relativeTransform = [[1,0,0],[0,1,-8]]
// text_102_63.y = -8
// text_102_63.layoutGrow = 1
// text_102_63.hyperlink = null
// text_102_63.autoRename = false
// loadFonts().then((res) => {
// 		text_102_63.fontName = {
// 			family: "Roboto",
// 			style: "Regular"
// 		}
// 		text_102_63.listSpacing = 0
// 		text_102_63.characters = "Text Crop"
// 		text_102_63.lineHeight = {"unit":"PIXELS","value":16}
// 		text_102_63.textAlignVertical = "CENTER"
// 		text_102_63.textAutoResize = "WIDTH_AND_HEIGHT"

// })
// frame_102_60.appendChild(text_102_63)

// // Create INSTANCE
// var instance_102_65 = component_102_59.createInstance()
// instance_102_65.resize(158.0000000000, 8.5300006866)
// instance_102_65.counterAxisSizingMode = "AUTO"
// instance_102_65.name = "Text Crop"
// instance_102_65.relativeTransform = [[1,0,1794],[0,1,105]]
// instance_102_65.x = 1794
// instance_102_65.y = 105
// figma.currentPage.appendChild(instance_102_65)

// // Swap COMPONENT
// instance_102_65.swapComponent(component_102_59)

// // Ref to SUB NODE
// var frame_I102_65_102_60 = figma.getNodeById("I" + instance_102_65.id + ";" + frame_102_60.id)
// frame_I102_65_102_60.resizeWithoutConstraints(158.0000000000, 0.01)

// // Ref to SUB NODE
// var text_I102_65_102_63 = figma.getNodeById("I" + instance_102_65.id + ";" + text_102_63.id)
// text_I102_65_102_63.resize(158.0000000000, 16.0000000000)