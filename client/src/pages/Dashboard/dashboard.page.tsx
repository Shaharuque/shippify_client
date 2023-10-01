import { Box, Flex, Heading } from '@chakra-ui/react';
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
				flex={0.2}>
				<PriceAscendingDescendingFilter
					onChange={function (value: string): void {
						console.log('value', value);
					}}
				/>
				<WeightFilter />
				<StatusFilter />
			</Box>
			<Box flex={0.5}>
				<Heading
					textAlign={'center'}
					m={'0 0 1vw 0'}
					fontSize={'2xl'}
					fontFamily={'Roboto'}>
					Shipment History
				</Heading>

				<ShipmentCardList />
			</Box>
			<Box
				flex={0.3}
				p={'.25rem'}>
				<ViewShipmentDetails />
			</Box>
		</Flex>
	);
};

export default DashboardPage;
