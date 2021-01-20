import component from '*.vue';
import { dispatch, handleEvent } from './codeMessageHandler';
var documentName = (node: any) => node.type == "DOCUMENT" ? node.name : documentName(node.parent)
switch (figma.command) {
 case 'Create':
 if(figma.getLocalTextStyles().length > 0){	 
 figma.showUI(__uiFiles__.create, {
	 width: 240,
	 height: 100
 })

 } else {
	 //figma.notify('Text crop requires local text styles')
	 figma.closePlugin('Text crop requires local text styles')
 } 
 break
 case 'Update':
 figma.showUI(__uiFiles__.update, {
	 width: 240,
	 height: 100
 })

 break
 default:
	 figma.showUI(__uiFiles__.update)
}


const nodeWidth = 400



handleEvent("resizeUI", (size) => {
	figma.ui.resize(size[0],size[1])
})


handleEvent('createNode',  async (gridSize) => {
	 
	if(figma.currentPage.selection.length == 1 && figma.currentPage.selection[0].type == "COMPONENT_SET"){
		let sel = figma.currentPage.selection[0] as ComponentSetNode
		updateComponentSet(gridSize)
	} else {
		let dummy = figma.createComponent()
		dummy.name = 'dummy'
		dummy.setPluginData('removeme','remove')
		let parent = figma.combineAsVariants([dummy],figma.currentPage)
		let styleIds = figma.getLocalTextStyles().map(n => n.id)
		cropStyles(gridSize,styleIds,parent)
	}


		
});



handleEvent('updateInstances', () => {
		figma.root.setRelaunchData({'Update':'Launch the text crop plugin to resize text crop components'})
	updateInstances()	
})


function updateInstances(){	
	const t0 = Date.now()	
	let instances = figma.currentPage.findAll(n => n.type == "INSTANCE" && n.getPluginData('TextCropComponent') == 'true')
	var instancesToChange = []
		if(instances.length){
			instances.forEach((instance: InstanceNode) => {				
				//Hug vertically
				instance.layoutMode = "VERTICAL"
				instance.primaryAxisSizingMode = "AUTO"


				const frameNode = instance.children[0] as FrameNode		
				const textNode = frameNode.children[0] as TextNode
				const lineHeight = parseFloat(frameNode.getPluginData('lineHeight'))
				const gridSize = parseFloat(frameNode.getPluginData('gridSize'))
									
				const newHeight  =  textNode.height - lineHeight
				if (instance.paddingBottom !== newHeight) {
				instancesToChange.push({instance: instance, newHeight: newHeight, width: instance.width, gridSize: gridSize })	
				}
	
			})

			
		}
	
	instancesToChange.forEach(item => {				
					let inst = item.instance as InstanceNode
					inst.paddingBottom = item.newHeight									

	})
	const t1 = Date.now()
	console.log(`updateInstances took ${t1-t0}ms to update ${instancesToChange.length} of ${instances.length} possible instances`)
}







