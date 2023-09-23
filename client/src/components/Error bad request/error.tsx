import { Center, Box, Image } from '@chakra-ui/react';
import errorImage from './../../assets/Error.jpg';

const Error = () => {
	return (
		<Center>
			<Box
				boxShadow={'0px 1px 2px 2px darkgrey'}
				boxSize={'20rem'}
				borderRadius={'1rem'}>
				<Image
					m={'0 auto'}
					src={errorImage}
					borderRadius={'1rem'}
				/>
			</Box>
		</Center>
	);
};

export default Error;
