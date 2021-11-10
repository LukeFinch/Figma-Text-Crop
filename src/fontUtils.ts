export function getAllFonts(textNodes: Array<TextNode>) {
	const fonts: Array<FontName> = []
	const pushUnique = (font: FontName) => {
		if (!fonts.some((item) => item.family === font.family && item.style === font.style)) {
			fonts.push(font)
		}
	}

	for (const node of textNodes) {
		if (node.fontName === figma.mixed) {
			const len = node.characters.length
			for (let i = 0; i < len; i++) {
				const font = node.getRangeFontName(i, i + 1) as FontName
				pushUnique(font)
			}
		} else {
			pushUnique(node.fontName as FontName)
		}
	}
	
	return fonts
}

export async function loadFonts(fonts: Array<FontName>) {
	const promises = fonts.map((font) => figma.loadFontAsync(font))
	await Promise.all(promises)
	return fonts
}
export async function loadUniqueFonts(textNodes: Array<TextNode>) {
	const fonts = getAllFonts(textNodes)
	return loadFonts(fonts)
}


export async function getLineHeight(node: TextNode) {
	let lineHeight = node.getRangeLineHeight(0, 1);
	let L;
	if (typeof lineHeight == "object") {
	  if (lineHeight.unit == "PIXELS") {
		L = lineHeight.value;
	  }
	  if (lineHeight.unit == "PERCENT") {
		L = lineHeight.value * (node.getRangeFontSize(0, 1) as number);
	  }
	  if (lineHeight.unit == "AUTO") {
		let c = node.clone();
		await loadUniqueFonts([c]);
		//await figma.loadFontAsync(node.getRangeFontName(0,1) as FontName)
		c.characters = "T";
		c.textAutoResize = "WIDTH_AND_HEIGHT";
		L = c.height;
		c.remove();
	  }
	}
	return L;
  }