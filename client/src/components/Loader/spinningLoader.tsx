import { Box, Flex } from '@chakra-ui/react';
import './spinningLoader.styles.css';

const SpinningLoader = () => {
	return (
		<Flex
			height="70vh"
			justifyContent="center"
			alignItems="center">
			<Box className="loader" />
		</Flex>
	);
};

export default SpinningLoader;
