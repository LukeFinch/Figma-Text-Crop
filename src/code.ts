import { dispatch, handleEvent } from './codeMessageHandler';

switch (figma.command) {
 case 'Create':
 figma.showUI(__uiFiles__.create)
 figma.ui.resize(240,120)
 break
 case 'Update':
 figma.showUI(__uiFiles__.update)
 break
 default:
	 figma.showUI(__uiFiles__.update)
}
// figma.showUI(__uiFiles__.ui);

const nodeWidth = 200
// The following shows how messages from the UI code can be handled in the main code.

function ceilTo(number,rounder){
	return rounder == 0 ? number : Math.ceil(number / rounder) * rounder
}

handleEvent("resizeUI", (size) => {
	figma.ui.resize(size[0],size[1])
})

handleEvent('autoUpdate', () => {
	figma.notify('Update from the plugin')
})

handleEvent('createNode',  async (gridSize) => {
	 
	const sel = figma.currentPage.selection
	const selectedTexts = sel.filter(n => {return n.type == "TEXT"}) as Array<TextNode>
		if(selectedTexts.length == 0){
			cropLocalStyles(gridSize)
		} else {
			const promises = selectedTexts.map(async sel => {
				let font = sel.getRangeFontName(0,0) as FontName	
				await figma.loadFontAsync(font)
			})
			selectedTexts.forEach(sel => {

				cropTextNode(sel as TextNode, gridSize)
			})
		}
});





handleEvent('updateInstances', async () => {
	console.log('Updating Instances')
	const componentSetKey = figma.root.getSharedPluginData('figma_text_crop.lukefinch.com.github','CropKey')
	const componentSetId = figma.root.getSharedPluginData('figma_text_crop.lukefinch.com.github','CropID')
	console.log(componentSetId)
	let setNode = figma.getNodeById(componentSetId)
	console.log(setNode)
	if(setNode !== null){
		if(setNode.type == "COMPONENT_SET"){
			console.log('local instances')
			//Component set exists within the doc.
			cropChildrenOfComponentSet(setNode)
		} else {
			console.log('In another library...')
		
			figma.importComponentSetByKeyAsync(componentSetKey).then(
				result => cropChildrenOfComponentSet(result),
				result => figma.notify('An Arror Occured')
			)
		}

	}

	

})


function cropChildrenOfComponentSet(componentSet: ComponentSetNode){
			
	var instancesToChange = []

	componentSet.children.forEach((child: ComponentNode) => {
		let instances = figma.currentPage.findAll(n => n.type === "INSTANCE" && n.mainComponent == child)
		const gridSize = Number(componentSet.getPluginData('gridSize'))
		if(instances.length){
			instances.forEach((instance: InstanceNode) => {				
				
				const frameNode = instance.children[0] as FrameNode		
				let textNode = frameNode.children[0] as TextNode
				const lineHeight = parseFloat(frameNode.getPluginData('lineHeight'))
									
				const newHeight  =  textNode.height - lineHeight
				if (instance.paddingBottom !== newHeight) {
				instancesToChange.push({instance: instance, newHeight: newHeight, width: instance.width, gridSize: gridSize })	
				}
	
			})

			
		}
	})
	instancesToChange.forEach(item => {

				
					let inst = item.instance as InstanceNode
					inst.paddingBottom = item.newHeight
					//Hug vertically
					inst.layoutMode = "VERTICAL"
					inst.primaryAxisSizingMode = "AUTO"
					
				

	})
	
}


handleEvent('bindComponentSet',() => {	
	let sel = figma.currentPage.selection
	if(sel.length != 1 ){
		figma.notify('Please select one instance of Text Crop component to bind')
	} if (sel[0].type !== "INSTANCE") {
		figma.notify('Please select one instance of Text Crop component to bind')
	} if (sel[0].type == "INSTANCE"){
		let inst = sel[0] as InstanceNode
		if(inst.mainComponent.parent.type == "COMPONENT_SET" && inst.mainComponent.parent.getPluginData('gridSize') !== undefined){
			figma.root.setSharedPluginData('figma_text_crop.lukefinch.com.github','CropID',inst.mainComponent.parent.id)
			figma.root.setSharedPluginData('figma_text_crop.lukefinch.com.github','CropKey',inst.mainComponent.parent.key)
			figma.notify(`Bound to component: ${inst.mainComponent.parent.name} [${inst.mainComponent.parent.key}]`)
			console.log(figma.root.getSharedPluginData('figma_text_crop.lukefinch.com.github','CropKey'))
		}
	} if(sel[0].type == "COMPONENT_SET" && sel[0].getPluginData('gridSize') !== undefined){
		let componentSet = sel[0] as ComponentSetNode
		figma.root.setSharedPluginData('figma_text_crop.lukefinch.com.github','CropKey',componentSet.id)
		figma.root.setSharedPluginData('figma_text_crop.lukefinch.com.github','CropKey',componentSet.key)
		figma.notify(`Bound to component: ${componentSet.name} [${componentSet.key}]`)
	}
	else{
		figma.notify("Failed to bind, please select either an instance of the crop component, or the component set to bind")
	}
})


async function cropLocalStyles(gridSize: number){
	//Generator function
	let yOffset = 0
	
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
				vertical: "MAX"
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
		figma.root.setSharedPluginData('figma_text_crop.lukefinch.com.github','CropID',set.id)
		figma.root.setSharedPluginData('figma_text_crop.lukefinch.com.github','CropKey',set.key)
	})


	// This shows how the main code can send messages to the UI code.
	//dispatch('nodeCreated', node.id);

}


async function cropTextNode(node: TextNode, gridSize: Number){
	figma.notify('Cropping text nodes is currently unavailable. Please create components to crop')
}



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