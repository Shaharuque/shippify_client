import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import React from 'react';

interface TrackingInfo {
	id: string;
	shipFrom: string;
	shipTo: string;
	deliveryStatus: string;
	estimatedDeliveryDate: string;
}

interface TrackingItemProps {
	item: TrackingInfo;
}

const TrackingCard: React.FC<TrackingItemProps> = ({ item }) => {
	return (
		<Box
			borderWidth="1px"
			borderRadius="lg"
			p={4}
			marginBottom={4}
			width="fit-content"
			bg="white"
			boxShadow="lg">
			<Flex gap={'.5rem'}>
				<Stack align={'center'}>
					<Text fontWeight="bold">Tracking Id</Text>
					<Text fontSize="sm">{item.id}</Text>
				</Stack>

				<Stack align={'center'}>
					<Text fontWeight="bold">Source</Text>
					<Text fontSize="sm">{item.shipFrom}</Text>
				</Stack>

				<Stack align={'center'}>
					<Text fontWeight="bold">Destination</Text>
					<Text fontSize="sm">{item.shipTo}</Text>
				</Stack>

				<Stack align={'center'}>
					<Text fontWeight="bold">Estimated Delivery Date</Text>
					<Text fontSize="sm">{item.estimatedDeliveryDate}</Text>
				</Stack>

				<Stack align={'center'}>
					<Text fontWeight="bold">Delivery status</Text>
					<Text fontSize="sm">{item.deliveryStatus}</Text>
				</Stack>
			</Flex>
		</Box>
	);
};

export default TrackingCard;
