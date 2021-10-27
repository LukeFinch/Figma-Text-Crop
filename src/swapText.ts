// case "SwapText":
//     // //Disabled for now, we'll do it in a later version
//     // //figma.clientStorage.setAsync('componentKey', undefined)
//     // async function doTextSwap() {
//     //   console.log(
//     //     figma.currentPage.findOne(
//     //       (node) =>
//     //         node.type == "INSTANCE" ||
//     //         (node.type == "COMPONENT" &&
//     //           node.getSharedPluginData("TextCrop", "TextCrop") == "true")
//     //     )
//     //   );
//     //   // async function runPrompt(){
//     //   // 	let value = await prompt('Prompt Title','Some Description Text','placeholder',true)
//     //   // 	console.log('the value of prompt is:',value)
//     //   // }
//     //   // runPrompt()

//     //   //We need a component key to import and switch
//     //   var key: string = await figma.clientStorage.getAsync("componentKey");
//     //   console.log(key);
//     //   if (key == undefined) {
//     //     //There is no key - a nice UXey solution would be great here...
//     //     //If they have already updated an instance, we store the key.
//     //     //Maybe they haven't made a text crop component.. we should tell them to do that maybe?
//     //     //figma.notify("You've never made one..") -- they could be in a team where someone else has made one..
//     //     //Lets try and find one in their current page..
//     //     try {
//     //       let node = figma.currentPage.findOne(
//     //         (node) =>
//     //           node.type == "INSTANCE" ||
//     //           (node.type == "COMPONENT" &&
//     //             node.getSharedPluginData("TextCrop", "TextCrop") == "true")
//     //       ) as InstanceNode as InstanceNode | ComponentNode;
//     //       let comp: ComponentNode =
//     //         node.type == "INSTANCE"
//     //           ? (node as InstanceNode).mainComponent
//     //           : (node as ComponentNode);
//     //       let key: string = comp.key;
//     //       let status: PublishStatus = await comp.getPublishStatusAsync();
//     //       switch (status) {
//     //         case "UNPUBLISHED":
//     //           figma.notify(
//     //             "Your Text Crop Component is unpublished, it is recommended to publish the library"
//     //           );
//     //           break;
//     //         case "CHANGED":
//     //           figma.notify(
//     //             "Text Crop component has unpublished changes, it is recommended to publish these changes"
//     //           );
//     //           break;
//     //         default:
//     //           break;
//     //       }
//     //       //replaceTextNodes(key)
//     //       if (comp.remote) {
//     //         replaceTextNodes(await figma.importComponentByKeyAsync(key));
//     //       } else {
//     //         replaceTextNodes(comp);
//     //       }
//     //     } catch (e) {
//     //       console.log(e);
//     //       figma.notify(
//     //         `Couldn't find a TextCrop component to swap with, insert one on the page and try again`,
//     //         { timeout: 5000 }
//     //       );
//     //       figma.closePlugin();
//     //     }
//     //   } else {
//     //     replaceTextNodes(await figma.importComponentByKeyAsync(key));
//     //   }
//     // }
//     // doTextSwap();
//     // break;