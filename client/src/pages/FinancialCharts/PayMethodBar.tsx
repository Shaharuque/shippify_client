import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { countDifferentSizeBoxes } from '../../utils/countDifferentSizeBoxs';
import { populateMonthsForCharts } from '../../utils/populateMonthsForCharts';



const PayMethodBar = () => {
  const [shipmentData, setShipmentData] = useState([]);
  const [lTLTableData, setLTLTableData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');
  const [normalPay, setNormalPay] = useState<any[]>([]);
  const [bnplPay, setBnplPay] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchTimeSeriesChartData = async () => {
      try {
        const responseOne = await axios.get('http://localhost:5000/shipment/each/month/normal/pay/count', {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        });

        if (responseOne?.data?.status === 'success') setNormalPay(populateMonthsForCharts(responseOne?.data?.result));

        const responseTwo = await axios.get(
          'http://localhost:5000/shipment/each/month/bnpl/pay/count',
          {
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': token,
            },
          }
        );

        if (responseTwo?.data?.status === 'success') setBnplPay(populateMonthsForCharts(responseTwo?.data?.result));

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchTimeSeriesChartData();
  }, []);



  console.log('normal pay', normalPay)
  console.log('bnpl pay', bnplPay)
  const chartOptions = {
    series: [
      {
        name: 'Stripe',
        data: [...normalPay?.map((item) => item.count)],
      },
      {
        name: 'BNPL',
        data: [...bnplPay?.map((item) => item.count)],
      },
    ],
    chart: {
      type: 'bar',
      height: 250,
      stacked: true,
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
          offsetX: -10,
          offsetY: 0
        }
      }
    }],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 5,
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: '13px',
              fontWeight: 600
            }
          }
        }
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    fill: {
      opacity: 1,
    },

    colors: ['#437F8C', '#008FFB',],
    
  };

  return (
    <div className='border border-gray-300 rounded'>
      <h1 className="graph-box bg-gradient-to-b from-teal-400 to-blue-900 py-1 mb-0 text-center text-white">
        Pay Methods vs Month
      </h1>
      <ReactApexChart
        options={chartOptions}
        series={chartOptions.series}
        type="bar"
        height={250}
      />
    </div>
  );
};

export default PayMethodBar;
