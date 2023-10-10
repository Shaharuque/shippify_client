import TimeSeriesChart from '../../Charts/timeSeriesChart';
import PieChart from '../../Charts/pieChart';
import DoenutChat from '../../Charts/DoenutChat';
import RecentShipmentTable from '../Recent shipment table/recentShipmentTable';

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
