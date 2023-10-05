import { Box, Flex, Heading } from '@chakra-ui/react';
import PriceAscendingDescendingFilter from '../../components/Filters/priceAscendingDescending';
import WeightFilter from '../../components/Filters/weightFilter';
import StatusFilter from '../../components/Filters/statusFilter';
import ViewShipmentDetails from '../../components/Cards/viewShipmentDetails';
import ShipmentCardList from '../../components/Shipment card list/shipmentCardList';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useFetchSingleShipmentMutation } from '../../redux/api/basicShipmentsApi';
import SpinningLoader from '../../components/Loader/spinningLoader';

const DashboardPage = () => {
	const [tableData, setTableData] = useState([]);
	const [price, setPrice] = useState('');
	const [weight, setWeight] = useState('');
	const [status, setStatus] = useState('');
	const [cardClicked, setCardClicked] = useState(false);
	const [dataLoading, setLoading] = useState(false);
	const [activeCard, setActiveCard] = useState('' as any);

	useEffect(() => {
		const token = localStorage.getItem('token');
		setCardClicked(false);
		const fetchTableData = async () => {
			try {
				setLoading(true);
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
				setLoading(false);
				
			} catch (error) {
				console.log(error);
			}
		};
		fetchTableData();
	}, [price, weight, status]);

	console.log(price, weight, status);

	const token = localStorage.getItem('token');
	const [fetchSingleShipment, { data: shipmentData, isLoading: dataLaoding }] = useFetchSingleShipmentMutation();
	console.log('single data from parent', shipmentData?.data, dataLaoding);

	const clickedCard = (cardId: string) => {
		console.log('clicked', cardId);
		fetchSingleShipment({ token, id: cardId });
		setCardClicked(true);
		setActiveCard(cardId)
	};

	return (
		<div className='px-8 mt-20'>
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
						dataLoading={dataLoading}
					/>
					<WeightFilter
						onChange={function (value: string): void {
							setWeight(value);
						}}
						dataLoading={dataLoading}
					/>
					<StatusFilter
						onChange={function (value: string): void {
							setStatus(value);
						}}
						dataLoading={dataLoading}
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

					{
						dataLoading ? <SpinningLoader /> :
							<ShipmentCardList
								activeCard={activeCard}
								clickedCard={clickedCard}
								tableData={tableData}
							/>
					}
				</Box>
				{cardClicked && (
					<Box
						flex={0.3}
						p={'.25rem'}>
						<ViewShipmentDetails shipmentData={shipmentData?.data} />
					</Box>
				)}
			</Flex>
		</div>
	);
};

export default DashboardPage;
