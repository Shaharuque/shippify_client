import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';
import { populateMonthsForCharts } from '../../utils/populateMonthsForCharts';

Chart.register(...registerables);

const StackedBar = () => {
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

                if (responseOne?.data?.status === 'success') {
                    SetPackageCount(populateMonthsForCharts(responseOne?.data?.result));
                }

                const responseTwo = await axios.get(
                    'http://localhost:5000/ltlShipment/each/month/package/number',
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'x-auth-token': token,
                        },
                    }
                );

                if (responseTwo?.data?.status === 'success') {
                    setLtlPackageCount(populateMonthsForCharts(responseTwo?.data?.result))
                };

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchTimeSeriesChartData();
    }, []);

    return (
        <div className="bar  border border-gray-300 rounded">
            <h1 className="graph-box bg-[#3A9BA5] py-1 mb-0 text-center text-white">
                Total Shipment vs Month
            </h1>
            <Bar
                className="chart p-2"
                data={{
                    labels: [
                        'Jan',
                        'Feb',
                        'Mar',
                        'Apr',
                        'May',
                        'Jun',
                        'Jul',
                        'Aug',
                        'Sep',
                        'Oct',
                        'Nov',
                        'Dec',
                    ],
                    datasets: [
                        {
                            label: 'Basic Shipping',
                            data: packageCount?.map((item) => item.count),
                            backgroundColor: '#56BBF1',
                            barThickness: 10,
                        },
                        {
                            label: 'LTL Shipping',
                            data: ltlPackageCount?.map((item) => item.count),
                            backgroundColor: '#6CC4A1',
                            barThickness: 10,
                        },
                    ],
                }}
                options={{
                    tooltips: {
                        mode: 'index',
                        callbacks: {
                            label: function (toolTipItem) {
                                return 'Count: ' + toolTipItem.value;
                            },
                        },
                    },
                    scales: {
                        x: {
                            grid: {
                                color: 'cyan',
                            },
                            scaleLabel: {
                                labelString: 'Months',
                                display: true,
                                fontColor: 'blue',
                                fontSize: 20,
                            },
                            ticks: {
                                fontColor: 'green',
                            },
                        },
                        y: {
                            stacked: true, // Make the y-axis stacked
                            grid: {
                                color: 'cyan',
                            },
                            scaleLabel: {
                                labelString: 'Count',
                                display: true,
                                fontColor: 'blue',
                                fontSize: 20,
                            },
                            ticks: {
                                beginAtZero: true,
                                fontColor: 'green',
                            },
                        },
                    },
                }}
            ></Bar>
        </div>
    );
};

export default StackedBar;
