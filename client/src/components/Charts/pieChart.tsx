import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

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
				console.log('result:', result.data);
				setLabels(result?.data?.data.map((item: { count: number; status: string }) => item.status));
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
						width: 500,
					},
					legend: {
						position: 'right' as 'right',
						fontSize: '16px',
						formatter: function (val, opts) {
							const formattedLabel = val.split('_').join(' ');
							return `
        <div style="display: flex; align-items: center;">
          <div style="background-color: ${opts.w.config.colors[opts.seriesIndex]}; width: 10px; height: 10px; margin-right: 5px;"></div>
          <div>${formattedLabel}</div>
        </div>
      `;
						},
						height: 300,
						itemMargin: {
							horizontal: 0,
							vertical: 0,
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
