import { Box, Flex } from '@chakra-ui/react';
import TrackingCard from './trackingCard';
import ShipmentSteppers from '../Steppers/shipmentSteppers';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useFetchSingleShipmentMutation } from '../../redux/api/basicShipmentsApi';
import SpinningLoader from '../Loader/spinningLoader';
import TrackingSteppers from './trackingSteppers';

const status = [
	// { title: 'Reached at Service Point', key: 'reached_at_service_point' },
	{ title: 'Pending', key: 'pending' },
	{ title: 'Label Purchased', key: 'label_purchased' },
	{ title: 'Dropped at Service Point', key: 'dropped_at_service_pointlabel_purchased' },
	{ title: 'In Transit', key: 'in_transit' },
	{ title: 'Dropped at Pickup Point', key: 'dropped_at_pickup_pointlabel_purchased' },
	{ title: 'Unknown', key: 'unknown' },
	{ title: 'Returned', key: 'returned' },
	{ title: 'Received', key: 'received' },
];

const labelStepDictionary: { [key: string]: number } = {
	received: 8,
	dropped_at_service_pointlabel_purchased: 3,
	dropped_at_pickup_pointlabel_purchased: 5,
	unknown: 6,
	label_purchased: 2,
	pending: 1,
	in_transit: 4,
	returned: 7,
};

const TrackingList = () => {
	const [tableData, setTableData] = useState([]);
	const [shipmentStatus, setShipmentStatus] = useState('');

	useEffect(() => {
		const token = localStorage.getItem('token');
		const fetchTableData = async () => {
			try {
				const response = await axios.post(
					`http://192.168.68.89:5000/shipment/sort-by-package-and-price`,
					{ carrier_id: '', priceSort: '', weightSort: '', shipment_status: '' },
					{
						headers: {
							'Content-Type': 'application/json',
							'x-auth-token': token,
						},
					}
				);
				console.log('result:', response.data);
				setTableData(response?.data?.result);
			} catch (error) {
				console.log(error);
			}
		};
		fetchTableData();
	}, []);

	const token = localStorage.getItem('token');
	const [fetchSingleShipment, { data: shipmentData, isLoading: dataLaoding }] = useFetchSingleShipmentMutation();

	const clickedCard: any = (cardId: any) => {
		console.log('clicked', cardId);
		fetchSingleShipment({ token, id: cardId });
	};

	return (
		<>
			{dataLaoding ? (
				<>
					<SpinningLoader />
				</>
			) : (
				<Flex px={'.5rem'}>
					<Box
						flex={0.7}
						p={'.5rem'}
						overflowY={'scroll'}
						h={'75vh'}
						justifyContent={'center'}>
						{tableData?.map((item: any, index: number) => (
							<TrackingCard
								key={index}
								item={item}
								clickedCard={clickedCard}
							/>
						))}
					</Box>
					<Flex
						justify={'center'}
						flex={0.3}
						p={'.5rem'}>
						<TrackingSteppers
							activeStep={labelStepDictionary[shipmentData?.data?.shipment_detail?.shipment_status]}
							steps={status}
						/>
					</Flex>
				</Flex>
			)}
		</>
	);
};

export default TrackingList;
