import { Box, Flex, Text } from '@chakra-ui/react';
import TimeSeriesChart from '../../Charts/timeSeriesChart';
import RecentShipmentTable from '../Recent shipment table/recentShipmentTable';
import PieChart from '../../Charts/pieChart';
import { GrStatusInfo } from 'react-icons/gr';
import DoenutChat from '../../Charts/doenutChat';

const AnalyticsBox = () => {
	return (

		<div>
			<div className='grid grid-cols-5 gap-2 mb-[20px]'>
				<div className='col-span-3 bg-white rounded p-4'>
					<TimeSeriesChart />
				</div>
				<div className='col-span-2 flex flex-col justify-center'>
					<div className='bg-white rounded p-4 mb-2'>
						<DoenutChat />
					</div>
					<div className='bg-white rounded p-4'>
						<DoenutChat />
					</div>

					{/* <div className='bg-white rounded p-2'>
					<h1 className='text-center mb-2 font-bold'>Recent Shipments</h1>
					<RecentShipmentTable />
				</div> */}
					{/* <div className='bg-white rounded p-2'>
					<div className='flex justify-center items-center mb-4'>
						<h1 className=' text-[14px] font-bold mr-1'>Shipment Status</h1>
						<GrStatusInfo className='text-teal-500' />
					</div>
					<PieChart />
				</div> */}
				</div>
			</div>

		</div>
	);
};

export default AnalyticsBox;
