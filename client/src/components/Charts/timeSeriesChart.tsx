import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { populateMonthsForCharts } from '../../utils/populateMonthsForCharts';
import { Stack, Image, Text } from '@chakra-ui/react';
import noDataFound from '../../assets/no-data-found.jpg';

const TimeSeriesChart = () => {
	const [successVolume, setSuccessVolume] = useState<any[]>([]);
	const [totalShipping, setTotalShipping] = useState<any[]>([]);
	const [failedVolume, setFailedVolume] = useState<any[]>([]);

	useEffect(() => {
		const token = localStorage.getItem('token');
		const fetchTimeSeriesChartData = async () => {
			try {
				const responseOne = await axios.get('http://localhost:5000/shipment/basic/chart/group/by/month', {
					headers: {
						'Content-Type': 'application/json',
						'x-auth-token': token,
					},
				});

				if (responseOne?.data?.status === 'success') setTotalShipping(populateMonthsForCharts(responseOne?.data?.data));

				const responseTwo = await axios.post(
					'http://localhost:5000/shipment/basic/failed',
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
					'http://localhost:5000/shipment/basic/success',
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
						height: '300',
					},
				},
			},

			{
				breakpoint: 1921,
				options: {
					chart: {
						height: '500',
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
				<Stack align={'center'}>
					<Text
						textAlign={'center'}
						fontFamily={'Roboto'}
						fontWeight={'600'}>
						No Data Available
					</Text>
				</Stack>
			)}
		</>
	);
};

export default TimeSeriesChart;
