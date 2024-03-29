
import { Badge, Box, Flex, Icon, Image, Stack, Text, useBreakpointValue } from '@chakra-ui/react';
import ups from '../../assets/ups.svg';
import fedex from '../../assets/fedex-express-6.svg';
import stamps from '../../assets/stamps_com.png';
import { LuBadgeDollarSign } from 'react-icons/lu';
import moment from 'moment';
import { labelColorDictionary, labelDictionary } from '../../data/labelDictionary';
import { useDispatch } from 'react-redux';
import { updateLabel } from '../../redux/features/labelSlice';
import { useNavigate } from 'react-router-dom';

export interface IShipment {
	shipment: any;
	clickedCard: (cardId: any) => void;
	isActive: boolean;
}

const ShipmentCard = ({ shipment, clickedCard, isActive }: IShipment) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// const currentDateTime = moment();
	// const token = localStorage.getItem('token');

	return (
		<Box
			onClick={() => clickedCard(shipment)}
			borderWidth="1px"
			borderRadius="lg"
			p={useBreakpointValue({ base: 2, md: 4, lg: 6 })}
			marginBottom={4}
			bg="white"
			boxShadow="lg"
			w={'100%'}
			h={'min-content'}
			_hover={{
				backgroundColor: '#437F8C',
				color: 'white',
			}}
			backgroundColor={isActive ? '#437F8C' : 'white'}
			color={isActive ? 'white' : 'black'}
			cursor={'pointer'}>
			<Flex
				gap={'1vw'}
				align={'center'}
				whiteSpace={'nowrap'}>
				<Stack
					align={'center'}
					w={'120px'}
					textAlign={'center'}>
					<Image
						src={shipment?.rateDetail?.carrier_code === 'ups' ? ups : shipment?.rateDetail?.carrier_code === 'fedex' ? fedex : stamps}
						boxSize={'2.5rem'}
					/>

					<Text
						fontWeight={'md'}
						fontSize={'sm'}
						whiteSpace={'pre-wrap'}>
						{shipment?.rateDetail?.service_type}
					</Text>
				</Stack>
				<Stack
					align={'center'}
					w={'80px'}>
					<Text fontWeight={'bold'}>Shipping cost</Text>
					<Stack
						direction={'row'}
						align={'center'}>
						<Icon
							as={LuBadgeDollarSign}
							color={'green.500'}
							boxSize={'1.25rem'}
						/>
						<Text>{shipment?.rateDetail?.shipping_amount?.amount}</Text>
					</Stack>
				</Stack>
				<Stack
					align={'center'}
					w={'100px'}>
					<Text
						fontSize={'md'}
						fontWeight={'bold'}>
						Packages
					</Text>
					<Text fontSize={'sm'}>{shipment?.shipment_detail?.packages.length}</Text>
				</Stack>
				<Stack
					align={'center'}
					w={'120px'}>
					<Text fontWeight={'bold'}>Tracking Id</Text>
					<Text
						fontSize={'xs'}
						fontWeight={'bold'}>
						{shipment?.labelDetail?.tracking_number}
					</Text>
				</Stack>
				<Stack
					align={'center'}
					w={'100px'}>
					<Text fontWeight={'bold'}>Source</Text>
					<Text fontSize={'sm'}>
						{shipment?.shipment_detail?.ship_from?.city_locality}, {shipment?.shipment_detail?.ship_from?.country_code}
					</Text>
				</Stack>
				<Stack
					align={'center'}
					w={'100px'}>
					<Text fontWeight={'bold'}>Destination</Text>
					<Text fontSize={'sm'}>
						{shipment?.shipment_detail?.ship_to?.city_locality}, {shipment?.shipment_detail?.ship_to?.country_code}
					</Text>
				</Stack>
				<Stack
					align={'center'}
					w={'120px'}>
					<Text fontWeight={'bold'}>Delivery Date</Text>
					<Text fontSize={'sm'}>{moment(shipment?.rateDetail?.estimated_delivery_date)?.format('MM-DD-YYYY')}</Text>
				</Stack>
				<Stack
					align={'center'}
					w={'120px'}>
					<Text fontWeight={'bold'}>Tracking Status</Text>
					<Badge
						colorScheme={labelColorDictionary[shipment?.shipment_detail?.shipment_status]}
						borderRadius={'md'}
						fontSize={'xs'}>
						{labelDictionary[shipment?.shipment_detail?.shipment_status]}
					</Badge>
				</Stack>
				<Stack
					align={'center'}
					w={'120px'}>
					{/* <Text fontWeight={'bold'}>Label Detail</Text> */}
					<Badge
						onClick={() => {
							dispatch(updateLabel(shipment?.labelDetail?.label_download?.pdf));
							navigate('/pdf-viewer');
						}}
						// colorScheme={labelColorDictionary[shipment?.shipment_detail?.shipment_status]}
						borderRadius={'md'}
						fontSize={'xs'}>
						{'Label Detail'}
					</Badge>
				</Stack>
			</Flex>
		</Box>
	);

};

export default ShipmentCard;
