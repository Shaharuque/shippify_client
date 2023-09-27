import { Box, Flex, Heading, Select, Text } from '@chakra-ui/react';
import ShipmentCard from '../../components/Cards/shipmentCard';
import PriceAscendingDescendingFilter from '../../components/Filters/priceAscendingDescending';
import WeightFilter from '../../components/Filters/weightFilter';
import StatusFilter from '../../components/Filters/statusFilter';

const DashboardPage = () => {
	return (
		<Flex
			mt={'2.5rem'}
			p={'.25vw'}
			gap={'1vw'}
			flexDirection={{ base: 'column', md: 'row' }}>
			<Box
				p={'.5vw 0 .5vw 5vw'}
				flex={0.4}>
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
				<Flex flexWrap="wrap">
					<ShipmentCard />
					<ShipmentCard />
					<ShipmentCard />
				</Flex>
			</Box>
			<Box flex={0.2}>
				<Text>View Details</Text>
			</Box>
		</Flex>
	);
};

export default DashboardPage;
