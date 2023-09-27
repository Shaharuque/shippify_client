import { Box, Flex, Heading, Select, Text } from '@chakra-ui/react';
import ShipmentCard from '../../components/Cards/shipmentCard';
import PriceAscendingDescendingFilter from '../../components/Filters/priceAscendingDescending';
import WeightFilter from '../../components/Filters/weightFilter';
import StatusFilter from '../../components/Filters/statusFilter';
import ViewShipmentDetails from '../../components/Cards/viewShipmentDetails';
import ShipmentCardList from '../../components/Shipment card list/shipmentCardList';

const DashboardPage = () => {
	return (
		<Flex
			mt={'2.5rem'}
			p={'.25vw'}
			gap={'1vw'}
			flexDirection={{ base: 'column', md: 'row' }}>
			<Box
				p={'.5vw 0 .5vw 5vw'}
				flex={0.45}>
				<PriceAscendingDescendingFilter
					onChange={function (value: string): void {
						throw new Error('Function not implemented.');
					}}
				/>
				<WeightFilter />
				<StatusFilter />
			</Box>
			<Box flex={0.2}>
				<Heading
					textAlign={'center'}
					m={'0 0 1vw 0'}
					fontSize={'2xl'}
					fontFamily={'Roboto'}>
					Shipment History
				</Heading>
				<Flex
					flexWrap="wrap"
					h={'75vh'}
					mb={'2rem'}
					overflowY={'auto'}
					css={{
						'&::-webkit-scrollbar': {
							width: '0',
						},
						'&::-webkit-scrollbar-thumb': {
							backgroundColor: 'rgba(0, 0, 0, 0.5)',
							borderRadius: '0.25em',
						},
					}}>
					<ShipmentCardList />
				</Flex>
			</Box>
			<Box flex={0.2}>
				<ViewShipmentDetails />
			</Box>
		</Flex>
	);
};

export default DashboardPage;
