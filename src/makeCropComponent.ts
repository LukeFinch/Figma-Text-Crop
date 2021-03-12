export default function makeCropComponent(){
async function loadFonts() {
    await Promise.all([
        figma.loadFontAsync({
            family: "Roboto",
            style: "Regular"
            })
    ])
}

//Create COMPONENT
var component = figma.createComponent()
component.resize(52, 16) 
component.name = "Text Crop"
component.relativeTransform = [[1,0,-252.5],[0,1,-0.5]]
component.x = figma.viewport.center.x
component.y = figma.viewport.center.y
component.fills = []
component.strokes = []
component.paddingTop = 4.53
component.paddingBottom = 4
component.primaryAxisSizingMode = "FIXED"
component.clipsContent = false
component.layoutMode = "HORIZONTAL"
component.counterAxisSizingMode = "AUTO"
figma.currentPage.appendChild(component)

// Create TEXT
var textLayer = figma.createText()
//textLayer.resize(52, 1)

zeroResize(textLayer,52,1/Number.MAX_SAFE_INTEGER)

textLayer.name = "Text Crop"
textLayer.fills = [{"type":"SOLID","visible":true,"opacity":1,"blendMode":"NORMAL","color":{"r":0,"g":0,"b":0}}]
textLayer.strokes = []
textLayer.strokeAlign = "OUTSIDE"
textLayer.relativeTransform = [[1,0,0],[0,1,0.5]]
textLayer.y = textLayer.height/2
textLayer.layoutGrow = 1
textLayer.autoRename = false
loadFonts().then(
(res) => {
    textLayer.fontName = {
                        family: "Roboto",
                        style: "Regular"
                    }
    textLayer.characters = "Text Crop"
    textLayer.fontSize = 12
    textLayer.textAlignHorizontal = "LEFT"
    textLayer.textAlignVertical = "CENTER"
    textLayer.textCase = "ORIGINAL"
    textLayer.textDecoration = "NONE"
    textLayer.textAutoResize = "NONE"
    textLayer.letterSpacing = {"unit":"PERCENT","value":0}
    textLayer.lineHeight = {"unit":"PIXELS","value":16}
}
)
//Function to set the text layer to be almost 0 px






component.appendChild(textLayer)
component.setPluginData('TextCrop','true')
textLayer.setRelaunchData({'UpdateSelected':'Resize Selected', 'Update':'Resize All Instances'})
component.setRelaunchData({'UpdateSelected':'Resize Selected', 'Update':'Resize All Instances'})
figma.clientStorage.setAsync('componentKey',component.key)
}

function zeroResize(node, width, height){
//Workaround to resize a node, if its size is less than 0.01
node.resize(width < 0.01 ? 1 : width,height < 0.01 ? 1 : height)
if(width < 0.01 || height < 0.01){
let dummy = figma.createRectangle()
dummy.resize(width < 0.01 ? 1/width : width,height < 0.01 ? 1/height : height)
let group: GroupNode = figma.group([node,dummy],figma.currentPage)
group.resize(width < 0.01 ? 1 : width,height < 0.01 ? 1 : height)
group.parent.appendChild(node)
group.remove()
}
}