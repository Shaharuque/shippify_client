import { Box, Flex, Text } from '@chakra-ui/react';
import TimeSeriesChart from '../../Charts/timeSeriesChart';
import RecentShipmentTable from '../Recent shipment table/recentShipmentTable';
import PieChart from '../../Charts/pieChart';
import { GrStatusInfo } from 'react-icons/gr';
import DoenutChat from '../../Charts/doenutChat';

const AnalyticsBox = () => {
	return (

		<div>
			<div className='grid grid-cols-2 gap-2 mb-[20px]'>
				<div className=' bg-white rounded p-4'>
					<TimeSeriesChart />
				</div>
				<div>
					<RecentShipmentTable />
				</div>
			</div>

		</div>
	);
};

export default AnalyticsBox;
