import { Box, Flex } from '@chakra-ui/react';
import ShipmentMenu from '../../Cards/shipmentMenu';
import truckLottie from '../../../assets/Truck.json';
import parcelLottie from '../../../assets/Parcel.json';
import trackingLottie from '../../../assets/Tracking-2.json';
import { useLottie } from 'lottie-react';
import { useNavigate } from 'react-router-dom';

const ShipmentMenuList = () => {
	const navigate = useNavigate();
	const parcelLottieOptions = {
		animationData: parcelLottie,
		loop: true,
	};

	const truckLottieOptions = {
		animationData: truckLottie,
		loop: true,
	};

	const trackingLottieOptions = {
		animationData: trackingLottie,
		loop: true,
	};

	const { View: parcelLottieView } = useLottie(parcelLottieOptions);
	const { View: truckLottieView } = useLottie(truckLottieOptions);
	const { View: trackingLottieView } = useLottie(trackingLottieOptions);

	return (
		<Flex
			p={'.25rem'}
			flex={0.1}
			direction={'column'}
			align={'center'}
			gap={'1rem'}>
			<Box onClick={() => navigate('/create')}>
				<ShipmentMenu
					title={'Create Basic Shipment'}
					lottie={parcelLottieView}
				/>
			</Box>
			<Box onClick={() => navigate('')}>
				<ShipmentMenu
					title={'Create LTL Shipment'}
					lottie={truckLottieView}
				/>
			</Box>

			<ShipmentMenu
				title={'Track Shipment'}
				lottie={trackingLottieView}
			/>
		</Flex>
	);
};

export default ShipmentMenuList;
