import { Box } from '@chakra-ui/react';
import TrackingCard from './trackingCard';

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

const TrackingList = () => {
	return (
		<Box
			p={'.5rem'}
			overflowY={'scroll'}
			h={'500px'}
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
	);
};

export default TrackingList;
