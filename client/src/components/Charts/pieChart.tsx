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
        const result = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_BACKEND_PORT}/shipment/basic/pie/chart/group/by/shipping/status`,
          {
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': token,
            },
          }
        );

        const filteredData = result?.data?.data.filter(
          (item: TPieData) => item.status !== 'pending'
        );
        setPieData(filteredData);
        const formattedLabels = formatLabels(
          filteredData.map((item: TPieData) => item.status)
        );
        setLabels(formattedLabels);
        setValues(filteredData.map((item: TPieData) => item.count));
      } catch (error) {
        console.log(error);
      }
    };
    fetchPieChartData();
  }, []);

  const options = {
    responsive: [
      {
        breakpoint: 480, // Define the breakpoint where responsiveness should apply
        options: {
          legend: {
            position: 'bottom', // Change legend position for smaller screens
          },
        },
      },
    ],
    labels: labels,
    legend: { position: 'right' as 'right' },
    title: {
      text: 'Shipment Status', // Add your desired title here
      align: 'center',
      margin: 10,
	  fontWeight: 200,
	  style: {
		fontSize: '14px',
		fontWeight: 'bold',
		fontFamily: undefined,
		color: '#596469',
	},
    },
  };
  const series = values;

  return (
    <>
      {pieData && pieData.length > 0 ? (
        <ReactApexChart options={options} series={series} type="pie" />
      ) : (
        <NoDataFound text="No data available!" />
      )}
    </>
  );
};

export default PieChart;
