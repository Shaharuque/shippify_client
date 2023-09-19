import { Text, Flex, Badge, Center, Box } from '@chakra-ui/react';
import { useLottie } from 'lottie-react';
import truckLottie from '../../../assets/Truck.json';

const CreateLTLShipment = () => {
	const options = {
		animationData: truckLottie,
		loop: true,
	};
	const { View } = useLottie(options);

	return (
		<Flex
			bg={'#f1f1f1 '}
			_hover={{ backgroundColor: '#e8edeb ', boxShadow: '0 4px 4px rgba(0, 0, 0, 0.1)' }}
			p={'1rem'}
			borderRadius={'1rem'}
			w={'15rem'}
			gap={'2rem'}
			direction={'column'}
			pos={'relative'}>
			<Badge
				w={'3rem'}
				p={'.25rem'}
				borderRadius={'.5rem'}
				variant="subtle"
				colorScheme="green"
				textAlign={'center'}
				pos={'absolute'}
				right="2"
				top="2">
				info
			</Badge>

			<Center>
				<Box boxSize={'5rem'}>{View}</Box>
			</Center>

			<Center>
				<Text
					as="b"
					fontSize={'1.15rem'}
					fontWeight={'600'}>
					Create LTL Shipment
				</Text>
			</Center>

			{/* <Text
				letterSpacing={'0.03rem'}
				lineHeight={'1.6'}
				fontFamily={'Roboto'}>
				LTL, or less-than-truckload, is a budget-friendly option for mid-sized shipments, not large enough for a full truck but too big for parcel shipping.
			</Text> */}
		</Flex>
	);
};

export default CreateLTLShipment;
