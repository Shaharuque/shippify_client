import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { formatLabels } from '../../utils/formatLabels';
import NoDataFound from '../No service available/noDataFound';

type TPieData = {
	count: number;
	status: string;
};

const PieChart = () => {
	const [labels, setLabels] = useState<string[]>([]);
	const [values, setValues] = useState<number[]>([]);
	const [pieData, setPieData] = useState<TPieData[]>([]);

	useEffect(() => {
		const token = localStorage.getItem('token');
		const fetchPieChartData = async () => {
			try {
				const result = await axios.get(`${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_BACKEND_PORT}/shipment/basic/pie/chart/group/by/shipping/status`, {
					headers: {
						'Content-Type': 'application/json',
						'x-auth-token': token,
					},
				});

				const filteredData = result?.data?.data.filter((item: TPieData) => item.status !== 'pending');
				setPieData(filteredData);
				const formattedLabels = formatLabels(filteredData.map((item: TPieData) => item.status));
				setLabels(formattedLabels);
				setValues(filteredData.map((item: TPieData) => item.count));
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
						width: 550,
						height: 300,
					},
					legend: {
						position: 'right' as 'right',
						fontSize: '16px',
						horizontalAlign: 'center',
						labels: {
							colors: undefined,
							useSeriesColors: false,
						},
						margin: 10,

						height: 'auto',
						itemMargin: {
							horizontal: 0,
							vertical: 10,
						},
					},

					// title: {
					// 	text: 'Shipment Status',
					// 	align: 'center',
					// 	offsetX: 35,
					// 	offsetY: 0,
					// 	floating: false,
					// 	style: {
					// 		fontSize: '14px',
					// 		marginBottom:"20px",
					// 		fontWeight: 'bold',
					// 		fontFamily: undefined,
					// 		color: '#263238',
					// 	},
					// },
				},
			},
			{
				breakpoint: 1367,
				options: {
					chart: {
						width: 360,
						height: 300,
					},

					legend: {
						position: 'right' as 'right',
						height: 0,
						fontSize: '10px',
						itemMargin: {
							horizontal: 0,
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
			{pieData && pieData.length > 0 ? (
				<ReactApexChart
					options={options}
					series={series}
					type="pie"
				/>
			) : (
				<NoDataFound text="No data available!" />
			)}
		</>
	);
};

export default PieChart;
