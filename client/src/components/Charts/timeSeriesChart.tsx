import Chart from 'react-apexcharts';

const TimeSeriesChart = () => {
	const series = [
		{
			name: 'Sales',
			data: [30, 40, 50, 10, 15, 40, 70, 30, 60, 100, 70, 80],
		},
	];

	const options = {
		chart: {
			id: 'area-chart',
			type: 'area' as 'area',
			stacked: false,
			zoom: {
				autoScaleYaxis: true,
			},
		},
		stroke: {
			width: 2,
		},
		xaxis: {
			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		},

		responsive: [
			{
				breakpoint: 1367,
				options: {
					chart: {
						height: '200',
					},
				},
			},
		],
	};
	return (
		<Chart
			options={options} //x-axis
			series={series} //y-axis
			type="area"
			width="100%"
			height={'400'}
		/>
	);
};

export default TimeSeriesChart;
