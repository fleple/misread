import React from 'react';
import { Line } from 'react-chartjs-2';

const CoinChart = ({ coinId, dataHistory }) => {
  let grow = false;
  let historyArr;
  if(dataHistory.data) {
    historyArr = dataHistory.data;
    grow = historyArr[0] > historyArr[historyArr.length - 1] ? false : true;
  }

  const currentData = {
    labels: dataHistory.labels,
    datasets: [{
      label: coinId,
      data: dataHistory.data,
      backgroundColor: grow ? 'rgba(30, 230, 30,0.4)' : 'rgba(230, 30, 30,0.4)',
      borderColor: grow ? 'rgb(30, 130, 30)' : 'rgb(130, 30, 30)'
    }]
  }

  return (
    <Line
      data={currentData}
      options={{
        ticks: {
          fontSize: 15,
          beginAtZero: true,
          stepSize: 1
        },
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines: {
              drawOnChartArea: false
            }
          }],
          yAxes: [{
            gridLines: {
              drawOnChartArea: true
            }
          }]
        }
      }}
    />
  );
}

export default CoinChart;