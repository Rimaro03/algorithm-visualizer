"use client"
import { useEffect } from "react";
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Box, Button } from "@mui/material";
import { SelectionSort } from "@/algorithms/arrays/sorting/selectionSort";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function generateRandomData(count: number, max: number) {
  return Array.from({ length: count }, () => Math.floor(Math.random() * max));
}

export default function Home() {
  const [data, setData] = React.useState<number[]>(generateRandomData(50, 100));
  const [colors, setColors] = React.useState<string[]>(Array(data.length).fill("black"));
  const [delay, setDelay] = React.useState(50);
  const [selectionSort, setSelectionSort] = React.useState<SelectionSort | null>(null);
  const [sorting, setSorting] = React.useState(false);

  const chartData = {
    labels: data,
    datasets: [{
      label: 'Valori',
      data: data,
      backgroundColor: colors,
    }],
  };

  useEffect(() => {
    setSelectionSort(new SelectionSort(data));
  }, [])

  /** COLORS:
 * Base color: black
 * Two items being compared: red
 * Items on their final position: green
 */

  function start() {
    const res = selectionSort!.setup();
    setData(res.array);
    let colorsArray = Array(res.leftBound).fill("green").concat(Array(data.length - res.leftBound).fill("black"));
    colorsArray[res.comparing[0]] = "red";
    colorsArray[res.comparing[1]] = "red";
    setColors(colorsArray);
    setSorting(true);
  }

  function nextMove() {
    const res = selectionSort!.nextMove();
    console.log(res);
    if (res.finished) return -1;
    setData(res.array);
    let colorsArray = Array(res.leftBound).fill("green").concat(Array(data.length - res.leftBound).fill("black"));
    colorsArray[res.comparing[0]] = "red";
    colorsArray[res.comparing[1]] = "red";
    setColors(colorsArray);
    return 0;
  }

  function startSorting() {
    setSorting(true);
    const id = setInterval(() => {
      const res = nextMove();
      if (res === -1) {
        clearInterval(id);
        setSorting(false);
      }
    }, delay);
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ position: "relative", height: "40vh", width: "80vh" }}>
        <Bar options={{
          responsive: true,
          maintainAspectRatio: true,
          animation: {
            duration: 100
          },
          scales: {
            y: {
              display: false,
            }
          }
        }} data={chartData} />
      </Box>
      <Button variant="contained" onClick={startSorting} disabled={sorting}>Start</Button>
    </Box>
  );
}
