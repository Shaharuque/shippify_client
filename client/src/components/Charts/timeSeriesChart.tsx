import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { populateMonthsForCharts } from '../../utils/populateMonthsForCharts';
import { Stack, Image, Text } from '@chakra-ui/react';

const TimeSeriesChart = () => {
	const [successVolume, setSuccessVolume] = useState<any[]>([]);
	const [totalShipping, setTotalShipping] = useState<any[]>([]);
	const [failedVolume, setFailedVolume] = useState<any[]>([]);
	const [transitVolume, setTransitVolume] = useState<any[]>([]);

	useEffect(() => {
		const token = localStorage.getItem('token');
		const fetchTimeSeriesChartData = async () => {
			try {
				const responseOne = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/shipment/basic/chart/group/by/month`, {
					headers: {
						'Content-Type': 'application/json',
						'x-auth-token': token,
					},
				});

				if (responseOne?.data?.status === 'success') setTotalShipping(populateMonthsForCharts(responseOne?.data?.data));

				const responseTwo = await axios.post(
					`${import.meta.env.VITE_BACKEND_URL}/shipment/basic/failed`,
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
					`${import.meta.env.VITE_BACKEND_URL}/shipment/basic/success`,
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

				const responseFour = await axios.get(
					'http://localhost:5000/shipment/basic/intransit',
					{
						headers: {
							'Content-Type': 'application/json',
							'x-auth-token': token,
						},
					}
				);
				if (responseFour?.data?.status === 'success') setTransitVolume(populateMonthsForCharts(responseFour?.data?.data));
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		fetchTimeSeriesChartData();
	}, []);

	const series = [
		{
			name: 'Total shipment',
			data: [...totalShipping?.map((item) => item.count)],
		},
		{
			name: 'Failed shipment',
			data: [...failedVolume?.map((item) => item.count)],
		},
		{
			name: 'Successful shipment',
			data: [...successVolume?.map((item) => item.count)],
		},
		{
			name: 'In-Transit',
			data: [...transitVolume?.map((item) => item.count)],
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
						height: '300',
					},
				},
			},

			{
				breakpoint: 1921,
				options: {
					chart: {
						height: '400',
					},
					title: {
						text: 'Shipment Volume',
						align: 'left',
						margin: 10,
						offsetX: 0,
						offsetY: 0,
						floating: false,
						style: {
							fontSize: '14px',
							fontWeight: 'bold',
							fontFamily: undefined,
							color: '#596469',
						},
					},
				},
			},
		],
	};
	return (
		<>
			{totalShipping.length > 0 && successVolume.length > 0 && failedVolume.length > 0 ? (
				<Chart
					options={options}
					series={series}
					type="area"
					// width="700px"
				/>
			) : (
				<Flex
					minH={'30vh'}
					justify={'center'}
					align={'center'}>
					<NoDataFound text={'No data available'} />
				</Flex>
			)}
		</>
	);
};

export default TimeSeriesChart;
