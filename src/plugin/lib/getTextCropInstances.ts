export const hasTextCropData = (node: SceneNode) => {
  return node.getSharedPluginDataKeys('TextCrop').length > 0;
};

export const getTextCropInstances = (
  nodes: readonly BaseNode[],
  deep?: boolean,
) => {
  let instances: InstanceNode[] = [];
  nodes.forEach(node => {
    if ('children' in node) {
      node
        .findAllWithCriteria({types: ['INSTANCE']})
        .filter(node => hasTextCropData(node))
        .forEach(node => instances.push(node));
    }
    if (node.type === 'INSTANCE' && hasTextCropData(node)) {
      instances.push(node);
    }
    if (
      node.parent &&
      node.parent.type == 'INSTANCE' &&
      hasTextCropData(node.parent)
    ) {
      instances.push(node.parent);
    }
    if (
      node.type === 'TEXT' &&
      node.parent &&
      node.parent.parent &&
      node.parent.parent.type == 'INSTANCE' &&
      hasTextCropData(node.parent.parent)
    ) {
      instances.push(node.parent.parent);
    }
  });

  return instances;
};

let selectedInstances: InstanceNode[] = [];

figma.currentPage.selection.forEach(n => {
  if (n.type == 'INSTANCE') {
    selectedInstances.push(n);
  } else {
    if (n.parent?.type == 'INSTANCE') {
      selectedInstances.push(n.parent);
    } else {
      if ((n.parent?.parent as any).type == 'INSTANCE') {
        selectedInstances.push(n.parent?.parent as InstanceNode);
      }
    }
  }
});
