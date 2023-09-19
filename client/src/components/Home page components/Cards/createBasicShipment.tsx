import { Badge, Flex, Stack, Text } from '@chakra-ui/react';
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
			w={'30rem'}
			p={'1rem'}
			borderRadius={'1rem'}
			gap={'2rem'}>
			<>{View}</>

			<Stack direction={'column'}>
				<Badge
					w={'3rem'}
					p={'.25rem'}
					mt={'1rem'}
					borderRadius={'.5rem'}
					variant="subtle"
					colorScheme="green">
					info
				</Badge>

				<Text
					as="b"
					fontSize={'1.15rem'}
					fontWeight={'600'}>
					Create Basic Shipment
				</Text>

				<Text
					letterSpacing={'0.03em'}
					lineHeight={'1.6'}
					fontFamily={'Roboto'}>
					Budget-friendly option for mid-sized shipments, too big for parcel but not full truckload.
				</Text>
			</Stack>
		</Flex>
	);
};

export default CreateBasicShipment;
