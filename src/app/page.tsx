"use client"
import { useEffect } from "react";
import React from 'react';
import {Bar} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Home() {
  const [data, setData] = React.useState<number[]>([1, 10, 2, 9, 3, 8, 4, 7, 5, 6]);
  const chartData = {
    labels: data,
    datasets: [{
      label: 'Valori',
      data: data,
      backgroundColor: 'red',
    }],
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setData(data => {
        const newData = [...data];
        newData.push(newData.shift() as number);
        return newData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white flex justify-center align-center m-auto w-1/2">
      <Bar data={chartData}/>
    </section>
  );
}
