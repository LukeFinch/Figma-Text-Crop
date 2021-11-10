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

  export function addProps(obj, arr, val) {
    if (typeof arr == "string") arr = arr.split(".");

    obj[arr[0]] = obj[arr[0]] || {};

    var tmpObj = obj[arr[0]];

    if (arr.length > 1) {
      arr.shift();
      addProps(tmpObj, arr, val);
    } else obj[arr[0]] = val;

    return obj;
  }
