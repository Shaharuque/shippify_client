import { Center, Box, Image } from '@chakra-ui/react';
import errorImage from './../../assets/Error.jpg';
import BackButton from '../Buttons/backButton';
import { useNavigate } from 'react-router-dom';

const Error = () => {
	const navigate = useNavigate();
	return (
		<Center>
			<Box
				// boxShadow={'0px 1px 2px 2px darkgrey'}
				boxSize={'30rem'}
				borderRadius={'1rem'}>
				<Image
					m={'0 auto'}
					src={errorImage}
					borderRadius={'1rem'}
				/>
			</Box>
			<Box mt={'2rem'}>
				<BackButton onClick={() => navigate(-1)}></BackButton>
			</Box>
		</Center>
	);
};

export default Error;
