import { Badge, Box, Center, Flex, Text, Tooltip } from '@chakra-ui/react';
import { useLottie } from 'lottie-react';
import parcelLottie from '../../../assets/parcel (lottie).json';

const CreateBasicShipment = () => {
	const options = {
		animationData: parcelLottie,
		loop: true,
	};

	const { View } = useLottie(options);

	return (
		<Flex
			bg={'#f1f1f1'}
			_hover={{ backgroundColor: '#e8edeb', boxShadow: '0 4px 4px rgba(0, 0, 0, 0.1)' }}
			p={'1rem'}
			borderRadius={'1rem'}
			w={'15rem'}
			gap={'2rem'}
			direction={'column'}
			pos={'relative'}>
			<Tooltip label="Hello">
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
			</Tooltip>

			<Center>
				<Box boxSize={'5rem'}>{View}</Box>
			</Center>
			<Center>
				<Text
					as="b"
					fontSize={'1.15rem'}
					fontWeight={'600'}>
					Create Basic Shipment
				</Text>
			</Center>

			{/* <Text
					letterSpacing={'0.03em'}
					lineHeight={'1.6'}
					fontFamily={'Roboto'}>
					Budget-friendly option for mid-sized shipments, too big for parcel but not full truckload.
				</Text> */}
		</Flex>
	);
};

export default CreateBasicShipment;
