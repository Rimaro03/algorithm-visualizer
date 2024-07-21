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
import { Box, Button, ButtonGroup, Divider, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Slider, Typography, useTheme } from "@mui/material";
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
  const [dataNumber, setDataNumber] = React.useState(50);
  const [data, setData] = React.useState<number[]>(generateRandomData(dataNumber, 100));
  const [colors, setColors] = React.useState<string[]>(Array(data.length).fill("black"));
  const [delay, setDelay] = React.useState(50);
  const [selectionSort, setSelectionSort] = React.useState<SelectionSort | null>(null);
  const [sorting, setSorting] = React.useState(false);
  const [stepByStep, setStepByStep] = React.useState(false);
  const theme = useTheme();

  const chartData = {
    labels: Array.from(Array(data.length).keys()),
    datasets: [{
      label: 'Valori',
      data: data,
      backgroundColor: colors,
    }],
  };

  useEffect(() => {
    setSelectionSort(new SelectionSort(data));
  }, [])

  useEffect(() => {
    setData(generateRandomData(dataNumber, 100));
    setColors(Array(dataNumber).fill("black"));
    if (selectionSort) {
      selectionSort.array = data;
    }
  }, [dataNumber]);

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
    if (res.finished) return -1;
    setData(res.array);
    let colorsArray = Array(res.leftBound).fill("green").concat(Array(data.length - res.leftBound).fill("black"));
    colorsArray[res.comparing[0]] = "red";
    colorsArray[res.comparing[1]] = "red";
    setColors(colorsArray);
    return 0;
  }

  function startSorting() {

    const id = setInterval(() => {
      const res = nextMove();
      if (res === -1) {
        clearInterval(id);
        setSorting(false);
      }
    }, delay);
  }

  function reset() {
    setData(generateRandomData(dataNumber, 100));
    setColors(Array(dataNumber).fill("black"));
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Box>
            <FormControl sx={{ width: "10vw", margin: 3 }}>
              <InputLabel id="demo-simple-select-label">Algorithm</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Algorithm"
                defaultValue={1}
              >
                <MenuItem value={1}>Selection Sort</MenuItem>
                <MenuItem value={2}>Insertion Sort</MenuItem>
                <MenuItem value={2}>Merge Sort</MenuItem>
                <MenuItem value={2}>Bubble Sort</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ position: "relative", height: "40vh", width: "80vw", display: "flex", justifyContent: "center" }} margin={2}>
            <Bar options={{
              responsive: true,
              maintainAspectRatio: true,
              animation: {
                duration: 100
              },
            }} data={chartData} />
          </Box>
        </Box>
        <Divider />
        <Box>
          <Typography variant="h6" margin={3}>Log tracer</Typography>
        </Box>
      </Box>
      <Divider orientation='vertical' flexItem />
      <Box sx={{ display: "flex", flexDirection: "column", height: "93vh", padding: 3 }}>
        <Typography variant="h6" padding={3}>Controls</Typography>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <FormControl sx={{ margin: 2 }}>
            <InputLabel id="demo-simple-select-label">Delay</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Delay"
              value={delay}
              onChange={(e) => setDelay(e.target.value as number)}
            >
              <MenuItem value={50}>50ms</MenuItem>
              <MenuItem value={100}>100ms</MenuItem>
              <MenuItem value={200}>200ms</MenuItem>
              <MenuItem value={500}>500ms</MenuItem>
              <MenuItem value={1000}>1s</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ margin: 2 }}>
            <FormLabel id="input-slider">Array length</FormLabel>
            <Slider
              defaultValue={dataNumber}
              value={dataNumber}
              onChange={(e, v) => setDataNumber(v as number)}
              aria-label="Default"
              valueLabelDisplay="auto" />
          </FormControl>
          <FormControl sx={{ margin: 2 }}>
            <FormLabel id="demo-row-radio-buttons-group-label">Sorting mode</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={stepByStep ? "step" : "auto"}
              onChange={(e) => setStepByStep(e.target.value === "step")}
            >
              <FormControlLabel value="auto" control={<Radio />} label="Automatic" />
              <FormControlLabel value="step" control={<Radio />} label="Step-by-step" />
            </RadioGroup>
          </FormControl>
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            {!stepByStep ?
              <Button variant="contained" color="primary" onClick={startSorting} disabled={sorting} sx={{ margin: 2 }}>Start</Button> :
              <Button variant="contained" color="primary" onClick={nextMove} disabled={sorting} sx={{ margin: 2 }}>Next move</Button>
            }

            <Button variant="contained" color="primary" onClick={reset} disabled={sorting} sx={{ margin: 2 }}>Reset</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
