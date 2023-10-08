import { Box, Flex } from '@chakra-ui/react';
import BNPLCard from './bnplCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useFetchSingleShipmentMutation } from '../../redux/api/basicShipmentsApi';
import SpinningLoader from '../Loader/spinningLoader';
import { getDatetime } from '../../utils/bnpl/timeBracket';
import { IUpcomingPayments } from '../../interface/BNPL/payment';
import CreditScoreCard from './viewBNPLDetails';

const BNPLList = ({ timeBracket }: { timeBracket: String }) => {
	const [tableData, setTableData] = useState([]);

	const endDate = getDatetime(timeBracket as string);

	useEffect(() => {
		const token = localStorage.getItem('token');
		const fetchTableData = async () => {
			try {
				await axios
					.post(
						`${import.meta.env.VITE_BNPL_URL}/order/upcoming-payments/user-id`,
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
									if (data.payments.paymentDeadline < endDate) {
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
