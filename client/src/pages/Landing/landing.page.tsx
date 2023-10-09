import { Box } from '@chakra-ui/react';
import cargoShipImage from '../../assets/CargoShip.jpg';

const LandingPage = () => {
	return (
		<Box
			bgImage={cargoShipImage}
			bgSize={'cover'}
			bgPosition={'center'}
			w={'100vw'}
			h={'100vh'}></Box>
	);
};

export default LandingPage;
