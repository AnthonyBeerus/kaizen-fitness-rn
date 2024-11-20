// ThemedVerticalContainer.tsx
import React from "react";
import { ViewStyle, TextStyle, StyleSheet } from "react-native";
import { ThemedView, ThemedViewProps } from "../ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";


type ThemedVerticalContainerProps = ThemedViewProps & {
  style?: ViewStyle;
  textStyle?: TextStyle;
  lightColor?: string;
  darkColor?: string;
};

export const ThemedVerticalContainer: React.FC<
  ThemedVerticalContainerProps
> = ({ style, lightColor, darkColor, ...otherProps }) => {
  const containerBackgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "containerBackground"
  );

  const padding = 0;
  const margin = 0;
  const borderRadius = 12;

  return (
    <ThemedView
      lightColor={lightColor}
      darkColor={darkColor}
      style={[
        styles.box,
        {
          padding,
          margin,
          borderRadius,
          backgroundColor: containerBackgroundColor,
        },
        style,
      ]}
      {...otherProps}
    />
  );
};

const styles = StyleSheet.create({
  box: {
    width: "100%", // Width for vertical layout
    height: 200, // Fixed height for both containers
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
});
