import { Box } from '@chakra-ui/react';
import Chart from 'react-apexcharts';

const AnalyticsPage = () => {
	const series = [
		{
			//data on the y-axis
			name: 'Sales',
			data: [30, 40, 50, 10, 15, 40, 70, 30, 60],
		},
	];

	const options = {
		//data on the x-axis
		chart: { id: 'bar-chart' },
		xaxis: {
			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
		},
	};

	return (
		<Box
			bg={'#f1f1f1'}
			p={'2vw'}
			w={'fit-content'}
			borderRadius={'1rem'}>
			<Chart
				options={options}
				series={series}
				type="bar"
				width="650"
			/>
		</Box>
	);
};

export default AnalyticsPage;
