export const loadFonts = async (node: TextNode) => {
  await Promise.all(
    node
      .getRangeAllFontNames(0, node.characters.length)
      .map(figma.loadFontAsync),
  );
};

export function getAllFonts(textNodes: Array<TextNode>) {
  const fonts: Array<FontName> = [];
  const pushUnique = (font: FontName) => {
    if (
      !fonts.some(
        item => item.family === font.family && item.style === font.style,
      )
    ) {
      fonts.push(font);
    }
  };

  for (const node of textNodes) {
    if (node.fontName === figma.mixed) {
      const len = node.characters.length;
      for (let i = 0; i < len; i++) {
        const font = node.getRangeFontName(i, i + 1) as FontName;
        pushUnique(font);
      }
    } else {
      pushUnique(node.fontName as FontName);
    }
  }

  return fonts;
}

export async function getLineHeight(node: TextNode) {
  let lineHeight = node.getRangeLineHeight(0, 1) as LineHeight;

  switch (lineHeight.unit) {
    case 'PIXELS':
      console.log('PX');
      return lineHeight.value;
    case 'PERCENT':
      console.log('%');
      return (lineHeight.value / 100) * (node.getRangeFontSize(0, 1) as number);
    case 'AUTO':
      console.log('AUTO');
      loadFonts(node).then(() => {
        let clone = node.clone();
        clone.characters = 'T';
        clone.textAutoResize = 'WIDTH_AND_HEIGHT';
        let cloneHeight = clone.height;
        clone.remove();
        return cloneHeight;
      });
    default:
      return 1;
  }
}
