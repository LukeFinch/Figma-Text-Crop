import { setCharacters, loadUniqueFonts } from "@figma-plugin/helpers";


import { dispatch, handleEvent } from './codeMessageHandler';
figma.showUI(__html__);
const numLines = 10
const nodeWidth = 200
// The following shows how messages from the UI code can be handled in the main code.
handleEvent('createNode',  async data => {
	let yOffset = 0
	
	const gridSize = data
	const textStyles = figma.getLocalTextStyles()
	let promises = textStyles.map(style => figma.loadFontAsync(style.fontName))
	let nodes: Array<ComponentNode> = []
	await Promise.all(promises).then(async() => {
		textStyles.forEach(style => {
			let xOffset = 0
			for(var lines = 0; lines < numLines; lines++){
			xOffset = (lines * nodeWidth) + gridSize**2 
			//Make a new component
			let component = figma.createComponent()
			component.layoutMode = "VERTICAL"
			component.primaryAxisAlignItems = "MIN"
			component.primaryAxisSizingMode = "FIXED"
			//component.constraints = {horizontal: "STRETCH", vertical: "MIN"}
			
			
			const lineNumber = (lines+1 < 10 ? '0' : '') + (lines+1)  
			component.name = style.name.split('/').map((str,index) => str = `Group${index}=${str}` ).join(',') + ',lines=' + lineNumber
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
			height = (Math.ceil((textNode.height - baseline - tempText.y) / gridSize) * gridSize) + ((lineHeight as number) * lines)
			} else {
			height = textNode.height - baseline - tempText.y + ((lineHeight as number) * lines)
			}
		

			
			frame.resize(nodeWidth, height)
			textNode.resize(nodeWidth,textNode.height)
			component.resize(nodeWidth, height)

			frame.layoutAlign = "STRETCH"
			frame.primaryAxisAlignItems = "MIN"
			frame.primaryAxisSizingMode = "AUTO"
			
			frame.setPluginData('before', (tempText.y).toString())
			frame.setPluginData('after', baseline.toString())
			frame.setPluginData('lineHeight', lineHeight.toString())
		
			textNode.y = -tempText.y
			textNode.x = 0

			textNode.layoutAlign = "INHERIT"
			textNode.layoutGrow = 0

			textNode.textAutoResize = "HEIGHT"

			component.y = yOffset
			component.x = xOffset
			if(lines+1 == numLines){yOffset += height + gridSize**2}
			
			tempText.remove()


			nodes.push(component)
		}
		});
		let set = figma.combineAsVariants(nodes, figma.currentPage)
		set.name = "Text Crop"
		console.log(set.id, 'from create function')
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
		if(instances.length){
			instances.forEach((instance: InstanceNode) => {
				let frameNode = instance.children[0] as FrameNode		
				let before = parseFloat(frameNode.getPluginData('before'))
				let after = parseFloat(frameNode.getPluginData('after'))
				let lineHeight = parseFloat(frameNode.getPluginData('lineHeight'))
				
				let textNode = frameNode.children[0] as TextNode
				console.log(frameNode.height + before + after, textNode.height)
				let variantHeight = frameNode.height + before + after
				if(variantHeight != textNode.height){
					let numLines = textNode.height /  lineHeight
					let lines = ((numLines < 10 ? '0' : '') + numLines).toString()
					const variantToSwapToName = instance.mainComponent.name.replace(new RegExp (/lines=\d+$/, 'gm'), `lines=${lines}`)
					const variantToSwapTo: ComponentNode = componentSet.findChild(n => n.name == variantToSwapToName) as ComponentNode
					//console.log(variantToSwapToName, variantToSwapTo)
					const textValue = textNode.characters

					instancesToChange.push({instance: instance, newComponent: variantToSwapTo, characters: textValue, width: instance.width })					
				}
			})

			
		}
	})
	instancesToChange.forEach(item => {



					item.instance.mainComponent = item.newComponent
					const frameNode = item.instance.children[0] as FrameNode
					const textNode = frameNode.children[0] as TextNode
					//setCharacters(textNode, item.characters)
					textNode.characters = item.characters
					item.instance.resize(item.width, item.instance.height)

					item.instance.layoutAlign = "STRETCH"
					item.instance.primaryAxisAlignItems = "MIN"
					item.instance.primaryAxisSizingMode = "AUTO"


	})
})

handleEvent('preloadFonts', async() => {
	const componentSetId = figma.root.getSharedPluginData('figma_text_crop.lukefinch.com.github','Crop Node ID')
	if(componentSetId){
		let fontNames = []
		
		const componentSet: ComponentSetNode = figma.getNodeById(componentSetId) as ComponentSetNode
		componentSet.children.forEach(child => {
			child = child as ComponentNode;
			const frameNode = child.children[0] as FrameNode
			const textNode = frameNode.children[0] as TextNode
			if(fontNames.find((n: FontName) => n.family == (textNode.fontName as FontName).family && n.style == (textNode.fontName as FontName).style)){
				//Don't add
				// console.log('Already exists')
			} else {
				fontNames.push(textNode.fontName)
			}
	
		})
		//console.log(fontNames)		
		const promises = fontNames.map(async (font: FontName) => {await figma.loadFontAsync(font)})
		console.log(promises)
		Promise.all(promises).then(() => {
			console.log('Dispatching loaded fonts')
			dispatch('fontsLoaded')
		})
	}
})