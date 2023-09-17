import shipImage from './../../assets/ship.jpg';
import { Box } from '@chakra-ui/react';
const BackgroundImage = () => {
	return (
		<Box
			flex={0.5}
			bgImage={shipImage}
			bgSize={'cover'}
			bgPosition={'center'}></Box>
	);
};

export default BackgroundImage;
