import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { populateMonthsForCharts } from '../../utils/populateMonthsForCharts';

const TimeSeriesChart = () => {
	const [successVolume, setSuccessVolume] = useState<any[]>([]);
	const [totalShipping, setTotalShipping] = useState<any[]>([]);
	const [failedVolume, setFailedVolume] = useState<any[]>([]);

	useEffect(() => {
		const token = localStorage.getItem('token');
		const fetchTimeSeriesChartData = async () => {
			try {
				const responseOne = await axios.get('http://192.168.68.89:5000/shipment/basic/chart/group/by/month', {
					headers: {
						'Content-Type': 'application/json',
						'x-auth-token': token,
					},
				});

				if (responseOne?.data?.status === 'success') setTotalShipping(populateMonthsForCharts(responseOne?.data?.data));

				const responseTwo = await axios.post(
					'http://192.168.68.89:5000/shipment/basic/failed',
					{
						carrier_id: '',
					},
					{
						headers: {
							'Content-Type': 'application/json',
							'x-auth-token': token,
						},
					}
				);

				if (responseTwo?.data?.status === 'success') setFailedVolume(populateMonthsForCharts(responseTwo?.data?.data));

				const responseThree = await axios.post(
					'http://192.168.68.89:5000/shipment/basic/success',
					{
						carrier_id: '',
					},
					{
						headers: {
							'Content-Type': 'application/json',
							'x-auth-token': token,
						},
					}
				);

				if (responseThree?.data?.status === 'success') setSuccessVolume(populateMonthsForCharts(responseThree?.data?.data));
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		fetchTimeSeriesChartData();
	}, []);
	const series = [
		{
			name: 'Total shipment(monthly)',
			data: [...totalShipping?.map((item) => item.count)],
		},
		{
			name: 'Failed shipment(monthly)',
			data: [...failedVolume?.map((item) => item.count)],
		},
		{
			name: 'Successful shipment(monthly)',
			data: [...successVolume?.map((item) => item.count)],
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

		dataLabels: {
			enabled: false,
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
