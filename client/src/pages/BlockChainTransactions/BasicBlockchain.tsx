import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useFetchSingleShipmentMutation } from '../../redux/api/basicShipmentsApi';
import BlockChainCard from './Card/BlockChainCard';
import SpinningLoader from '../../components/Loader/spinningLoader';
import TrackingSteppers from '../../components/Tracking/trackingSteppers';
import BlockChainModal from './Modal/BlockChainModal';

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

const BasicBlockchain = () => {
	const [tableData, setTableData] = useState([]);
	const [activeCard, setActiveCard] = useState('' as any);
	const [tabListLoading, setTabListLoading] = useState(false);
	const [loading, setLoading] = useState(false);
	const [cardClicked, setCardClicked] = useState(false);
	const token = localStorage.getItem('token');
	const [blockData, setBlockData] = useState({});
	const [transaction_hash, setTransaction_hash] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [activeCardId, setActiveCardId] = useState(null);
	const [hashLoading, setHashLoading] = useState(false);

	//modal
	const { isOpen, onOpen, onClose } = useDisclosure();

	useEffect(() => {
		setCardClicked(false);
		const fetchTableData = async () => {
			try {
				setLoading(true);
				const response = await axios.post(
					`${import.meta.env.VITE_BACKEND_URL}/shipment/sort-by-package-and-price`,
					{ carrier_id: '', priceSort: '', weightSort: '', shipment_status: '' },
					{
						headers: {
							'Content-Type': 'application/json',
							'x-auth-token': token,
						},
					}
				);

				setTableData(response?.data?.result?.filter((item: any) => item?.blockChainHash));
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		};
		fetchTableData();
	}, []);

	console.log('table data', tableData);

	const clickedCard: any = (cardId: any) => {
		console.log('clicked', cardId);
		setActiveCard(cardId);
		setTransaction_hash(cardId);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setActiveCard(null);
	};

	console.log('active card', activeCard);

	// For Block chain Data
	useEffect(() => {
		setCardClicked(false);
		setHashLoading(true);
		const fetchBlockData = async () => {
			try {
				const response = await axios.get(`http://localhost:8000/get-detail/${transaction_hash}`, {
					headers: {
						'Content-Type': 'application/json',
					},
				});

				setBlockData(response?.data);
				setHashLoading(false);
			} catch (error) {
				console.log(error);
			}
		};
		fetchBlockData();
	}, [transaction_hash]);

	console.log('block data', blockData);

	return (
		<>
			<Flex px={'.5rem'}>
				<BlockChainModal
					hashLoading={hashLoading}
					activeCard={activeCard}
					blockData={blockData}
					isOpen={isOpen}
					onClose={onClose}
				/>

				<Box
					// flex={0.7}
					p={'.5rem'}
					overflowY={'scroll'}
					h={'75vh'}
					justifyContent={'center'}>
					{loading ? (
						<h1 className="text-teal-700 font-bold mt-[60px]">Loading...</h1>
					) : (
						tableData?.map((item: any, index: any) => {
							return (
								<BlockChainCard
									key={index}
									item={item}
									isActive={activeCard == item?.dataAccessHash}
									clickedCard={clickedCard}
									onOpen={onOpen}
									// isModalOpen={isOpen}
									// closeModal={onClose}
								/>
							);
						})
					)}
				</Box>
				{/* <Flex flex={0.3}>
					{
						activeCard &&

							<Box
								p={'.5rem'}>
								{dataLaoding ? (
									<>
										<SpinningLoader />
									</>
								) : (
									<TrackingSteppers
										activeStep={labelStepDictionary[shipmentData?.data?.shipment_detail?.shipment_status]}
										steps={status}
									/>
								)}
							</Box>

					}

				</Flex> */}
			</Flex>
		</>
	);
};

export default BasicBlockchain;
