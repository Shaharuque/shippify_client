import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { populateMonthsForCharts } from '../../utils/populateMonthsForCharts';

const ChartForBoxAnalysis = () => {
	const [packageCount, SetPackageCount] = useState<any[]>([]);
	const [ltlPackageCount, setLtlPackageCount] = useState<any[]>([]);

	useEffect(() => {
		const token = localStorage.getItem('token');
		const fetchTimeSeriesChartData = async () => {
			try {
				const responseOne = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/shipment/each/month/package/number`, {
					headers: {
						'Content-Type': 'application/json',
						'x-auth-token': token,
					},
				});

				if (responseOne?.data?.status === 'success') SetPackageCount(populateMonthsForCharts(responseOne?.data?.result));

				const responseTwo = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/ltlShipment/each/month/package/number`, {
					headers: {
						'Content-Type': 'application/json',
						'x-auth-token': token,
					},
				});

				if (responseTwo?.data?.status === 'success') setLtlPackageCount(populateMonthsForCharts(responseTwo?.data?.result));
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		fetchTimeSeriesChartData();
	}, []);

	console.log('package count', packageCount);
	console.log('ltl package count', ltlPackageCount);

	const doubleBarChartOptions = {
		chart: {
			type: 'bar',
		},
		xaxis: {
			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		},
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: '50%',
				endingShape: 'rounded',
			},
		},
		dataLabels: {
			enabled: false,
		},
		series: [
			{
				name: 'Basic Shipments',
				data: [...packageCount?.map((item) => item.count)],
			},
			{
				name: 'LTL Shipments',
				data: [...ltlPackageCount?.map((item) => item.count)],
			},
		],

		responsive: [
			{
				breakpoint: 1367,
				options: {
					chart: {
						height: '200',
					},
				},
			},

			{
				breakpoint: 1921,
				options: {
					chart: {
						height: '390',
					},
					title: {
						text: 'Total shipment vs month',
						align: 'center',
						margin: 10,
						offsetX: 0,
						offsetY: 0,
						floating: false,
						style: {
							fontSize: '16px',
							fontWeight: 'bold',
							fontFamily: undefined,
							color: '#263238',
						},
					},
				},
			},
		],
	};

	return (
		<div>
			<ReactApexChart
				options={doubleBarChartOptions}
				series={doubleBarChartOptions.series}
				type="bar"
				height={350}
			/>
		</div>
	);
};

export default ChartForBoxAnalysis;
