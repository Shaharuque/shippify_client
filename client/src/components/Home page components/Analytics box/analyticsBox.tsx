import { Box, Flex } from '@chakra-ui/react';
import TimeSeriesChart from '../../Charts/timeSeriesChart';
import RecentShipmentTable from '../Recent shipment table/recentShipmentTable';
import PieChart from '../../Charts/pieChart';

const AnalyticsBox = () => {
	return (
		<Flex
			direction={'column'}
			gap={'1rem'}
			flex={0.8}>
			<Box
				bg={'#f1f1f1'}
				p={'1vw'}
				borderRadius={'1rem'}
				flex={0.5}>
				<TimeSeriesChart />
			</Box>
			<Flex
				gap={'1rem'}
				flex={0.5}>

				<Box
					bg={'#f1f1f1'}
					p={'1vw'}
					w={'fit-content'}
					borderRadius={'1rem'}
					flex={0.5}>
					<PieChart />
				</Box>
				<Box
					bg={'#f1f1f1'}
					p={'1vw'}
					w={'fit-content'}
					borderRadius={'1rem'}
					flex={0.5}>
					<RecentShipmentTable />
				</Box>

			</Flex>
		</Flex>
	);
};

export default AnalyticsBox;
