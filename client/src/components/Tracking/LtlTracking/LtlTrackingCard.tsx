import { Badge, Box, Flex, Stack, Text } from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';
import { labelColorDictionary, labelDictionary } from '../../../data/labelDictionary';

interface TrackingItemProps {
	item: any;
	isActive: boolean;
	clickedCard: (cardId: string) => void;
}

const LtlTrackingCard: React.FC<TrackingItemProps> = ({ item, clickedCard,isActive }) => {

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
						{item?.bolDetail?.pickup_id?.slice(0, 8)}
					</Text>
				</Stack>

				<Stack
					align={'center'}
					w={'7vw'}>
					<Text fontWeight="bold">Source</Text>
					<Text fontSize="sm">
						{item?.shipment_detail?.shipment?.ship_from?.address?.city_locality}, {item?.shipment_detail?.shipment?.ship_from?.address?.country_code}
					</Text>
				</Stack>

				<Stack
					align={'center'}
					w={'8vw'}
					whiteSpace={'nowrap'}>
					<Text fontWeight="bold">Destination</Text>
					<Text fontSize="sm">
                    {item?.shipment_detail?.shipment?.ship_to?.address?.city_locality}, {item?.shipment_detail?.shipment?.ship_to?.address?.country_code}
					</Text>
				</Stack>

				<Stack
					align={'center'}
					w={'10vw'}
					whiteSpace={'nowrap'}>
					<Text fontWeight="bold">Pickup Date</Text>
					<Text fontSize="sm">{item?.shipment_detail?.pickup_date}</Text>
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
						colorScheme={labelColorDictionary[item?.shipment_status]}>
						{labelDictionary[item?.shipment_status]}
					</Badge>
				</Stack>
			</Flex>
		</Box>
	);
};

export default LtlTrackingCard;
