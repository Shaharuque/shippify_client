import { Box, Flex } from '@chakra-ui/react';
import './spinningLoader.styles.css';

const SpinningLoader = ({ height }: { height?: string }) => {
	return (
		<Flex
			height={height || '70vh'}
			justifyContent="center"
			alignItems="center">
			<Box className="loader" />
		</Flex>
	);
};

export default SpinningLoader;
