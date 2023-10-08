// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import ReactApexChart from 'react-apexcharts';
// import { countDifferentSizeBoxes } from '../../utils/countDifferentSizeBoxs';



// const GroupedStackBar = () => {
//   const [shipmentData, setShipmentData] = useState([]);
//   const [lTLTableData, setLTLTableData] = useState([]);
//   const [Loading, setLoading] = useState(false);
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     try {
//       const fetchBasicShipmentData = async () => {
//         setLoading(true);
//         const basicResponse = await axios.post(
//           `http://localhost:5000/shipment/sort-by-package-and-price`,
//           { carrier_id: '', priceSort: "", weightSort: "", shipment_status: "" },
//           {
//             headers: {
//               'Content-Type': 'application/json',
//               'x-auth-token': token,
//             },
//           }
//         );
//         const ltlResponse = await axios.get(
//           `http://localhost:5000/ltlShipment/my-shipment-list`,
//           {
//             headers: {
//               'Content-Type': 'application/json',
//               'x-auth-token': token,
//             },
//           }
//         );

//         const result = basicResponse?.data?.result?.map((item) => countDifferentSizeBoxes(item?.labelDetail?.packages || 0));
//         console.log(result);
//         setShipmentData(basicResponse?.data?.result?.slice(0, 7));
//         setLTLTableData(ltlResponse?.data?.data);
//         setLoading(false);
//       };

//       fetchBasicShipmentData();
//     } catch (error) {
//       console.log(error);
//     }
//   }, []);




//   const chartOptions = {
//     series: [
//       {
//         name: 'Box1',
//         data: [1, 2, 5, 4, 8, 4,1,5,8,5,6,12],
//       },
//       {
//         name: 'Box2',
//         data: [5, 2, 3, 4],
//       },
//       {
//         name: 'Box3',
//         data: [21, 8, 9, 4],
//       },
//       {
//         name: 'Box4',
//         data: [17, 18, 7, 4],
//       },
//     ],
//     chart: {
//       type: 'bar',
//       height: 350,
//       stacked: true,
//       toolbar: {
//         show: true
//       },
//       zoom: {
//         enabled: true
//       }
//     },
//     responsive: [{
//       breakpoint: 480,
//       options: {
//         legend: {
//           position: 'bottom',
//           offsetX: -10,
//           offsetY: 0
//         }
//       }
//     }],
//     plotOptions: {
//       bar: {
//         horizontal: false,
//         borderRadius: 10,
//         dataLabels: {
//           total: {
//             enabled: true,
//             style: {
//               fontSize: '13px',
//               fontWeight: 900
//             }
//           }
//         }
//       },
//     },
//     xaxis: {
//       categories: [
//         'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
//       ],
//     },
//     fill: {
//       opacity: 1,
//     },
//     colors: ['#80c7fd', '#008FFB', '#80f1cb', '#00E396'],
//     yaxis: {
//       labels: {
//         formatter: (val) => {
//           return (val / 1000).toFixed(2) + '%'; // Display percentages with two decimal places
//         },
//       },
//     },
//     dataLabels: {
//       formatter: (val, opts) => {
//         return (val / opts.w.globals.seriesTotals[opts.seriesIndex]).toFixed(2) + '%'; // Calculate and display percentage of each series
//       },
//     },
//     legend: {
//       position: 'top',
//       horizontalAlign: 'left',
//     },
//   };

//   return (
//     <div className=' border border-gray-300 rounded'>
//       <h1 className="graph-box bg-[#3A9BA5] py-1 mb-0 text-center text-white">
//         Usage of boxes
//       </h1>
//       <ReactApexChart
//         options={chartOptions}
//         series={chartOptions.series}
//         type="bar"
//         height={400}
//       />
//     </div>
//   );
// };

// export default GroupedStackBar;

import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { populateMonthsForCharts } from '../../utils/populateMonthsForCharts';



const GroupedStackBar = () => {
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

  // const doubleBarChartOptions = {
  //   chart: {
  //     type: 'bar',
  //   },
  //   xaxis: {
  //     categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  //   },
  //   plotOptions: {
  //     bar: {
  //       horizontal: false,
  //       columnWidth: '50%',
  //       endingShape: 'rounded',
  //     },
  //   },
  //   dataLabels: {
  //     enabled: false,
  //   },
  //   series: [
  //     {
  //       name: 'Basic Shipments',
  //       data: [...packageCount?.map((item) => item.count)],
  //     },
  //     {
  //       name: 'LTL Shipments',
  //       data: [...ltlPackageCount?.map((item) => item.count)],
  //     },
  //   ],

  //   responsive: [
  //     {
  //       breakpoint: 1367,
  //       options: {
  //         chart: {
  //           height: '250',
  //         },
  //       },
  //     },

  //     {
  //       breakpoint: 1921,
  //       options: {
  //         chart: {
  //           height: '350',
  //         },
  //       },
  //     },
  //   ],
  // };

  const chartOptions = {
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
    <div className='rounded border border-gray-400'>
      <h1 className="graph-box bg-[#3A9BA5] py-1 mb-0 text-center text-white">
        Usage of Boxes
      </h1>
      {/* <ReactApexChart
        options={doubleBarChartOptions}
        series={doubleBarChartOptions.series}
        type="bar"
        height={250}
      /> */}
      <ReactApexChart
        options={chartOptions}
        series={chartOptions.series}
        type="bar"
        height={250}
      />
    </div>
  );
};

export default GroupedStackBar;
