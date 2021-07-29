import React, { useContext, useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js';
import { SocketContext } from '../context/SocketContext';
import { Band } from '../interfaces/Band';

Chart.register( ...registerables );

export const BandChart = () => {

  const myChart = useRef<Chart<"bar", number[], string>>();
  const { socket } = useContext( SocketContext );

  useEffect(() => {
    socket.on('current-bands', ( bands ) => {
      crearGrafica( bands );
    });

    return () => {
      socket.off('current-bands')
    };
  }, [ socket ]);

  const crearGrafica = ( bands: Band[] ) => {
    const ctx = document.querySelector('#myChart') as HTMLCanvasElement;

    myChart.current?.destroy();
    
    myChart.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: bands.map( band => band.name ),
        datasets: [
          {
            label: '# of Votes',
            data: bands.map( band => band.votes ),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      // options: {
      //   scales: {
      //     y: {
      //       beginAtZero: true,
      //     },
      //   },
      // },
      options: {
        indexAxis: 'y',
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        elements: {
          bar: {
            borderWidth: 2,
          }
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Chart.js Horizontal Bar Chart'
          }
        }
      },
    });
  }

  return (
    <canvas id="myChart"></canvas>
  )
}