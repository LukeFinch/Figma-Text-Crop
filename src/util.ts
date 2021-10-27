export function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }


  export class TextCropNode {
    instance: InstanceNode
    text: TextNode
    fontName: FontName
    fontSize: number
    constructor(node){
      this.instance = node
      this.text = node.children[0].children[0]
      this.fontName = this.text.getRangeFontName(0,1) as FontName
      this.fontSize = this.text.getRangeFontSize(0,1) as number
      return this
    }
  }