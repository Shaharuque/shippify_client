import ReactApexChart from 'react-apexcharts';

const PieChart = () => {
	const options = {
		labels: ['Total Shipments', 'Active', 'Returned'],
		legend: { position: 'right' as 'right' },

		responsive: [
			{
				breakpoint: 1921,
				options: {
					chart: {
						width: 500,
					},
					legend: {
						position: 'right' as 'right',
						fontSize: '16px',

						itemMargin: {
							horizontal: 0,
							vertical: 10,
						},
					},
				},
			},
			{
				breakpoint: 1367,
				options: {
					chart: {
						width: 350,
					},
					legend: {
						position: 'bottom' as 'bottom',
						itemMargin: {
							horizontal: 10,
							vertical: 0,
						},
					},
				},
			},
		],
	};
	const series = [14, 9, 5];
	return (
		<>
			<ReactApexChart
				options={options}
				series={series}
				type="pie"
			/>
		</>
	);
};

export default PieChart;
