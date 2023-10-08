import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { countDifferentSizeBoxes } from '../../utils/countDifferentSizeBoxs';

const GroupedStackBar = () => {
	const [shipmentData, setShipmentData] = useState([]);
	const [lTLTableData, setLTLTableData] = useState([]);
	const [Loading, setLoading] = useState(false);
	const token = localStorage.getItem('token');

	useEffect(() => {
		try {
			const fetchBasicShipmentData = async () => {
				setLoading(true);
				const basicResponse = await axios.post(
					`${import.meta.env.VITE_BACKEND_URL}/shipment/sort-by-package-and-price`,
					{ carrier_id: '', priceSort: '', weightSort: '', shipment_status: '' },
					{
						headers: {
							'Content-Type': 'application/json',
							'x-auth-token': token,
						},
					}
				);
				const ltlResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/ltlShipment/my-shipment-list`, {
					headers: {
						'Content-Type': 'application/json',
						'x-auth-token': token,
					},
				});

				const result = basicResponse?.data?.result?.map((item) => countDifferentSizeBoxes(item?.labelDetail?.packages || 0));
				console.log(result);
				setShipmentData(basicResponse?.data?.result?.slice(0, 7));
				setLTLTableData(ltlResponse?.data?.data);
				setLoading(false);
			};

			fetchBasicShipmentData();
		} catch (error) {
			console.log(error);
		}
	}, []);

	const chartOptions = {
		series: [
			{
				name: 'Box1',
				data: [12, 18, 5, 4, 4, 4],
			},
			{
				name: 'Box2',
				data: [11, 10, 5, 4, 4, 4],
			},
			{
				name: 'Box3',
				data: [21, 8, 9, 4, 4, 4],
			},
			{
				name: 'Box4',
				data: [17, 18, 7, 4, 4, 4],
			},
		],
		chart: {
			type: 'bar',
			height: 350,
			stacked: true,
			toolbar: {
				show: true,
			},
			zoom: {
				enabled: true,
			},
		},
		responsive: [
			{
				breakpoint: 480,
				options: {
					legend: {
						position: 'bottom',
						offsetX: -10,
						offsetY: 0,
					},
				},
			},
		],
		plotOptions: {
			bar: {
				horizontal: false,
				borderRadius: 10,
				dataLabels: {
					total: {
						enabled: true,
						style: {
							fontSize: '13px',
							fontWeight: 900,
						},
					},
				},
			},
		},
		xaxis: {
			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		},
		fill: {
			opacity: 1,
		},
		colors: ['#80c7fd', '#008FFB', '#80f1cb', '#00E396'],
		yaxis: {
			labels: {
				formatter: (val) => {
					return (val / 1000).toFixed(2) + '%'; // Display percentages with two decimal places
				},
			},
		},
		dataLabels: {
			formatter: (val, opts) => {
				return (val / opts.w.globals.seriesTotals[opts.seriesIndex]).toFixed(2) + '%'; // Calculate and display percentage of each series
			},
		},
		legend: {
			position: 'top',
			horizontalAlign: 'left',
		},
	};

	return (
		<div>
			<ReactApexChart
				options={chartOptions}
				series={chartOptions.series}
				type="bar"
				height={350}
			/>
		</div>
	);
};

export default GroupedStackBar;
