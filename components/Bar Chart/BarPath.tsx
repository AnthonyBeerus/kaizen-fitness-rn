import React from "react";
import { Path, Skia } from "@shopify/react-native-skia";
import {
  SharedValue,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { useThemeColor } from "@/hooks/useThemeColor";

type Props = {
  x: number;
  y: number;
  barWidth: number;
  progress: SharedValue<number>;
  graphHeight: number;
  label: string;
  selectedBar: SharedValue<string | null>;
};

const BarPath = ({
  x,
  y,
  progress,
  barWidth,
  graphHeight,
  label,
  selectedBar,
}: Props) => {

  const activeColor = useThemeColor(
    { light: "#F04444", dark: "#F04444" }, // Active text color
    "text"
  );
  const mutedColor = useThemeColor(
    { light: "#d1d0c5", dark: "#1A1A1A" }, // Muted text color
    "muted"
  );

  const color = useDerivedValue(() => {
    if (selectedBar.value === label) {
      return withTiming(activeColor);
    } else if (selectedBar.value === null) {
      return withTiming(activeColor);
    } else {
      return withTiming(mutedColor);
    }
  });

  const path = useDerivedValue(() => {
    const barPath = Skia.Path.Make();

    barPath.addRRect({
      rect: {
        x: x - barWidth / 2,
        y: graphHeight,
        width: barWidth,
        height: y * progress.value * -1,
      },
      rx: 8,
      ry: 8,
    });

    return barPath;
  });

  return <Path path={path} color={color} />;
};

export default BarPath;
