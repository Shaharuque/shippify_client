import { Box, Flex, Text } from '@chakra-ui/react';
import TimeSeriesChart from '../../Charts/timeSeriesChart';
import RecentShipmentTable from '../Recent shipment table/recentShipmentTable';
import PieChart from '../../Charts/pieChart';
import { GrStatusInfo } from 'react-icons/gr';

const AnalyticsBox = () => {
	return (
		// <Flex
		// 	direction={'column'}
		// 	gap={'1rem'}>
		// 	<Flex gap={'1rem'}>
		// 		<Box
		// 			bg={'#f1f1f1'}
		// 			p={'1vw'}
		// 			borderRadius={'1rem'}
		// 			flex={0.4}>
		// 			<TimeSeriesChart />

		// 		</Box>
		// 		<Box
		// 			bg={'#f1f1f1'}
		// 			p={'1vw'}
		// 			borderRadius={'1rem'}
		// 			flex={0.4}>
		// 			<TimeSeriesChart />
		// 		</Box>
		// 	</Flex>
		// 	<Flex
		// 		gap={'1rem'}
		// 		flex={0.5}>

		// 		<Box
		// 			bg={'#f1f1f1'}
		// 			p={'1vw'}
		// 			// w={'fit-content'}
		// 			borderRadius={'1rem'}
		// 			flex={0.4}>
		// 			<PieChart />
		// 		</Box>
		// 		<Box
		// 			bg={'#f1f1f1'}
		// 			p={'1vw'}
		// 			// w={'fit-content'}
		// 			borderRadius={'1rem'}
		// 			flex={0.4}>
		// 			<Text marginBottom={"10px"} fontWeight={"bold"}>Recent Shipments</Text>
		// 			<RecentShipmentTable />
		// 		</Box>
		// 	</Flex>
		// </Flex>
		<div>
			<div className='mb-[20px]'>
				<div className='bg-white rounded p-4'>
					<TimeSeriesChart />
				</div>
			</div>
			<div className='grid grid-cols-2 gap-[20px]'>
				<div className='bg-white rounded p-4'>
					<div className='flex justify-center items-center mb-4'>
						<h1 className=' text-[14px] font-bold mr-1'>Shipment Status</h1>
						<GrStatusInfo className='text-teal-500' />
					</div>
					<PieChart />
				</div>
				{/* <div className='bg-white rounded p-2'>
					<h1 className='text-center mb-2 font-bold'>Recent Shipments</h1>
					<RecentShipmentTable />
				</div> */}
				<div className='bg-white rounded p-2'>
					<div className='flex justify-center items-center mb-4'>
						<h1 className=' text-[14px] font-bold mr-1'>Shipment Status</h1>
						<GrStatusInfo className='text-teal-500' />
					</div>
					<PieChart />
				</div>
			</div>
		</div>
	);
};

export default AnalyticsBox;
