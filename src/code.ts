import component from "*.vue";
import { setCharacters, loadUniqueFonts } from "@figma-plugin/helpers";


import { dispatch, handleEvent } from './codeMessageHandler';
figma.showUI(__html__);
const nodeWidth = 200
// The following shows how messages from the UI code can be handled in the main code.

function ceilTo(number,rounder){
	return rounder == 0 ? number : Math.ceil(number / rounder) * rounder
}

handleEvent('autoUpdate', () => {
	figma.notify('Update from the plugin')
})

handleEvent('createNode',  async (data) => {
	console.log('Hello from dispatch')
	let yOffset = 0
	
	const gridSize = Number(data)
	console.log(gridSize)
	const textStyles = figma.getLocalTextStyles()
	// console.log(textStyles)
	let promises = textStyles.map(style => figma.loadFontAsync(style.fontName))
	// console.log(promises)
	let nodes: Array<ComponentNode> = []
	await Promise.all(promises).then(async() => {
		// console.log('Promises complete')
		textStyles.forEach(style => {
			let xOffset = 0
			//Make a new component
			let component = figma.createComponent()
			component.layoutMode = "VERTICAL"
			component.primaryAxisAlignItems = "MIN"
			component.primaryAxisSizingMode = "FIXED"
			//component.constraints = {horizontal: "STRETCH", vertical: "MIN"}
			
			component.setRelaunchData({'Relaunch': 'Description here'})
					
			component.name = style.name.split('/').map((str,index) => str = `Group${index}=${str}` ).join(',')
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
			// frame.layoutAlign = "STRETCH"
			frame.constraints = {
				horizontal: "STRETCH",
				vertical: "MIN"
			}
	

			textNode.textStyleId = style.id
			textNode.characters = "This is text crop"


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

			frame.layoutAlign = "STRETCH"
			frame.layoutGrow = 1
			frame.primaryAxisAlignItems = "MIN"
			frame.primaryAxisSizingMode = "AUTO" //Fill container horiz

			frame.counterAxisAlignItems = "MIN"
			frame.counterAxisSizingMode = "AUTO" //Fill container vert ?

			
			
			frame.setPluginData('before', (tempText.y).toString())
			frame.setPluginData('after', baseline.toString())
			frame.setPluginData('lineHeight', lineHeight.toString())
		
			textNode.y = -tempText.y
			textNode.x = 0

			textNode.layoutAlign = "INHERIT"
			textNode.layoutGrow = 0

			textNode.textAutoResize = "HEIGHT"

			component.x = xOffset
			
			
			tempText.remove()

			component.y = yOffset
			yOffset += height + gridSize**2
			
			nodes.push(component)
		}
		);
		let set = figma.combineAsVariants(nodes, figma.currentPage)
		set.name = "Text Crop"
		console.log(set.id, 'from create function')
		set.setPluginData('gridSize', gridSize.toString())
		set.description = `This component set was created by the TextCrop plugin by Luke Finch`
		figma.root.setSharedPluginData('figma_text_crop.lukefinch.com.github','Crop Node ID',set.id)
	})


	// This shows how the main code can send messages to the UI code.
	//dispatch('nodeCreated', node.id);
});





