/*
This code is for swapping instances in the future. For now it can be ignored
*/
export function setTarget() {
  console.log('Setting target');
  let newKey: string = '';

  let sel = figma.currentPage.selection;

  if (sel.length) {
    sel.forEach((n: SceneNode) => {
      if (n.getSharedPluginDataKeys('TextCrop') || n.getPluginDataKeys()) {
        if (n.type == 'COMPONENT_SET') {
          newKey = n.key;
        }
        if (n.type == 'COMPONENT') {
          newKey = (n.parent as ComponentSetNode).key;
        }
        if (n.type == 'INSTANCE') {
          newKey = (n.mainComponent?.parent as ComponentSetNode).key;
        }
      }
    });
  } else {
    figma.closePlugin('No Text Crop components found in your selection');
  }

  if (newKey && newKey.length) {
    figma.importComponentSetByKeyAsync(newKey).then(
      () => {
        //fufilled
        figma.clientStorage.setAsync('componentKey', newKey);
        figma.closePlugin('Target Set');
      },
      () => {
        //rejected
        figma.closePlugin(
          'Target text crop component must be part of a published library',
        );
      },
    );
  } else {
    figma.closePlugin(
      'Could not find a component for your target - please try again',
    );
  }
}
