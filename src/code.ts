import { dispatch, handleEvent } from './codeMessageHandler';
import makeCropComponent from './makeCropComponent'
import loadUniqueFonts from "./fontUtils"





//Make it always show the relaunch button
figma.root.setRelaunchData({'Update':'Launch the text crop plugin to resize text crop components'})



type ContainerNode = BaseNode & ChildrenMixin;
const isContainerNode = (n :BaseNode) :n is ContainerNode => !!(n as any).children
import {prompt} from './prompt'

var documentName = (node: any) => node.type == "DOCUMENT" ? node.name : documentName(node.parent)
console.log(figma.command)
switch (figma.command) {
 case 'Create':
	 makeCropComponent()
	 figma.closePlugin()
//  figma.showUI(__uiFiles__.create, {
// 	 width: 240,
// 	 height: 100
//  })
 break
 case 'Update':
	 async function handleUpdate() {
		 await updateInstances(true)
	 }
	 handleUpdate();
break;
case 'UpdateMenu':
async function loadUI(){
	figma.showUI(__uiFiles__.update, {
		width: 400,
		height: 300,
		visible: false
	})
	let grid = await figma.clientStorage.getAsync('gridSize')
	let key = await figma.clientStorage.getAsync('componentKey')
	dispatch('gridSize',grid)
	if(key){dispatch('componentKey',key)}
	
	let sel = figma.currentPage.selection
	let instances = sel.filter(n => n.getSharedPluginData('TextCrop','multiline') && n.type == "INSTANCE")
	
	console.log('showing the ui now...',grid,key)

	figma.ui.show()
}
loadUI()
 break;
 case 'UpdateSelected':
	updateInstances(true);
 break;
 case 'SwapText':
	 //Disabled for now, we'll do it in a later version
	 //figma.clientStorage.setAsync('componentKey', undefined)
	 async function doTextSwap(){
		console.log(figma.currentPage.findOne(node => node.type == "INSTANCE" || node.type == "COMPONENT" && node.getSharedPluginData('TextCrop','TextCrop') == 'true'))
	// async function runPrompt(){
	// 	let value = await prompt('Prompt Title','Some Description Text','placeholder',true)
	// 	console.log('the value of prompt is:',value)
	// }
	// runPrompt()
 
	//We need a component key to import and switch
	var key:string = await figma.clientStorage.getAsync('componentKey')
	console.log(key)
	if(key == undefined){
		//There is no key - a nice UXey solution would be great here...
		//If they have already updated an instance, we store the key.
		//Maybe they haven't made a text crop component.. we should tell them to do that maybe?
		//figma.notify("You've never made one..") -- they could be in a team where someone else has made one..
		//Lets try and find one in their current page..
		try{
			let node = (figma.currentPage.findOne(node => node.type == "INSTANCE" || node.type == "COMPONENT" && node.getSharedPluginData('TextCrop','TextCrop') == 'true') as InstanceNode) as InstanceNode | ComponentNode
			let comp: ComponentNode = node.type == "INSTANCE" ? (node as InstanceNode).mainComponent : (node as ComponentNode);
			let key: string = comp.key
			let status: PublishStatus = await comp.getPublishStatusAsync()
			switch (status){
				case "UNPUBLISHED":
					figma.notify('Your Text Crop Component is unpublished, it is recommended to publish the library')
					break;
				case "CHANGED":
					figma.notify('Text Crop component has unpublished changes, it is recommended to publish these changes')
					break;
			default: 
			break;
			}
			//replaceTextNodes(key)
			if(comp.remote){
				replaceTextNodes(await figma.importComponentByKeyAsync(key))
			} else {
				replaceTextNodes(comp)
			}
			} catch(e){
			console.log(e)
			figma.notify(`Couldn't find a TextCrop component to swap with, insert one on the page and try again`,{timeout: 5000})
			figma.closePlugin()
		}
	} else {
		replaceTextNodes(await figma.importComponentByKeyAsync(key))
	}
	} doTextSwap();
 break;
 case 'ChangeGrid':
	promptGrid() 
 break;
 default:
	 figma.showUI(__uiFiles__.update)
}

