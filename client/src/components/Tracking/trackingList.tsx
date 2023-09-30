import { Box, Flex } from '@chakra-ui/react';
import TrackingCard from './trackingCard';
import ShipmentSteppers from '../Steppers/shipmentSteppers';

interface TrackingInfo {
	id: string;
	shipFrom: string;
	shipTo: string;
	deliveryStatus: string;
	estimatedDeliveryDate: string;
}
const dummyTrackingList: TrackingInfo[] = [
	{
		id: '123456',
		shipFrom: 'New York',
		shipTo: 'Los Angeles',
		deliveryStatus: 'In transit',
		estimatedDeliveryDate: '2023-10-05',
	},
	{
		id: '123456',
		shipFrom: 'New York',
		shipTo: 'Los Angeles',
		deliveryStatus: 'In transit',
		estimatedDeliveryDate: '2023-10-05',
	},
	{
		id: '123456',
		shipFrom: 'New York',
		shipTo: 'Los Angeles',
		deliveryStatus: 'In transit',
		estimatedDeliveryDate: '2023-10-05',
	},
	{
		id: '123456',
		shipFrom: 'New York',
		shipTo: 'Los Angeles',
		deliveryStatus: 'In transit',
		estimatedDeliveryDate: '2023-10-05',
	},
	{
		id: '123456',
		shipFrom: 'New York',
		shipTo: 'Los Angeles',
		deliveryStatus: 'In transit',
		estimatedDeliveryDate: '2023-10-05',
	},
	{
		id: '123456',
		shipFrom: 'New York',
		shipTo: 'Los Angeles',
		deliveryStatus: 'In transit',
		estimatedDeliveryDate: '2023-10-05',
	},
];

const status = [{ title: 'Dropped at service point' }, { title: 'Picked up from service point' }, { title: 'In transit' }, { title: 'Lost' }, { title: 'Delivered' }];

const TrackingList = () => {
	return (
		<Flex gap={'1rem'}>
			<Box
				flex={0.6}
				p={'.5rem'}
				overflowY={'scroll'}
				h={'80vh'}
				css={{
					'&::-webkit-scrollbar': {
						width: '0',
					},
					'&::-webkit-scrollbar-thumb': {
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
						borderRadius: '0.25em',
					},
				}}>
				{dummyTrackingList.map((item) => (
					<TrackingCard
						key={item.id}
						item={item}
					/>
				))}
			</Box>
			<Box flex={0.4}>
				<ShipmentSteppers
					activeStep={4}
					steps={status}
				/>
			</Box>
		</Flex>
	);
};

export default TrackingList;
