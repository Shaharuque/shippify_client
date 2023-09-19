import { Flex } from '@chakra-ui/react';
import ShipmentMenuList from '../../components/Home page components/Shipment menu list/shipmentMenuList';
import StatCardList from '../../components/Stat card list/statCardList';

const HomePage = () => {
	return (
		<Flex gap={'1rem'}>
			<ShipmentMenuList />
			<StatCardList />
		</Flex>
	);
};

export default HomePage;
