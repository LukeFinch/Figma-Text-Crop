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
export default async function loadUniqueFonts(textNodes: Array<TextNode>) {
	const fonts = getAllFonts(textNodes)
	return loadFonts(fonts)
}