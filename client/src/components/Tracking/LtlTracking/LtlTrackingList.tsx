import { Box, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LtlTrackingStepper from './LtlTrackingStepper';
import SpinningLoader from '../../Loader/spinningLoader';
import { useFetchSingleLtlShipmentMutation } from '../../../redux/api/basicShipmentsApi';
import LtlTrackingCard from './LtlTrackingCard';


const status = [
	// { title: 'Reached at Service Point', key: 'reached_at_service_point' },
	{ title: 'Pending', key: 'pending' },
	{ title: 'Bol Purchased', key: 'bol_purchased' },
	{ title: 'Pickedup', key: 'pickedup' },
	{ title: 'In Transit', key: 'in_transit' },
	{ title: 'Reached', key: 'reached' },
	{ title: 'Unknown', key: 'unknown' },
	{ title: 'Returned', key: 'returned' },
	{ title: 'Delivered', key: 'received' },
];

const labelStepDictionary: { [key: string]: number } = {
	received: 8,
	pickedup: 3,
	reached: 5,
	unknown: 6,
	bol_purchased: 2,
	pending: 1,
	in_transit: 4,
	returned: 7,
};

const LtlTrackingList = () => {
	const [tableData, setTableData] = useState([]);
	const [shipmentStatus, setShipmentStatus] = useState('');
	const [activeCard, setActiveCard] = useState('' as any);
	const [tabListLoading, setTabListLoading] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem('token');
		const fetchTableData = async () => {
			try {
				setTabListLoading(true);
				const response = await axios.get(
					`http://localhost:5000/ltlShipment//without-received-ltl-shipments`,
					{
						headers: {
							'Content-Type': 'application/json',
							'x-auth-token': token,
						},
					}
				);
				//console.log('result:', response.data);
				setTableData(response?.data?.result);
				setTabListLoading(false);
			} catch (error) {
				console.log(error);
			}
		};
		fetchTableData();
	}, []);

	const token = localStorage.getItem('token');
	const [fetchSingleShipment, { data: shipmentData, isLoading: dataLaoding }] = useFetchSingleLtlShipmentMutation();

	const clickedCard: any = (cardId: any) => {
		console.log('clicked', cardId);
		setActiveCard(cardId);
		fetchSingleShipment({ token, id: cardId });
	};

	console.log('active card', activeCard)
    console.log('table Data', tableData)



	return (
		<>
			<Flex px={'.5rem'}>
				<Box
					flex={0.7}
					p={'.5rem'}
					overflowY={'scroll'}
					h={'75vh'}
					justifyContent={'center'}>
					{
						tabListLoading ? <SpinningLoader /> :
							tableData?.map((item: any, index: any) => {
								return (
									<LtlTrackingCard
										key={index}
										item={item}
										isActive={activeCard == item?._id}
										clickedCard={clickedCard}
									/>
								);
							})
					}

				</Box>
				<Flex flex={0.3}>
					{
						activeCard &&
						
							<Box
								p={'.5rem'}>
								{dataLaoding ? (
									<>
										<SpinningLoader />
									</>
								) : (
									<LtlTrackingStepper
										activeStep={labelStepDictionary[shipmentData?.data?.shipment_detail?.shipment_status]}
										steps={status}
									/>
								)}
							</Box>
						
					}

				</Flex>
			</Flex>
		</>
	);
};

export default LtlTrackingList;
