import component from '*.vue';
import { rejects } from 'assert';
import { freemem } from 'os';
import { getTransitionRawChildren } from 'vue';
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
		if(inst.mainComponent.parent.type == "COMPONENT_SET" && inst.mainComponent.parent.getPluginData('gridSize') !== ''){	
			componentSet = inst.mainComponent.parent as ComponentSetNode			
		}
	} if(sel[0].type == "COMPONENT_SET" && sel[0].getPluginData('gridSize') !== ''){
		componentSet = sel[0] as ComponentSetNode
	}
	if(sel[0].type == "COMPONENT" && sel[0].parent.type == "COMPONENT_SET" && sel[0].parent.getPluginData('gridSize') !== ''){
		componentSet = sel[0].parent as ComponentSetNode
	}
	
	if(componentSet !== null){
		console.log('Binding to selection')
		console.log(componentSet.id,componentSet.name,componentSet.key)
		console.log(componentSet)
		figma.clientStorage.setAsync('CropID',componentSet.id)
		figma.clientStorage.setAsync('CropName', componentSet.name)
		figma.clientStorage.setAsync('CropKey', componentSet.key)
		//figma.clientStorage.setAsync('CropDoc', documentName(componentSet))

		//figma.notify(`Bound to component: ${componentSet.name} [${componentSet.id} in ${documentName(componentSet)}]`)
		sendBindingToUI()
	}
}

handleEvent('bindComponentSet',() => {	
	let sel = figma.currentPage.selection
	bindToSelection(sel)
})

figma.on("selectionchange", () => {
	let cropID = Promise.all([figma.clientStorage.getAsync('CropID')]).then(
		resolved => {return resolved},
		rejected => {return undefined}
	)

	if(cropID){
		if(figma.currentPage.selection.length == 1){
			checkBindable(figma.currentPage.selection[0])
		} else {
			dispatch('bindable',false)
		}
	}

})


function checkBindable(sel: BaseNode){
	
	if(sel.type !== "COMPONENT_SET" && sel.type !== "INSTANCE" && sel.type !== "COMPONENT"){
		dispatch('bindable',false)
	} else {
		if(sel.type == "COMPONENT_SET" && sel.getPluginData('gridSize') !== ''){
			dispatch('bindable', true)
		}
		if(sel.type == "INSTANCE" && sel.mainComponent.parent.type == "COMPONENT_SET"){
			if(sel.mainComponent.parent.getPluginData('gridSize') !== ''){
	
				dispatch('bindable', true)
			}
		}
		if(sel.type == "COMPONENT" && sel.parent.type == 'COMPONENT_SET'){
			if(sel.parent.getPluginData('gridSize') !== ''){
				dispatch('bindable', true)
			}
		}
	}

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
			frame.setPluginData('style', style.id)

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

		componentSet.findAll(n => n.getPluginData('removeme') == 'remove').forEach(removable => removable.remove())
		//figma.clientStorage.setAsync('CropDoc', documentName(componentSet))
		//figma.notify(`Bound to component: ${componentSet.name} [${componentSet.key}]`)
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
							
					component.fills = []
					
					
					textNode.constraints = {
						horizontal: "STRETCH",
						vertical: "MIN"
					}
							
					frame.fills = []
					frame.clipsContent = false		
										
					textNode.textStyleId = style.id //Probably don't need to do this here...
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



async function cropTextNode(node: TextNode, gridSize: Number){
	figma.notify('Cropping text nodes is currently unavailable. Please create components to crop')
}

function sendBindingToUI(){
	const bindings = [figma.clientStorage.getAsync('CropName'), figma.clientStorage.getAsync('CropID'), figma.clientStorage.getAsync('CropKey')]
	Promise.all(bindings).then(
		resolved => {dispatch('bindingData', resolved), console.log('bound to:', resolved)},
		rejected => {dispatch('bindingNotFound', rejected), console.log('No bindings found')}
	)
}

handleEvent('clearBindings', () => {
	//figma.clientStorage.setAsync('CropDoc', undefined)
	figma.clientStorage.setAsync('CropID', undefined)
	figma.clientStorage.setAsync('CropName', undefined)
	figma.clientStorage.setAsync('CropKey', undefined)


	sendBindingToUI();

})