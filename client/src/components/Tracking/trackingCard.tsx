import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';

interface TrackingInfo {
	id: string;
	shipFrom: string;
	shipTo: string;
	deliveryStatus: string;
	estimatedDeliveryDate: string;
}

interface TrackingItemProps {
	item: any;
}

const TrackingCard: React.FC<TrackingItemProps> = ({ item }) => {
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
			}}>
			<Flex gap={'2rem'}>
				<Stack align={'center'}>
					<Text fontWeight="bold">Tracking Id</Text>
					<Text fontSize="sm" fontWeight={'bold'}>{item?.labelDetail?.tracking_number}</Text>
				</Stack>

				<Stack align={'center'}>
					<Text fontWeight="bold">Source</Text>
					<Text fontSize="sm">{item?.shipment_detail?.ship_from?.city_locality}, {item?.shipment_detail?.ship_from?.country_code
}</Text>
				</Stack>

				<Stack align={'center'}>
					<Text fontWeight="bold">Destination</Text>
					<Text fontSize="sm">{item?.shipment_detail?.ship_to?.city_locality}, {item?.shipment_detail?.ship_to?.country_code
}</Text>
				</Stack>

				<Stack align={'center'}>
					<Text fontWeight="bold">Estimated Delivery Date</Text>
					<Text fontSize="sm">{moment(item?.rateDetail?.estimated_delivery_date)?.format("MM-DD-YYYY")}</Text>
				</Stack>

				<Stack align={'center'}>
					<Text fontWeight="bold">Delivery status</Text>
					<Text fontSize="sm" fontWeight={'bold'}>{(item?.shipment_detail?.shipment_status)?.toUpperCase()}</Text>
				</Stack>
			</Flex>
		</Box>
	);
};

export default TrackingCard;
