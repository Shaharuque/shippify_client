import { Box, Heading, Text } from '@chakra-ui/react';
import cargoShipImage from '../../assets/CargoShip.jpg';

const LandingPage = () => {
	return (
		<Box
			bgImage={cargoShipImage}
			bgSize={'cover'}
			bgPosition={'center'}
			w={'100vw'}
			h={'100vh'}
			display="flex"
			justifyContent="center"
			alignItems="center"
			color="white"
			textAlign="center"
			p={6}>
			<Box>
				<Heading
					as="h1"
					fontSize="4xl"
					mb={4}
					color={'#314866'}>
					Welcome to Our Modern Shipping Platform
				</Heading>
				<Text fontSize="xl">Effortless shipping solutions for your business needs.</Text>
			</Box>
		</Box>
	);
};

export default LandingPage;
