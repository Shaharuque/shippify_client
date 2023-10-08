import { Box, Flex } from '@chakra-ui/react';
import ShipmentMenuList from '../../components/Home page components/Shipment menu list/shipmentMenuList';
import StatCardList from '../../components/Home page components/Stat card list/statCardList';
import AnalyticsBox from '../../components/Home page components/Analytics box/analyticsBox';
import DoenutChat from '../../components/Charts/doenutChat';
import PieChart from '../../components/Charts/pieChart';
import PieChat2 from '../../components/Charts/PieChar2';

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
		<>
			<div className='bg-white ml-[80px] 2xl:ml-[110px] mr-[20px] rounded mt-5'>
				<h1 className='font-bold p-2'>Dashboard</h1>
			</div>
			<div className='grid grid-cols-6 gap-5 p-5 lg:ml-[60px] 2xl:ml-[90px]'>
				<div className='col-span-1 2xl:mt-[100px]'>
					<ShipmentMenuList />
				</div>

				<div className='col-span-5'>
					<div className=''>
						<StatCardList />
						<AnalyticsBox />
						<div className='grid grid-cols-2 gap-4'>
							<div className='bg-white p-4 rounded'>
								<PieChart />
							</div>
							<div className='bg-white p-4 rounded'>
								<PieChat2/>
							</div>
						</div>
					</div>

				</div>
			</div>
		</>

	);
};

export default HomePage;
