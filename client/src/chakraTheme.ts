import { extendTheme } from '@chakra-ui/react';

const colors = {
	primary: '#FFFFFF', //white
	secondary: '#314866', //san juan
	cta: '#437F8C', //bismark
	apple: '#E3F4ED', //apple green
	lightTeal: '#437F8C', //light teal
};

export const chakraTheme = extendTheme({
	colors,
});