handleEvent('ready', () => {
	let sel = figma.currentPage.selection
	let instances = sel.filter(n => n.getSharedPluginData('TextCrop','multiline') && n.type == "INSTANCE")
	dispatch('selection', instances.length)
})

let waitingClock = false //Boolean to handle the clock, if the clock is faster than the script..

async function promptGrid(){
	let value = await prompt('Grid Size','Set your grid size, use 0 for no rounding',await figma.clientStorage.getAsync('gridSize') || 0,false)
	figma.clientStorage.setAsync('gridSize',value)
	figma.closePlugin()
}


handleEvent("resizeUI", (size) => {
	figma.ui.resize(size[0],size[1])
})

handleEvent('gridSize', size => {
	figma.clientStorage.setAsync('gridSize', size.toString())
})

handleEvent('createNode', _ => {
makeCropComponent()
});





handleEvent('updateInstances', async (data) => {
	if(data == "clock" && waitingClock == false){
		updateInstances(false)	
	} else {
		updateInstances(false)
	}
})

handleEvent('updateLegacies', key => {
	updateLegacy(key)
})

handleEvent('swapText', key => {
	replaceTextNodes(key)
})


handleEvent('cropProfile', data =>{
	console.log('crop profile',data)
	let sel = figma.currentPage.selection
	let instances = sel.filter(n => n.getSharedPluginData('TextCrop','multiline') && n.type == "INSTANCE")
	instances.forEach(instance => {
		instance.setSharedPluginData('TextCrop','top',data.top)
		instance.setSharedPluginData('TextCrop','bottom',data.bottom)
	})
})

async function updateInstances(shouldClose){
	console.log("Updating instances....")
	let keys = new Set()
	
	var grid = parseFloat(await figma.clientStorage.getAsync('gridSize'))
	console.log('grid',grid)
	var instances: InstanceNode[];
	
	waitingClock = true;

	if(figma.currentPage.selectedTextRange && figma.currentPage.selectedTextRange.node.parent.getSharedPluginData('TextCrop','TextCrop') == 'true'){
		instances = [figma.currentPage.selectedTextRange.node.parent as InstanceNode]
	} else {
		if(figma.currentPage.selection.length == 0)
			instances = figma.currentPage.findAll(n => n.type == "INSTANCE" && n.getSharedPluginData('TextCrop','TextCrop') == 'true') as InstanceNode[] //New style
		}
		if(figma.currentPage.selection.length > 0){


			let inst: InstanceNode[] = []

			figma.currentPage.selection.forEach(n => {
				if(n.type == "INSTANCE"){
					inst.push(n)
				} else {
					if(n.parent.type == "INSTANCE"){
						inst.push(n.parent)
					} else {
						if((n.parent.parent as any).type == "INSTANCE"){
							inst.push(n.parent.parent as InstanceNode)
						}
					}
				}
			})
			instances = inst

		}

		console.log(instances)
		
	const croppableInstances = instances.map(instance => {
		console.log(instance.getSharedPluginData('TextCrop','top'))
		keys.add(instance.mainComponent.key)	
		return crop(instance, grid)
	})


	waitingClock = false
	//figma.notify(`Cropped ${instances.length} instances, took ${Date.now() - t0} ms`)
	if(keys.size > 1){
		console.log("There's more than one component, its probably a bad idea right??")
	}
	figma.clientStorage.setAsync('componentKey', keys[0])

	Promise.all(croppableInstances).then(_ => {

		if(shouldClose){
			figma.closePlugin()
		}
	})

}



