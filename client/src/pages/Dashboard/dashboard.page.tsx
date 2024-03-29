import { Box, Flex, Heading } from '@chakra-ui/react';
import PriceAscendingDescendingFilter from '../../components/Filters/priceAscendingDescending';
import WeightFilter from '../../components/Filters/weightFilter';
import StatusFilter from '../../components/Filters/statusFilter';
import ViewShipmentDetails from '../../components/Cards/viewShipmentDetails';
import ShipmentCardList from '../../components/Shipment card list/shipmentCardList';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SpinningLoader from '../../components/Loader/spinningLoader';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import ShipmentCardListLTL from '../../components/Shipment card list/shipmentCardListLTL';
import ViewLtlShipmentDetails from '../../components/Cards/ViewLtlShipmentDetails';
import { labelDictionary } from '../../data/labelDictionary';

const swappedLabelDictionary: { [key: string]: string } = {};
for (const key in labelDictionary) {
	const value = labelDictionary[key];
	swappedLabelDictionary[value] = key;
}

const DashboardPage = () => {
	const [tableData, setTableData] = useState([] as any[]);
	const [filterTableData, setFilterTableData] = useState<any[]>([]); // basic shipment data
	const [ltlTableData, setLTLTableData] = useState([] as any[]); // ltl shipment data
	const [price, setPrice] = useState('');
	const [weight, setWeight] = useState('');
	const [status, setStatus] = useState('');
	const [cardClicked, setCardClicked] = useState(false);
	const [dataLoading, setLoading] = useState(false);
	const [activeCard, setActiveCard] = useState('' as any); // active shipment data
	const [tabIndex, setTabIndex] = useState(0); // active tab 0 | 1

	console.log('Test')
	useEffect(() => {
		const token = localStorage.getItem('token');
		setCardClicked(false);
		try {
			const fetchBasicShipmentData = async () => {
				if (tableData?.length > 0 && ltlTableData?.length > 0) {
					clickedCard(tableData[0]);
					return;
				}

				setLoading(true);
				const basicResponse = await axios.post(
					`${import.meta.env.VITE_BACKEND_URL}/shipment/sort-by-package-and-price`,
					{ carrier_id: '', priceSort: price, weightSort: weight, shipment_status: status },
					{
						headers: {
							'Content-Type': 'application/json',
							'x-auth-token': token,
						},
					}
				);
				const ltlResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/ltlShipment/my-shipment-list`, {
					headers: {
						'Content-Type': 'application/json',
						'x-auth-token': token,
					},
				});
				setTableData(basicResponse?.data?.result);
				setFilterTableData(basicResponse?.data?.result);
				clickedCard(basicResponse?.data?.result[0]);
				setLTLTableData(ltlResponse?.data?.data);
				setLoading(false);
				// console.log('result:', response?.data);
				// console.log(response?.data?.result[0]);
			};

			fetchBasicShipmentData();
		} catch (error) {
			console.log(error);
		}
	}, []);

	const clickedCard = (data: any) => {
		// console.log('clicked', data);
		// fetchSingleShipment({ token, id: cardId });
		setCardClicked(true);
		setActiveCard(data);
	};

	return (
		<div className="px-8 mt-20">
			<Flex
				gap={'1vw'}
				flexDirection={{ base: 'column', md: 'row' }}>
				<Box
					p={'.5vw 0 .5vw 5vw'}
					// flex={0.15}
					style={{ width: '250px' }}>
					{/*All filters are working properly in the frontend */}
					<PriceAscendingDescendingFilter
						onChange={function (value: string): void {
							if (value === 'asc') {
								setTableData((prev) => Array.from(prev)?.sort((a: any, b: any) => a?.rateDetail?.shipping_amount?.amount - b?.rateDetail?.shipping_amount?.amount));
							} else if (value === 'desc') {
								setTableData((prev) => Array.from(prev)?.sort((a: any, b: any) => b?.rateDetail?.shipping_amount?.amount - a?.rateDetail?.shipping_amount?.amount));
							}
						}}
						dataLoading={dataLoading}
					/>

					<WeightFilter
						onChange={function (value: string): void {
							if (value === 'asc') {
								setTableData((prev) => Array.from(prev)?.sort((a: any, b: any) => a?.shipment_detail?.total_weight?.value - b?.shipment_detail?.total_weight?.value));
							} else if (value === 'desc') {
								setTableData((prev) => Array.from(prev)?.sort((a: any, b: any) => b?.shipment_detail?.total_weight?.value - a?.shipment_detail?.total_weight?.value));
							}
						}}
						dataLoading={dataLoading}
					/>
					<StatusFilter
						onChange={(value: string): void => {
							if (value === '') return;
							const filteredTableData = filterTableData.filter((shipment: any) => {
								return shipment?.shipment_detail?.shipment_status === value;
							});
							setTableData(filteredTableData);
						}}
						dataLoading={dataLoading}
					/>
				</Box>

				<Box flex={1}>
					<Heading
						textAlign={'center'}
						m={'0 0 1vw 0'}
						fontSize={'2xl'}
						fontFamily={'Roboto'}>
						Shipment History
					</Heading>

					<Tabs
						isFitted
						variant="soft-rounded"
						align="center"
						defaultIndex={0}
						onChange={(index) => {
							setTabIndex(index);
							if (index === 0) {
								clickedCard(tableData[0]);
							} else {
								clickedCard(ltlTableData[0]);
							}
						}}>
						<TabList
							mb={'1rem'}
							border={'1px solid white'}
							borderRadius={'1.5rem'}>
							<Tab _selected={{ color: 'white', bg: 'cta' }}>Basic Shipments </Tab>
							<Tab _selected={{ color: 'white', bg: 'cta' }}>LTL Shipments</Tab>
						</TabList>

						<TabPanels>
							<TabPanel>
								{dataLoading ? (
									<Box w={'50rem'}>
										<SpinningLoader />
									</Box>
								) : (
									<ShipmentCardList
										activeCard={activeCard?._id}
										clickedCard={clickedCard}
										tableData={tableData}
									/>
								)}
							</TabPanel>

							<TabPanel>
								{dataLoading ? (
									<SpinningLoader />
								) : (
									<ShipmentCardListLTL
										activeCard={activeCard?._id}
										clickedCard={clickedCard}
										tableData={ltlTableData}
									/>
								)}
							</TabPanel>
						</TabPanels>
					</Tabs>
				</Box>

				{tabIndex === 0 ? (
					<Box
						style={{ width: '400px' }}
						p={'.25rem'}>
						{cardClicked && <ViewShipmentDetails shipmentData={activeCard} />}
					</Box>
				) : (
					<Box
						style={{ width: '400px' }}
						p={'.25rem'}>
						{cardClicked && <ViewLtlShipmentDetails shipmentData={activeCard} />}
					</Box>
				)}
			</Flex>
		</div>
	);
};

export default DashboardPage;
