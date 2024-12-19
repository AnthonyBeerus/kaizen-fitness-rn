import { useSharedValue, withTiming } from "react-native-reanimated";
import * as d3 from "d3";

export type BarChartData = { label: string; value: number };

export const useBarChartLogic = (
  data: BarChartData[],
  canvasWidth: number,
  canvasHeight: number
) => {
  const barWidth = 28;
  const graphHeight = canvasHeight - 20;

  const x = d3
    .scalePoint()
    .domain(data.map((d) => d.label))
    .range([0, canvasWidth])
    .padding(1);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.value) || 0])
    .range([0, graphHeight]);

  const progress = useSharedValue(0);
  const selectedBar = useSharedValue(null);

  const startAnimation = () => {
    progress.value = withTiming(1, { duration: 1000 });
  };

  return { x, y, barWidth, graphHeight, progress, selectedBar, startAnimation };
};
