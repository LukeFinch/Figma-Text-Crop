import {loadUniqueFonts} from './util'
import {crop} from './code'

async function swapNodes(
  node: TextNode | InstanceNode | FrameNode,
  instance: InstanceNode
) {
  let oldText: TextNode;
  node.type == "TEXT"
    ? (oldText = node)
    : (oldText = node.findChild((n) => n.type == "TEXT") as TextNode);

  node.parent.insertChild(
    node.parent.children.indexOf(node) == -1
      ? 0
      : node.parent.children.indexOf(node),
    instance
  );

  instance.relativeTransform = node.relativeTransform;
  instance.resize(node.width, node.height);
  let newText = instance.children[0] as TextNode;
  await loadUniqueFonts([newText]);
  //await figma.loadFontAsync(newText.fontName as FontName)
  newText.characters = oldText.characters;

  let styleId = oldText.textStyleId;
  if (styleId == "") {
    // let fontName = oldText.getRangeFontName(0,oldText.characters.length) as FontName
    // await figma.loadFontAsync(fontName)

    loadUniqueFonts([oldText]).then((res) => {
      if (oldText.getRangeTextStyleId(0, oldText.characters.length) != "") {
        newText.setRangeTextStyleId(
          0,
          oldText.characters.length,
          oldText.getRangeTextStyleId(0, oldText.characters.length) as string
        );
      } else {
        newText.setRangeFontName(
          0,
          oldText.characters.length,
          oldText.getRangeFontName(0, oldText.characters.length) as FontName
        ),
          newText.setRangeFontSize(
            0,
            oldText.characters.length,
            oldText.getRangeFontSize(0, oldText.characters.length) as number
          );
        newText.setRangeLineHeight(
          0,
          oldText.characters.length,
          oldText.getRangeLineHeight(
            0,
            oldText.characters.length
          ) as unknown as any
        );
        newText.setRangeTextCase(
          0,
          oldText.characters.length,
          oldText.getRangeTextCase(
            0,
            oldText.characters.length
          ) as unknown as any
        );
        newText.setRangeTextDecoration(
          0,
          oldText.characters.length,
          oldText.getRangeTextDecoration(
            0,
            oldText.characters.length
          ) as unknown as any
        );
        newText.setRangeLetterSpacing(
          0,
          oldText.characters.length,
          oldText.getRangeLetterSpacing(
            0,
            oldText.characters.length
          ) as unknown as any
        );
      }
      if (
        (oldText.getRangeFillStyleId(0, oldText.characters.length) as string) !=
        ""
      ) {
        newText.setRangeFillStyleId(
          0,
          oldText.characters.length,
          oldText.getRangeFillStyleId(0, oldText.characters.length) as string
        );
      } else {
        newText.setRangeFills(
          0,
          oldText.characters.length,
          oldText.getRangeFills(0, oldText.characters.length) as unknown as any
        );
      }
    });
  }
  if (typeof styleId == "symbol") {
    for (var i = 0; i < oldText.characters.length; i++) {
      // let fontName = oldText.getRangeFontName(i,i+1) as FontName
      // await figma.loadFontAsync(fontName)
      loadUniqueFonts([oldText]).then((res) => {
        if (oldText.getRangeTextStyleId(i, i + 1) != "") {
          newText.setRangeTextStyleId(
            i,
            i + 1,
            oldText.getRangeTextStyleId(i, i + 1) as string
          );
        } else {
          newText.setRangeFontName(
            i,
            i + 1,
            oldText.getRangeFontName(i, i + 1) as FontName
          ),
            newText.setRangeFontSize(
              i,
              i + 1,
              oldText.getRangeFontSize(i, i + 1) as number
            );
          newText.setRangeLineHeight(
            i,
            i + 1,
            oldText.getRangeLineHeight(i, i + 1) as unknown as any
          );
          newText.setRangeTextCase(
            i,
            i + 1,
            oldText.getRangeTextCase(i, i + 1) as unknown as any
          );
          newText.setRangeTextDecoration(
            i,
            i + 1,
            oldText.getRangeTextDecoration(i, i + 1) as unknown as any
          );
          newText.setRangeLetterSpacing(
            i,
            i + 1,
            oldText.getRangeLetterSpacing(i, i + 1) as unknown as any
          );
        }
        if ((oldText.getRangeFillStyleId(i, i + 1) as string) != "") {
          newText.setRangeFillStyleId(
            i,
            i + 1,
            oldText.getRangeFillStyleId(i, i + 1) as string
          );
        } else {
          newText.setRangeFills(
            i,
            i + 1,
            oldText.getRangeFills(i, i + 1) as unknown as any
          );
        }
      });
    }
  } else {
    newText.textStyleId = oldText.textStyleId;
  }
  instance.layoutAlign = "STRETCH";

  node.remove();
  var grid = parseFloat(await figma.clientStorage.getAsync("gridSize"));
  crop(instance, grid);
}


function replaceTextNodes(component: ComponentNode) {
    //This is clunky ish kinda - secret menu replacer eeek
  
    //let textNodes = figma.currentPage.findAll(node => node.type == "FRAME" && node.children.length == 1 && node.children[0].type == "TEXT") as FrameNode[]
  
    let textNodes = figma.currentPage.selection.filter(
      (node) => node.type == "TEXT"
    ) as TextNode[];
  
    textNodes.forEach(async (textNode) => {
      swapNodes(textNode, component.createInstance());
    });
    figma.notify(`Swapped ${textNodes.length} text layers`);
  }