import { Box, Flex } from '@chakra-ui/react';
import BNPLCard from './bnplCard';
import ShipmentSteppers from '../Steppers/shipmentSteppers';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useFetchSingleShipmentMutation } from '../../redux/api/basicShipmentsApi';
import SpinningLoader from '../Loader/spinningLoader';
import TrackingSteppers from './trackingSteppers';
import { getDatetime } from '../../utils/bnpl/timeBracket';
import { IUpcomingPayments } from '../../interface/BNPL/payment';
import moment from 'moment';
import Lottie from 'react-lottie-player';
import ViewShipmentDetails from '../Cards/viewShipmentDetails';
import CreditScoreCard from './viewBNPLDetails';

const status = [
	// { title: 'Reached at Service Point', key: 'reached_at_service_point' },
	{ title: 'Pending', key: 'pending' },
	{ title: 'Label Purchased', key: 'label_purchased' },
	{
		title: 'Dropped at Service Point',
		key: 'dropped_at_service_pointlabel_purchased',
	},
	{ title: 'In Transit', key: 'in_transit' },
	{
		title: 'Dropped at Pickup Point',
		key: 'dropped_at_pickup_pointlabel_purchased',
	},
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

const BNPLList = ({ timeBracket }: { timeBracket: String }) => {
	const [tableData, setTableData] = useState([]);
	const [shipmentStatus, setShipmentStatus] = useState('');
	const endDate = getDatetime(timeBracket as string);

	useEffect(() => {
		const token = localStorage.getItem('token');
		const fetchTableData = async () => {
			try {
				const response = await axios
					.post(
						`http://localhost:3000/order/upcoming-payments/user-id`,
						{
							user_id: '123',
						},
						{
							headers: {
								'Content-Type': 'application/json',
								'x-auth-token': token,
							},
						}
					)
					.then((data) => {
						setTableData(data?.data);
					});
			} catch (error) {
				console.log(error);
			}
		};
		fetchTableData();
	}, []);
	console.log(tableData);
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
						flex={0.8}
						p={'.5rem'}
						overflowY={'scroll'}
						h={'75vh'}
						w={'min-content'}
						justifyContent={'center'}>
						{tableData.length > 0 ? (
							tableData
								.filter((data: IUpcomingPayments) => {
									// console.log(data.payments.paymentDeadline, endDate);
									if (data.payments.paymentDeadline < endDate) {
										// console.log(data);
										return data;
									}
								})
								.map((item: any, index: number) => (
									<BNPLCard
										key={index}
										item={item}
										clickedCard={clickedCard}
									/>
								))
						) : (
							<></>
						)}
					</Box>
					<Flex
						justify={'center'}
						flex={0.2}
						p={'.5rem'}>
						<CreditScoreCard />
					</Flex>
				</Flex>
			)}
		</>
	);
};

export default BNPLList;
