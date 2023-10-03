import { Box, Flex, Heading } from '@chakra-ui/react';
import PriceAscendingDescendingFilter from '../../components/Filters/priceAscendingDescending';
import WeightFilter from '../../components/Filters/weightFilter';
import StatusFilter from '../../components/Filters/statusFilter';
import ViewShipmentDetails from '../../components/Cards/viewShipmentDetails';
import ShipmentCardList from '../../components/Shipment card list/shipmentCardList';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useFetchSingleShipmentMutation } from '../../redux/api/basicShipmentsApi';

const DashboardPage = () => {
	const [tableData, setTableData] = useState([]);
	const [price, setPrice] = useState('');
	const [weight, setWeight] = useState('');
	const [status, setStatus] = useState('');

	useEffect(() => {
		const token = localStorage.getItem('token');
		const fetchTableData = async () => {
			try {
				const response = await axios.post(
					`http://192.168.68.89:5000/shipment/sort-by-package-and-price`,
					{ carrier_id: '', priceSort: price, weightSort: weight, shipment_status: status },
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
	}, [price, weight, status]);

	console.log(price, weight, status);

	const token = localStorage.getItem('token');
	const [fetchSingleShipment, { data: shipmentData, isLoading: dataLaoding }] = useFetchSingleShipmentMutation();
	console.log('single data from parent', shipmentData, dataLaoding);

	const clickedCard = (cardId: string) => {
		console.log('clicked', cardId);
		fetchSingleShipment({ token, id: cardId });
	};

	return (
		<Flex
			gap={'1vw'}
			flexDirection={{ base: 'column', md: 'row' }}>
			<Box
				p={'.5vw 0 .5vw 5vw'}
				flex={0.15}>
				<PriceAscendingDescendingFilter
					onChange={function (value: string): void {
						setPrice(value);
					}}
				/>
				<WeightFilter
					onChange={function (value: string): void {
						setWeight(value);
					}}
				/>
				<StatusFilter
					onChange={function (value: string): void {
						setStatus(value);
					}}
				/>
			</Box>
			<Box flex={0.55}>
				<Heading
					textAlign={'center'}
					m={'0 0 1vw 0'}
					fontSize={'2xl'}
					fontFamily={'Roboto'}>
					Shipment History
				</Heading>

				<ShipmentCardList
					clickedCard={clickedCard}
					tableData={tableData}
				/>
			</Box>
			<Box
				flex={0.3}
				p={'.25rem'}>
				<ViewShipmentDetails />
			</Box>
		</Flex>
	);
};

export default DashboardPage;
