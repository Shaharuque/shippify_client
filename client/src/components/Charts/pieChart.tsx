import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const formatLabels = (originalLabels: string[]) => {
	const labelMap: { [key: string]: string } = {
		reached_at_service_point: 'Reached at Service Point',
		received: 'Received',
		dropped_at_service_pointlabel_purchased: 'Dropped at Service Point',
		unknown: 'Unknown',
		label_purchased: 'Label Purchased',
		pending: 'Pending',
	};

	return originalLabels.map((label: string) => labelMap[label]);
};

const PieChart = () => {
	const [labels, setLabels] = useState<string[]>([]);
	const [values, setValues] = useState<number[]>([]);

	useEffect(() => {
		const token = localStorage.getItem('token');
		const fetchPieChartData = async () => {
			try {
				const result = await axios.get('http://192.168.68.89:5000/shipment/basic/pie/chart/group/by/shipping/status', {
					headers: {
						'Content-Type': 'application/json',
						'x-auth-token': token,
					},
				});
				// console.log('pie chart data:', result.data);
				const formattedLabels = formatLabels(result?.data?.data.map((item: { count: number; status: string }) => item.status));
				setLabels(formattedLabels);
				setValues(result?.data?.data.map((item: { count: number; status: string }) => item.count));
			} catch (error) {
				console.log(error);
			}
		};
		fetchPieChartData();
	}, []);
	const options = {
		labels: labels,
		legend: { position: 'right' as 'right' },

		responsive: [
			{
				breakpoint: 1921,
				options: {
					chart: {
						width: 400,
					},
					legend: {
						position: 'right' as 'right',
						fontSize: '16px',
						labels: {
							colors: undefined,
							useSeriesColors: false,
						},

						height: 'auto',
						itemMargin: {
							horizontal: 0,
							vertical: 10,
						},
					},
				},

				// colors: ['#F44336', '#E91E63', '#9C27B0', '#2196F3', '#4CAF50', '#FFC107'],
			},
			{
				breakpoint: 1367,
				options: {
					chart: {
						width: 350,
					},
					legend: {
						position: 'bottom' as 'bottom',
						height: 50,
						fontSize: '12px',
						itemMargin: {
							horizontal: 8,
							vertical: 0,
						},
					},
				},
			},
		],
	};
	const series = values;
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