//New Crop Methods
async function crop(node: InstanceNode, gridSize){
	
	figma.root.setSharedPluginData('TextCrop','gridSize',gridSize.toString())

	let textNode = (node.children[0] as ContainerNode).children[0] as TextNode

	let fontName = textNode.getRangeFontName(0,1) as FontName
	//await figma.loadFontAsync(fontName)
	await loadUniqueFonts([textNode])
	
	let cropData = figma.root.getSharedPluginData('TextCrop',`${JSON.stringify(fontName)}`)

	if(cropData == ''){
	  console.log('No data exists')
	  //No data at all	
	  let dataStore = {}	  
	  figma.root.setSharedPluginData('TextCrop',`${JSON.stringify(fontName)}`, JSON.stringify(dataStore))
	  cropData = "{}"
	}
	
	// textNode.textAutoResize = "HEIGHT"
	// let textHeight = textNode.height
	// textNode.textAutoResize = "NONE"
	
	let profileTop = ''
	let profileBottom = ''
	switch(node.getSharedPluginData('TextCrop','top')){
		case 'ascender':
			profileTop = 'f'
			break;
		case 'capheight':
			profileTop = 'T'
			break;
		case 'xheight':
			profileTop = 'x'
			break;
	}
	if(node.getSharedPluginData('TextCrop','bottom') == 'descender'){
		profileBottom = 'y'
	}

	if(cropData !== ''){
		console.log('Some data exists')
	  //Object Exists
		let data = JSON.parse(cropData) as cropData
		let lH = await getLineHeight(textNode)		
		//let nodeCropData = data[textNode.fontSize][lH][profileTop+profileBottom]
		
		var nodeCropData = function(data){
			let nodeData = undefined
			try{
				nodeData = data[textNode.fontSize][lH][profileTop+profileBottom]
			}catch(e){
				nodeData = null
			}
			return nodeData
		}
		if(nodeCropData(data) !== null && nodeCropData(data) !== undefined){
			console.log('no cropdata ',nodeCropData(data))
			cropNodeWithData(
				node,
				nodeCropData(data),
				gridSize
			)
		if(nodeCropData(data) == undefined){
			console.log('Yo lets do some other shite	')
		}
		}else {
			console.error('tried and failed')		 	 
		  	//We need to make new data for this font size
			let clone: TextNode = textNode.clone() //Copy the text outside the instance so we can manipulate it
	
			let lH = await getLineHeight(clone)
			await loadUniqueFonts([clone])
			//clone.lineHeight = {value: C, unit: "PIXELS"} // Line Height = Font Size, for easy maths
			clone.textAutoResize = "WIDTH_AND_HEIGHT" // Make it take up the true line height

			let profileTop = 'T'
			let profileBottom = ''
			switch(node.getSharedPluginData('TextCrop','top')){
				case 'ascender':
					profileTop = 'f'
					break;
				case 'capheight':
					profileTop = 'T'
					break;
				case 'xheight':
					profileTop = 'x'
					break;
			}
			if(node.getSharedPluginData('TextCrop','bottom') == 'descender'){
				profileBottom = 'y'
			}


			clone.characters = profileTop+profileBottom //We use the letter T to get an accurate baseline and line height
			clone.x = 0 //Not necessary as such, but cleaner
			clone.y = 0 //Sets the Y value to 0, so we have a reference point when flattening
			let H = clone.height
			let C = clone.fontSize
			let T = figma.flatten([clone]) //Outline the text to make readings from it
	
			//let F = T.height / C //The font size as a %
			//let A  = T.y /C //The top gap - because we set Y to 0 at clone.y this y offset is the capHeight
			let A = T.y
			let B = H - T.y - T.height
			let pT = H/2 - A
			let pB = H/2 - B

			T.remove() // Delete the clones, clean up our mess as soon as we are done with it
	  
			//Save all of the above to the document, so we don't calculate it twice!  
			//We store all the previous crop data we do, to save cropping things with the same size.
			let dataStore = JSON.parse(figma.root.getSharedPluginData('TextCrop',`${JSON.stringify(fontName)}`))
			let data: cropData = {'A':A, 'B':B, 'pT':pT,'pB':pB}

			if(!dataStore[C]){dataStore[C] = {}}
			if(!dataStore[C][lH]){dataStore[C][lH] = {}}
			dataStore[C][lH][profileTop+profileBottom] = data
			
			figma.root.setSharedPluginData('TextCrop',`${JSON.stringify(fontName)}`, JSON.stringify(dataStore))
	
			cropNodeWithData(node,data, gridSize)
		  }
	
	
	
	} else {
		//oops
	}
	
				
	}
	
	
	interface cropData {
	   'A':number, 'B':number, 'pT':number,'pB':number
	}
	
	async function cropNodeWithData(node: InstanceNode, data: cropData, gridSize: number){
	
	console.log("cropping",node)
	console.log(data)

	let A = data.A
	let B = data.B
	let pT = data.pT
	let pB = data.pB
	let n: number //number of lines
	let textNode = (node.children[0] as ContainerNode).children[0] as TextNode
	console.log('added', A+B+pT+pB)
	let sizing = textNode.textAutoResize
	console.log(sizing)
	console.log(node.getSharedPluginData('TextCrop','multiline'))
	
	let lineHeight = await getLineHeight(textNode)
	if(sizing == "HEIGHT"){
		//Only need if multiline ? 
		//This method gets the actual height of the text
		textNode.textAutoResize = "HEIGHT"
		let textHeight = textNode.height //Actual Height of the text
		textNode.textAutoResize = sizing//"NONE"
		let nodeSize = textNode.height //The height of the container when its fixed.		
		n = Math.ceil(textHeight / lineHeight) // Number of lines. Should always be a whole number...
	} else {
		n = 1
	}

	//this works for single lines!
	//node.paddingBottom = pB
	//node.paddingTop = pT
	
	  let fontSize = textNode.getRangeFontSize(0,1) as number
	
	
	
	//  //the extra height we add for multiple lines
	  let halfLeading = (((lineHeight / fontSize) - 1 )/2)
	
	  let paddingTop = (pT) + ((n-1)*(lineHeight/2)) // - (nodeSize/2)
	// console.log(paddingTop)
	
	
	 let paddingBottom = (Math.ceil(n/2)*pB) + (Math.floor(n/2)*pT) + (Math.floor(n/2)*A) + ((Math.ceil(n/2) - 1)*B) + (((n-1) * halfLeading))
	

	console.log(paddingTop,paddingBottom)

	
	 //TODO: Check the alignment of text in the text box, let users center, top or bottom align
	 node.paddingTop = paddingTop 
	 node.paddingBottom = gridSize == 0 ? paddingBottom : gridRound((paddingBottom + paddingTop), gridSize) - paddingTop
	
	 

	
	
	}
	
	async function getLineHeight(node: TextNode){
		let lineHeight = node.getRangeLineHeight(0,1)
		let L
		if(typeof lineHeight == "object"){
			if(lineHeight.unit == "PIXELS")
		{
			L = lineHeight.value
		} if(lineHeight.unit == "PERCENT") {
			L = lineHeight.value * (node.getRangeFontSize(0,1) as number)
		}
			if(lineHeight.unit == "AUTO"){
				let c = node.clone()
				await loadUniqueFonts([c])
				//await figma.loadFontAsync(node.getRangeFontName(0,1) as FontName)
				c.characters = 'T'
				c.textAutoResize = "WIDTH_AND_HEIGHT"
				L = c.height
				c.remove()
			}		
		}
		return L
	}

