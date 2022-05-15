import {loadUniqueFonts} from './util'
import {crop} from './code'
import { parseTextStyle, applyTextStyleToTextNode } from "./parseTextStyle"

async function getComponentSetForKey(key){
  let component = await figma.importComponentSetByKeyAsync(key).then((res) => {return res}, (rej) => {console.error(rej); return null})
  if(!component){
   const nodes = figma.root.findAllWithCriteria({
      types: ['COMPONENT_SET']
    })
    component = nodes.filter(n => {return n.key === key})[0]
  }
  if(component){
    return component
  } else {
    return null
  }
}

export async function swapNodes(
  node: TextNode | InstanceNode | FrameNode,
  key: string
) {


  const componentSet = await getComponentSetForKey(key)

  const instance = componentSet?.children[1].createInstance()

  if(instance){
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
  
  console.log(oldText)
  

  instance.relativeTransform = node.relativeTransform;
  //instance.resize(node.width, node.height);
  let newText = instance.children[0].children[0] as TextNode;
  instance.resizeWithoutConstraints(oldText.width,oldText.height)
  instance.name = oldText.name
  
  await loadUniqueFonts([newText]);

  applyTextStyleToTextNode(parseTextStyle(oldText), newText)
  oldText.remove()


  var grid = parseFloat(await figma.clientStorage.getAsync("gridSize"));
  crop(instance, grid);
  }

  
}