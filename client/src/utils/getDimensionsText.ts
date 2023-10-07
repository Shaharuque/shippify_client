import { dummyPredefinedBoxes } from '../data/dummyPredefinedBoxData';

function findMatchingBox(packageCode: string) {
	return dummyPredefinedBoxes.find((box) => box.code === packageCode);
}

export default function getDimensionsText(item: any) {
	if (item.package_code) {
		const matchingBox = findMatchingBox(item.package_code);
		if (matchingBox) {
			const { length, width, height, unit } = matchingBox.dimensions;
			return `Dimensions: ${length}x${width}x${height} ${unit}`;
		}
	}

	const { length, width, height, unit } = item.dimensions;
	return `Dimensions: ${length}x${width}x${height} ${unit}`;
}
