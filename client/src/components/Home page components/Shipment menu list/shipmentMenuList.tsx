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
	const { View: trackingLottieView2 } = useLottie(trackingLottieOptions);

	return (
		<div className=''>

			<div className='mb-20px' onClick={() => navigate('/financial/charts')}>
				<ShipmentMenu
					title={'Financial Analysis'}
					lottie={trackingLottieView2}
				/>
			</div>
			<div onClick={() => navigate('/create/basic')}>
				<ShipmentMenu
					title={'Create Basic Shipment'}
					lottie={parcelLottieView}
				/>
			</div>

			<div onClick={() => navigate('/create/ltl')}>
				<ShipmentMenu
					title={'Create LTL Shipment'}
					lottie={truckLottieView}
				/>
			</div>

			<div onClick={() => navigate('/tracking')}>
				<ShipmentMenu
					title={'Track Shipment'}
					lottie={trackingLottieView}
				/>
			</div>


		</div>
	);
};

export default ShipmentMenuList;
