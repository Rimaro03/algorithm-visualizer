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
import { Box, Button, ButtonGroup, Divider, FormControl, FormControlLabel, FormLabel, InputLabel, List, ListItem, ListItemIcon, ListItemText, MenuItem, Radio, RadioGroup, Select, Slider, Typography, useTheme } from "@mui/material";
import { SelectionSort } from "@/algorithms/arrays/sorting/selectionSort";
import { SortingAlgorithm } from "@/algorithms/types";
import InfoIcon from '@mui/icons-material/Info';
import { InsertionSort } from "@/algorithms/arrays/sorting/insertionSort";
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
  // States and variables
  const theme = useTheme();
  const [dataNumber, setDataNumber] = React.useState(10);
  const [data, setData] = React.useState<number[]>(generateRandomData(dataNumber, 100));
  const [colors, setColors] = React.useState<string[]>(Array(data.length).fill(theme.palette.text.primary));
  const [delay, setDelay] = React.useState(50);
  const [sorting, setSorting] = React.useState(false);
  const [stepByStep, setStepByStep] = React.useState(false);
  const [id, setId] = React.useState<NodeJS.Timeout | null>(null);
  const [sortingAlgorithm, setSortingAlgorithm] = React.useState<SortingAlgorithm | null>(null);
  const [logs, setLogs] = React.useState<string[]>([]);

  const chartData = {
    labels: Array.from(Array(data.length).keys()),
    datasets: [{
      label: 'Valori',
      data: data,
      backgroundColor: colors,
    }],
  };

  // Hooks
  useEffect(() => {
    setSortingAlgorithm(new SelectionSort());
  }, []);

  useEffect(() => {
    setData(generateRandomData(dataNumber, 100));
    setColors(Array(dataNumber).fill(theme.palette.text.primary));
  }, [dataNumber]);

  useEffect(() => {
    setColors(Array(data.length).fill(theme.palette.text.primary));
  }, [theme]);

  // Functions

  /** COLORS:
 * Base color: black
 * Two items being compared: red
 * Items on their final position: green
 */
  function nextMove() {
    if (!sorting) {
      sortingAlgorithm!.array = data;
      setSorting(true);
    }
    let res = sortingAlgorithm!.nextMove();
    let newLogs = res.logs;
    setLogs(newLogs);
    console.log(res);
    if (res.finished) {
      setSorting(false);
      sortingAlgorithm!.setup();
      return -1;
    };
    setData(res.array);
    let colorsArray = Array(res.leftBound).fill("green").concat(Array(data.length - res.leftBound).fill(theme.palette.text.primary));
    colorsArray[res.comparing[0]] = "red";
    colorsArray[res.comparing[1]] = "red";
    setColors(colorsArray);
    return 0;
  }

  function startSorting() {
    // Sorting not in progress
    if (!sorting) {
      sortingAlgorithm!.array = data;
      setSorting(true);
    }
    const intervalId = setInterval(() => {
      setId(intervalId);
      const res = nextMove();
      if (res === -1) {
        setSorting(false);
        clearInterval(intervalId);
      }
    }, delay)
  }

  function reset() {
    clearInterval(id!);
    const genData = generateRandomData(dataNumber, 100)
    setData(genData);
    sortingAlgorithm!.array = genData;
    sortingAlgorithm!.setup();
    setLogs([]);
    setColors(Array(20).fill(theme.palette.text.primary));
    setSorting(false);
  }

  function changeAlgorithm(algorithmChoice: number) {
    switch (algorithmChoice) {
      case 1:
        setSortingAlgorithm(new SelectionSort());
        break;
      case 2:
        setSortingAlgorithm(new InsertionSort());
        break;
      default:
        setSortingAlgorithm(new SelectionSort());
        break
    }
    reset();
  }

  // Render
  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {/*Chart section*/}
          <Box sx={{ position: "relative", height: { xs: "30vh", md: "40vh" }, width: { xs: "90vw", md: "70vw" }, display: "flex", justifyContent: "center", p: 2 }} margin={2}>
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

        {/*Logs section*/}
        <Box sx={{ display: { xs: "none", md: "flex" }, flexDirection: "column" }}>
          <Typography variant="h6" margin={3}>Log tracer</Typography>
          <List sx={{ height: "50vh", overflowY: "scroll", m: 2 }}>
            {logs.map((log, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary={log} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
      <Divider orientation='vertical' flexItem />

      {/*Controls section*/}
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%", padding: 3 }}>
        <Typography variant="h6" padding={3}>Controls</Typography>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", flexDirection: { md: "column", lg: "row" }, justifyContent: "space-between" }}>
            <FormControl sx={{ width: "100%", margin: 2 }} disabled={sorting}>
              <InputLabel id="demo-simple-select-label">Algorithm</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Algorithm"
                defaultValue={1}
                onChange={(e) => changeAlgorithm(e.target.value as number)}
              >
                <MenuItem value={1}>Selection Sort</MenuItem>
                <MenuItem value={2}>Insertion Sort</MenuItem>
                <MenuItem value={3}>Merge Sort</MenuItem>
                <MenuItem value={4}>Bubble Sort</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: "100%", margin: 2 }} disabled={sorting || stepByStep}>
              <InputLabel id="demo-simple-select-label">Delay</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Delay"
                value={delay}
                onChange={(e) => setDelay(e.target.value as number)}
              >
                <MenuItem value={20}>20ms</MenuItem>
                <MenuItem value={50}>50ms</MenuItem>
                <MenuItem value={100}>100ms</MenuItem>
                <MenuItem value={200}>200ms</MenuItem>
                <MenuItem value={500}>500ms</MenuItem>
                <MenuItem value={1000}>1s</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <FormControl sx={{ margin: 2 }}>
            <FormLabel id="input-slider">Array length</FormLabel>
            <Slider
              defaultValue={dataNumber}
              value={dataNumber}
              onChange={(e, v) => setDataNumber(v as number)}
              aria-label="Default"
              valueLabelDisplay="auto"
              disabled={sorting}
            />
          </FormControl>
          <FormControl sx={{ margin: 2 }} disabled={sorting}>
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
              <>
                <Button variant="contained" color="primary" onClick={startSorting} disabled={sorting} sx={{ margin: 2, width: "100%" }}>Start</Button>
              </> :
              <Button variant="contained" color="primary" onClick={nextMove} sx={{ margin: 2, width: "100%" }}>Next move</Button>
            }
            <Button variant="contained" color="primary" onClick={reset} sx={{ margin: 2, width: "100%" }}>Reset</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
