// modified version of color-sorter https://www.npmjs.com/package/color-sorter

import { colord, extend } from 'colord'
import namesPlugin from 'colord/plugins/names'

extend([namesPlugin])

function convert (color) {
    let result = colord(color).toHsl()

	return {
		hue: result.h,
		saturation: result.s,
		lightness: result.l,
		alpha: result.a,
		authored: color
	}
}

export default function (a, b) {
	let colorA = convert(a["prominent_color"])
	let colorB = convert(b["prominent_color"])

	// Move grey-ish values to the back
	if (
		(colorA.saturation === 0 || colorB.saturation === 0) &&
		colorA.saturation !== colorB.saturation
	) {
		return colorB.saturation - colorA.saturation
	}

	// Sort by hue (lowest first)
	if (colorA.hue !== colorB.hue) {
		return colorA.hue - colorB.hue
	}

	// Sort by saturation (highest first)
	if (colorA.saturation !== colorB.saturation) {
		return colorA.saturation - colorB.saturation
	}

	// Comparing gray values, light before dark
	if (colorA.saturation === 0 && colorB.saturation === 0) {
		if (colorA.lightness !== colorB.lightness) {
			return colorB.lightness - colorA.lightness
		}
	}

	// Sort by transparency, least transparent first
	if (colorA.alpha === colorB.alpha) {
		return colorA.authored.toLowerCase().localeCompare(colorB.authored.toLowerCase())
	}

	return colorB.alpha - colorA.alpha
}