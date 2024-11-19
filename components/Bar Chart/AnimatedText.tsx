import { useDerivedValue } from "react-native-reanimated";
import { Canvas, Text, useFont } from "@shopify/react-native-skia";
import { useThemeColor } from "@/hooks/useThemeColor";
import { SharedValue } from "react-native-reanimated";
import React from "react";

type Props = {
  selectedValue: SharedValue<number>;
};

const AnimatedText = ({ selectedValue }: Props) => {
  const font = useFont(require("../../assets/fonts/SpaceMono-Regular.ttf"), 88);

  const animatedText = useDerivedValue(() => {
    return `${Math.round(selectedValue.value)}`;
  });

  const color = useThemeColor(
    { light: "#111111", dark: "#FFFFFF" }, // Adjust colors as per your theme
    "text"
  );

  if (!font) {
    return null; // Or return a fallback component if needed
  }

  const fontSize = font.measureText("0");

  return (
    <Canvas style={{ height: fontSize.height + 40 }}>
      <Text
        text={animatedText}
        font={font}
        color={color}
        y={fontSize.height + 20}
      />
    </Canvas>
  );
};

export default AnimatedText;
