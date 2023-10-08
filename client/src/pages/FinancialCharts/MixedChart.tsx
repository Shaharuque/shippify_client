import React, { useEffect, useState } from 'react';
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
import axios from 'axios';
import { populateMonthsForCharts } from '../../utils/populateMonthsForCharts';

const MixedChart = () => {
    const [packageCount, SetPackageCount] = useState<any[]>([]);
    const [ltlPackageCount, setLtlPackageCount] = useState<any[]>([]);
    const [totalPaidByMonth, setTotalPaidByMonth] = useState<any[]>([]);

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
                    setTotalPaidByMonth(populateMonthsForCharts(responseOne?.data?.totalPaidAmountByMonth));
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

    console.log(totalPaidByMonth)

    return (
        <div className="bar border border-gray-300 rounded">
            <h1 className="graph-box bg-[#3A9BA5] py-1 mb-0 text-center text-white">
                Total Payment
            </h1>
            <Bar
                className="chart p-2"
                data={{
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [
                        {
                            type: 'line' as const,
                            label: 'Total Paid',
                            borderColor: 'rgb(255, 99, 132)',
                            borderWidth: 2,
                            fill: false,
                            data: [...totalPaidByMonth?.map((item) => item.count)],
                            yAxisID: 'y-axis-2', // Assign to the second y-axis
                        },
                        {
                            label: "Basic Shipping",
                            data: [...packageCount?.map((item) => item.count)],
                            backgroundColor: "#56BBF1",
                            barThickness: 10,
                            yAxisID: 'y-axis-1', // Assign to the first y-axis
                        },
                        {
                            label: "LTL Shipping",
                            data: [...ltlPackageCount?.map((item) => item.count)],
                            backgroundColor: "#6CC4A1",
                            barThickness: 10,
                            yAxisID: 'y-axis-1', // Assign to the first y-axis
                        },
                    ],
                }}
                options={{
                    tooltips: {
                        mode: "index",
                        callbacks: {
                            label: function (toolTipItem) {
                                return "Revenue: $" + toolTipItem.value;
                            },
                        },
                    },
                    scales: {
                        x: {
                            grid: {
                                color: "cyan",
                            },
                            scaleLabel: {
                                labelString: "Months",
                                display: true,
                                fontColor: "blue",
                                fontSize: 20,
                            },
                            ticks: {
                                fontColor: "green",
                            },
                        },
                        y: {
                            suggestedMax: 10000,
                            grid: {
                                color: "cyan",
                            },
                            scaleLabel: {
                                labelString: "Revenue",
                                display: true,
                                fontColor: "blue",
                                fontSize: 20,
                            },
                            ticks: {
                                beginAtZero: true,
                                fontColor: "green",
                            },
                        },
                        y2: {
                            position: 'right',
                            grid: {
                                color: "cyan",
                            },
                            scaleLabel: {
                                labelString: "Total Paid",
                                display: true,
                                fontColor: "blue",
                                fontSize: 20,
                            },
                            ticks: {
                                beginAtZero: true,
                                fontColor: "red",
                            },
                        },
                    },
                }}
            ></Bar>
        </div>
    );
};

export default MixedChart;
