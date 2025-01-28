import React from "react";
import { Bar } from "react-chartjs-2";

type HistogramProps = {
  values: number[];
  labels: number[];
};

const getMiddlePoint = (v1: number, v2: number) => {
  return v1 + (v2 - v1) / 2;
};

const Histogram: React.FC<HistogramProps> = ({ values, labels }) => {
  const barPositions = values.map((_, index) =>
    getMiddlePoint(labels[index], labels[index + 1])
  );

  const dataset = {
    data: values.map((val, index) => ({ x: barPositions[index], y: val })),
    barPercentage: 0.2,
    categoryPercentage: 1.0,
    borderRadius: Number.MAX_VALUE,
    borderSkipped: false,
    backgroundColor: "rgba(27, 89, 248, 0.80)",
    labels: labels,
  };

  const maxVal = Math.max(...values);
  const bgDataset = {
    data: values.map((_, index) => ({ x: barPositions[index], y: maxVal })),
    barPercentage: 0.2,
    categoryPercentage: 1.0,
    borderRadius: Number.MAX_VALUE,
    borderSkipped: false,
    backgroundColor: "#F2F7FF",
  };

  const minLabel = Math.min(...labels);
  const maxLabel = Math.max(...labels);

  return (
    <Bar
      style={{ padding: "0px 10px" }}
      data={{ datasets: [dataset, bgDataset] }}
      options={{
        plugins: {
          title: {
            display: false,
          },
          legend: {
            display: false,
          },
        },

        events: [],
        scales: {
          x: {
            stacked: true,
            border: {
              display: false,
            },
            grid: {
              display: false,
            },
            offset: false,
            type: "linear",
            position: "bottom",
            min: minLabel,
            max: maxLabel,
            ticks: {
              sampleSize: labels.length + 1,
              maxTicksLimit: labels.length + 1,
              stepSize: 0.4,
              autoSkip: false,
              callback: (_, index) => labels[index],
            },
          },
          y: {
            border: {
              display: false,
            },
            grid: {
              display: false,
            },
          },
        },
      }}
    />
  );
};

export default Histogram;
