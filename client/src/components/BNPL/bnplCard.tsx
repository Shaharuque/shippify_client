import { Badge, Box, Button, Flex, Stack, Text } from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';

import { IUpcomingPayments } from '../../interface/BNPL/payment';

interface TrackingItemProps {
	item: any;
	clickedCard: (cardId: string) => void;
}

const BNPLCard: React.FC<TrackingItemProps> = ({ item, clickedCard }: { item: IUpcomingPayments; clickedCard: any }) => {
	console.log(item);
	return (
		<Box
			borderWidth="1px"
			borderRadius="lg"
			px={8}
			py={4}
			marginBottom={4}
			bg="white"
			boxShadow="lg"
			cursor={'pointer'}
			_hover={{
				backgroundColor: '#437F8C',
				color: 'white',
			}}
			w={'min-content'}
			onClick={() => clickedCard(item?._id)}>
			<Flex
				gap={'2rem'}
				align={'center'}>
				<Stack
					align={'center'}
					w={'9vw'}>
					<Text fontWeight="bold">Payment Id</Text>
					<Text
						fontSize="sm"
						fontWeight={'bold'}>
						{item?._id}
					</Text>
				</Stack>

				<Stack
					align={'center'}
					w={'7vw'}>
					<Text fontWeight="bold">Shipment Id</Text>
					<Text fontSize="sm">{item?.shipment_id}</Text>
				</Stack>

				<Stack
					align={'center'}
					w={'8vw'}
					whiteSpace={'nowrap'}>
					<Text fontWeight="bold">Net Payable</Text>
					<Text fontSize="sm">{item?.net_payable.toString()}</Text>
				</Stack>
				<Stack
					align={'center'}
					w={'8vw'}
					whiteSpace={'nowrap'}>
					<Text fontWeight="bold">Installment</Text>
					<Text fontSize="sm">{item?.numberOfInstallments.toString()}</Text>
				</Stack>

				<Stack
					align={'center'}
					w={'10vw'}
					whiteSpace={'nowrap'}>
					<Text fontWeight="bold">Payment Deadline</Text>
					<Text fontSize="sm">{moment(new Date(item?.payments.paymentDeadline))?.format('MM-DD-YYYY')}</Text>
				</Stack>

				<Stack
					align={'center'}
					w={'5vw'}
					whiteSpace={'nowrap'}>
					<Text fontWeight="bold">Defaults</Text>
					<Text fontSize="sm">{item?.payments.defaults.toString()}</Text>
				</Stack>

				<Button borderRadius={'1rem'}>Pay now</Button>
			</Flex>
		</Box>
	);
};

export default BNPLCard;
