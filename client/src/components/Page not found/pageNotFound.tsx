import { Box, Image } from '@chakra-ui/react';
import pageNotFound from './../../assets/Page not found.jpg';

const PageNotFound = () => {
	return (
		<Box>
			<Image
				m={'2rem auto'}
				src={pageNotFound}
				boxSize={'50rem'}
			/>
		</Box>
	);
};

export default PageNotFound;
