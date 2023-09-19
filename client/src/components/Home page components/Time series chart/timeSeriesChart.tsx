import Chart from 'react-apexcharts';
import { Box } from '@chakra-ui/react';

const TimeSeriesChart = () => {
	const series = [
		{
			name: 'Sales',
			data: [30, 40, 50, 10, 15],
		},
	];

	const options = {
		chart: { id: 'bar-chart' },
		xaxis: {
			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
		},
	};
	return (
		<Box>
			<Chart
				options={options} //x-axis
				series={series} //y-axis
				type="bar"
				width="450"
			/>
		</Box>
	);
};

export default TimeSeriesChart;