/*
* @param {number} gridSize The size of the grid we round the lineheight to
* @param {Array<String>} styles An Array of styleIDs to make new variants from. 
* @param {ComponentSetNode} parent The parent component set to insert the variant into
*/
async function cropStyles(gridSize: number, styles: Array<string>, parent: ComponentSetNode){
	//Generator function
	let yOffset = 0
	
	const textStyles = styles.map(id => {
		return figma.getStyleById(id).type == "TEXT" ? figma.getStyleById(id) : null	
	}) as Array<TextStyle>

	let promises = textStyles.map(style => figma.loadFontAsync(style.fontName))

	let nodes: Array<ComponentNode> = []
	await Promise.all(promises).then(async() => {

		textStyles.forEach(style => {
			let xOffset = 0
			//Make a new component
			let component = figma.createComponent()


					
			//component.name = style.name.split('/').map((str,index) => str = `Group${index}=${str}` ).join(',')
			component.name = style.name
			component.fills = []
			//Add text node to component
			let textNode: TextNode = figma.createText()
			textNode.name = "Cropped Text"
			textNode.constraints = {
				horizontal: "STRETCH",
				vertical: "MIN"
			}
			

			//create a frame to put the text inside
			let frame = figma.createFrame()
			frame.fills = []
			frame.clipsContent = false
			frame.appendChild(textNode)

			component.appendChild(frame)

			frame.name = "Cropped Text Container"
				

			textNode.textStyleId = style.id
			textNode.characters = "Cropped Text"


			component.resize(textNode.width,textNode.height) //Resize to fit

			//Duplicate the text node to make an SVG of it
			let clone = textNode.clone()
			clone.characters = 'T'
			clone.x = 0
			clone.y = 0
			
			
			let lineHeight = (textNode.lineHeight as any) === "AUTO" ? textNode.lineHeight : clone.height
			component.setPluginData('lineHeight', lineHeight.toString())
			
			let tempText = figma.flatten([clone])
			let baseline = (lineHeight as number) - (tempText.y + tempText.height)

		
			let height
			if(gridSize != 0){
			height = (Math.ceil((textNode.height - baseline - tempText.y) / gridSize) * gridSize) 
			} else {
			height = textNode.height - baseline - tempText.y 
			}
		

			
			frame.resize(nodeWidth, height)
			textNode.resize(nodeWidth,textNode.height)
			component.resize(nodeWidth, height)

			component.layoutMode = "VERTICAL"
			component.primaryAxisSizingMode = "AUTO"
			component.counterAxisSizingMode = "FIXED"
			component.layoutGrow = 0
			component.constraints = {
				horizontal: "MIN",
				vertical: "MIN"
			}



			frame.layoutAlign = "STRETCH"
			frame.layoutGrow = 0
			frame.counterAxisSizingMode = "AUTO" //Fill container vert ?
			frame.primaryAxisAlignItems = "MIN"
			frame.counterAxisAlignItems = "MIN"
			frame.primaryAxisSizingMode = "AUTO" //Fill container horiz


			
			
			frame.setPluginData('before', tempText.y.toPrecision(3).toString())
			frame.setPluginData('after', baseline.toPrecision(3).toString())
			frame.setPluginData('lineHeight', lineHeight.toString())
			frame.setPluginData('style', style.id)
			var rootData = {
				fontName: style.fontName,
				fontSize: style.fontSize,	
				before: tempText.y.toPrecision(3).toString(),
				after: baseline.toPrecision(3).toString()
			}
			console.log(rootData)
			figma.root.setSharedPluginData('TextCrop',style.name, JSON.stringify(rootData))

			component.description =
			`crop before: ${tempText.y.toPrecision(3).toString()}px\ncrop after: ${baseline.toPrecision(3).toString()}px\n---\nCreated by Text Crop Plugin`
		
			textNode.y = -tempText.y
			textNode.x = 0

			textNode.layoutAlign = "INHERIT"
			textNode.layoutGrow = 0

			textNode.textAutoResize = "HEIGHT"

			component.x = xOffset
			
			
			tempText.remove()

			component.y = yOffset
			yOffset += textNode.height + gridSize**2
			component.setPluginData('TextCropComponent', 'true')
			nodes.push(component)
		}
		);

		let componentSet: ComponentSetNode = figma.combineAsVariants(nodes, figma.currentPage)
		componentSet.name = "Cropped Text"


		

		

		console.log(documentName(componentSet))

		console.log(componentSet.id, 'from create function')
		componentSet.setPluginData('gridSize', gridSize.toString())

		componentSet.description = `Text Crop component removes whitespace above and below text.\n${gridSize != 0 ? 'Baseline Grid Size: '+gridSize : ''}`

		figma.currentPage.findAll(n => n.getPluginData('removeme') == 'remove').forEach(removable => removable.remove())

	})


	// This shows how the main code can send messages to the UI code.
	//dispatch('nodeCreated', node.id);

}

