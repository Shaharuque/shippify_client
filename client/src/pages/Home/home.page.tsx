import { Box, Flex } from '@chakra-ui/react';
import ShipmentMenuList from '../../components/Home page components/Shipment menu list/shipmentMenuList';
import StatCardList from '../../components/Home page components/Stat card list/statCardList';
import AnalyticsBox from '../../components/Home page components/Analytics box/analyticsBox';

const HomePage = () => {
	return (
		// <Box height={"100vh"}>
		// 	<Flex
		// 		gap={'1rem'}
		// 		p={'1.5rem'}>
		// 		<ShipmentMenuList />
		// 		<AnalyticsBox />
		// 		
		// 	</Flex>
		// </Box>
		<div className='grid grid-cols-6 gap-5 p-5 lg:ml-[60px] 2xl:ml-[20px]'>
			<div className='col-span-1'>
				<ShipmentMenuList />
			</div>

			<div className='col-span-4'>
				<AnalyticsBox />
			</div>
			<div className='col-span-1'>
				<StatCardList />
			</div>
		</div>
	);
};

export default HomePage;
