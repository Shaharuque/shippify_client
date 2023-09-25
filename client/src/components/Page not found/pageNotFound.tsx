import { Box, Image } from '@chakra-ui/react';
import pageNotFound from './../../assets/Page not found.jpg';

const PageNotFound = () => {
	return (
		<Box>
			<Image
				m={'0 auto'}
				src={pageNotFound}
				boxSize={'35rem'}
			/>
		</Box>
	);
};

export default PageNotFound;
