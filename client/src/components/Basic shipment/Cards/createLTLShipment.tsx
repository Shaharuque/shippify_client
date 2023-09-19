import { Box, Center, Text } from '@chakra-ui/react';
import { useLottie } from 'lottie-react';
import truckLottie from './../../../assets/Truck.json';

const CreateLTLShipment = () => {
	const options = {
		animationData: truckLottie,
		loop: true,
	};
	const { View } = useLottie(options);
	return (
		<Box
			bg={'#f1f1f1 '}
			_hover={{ backgroundColor: '#e8edeb ', boxShadow: '0 4px 4px rgba(0, 0, 0, 0.1)' }}
			p={'1rem'}
			w={'20rem'}
			fontSize={'1.15rem'}
			fontWeight={'600'}
			borderRadius={'1rem'}
			textAlign={'center'}>
			<>{View}</>
			<Text>Create LTL Shipment</Text>
		</Box>
	);
};

export default CreateLTLShipment;