handleEvent('updateInstances', () => {
	console.log('Updating Instances')
	const componentSetId = figma.root.getSharedPluginData('figma_text_crop.lukefinch.com.github','Crop Node ID')
	const componentSet: ComponentSetNode = figma.getNodeById(componentSetId) as ComponentSetNode
	console.log(componentSetId, componentSet)
	var instancesToChange = []
	componentSet.children.forEach((child: ComponentNode) => {
		let instances = figma.currentPage.findAll(n => n.type === "INSTANCE" && n.mainComponent == child)
		const gridSize = Number(componentSet.getPluginData('gridSize'))
		if(instances.length){
			instances.forEach((instance: InstanceNode) => {
				//This breaks if it's in a frame, and not in an instance stack..
				var totalHeight = instance.parent != figma.currentPage ? (instance.parent as any).height : instance.height;
				totalHeight = Number(totalHeight.toFixed(2))
				const diffHeight = totalHeight - instance.height;
				
				const frameNode = instance.children[0] as FrameNode		
				let textNode = frameNode.children[0] as TextNode

				const before = parseFloat(frameNode.getPluginData('before'))
				const after = parseFloat(frameNode.getPluginData('after'))
				const lineHeight = parseFloat(frameNode.getPluginData('lineHeight'))

				const newHeight  =  Number(((textNode.height - before - after) + diffHeight).toFixed(2));
				
			
				let variantHeight = Number((frameNode.height + before + after).toFixed(2))
				if(newHeight != totalHeight){
					let parent = instance.parent
					console.log('parent is:',parent, instance)
					if(parent.type == "INSTANCE"){
						console.log('parent is an instance')
						console.log(parent.layoutMode,parent.layoutAlign,parent.primaryAxisSizingMode)
						console.log(!(parent.layoutMode == "VERTICAL" && parent.layoutAlign == "STRETCH" && parent.primaryAxisSizingMode == "FIXED"))
						if(!(parent.layoutMode == "VERTICAL" && parent.layoutAlign == "STRETCH" && parent.primaryAxisSizingMode == "FIXED")){
							//If it's an instance in a component, where it's height is set to fill container
							instancesToChange.push({instance: instance, newHeight: newHeight, width: instance.width, gridSize: gridSize })	
						}
					}
					//instancesToChange.push({instance: instance, newHeight: newHeight, width: instance.width, gridSize: gridSize })					
				}
			})

			
		}
	})
	instancesToChange.forEach(item => {
					//item.instance.mainComponent = item.newComponent
					//const frameNode = item.instance.children[0] as FrameNode
					//const textNode = frameNode.children[0] as TextNode
					//setCharacters(textNode, item.characters)
					//textNode.characters = item.characters
					console.log('resizing',item.instance)
					console.log(item.instance.parent.type)
					if(item.instance.parent.type == "INSTANCE" ){
					item.instance.parent.resize(item.width, ceilTo(item.newHeight,item.gridSize))
					} else {
						item.instance.resize(item.width, ceilTo(item.newHeight, item.gridSize))
					}
					// item.instance.layoutAlign = "STRETCH"
					// item.instance.primaryAxisAlignItems = "MIN"
					// item.instance.primaryAxisSizingMode = "AUTO"


	})
})



handleEvent('bindComponentSet',() => {	
	let sel = figma.currentPage.selection
	if(sel.length != 1 ){
		figma.notify('Please select one instance of Text Crop component to bind')
	} if (sel[0].type !== "INSTANCE") {
		figma.notify('Please select one instance of Text Crop component to bind')
	} if (sel[0].type == "INSTANCE"){
		let inst = sel[0] as InstanceNode
		if(inst.mainComponent.parent.type == "COMPONENT_SET" && inst.mainComponent.parent.getPluginData('gridSize') !== undefined){
			figma.root.setSharedPluginData('figma_text_crop.lukefinch.com.github','Crop Node ID',JSON.stringify(inst.mainComponent.parent.id))
			figma.notify(`Bound to component: ${inst.mainComponent.parent.name} [${inst.mainComponent.parent.id}]`)
		}
	}
})




// handleEvent('preloadFonts', async() => {
// 	const componentSetId = figma.root.getSharedPluginData('figma_text_crop.lukefinch.com.github','Crop Node ID')
// 	if(componentSetId){
// 		let fontNames = []
		
// 		const componentSet: ComponentSetNode = figma.getNodeById(componentSetId) as ComponentSetNode
// 		componentSet.children.forEach(child => {
// 			child = child as ComponentNode;
// 			const frameNode = child.children[0] as FrameNode
// 			const textNode = frameNode.children[0] as TextNode
// 			if(fontNames.find((n: FontName) => n.family == (textNode.fontName as FontName).family && n.style == (textNode.fontName as FontName).style)){
// 				//Don't add
// 				// console.log('Already exists')
// 			} else {
// 				fontNames.push(textNode.fontName)
// 			}
	
// 		})
// 		//console.log(fontNames)		
// 		const promises = fontNames.map(async (font: FontName) => {await figma.loadFontAsync(font)})
// 		console.log(promises)
// 		Promise.all(promises).then(() => {
// 			console.log('Dispatching loaded fonts')
// 			dispatch('fontsLoaded')
// 		})
// 	}
// })