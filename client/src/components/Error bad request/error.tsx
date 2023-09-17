import { Center, Box, Image } from '@chakra-ui/react';
import errorImage from './../../assets/Error.jpg';

const Error = () => {
	return (
		<Center>
			<Image
				boxShadow={'0px 1px 2px 2px darkgrey'}
				m={'0 auto'}
				src={errorImage}
				boxSize={'20rem'}
			/>
		</Center>
	);
};

export default Error;
