import { Box } from '@chakra-ui/react';
import Chart from 'react-apexcharts';

const AnalyticsPage = () => {
	const series = [
		{
			//data on the y-axis
			name: 'Sales',
			data: [30, 40, 50, 10, 15],
		},
	];

	const options = {
		//data on the x-axis
		chart: { id: 'bar-chart' },
		xaxis: {
			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
		},
	};

	return (
		<Box>
			<Chart
				options={options}
				series={series}
				type="bar"
				width="450"
			/>
		</Box>
	);
};

export default AnalyticsPage;
