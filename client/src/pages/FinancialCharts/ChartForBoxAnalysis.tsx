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
        const responseOne = await axios.get('http://localhost:5000/shipment/each/month/package/number', {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        });

        if (responseOne?.data?.status === 'success') SetPackageCount(populateMonthsForCharts(responseOne?.data?.result));

        const responseTwo = await axios.get(
          'http://localhost:5000/ltlShipment/each/month/package/number',
          {
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': token,
            },
          }
        );

        if (responseTwo?.data?.status === 'success') setLtlPackageCount(populateMonthsForCharts(responseTwo?.data?.result));

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchTimeSeriesChartData();
  }, []);

  console.log('package count', packageCount)
  console.log('ltl package count', ltlPackageCount)

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
            height: '250',
          },
        },
      },

      {
        breakpoint: 1921,
        options: {
          chart: {
            height: '350',
          },
        },
      },
    ],
  };



  return (
    <div className='rounded border border-gray-400'>
      <h1 className="graph-box bg-[#3A9BA5] py-1 mb-0 text-center text-white">
        Shipments
      </h1>
      <ReactApexChart
        options={doubleBarChartOptions}
        series={doubleBarChartOptions.series}
        type="bar"
        height={250}
      />
    </div>
  );
};

export default ChartForBoxAnalysis;