import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { formatLabels } from '../../utils/formatLabels';
import { Text } from '@chakra-ui/react';

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
				const result = await axios.get('http://192.168.68.89:5000/shipment/basic/pie/chart/group/by/shipping/status', {
					headers: {
						'Content-Type': 'application/json',
						'x-auth-token': token,
					},
				});

				setPieData(result?.data?.data);
				const formattedLabels = formatLabels(result?.data?.data.map((item: TPieData) => item.status));
				setLabels(formattedLabels);
				setValues(result?.data?.data.map((item: TPieData) => item.count));
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
						width: 500,
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
			{pieData && pieData.length > 0 ? (
				<ReactApexChart
					options={options}
					series={series}
					type="pie"
				/>
			) : (
				<Text
					textAlign={'center'}
					fontFamily={'Roboto'}
					fontWeight={'600'}>
					No Data Available
				</Text>
			)}
		</>
	);
};

export default PieChart;
