import { dispatch, handleEvent } from './codeMessageHandler';
const documentName = (node: BaseNode) => node.type == "DOCUMENT" ? node.name : documentName(node.parent)
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
 sendBindingToUI()
 break
 case 'Bind':
 figma.showUI(__uiFiles__.update, {
	 width: 240,
	 height: 100
 })
 bindToSelection(figma.currentPage.selection)
 break;
 default:
	 figma.showUI(__uiFiles__.update)
}
// figma.showUI(__uiFiles__.ui);

const nodeWidth = 300
// The following shows how messages from the UI code can be handled in the main code.


handleEvent("resizeUI", (size) => {
	figma.ui.resize(size[0],size[1])
})


handleEvent('createNode',  async (gridSize) => {
	 //This is messy Luke you should fix it..
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

	figma.root.setRelaunchData({'Update':'Launch the text crop plugin to resize text crop components'})

	const componentSetKey = await figma.clientStorage.getAsync('CropKey')
	const componentSetId = await figma.clientStorage.getAsync('CropID')

	let setNode = figma.getNodeById(componentSetId)

	if(setNode !== null){
		if(setNode.type == "COMPONENT_SET" && setNode.getPluginData('gridSize')){		
			//Component set exists within the doc.
			updateInstances(setNode)
		} else {
			//Component set is in a published library		
			figma.importComponentSetByKeyAsync(componentSetKey).then(
				resolved => updateInstances(resolved),
				rejected => {
					console.error(rejected)
					figma.notify('Couldn\'t find a text crop component, if it is in another library, ensure it is published')
				}
			)
		}

	}

	

})


function updateInstances(componentSet: ComponentSetNode){
	
	var instancesToChange = []
	componentSet.children.forEach((child: ComponentNode) => {
		let instances = figma.currentPage.findAll(n => n.type === "INSTANCE" && n.mainComponent == child)
		const gridSize = Number(componentSet.getPluginData('gridSize'))
		if(instances.length){
			instances.forEach((instance: InstanceNode) => {				
				//Hug vertically
				instance.layoutMode = "VERTICAL"
				instance.primaryAxisSizingMode = "AUTO"


				const frameNode = instance.children[0] as FrameNode		
				const textNode = frameNode.children[0] as TextNode
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


									

	})
	
}

function bindToSelection(sel){
	console.log(sel)

	let componentSet: ComponentSetNode = null


	if(sel.length != 1 ){
		figma.notify('Please select one instance of Text Crop component to bind')
	} if (sel[0].type == "INSTANCE"){
		let inst = sel[0] as InstanceNode

		if(inst.mainComponent.parent.type == "COMPONENT_SET" && inst.mainComponent.parent.getPluginData('gridSize') !== undefined){	
			componentSet = inst.mainComponent.parent as ComponentSetNode			
		}
	} if(sel[0].type == "COMPONENT_SET" && sel[0].getPluginData('gridSize') !== undefined){

		componentSet = sel[0] as ComponentSetNode
	}
	
	if(componentSet){

		figma.clientStorage.setAsync('CropID',componentSet.id)

		figma.clientStorage.setAsync('CropName', componentSet.name)

		figma.clientStorage.setAsync('CropKey', componentSet.key)

		figma.clientStorage.setAsync('CropDoc', documentName(componentSet))

		//figma.notify(`Bound to component: ${componentSet.name} [${componentSet.id} in ${documentName(componentSet)}]`)
		sendBindingToUI()
	}
}

handleEvent('bindComponentSet',() => {	
	let sel = figma.currentPage.selection
	bindToSelection(sel)
})

figma.on("selectionchange", () => {
	if(figma.currentPage.selection.length == 1){
		checkBindable(figma.currentPage.selection[0])
	} else {
		dispatch('bindable',false)
	}
})


function checkBindable(sel: BaseNode){
	
	if(sel.type !== "COMPONENT_SET" && sel.type !== "INSTANCE" && sel.type !== "COMPONENT"){
		dispatch('bindable',false)
	} else {
		if(sel.type == "COMPONENT_SET" && sel.getPluginData('gridSize') !== undefined){
			dispatch('bindable', true)
		}
		if(sel.type == "INSTANCE" && sel.mainComponent.parent.type == "COMPONENT_SET"){
			if(sel.mainComponent.parent.getPluginData('gridSize') !== undefined){
				dispatch('bindable', true)
			}
		}
		if(sel.type == "COMPONENT" && sel.parent.type == 'COMPONENT_SET'){
			if(sel.parent.getPluginData('gridSize') !== undefined){
				dispatch('bindable', true)
			}
		}
	}

}

async function cropLocalStyles(gridSize: number){
	//Generator function
	let yOffset = 0
	
	const textStyles = figma.getLocalTextStyles()

	let promises = textStyles.map(style => figma.loadFontAsync(style.fontName))

	let nodes: Array<ComponentNode> = []
	await Promise.all(promises).then(async() => {

		textStyles.forEach(style => {
			let xOffset = 0
			//Make a new component
			let component = figma.createComponent()

			component.setRelaunchData({'Bind': 'Bind component for text cropping'})
					
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
			
			nodes.push(component)
		}
		);

		let componentSet: ComponentSetNode = figma.combineAsVariants(nodes, figma.currentPage)
		componentSet.name = "Cropped Text"


		

		

		console.log(documentName(componentSet))

		console.log(componentSet.id, 'from create function')
		componentSet.setPluginData('gridSize', gridSize.toString())
		componentSet.setRelaunchData({'Bind': 'Bind to this component set'})
		componentSet.description = `Text Crop component removes whitespace above and below text.\n${gridSize != 0 ? 'Baseline Grid Size: '+gridSize : ''}`

		figma.clientStorage.setAsync('CropID',componentSet.id)
		figma.clientStorage.setAsync('CropKey', componentSet.key)
		figma.clientStorage.setAsync('CropDoc', documentName(componentSet))
		//figma.notify(`Bound to component: ${componentSet.name} [${componentSet.key}]`)
	})


	// This shows how the main code can send messages to the UI code.
	//dispatch('nodeCreated', node.id);

}






async function cropTextNode(node: TextNode, gridSize: Number){
	figma.notify('Cropping text nodes is currently unavailable. Please create components to crop')
}

function sendBindingToUI(){
	const bindings = [figma.clientStorage.getAsync('CropName'),figma.clientStorage.getAsync('CropDoc'), figma.clientStorage.getAsync('CropID'), figma.clientStorage.getAsync('CropKey')]
	Promise.all(bindings).then(
		resolved => {dispatch('bindingData', resolved), console.log('bound to:', resolved)},
		rejected => {dispatch('bindingNotFound', rejected), console.log('No bindings found')}
	)
}

handleEvent('clearBindings', () => {
	figma.clientStorage.setAsync('CropDoc', undefined)
	figma.clientStorage.setAsync('CropID', undefined)
	figma.clientStorage.setAsync('CropName', undefined)
	figma.clientStorage.setAsync('CropKey', undefined)


	sendBindingToUI();

})