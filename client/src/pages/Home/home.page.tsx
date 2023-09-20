import { Flex } from '@chakra-ui/react';
import ShipmentMenuList from '../../components/Home page components/Shipment menu list/shipmentMenuList';
import StatCardList from '../../components/Home page components/Stat card list/statCardList';
import AnalyticsBox from '../../components/Home page components/Analytics box/analyticsBox';

const HomePage = () => {
	return (
		<Flex gap={'1rem'}>
			<ShipmentMenuList />
			<AnalyticsBox />
			<StatCardList />
		</Flex>
	);
};

export default HomePage;