async function updateComponentSet(gridSize: number){
	if(figma.currentPage.selection.length > 1 || figma.currentPage.selection[0].type != "COMPONENT_SET"){
		figma.notify('Please select the component set to update with new styles')
	} else {
		let sel = figma.currentPage.selection[0]
		if(sel.type == "COMPONENT_SET" && sel.getPluginData('gridSize') ){
			sel = sel as ComponentSetNode
			let textStyles = figma.getLocalTextStyles();
			var ids = textStyles.map(n => n.id) // Store all the styles
			let promises = textStyles.map(style => figma.loadFontAsync(style.fontName));
			Promise.all(promises).then(
				resolve => {
					(sel.children as Array<ComponentNode>).forEach(component => {
						try{

							let frame = component.children[0] as FrameNode
							let textNode = frame.children[0] as TextNode

							let styleId: string = frame.getPluginData('styleId')
							//figma.notify(styleId)
							let style: TextStyle = figma.getStyleById(styleId) as TextStyle
							if(!style){
							
							styleId = textNode.getRangeTextStyleId(0,1) as string
							
							style = figma.getStyleById(styleId) as TextStyle
							
							frame.setPluginData('styleId',styleId)
							
							}
							console.log(ids.indexOf(styleId))
							//Remove style from list of IDs, so we don't duplicate
							ids.indexOf(styleId) > -1 ? ids.splice(ids.indexOf(styleId),1) : null;
				
					component.setRelaunchData({'Bind': 'Bind component for text cropping'})
					component.setPluginData('TextCropComponent', 'true')
							
					component.fills = []
					
					
					textNode.constraints = {
						horizontal: "STRETCH",
						vertical: "MIN"
					}
							
					frame.fills = []
					frame.clipsContent = false		
										
					textNode.textStyleId = style.id //Probably don't need to do this here...
					textNode.characters = style.name.split('/')[style.name.split('/').length -1].trim()
		
					component.resize(textNode.width,textNode.height) //Resize to fit
		
					//Duplicate the text node to make an SVG of it
					let clone = textNode.clone()
					clone.characters = 'T'
					clone.x = 0
					clone.y = 0
					
					
					let lineHeight = (textNode.lineHeight as any) === "AUTO" ? textNode.lineHeight : clone.height
					component.setPluginData('lineHeight', lineHeight.toString())
					
					let tempText = figma.flatten([clone])
					let baseline = (lineHeight as number) - (tempText.y + tempText.height)
		
				
					let height
					if(gridSize != 0){
					height = (Math.ceil((textNode.height - baseline - tempText.y) / gridSize) * gridSize) 
					} else {
					height = textNode.height - baseline - tempText.y 
					}
				
		
					
					frame.resize(nodeWidth, height)
					textNode.resize(nodeWidth,textNode.height)
					component.resize(nodeWidth, height)
		
					component.layoutMode = "VERTICAL"
					component.primaryAxisSizingMode = "AUTO"
					component.counterAxisSizingMode = "FIXED"
					component.layoutGrow = 0
					component.constraints = {
						horizontal: "MIN",
						vertical: "MIN"
					}
		
		
		
					frame.layoutAlign = "STRETCH"
					frame.layoutGrow = 0
					frame.counterAxisSizingMode = "AUTO" //Fill container vert ?
					frame.primaryAxisAlignItems = "MIN"
					frame.counterAxisAlignItems = "MIN"
					frame.primaryAxisSizingMode = "AUTO" //Fill container horiz
		
		
					
					
					frame.setPluginData('before', tempText.y.toPrecision(3).toString())
					frame.setPluginData('after', baseline.toPrecision(3).toString())
					frame.setPluginData('lineHeight', lineHeight.toString())
					frame.setPluginData('styleId', styleId)
		
					component.description =
					`crop before: ${tempText.y.toPrecision(3).toString()}px\ncrop after: ${baseline.toPrecision(3).toString()}px\n---\nCreated by Text Crop Plugin`
				
					textNode.y = -tempText.y
					textNode.x = 0
		
					textNode.layoutAlign = "INHERIT"
					textNode.layoutGrow = 0
		
					textNode.textAutoResize = "HEIGHT"
									
					
					tempText.remove()
		
												
		
						} catch(e){
							figma.notify(e)
						}
				

				},
				reject => {

				}
			);

			
				
			console.log(ids)
			ids.length ? cropStyles(gridSize,ids,sel) : null //Crop the remaining ones.
			},
			reject => {

			}
			
			)
		
	}

	}
}







