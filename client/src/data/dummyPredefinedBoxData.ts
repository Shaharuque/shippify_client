import smallBox from '../assets/carton-box-removebg-preview.png';
import mediumBox from '../assets/medium-box.png';
import largeBox from '../assets/large-box.png';
import largerBox from '../assets/larger-box.png';

export const dummyPredefinedBoxes = [
	{
		text: 'small box',
		dimensions: {
			length: 10,
			width: 10,
			height: 7,
			unit: 'inch',
		},
		image: smallBox,
		code: 'custom_laptop_box',
	},
	{
		text: 'medium box',
		dimensions: {
			length: 13.25,
			width: 11.5,
			height: 3,
			unit: 'inch',
		},
		image: mediumBox,
		code: 'custom_medium_box',
	},
	{
		text: 'large box',
		dimensions: {
			length: 18,
			width: 13,
			height: 3,
			unit: 'inch',
		},
		image: largeBox,
		code: 'custom_large_box',
	},
	{
		text: 'very large box',
		dimensions: {
			length: 25,
			width: 25,
			height: 10,
			unit: 'inch',
		},
		image: largerBox,
		code: 'custom_very_large_box',
	},
];
