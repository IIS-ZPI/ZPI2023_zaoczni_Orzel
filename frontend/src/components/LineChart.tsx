import React from "react";
import { Line } from "react-chartjs-2";

type LineChartProps = {
    values: number[];
    labels: string[];
}

const LineChart: React.FC<LineChartProps> = ({ values, labels }) =>{
    return <Line
    style={{padding: "0px 10px"}}
    data={{ datasets: [{ data: values, borderColor: "#1B59F8", pointRadius: 0} ], labels: labels} }
    options={{
      plugins: {
        title: {
          display: false,
        },
        legend: {
          display: false
        },
      },
      scales: {
        x: {
            grid: {
                display: false
            },
            border: {
                display: false
              },
              ticks: {
                maxRotation: 90,
                minRotation: 90
              }
        },
        y: {
            grid: {
                display: false
            },
            border: {
                display: false
              },
        },
      }
    }}
  />;
}

export default LineChart;