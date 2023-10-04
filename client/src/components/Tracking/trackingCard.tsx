import { Badge, Box, Flex, Stack, Text } from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';
import { labelColorDictionary, labelDictionary } from '../../utils/labelDictionary';

interface TrackingItemProps {
	item: any;
	isActive: boolean;
	clickedCard: (cardId: string) => void;
}

const TrackingCard: React.FC<TrackingItemProps> = ({ item, clickedCard,isActive }) => {

	const cardClassName = `border rounded p-4 ${isActive ? 'bg-red-200' : 'bg-green-400'}`;
	return (
		<Box
			borderWidth="1px"
			borderRadius="lg"
			p={4}
			marginBottom={4}
			bg="white"
			boxShadow="lg"
			cursor={'pointer'}
			_hover={{
				backgroundColor: '#437F8C',
				color: 'white',
			}}
			w={'52vw'}
			onClick={() => clickedCard(item?._id)}
			backgroundColor={isActive ? '#437F8C' : 'white'}
			color={isActive ? 'white' : 'black'}>
			<Flex gap={'2rem'}>
				<Stack
					align={'center'}
					w={'9vw'}>
					<Text fontWeight="bold">Tracking ID</Text>
					<Text
						fontSize="sm"
						fontWeight={'bold'}>
						{item?.labelDetail?.tracking_number}
					</Text>
				</Stack>

				<Stack
					align={'center'}
					w={'7vw'}>
					<Text fontWeight="bold">Source</Text>
					<Text fontSize="sm">
						{item?.shipment_detail?.ship_from?.city_locality}, {item?.shipment_detail?.ship_from?.country_code}
					</Text>
				</Stack>

				<Stack
					align={'center'}
					w={'8vw'}
					whiteSpace={'nowrap'}>
					<Text fontWeight="bold">Destination</Text>
					<Text fontSize="sm">
						{item?.shipment_detail?.ship_to?.city_locality}, {item?.shipment_detail?.ship_to?.country_code}
					</Text>
				</Stack>

				<Stack
					align={'center'}
					w={'10vw'}
					whiteSpace={'nowrap'}>
					<Text fontWeight="bold">Estimated Delivery Date</Text>
					<Text fontSize="sm">{moment(item?.rateDetail?.estimated_delivery_date)?.format('MM-DD-YYYY')}</Text>
				</Stack>

				<Stack
					align={'center'}
					w={'12vw'}>
					<Text fontWeight="bold">Delivery Status</Text>
					<Badge
						fontSize="sm"
						borderRadius={'md'}
						fontWeight={'bold'}
						p={'.25rem .5rem'}
						colorScheme={labelColorDictionary[item?.shipment_detail?.shipment_status]}>
						{labelDictionary[item?.shipment_detail?.shipment_status]}
					</Badge>
				</Stack>
			</Flex>
		</Box>
	);
};

export default TrackingCard;