async function updateLegacy(key){
	//Old versions of text crop, update to the new one
	var grid = parseFloat(await figma.clientStorage.getAsync('gridSize'))
	let component = figma.importComponentByKeyAsync(key)
	let legacies = figma.currentPage.findAll(n => n.type == "INSTANCE" && n.getSharedPluginData('TextCrop','TextCropComponent') == 'true') as InstanceNode[]
	legacies.forEach(async (node:InstanceNode) => {	
		let instance = (await component).createInstance()	
		swapNodes(node,instance)
		
	})
}

function replaceTextNodes(component: ComponentNode){

	//This is clunky ish kinda - secret menu replacer eeek

	//let textNodes = figma.currentPage.findAll(node => node.type == "FRAME" && node.children.length == 1 && node.children[0].type == "TEXT") as FrameNode[]

	let textNodes = figma.currentPage.selection.filter(node => node.type == "TEXT") as TextNode[]

	textNodes.forEach(async (textNode) => {
		swapNodes(textNode,(component).createInstance())
	})
	figma.notify(`Swapped ${textNodes.length} text layers`)
}


async function swapNodes(node: TextNode | InstanceNode | FrameNode, instance: InstanceNode){

	let oldText: TextNode;
	node.type == "TEXT" ? oldText = node : oldText = node.findChild(n => n.type == "TEXT") as TextNode;	


		node.parent.insertChild(node.parent.children.indexOf(node) == -1 ? 0 :node.parent.children.indexOf(node) , instance)

		instance.relativeTransform = node.relativeTransform;
		instance.resize(node.width,node.height);
		let newText = instance.children[0] as TextNode
		await loadUniqueFonts([newText])
		//await figma.loadFontAsync(newText.fontName as FontName)
		newText.characters = oldText.characters

		let styleId = oldText.textStyleId
		if (styleId == ''){
			// let fontName = oldText.getRangeFontName(0,oldText.characters.length) as FontName
			// await figma.loadFontAsync(fontName)
			
			loadUniqueFonts([oldText]).then( res => {
				if(oldText.getRangeTextStyleId(0,oldText.characters.length) != ''){
					newText.setRangeTextStyleId(0,oldText.characters.length,(oldText.getRangeTextStyleId(0,oldText.characters.length) as string))
				} else {
					newText.setRangeFontName(0,oldText.characters.length, oldText.getRangeFontName(0,oldText.characters.length) as FontName),
					newText.setRangeFontSize(0,oldText.characters.length,oldText.getRangeFontSize(0,oldText.characters.length) as number)
					newText.setRangeLineHeight(0,oldText.characters.length,oldText.getRangeLineHeight(0,oldText.characters.length) as unknown as any)
					newText.setRangeTextCase(0,oldText.characters.length,oldText.getRangeTextCase(0,oldText.characters.length) as unknown as any)
					newText.setRangeTextDecoration(0,oldText.characters.length,oldText.getRangeTextDecoration(0,oldText.characters.length) as unknown as any)
					newText.setRangeLetterSpacing(0,oldText.characters.length,oldText.getRangeLetterSpacing(0,oldText.characters.length) as unknown as any)
				 }
				 if((oldText.getRangeFillStyleId(0,oldText.characters.length) as string) != ''){
					 newText.setRangeFillStyleId(0,oldText.characters.length,oldText.getRangeFillStyleId(0,oldText.characters.length) as string)
				 } else {
					 newText.setRangeFills(0,oldText.characters.length,oldText.getRangeFills(0,oldText.characters.length) as unknown as any)
				 }
			})
		}
		if(typeof styleId == "symbol"){
			for(var i = 0; i < oldText.characters.length; i++){
			// let fontName = oldText.getRangeFontName(i,i+1) as FontName
			// await figma.loadFontAsync(fontName)
			loadUniqueFonts([oldText]).then( res => {
				if(oldText.getRangeTextStyleId(i,i+1) != ''){
					newText.setRangeTextStyleId(i,i+1,(oldText.getRangeTextStyleId(i,i+1) as string))
				} else {
					newText.setRangeFontName(i,i+1, oldText.getRangeFontName(i,i+1) as FontName),
					newText.setRangeFontSize(i,i+1,oldText.getRangeFontSize(i,i+1) as number)
					newText.setRangeLineHeight(i,i+1,oldText.getRangeLineHeight(i,i+1) as unknown as any)
					newText.setRangeTextCase(i,i+1,oldText.getRangeTextCase(i,i+1) as unknown as any)
					newText.setRangeTextDecoration(i,i+1,oldText.getRangeTextDecoration(i,i+1) as unknown as any)
					newText.setRangeLetterSpacing(i,i+1,oldText.getRangeLetterSpacing(i,i+1) as unknown as any)
				 }
				 if((oldText.getRangeFillStyleId(i,i+1) as string) != ''){
					 newText.setRangeFillStyleId(i,i+1,oldText.getRangeFillStyleId(i,i+1) as string)
				 } else {
					 newText.setRangeFills(i,i+1,oldText.getRangeFills(i,i+1) as unknown as any)
				 }
			})
			
		   }
		} else {
			newText.textStyleId = oldText.textStyleId
		}
		instance.layoutAlign = "STRETCH"

		node.remove()
		var grid = parseFloat(await figma.clientStorage.getAsync('gridSize'))
		crop(instance,grid)
}


function gridRound(number,gridSize){
	return (Math.round(number / gridSize)) * gridSize
}

figma.on('selectionchange', () => {
	let sel = figma.currentPage.selection
	let instances = sel.filter(n => n.getSharedPluginData('TextCrop','multiline') && n.type == "INSTANCE")
	dispatch('selection', instances.length)

})