import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoenutChat = () => {
    const data = {
        labels: ['Basic', 'International', 'LTL'],
        datasets: [
          {
            label: '# of Votes',
            data: [43, 6, 5],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1,
          },
        ],
    };

    const options = {
        responsive: true, // Make the chart responsive
        maintainAspectRatio: false, // Disable aspect ratio maintenance
        plugins: {
            title: {
                display: true,
                text: 'Shipment Summary', // Add your chart title here
                fontSize: 16,
            },
            legend: {
                display: true,
                position: 'right', // Show legend on the right side
            },
        },
    };

    return (
        <div>
            <Doughnut data={data} options={options} />
        </div>
    );
};

export default DoenutChat;
