import Chart from 'react-apexcharts';

const TimeSeriesChart = () => {
	const series = [
		{
			name: 'Sales',
			data: [30, 40, 50, 10, 15, 40, 70, 30, 60],
		},
	];

	const options = {
		chart: { id: 'bar-chart' },
		xaxis: {
			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
		},
		responsive: [
			{
				breakpoint: 1367,
				options: {
					chart: {
						height: '170',
					},
				},
			},
		],
	};
	return (
		<Chart
			options={options} //x-axis
			series={series} //y-axis
			type="bar"
			width="100%"
			height={'350'}
		/>
	);
};

export default TimeSeriesChart;
