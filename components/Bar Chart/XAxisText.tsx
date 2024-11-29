import React from "react";
import { Text, useFont } from "@shopify/react-native-skia";
import {
  SharedValue,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { useThemeColor } from "@/hooks/useThemeColor";

type Props = {
  x: number;
  y: number;
  text: string;
  selectedBar: SharedValue<string | null>;
};

const XAxisText = ({ x, y, text, selectedBar }: Props) => {
  const font = useFont(require("../../assets/fonts/SpaceMono-Regular.ttf"), 18);

  const activeColor = useThemeColor(
    { light: "#111111", dark: "#FFFFFF" }, // Active text color
    "text"
  );
  const mutedColor = useThemeColor(
    { light: "#929BA0", dark: "#3D3D3D" }, // Muted text color
    "muted"
  );

  const color = useDerivedValue(() => {
    if (selectedBar.value === text) {
      return withTiming(activeColor);
    } else if (selectedBar.value === null) {
      return withTiming(activeColor);
    } else {
      return withTiming(mutedColor);
    }
  });

  if (!font) {
    return null;
  }

  const fontSize = font.measureText(text);

  return (
    <Text
      font={font}
      x={x - fontSize.width / 2}
      y={y}
      text={text}
      color={color}
    />
  );
};

export default XAxisText;
