// ThemedVerticalContainer.tsx
import React from "react";
import { ViewStyle, TextStyle, StyleSheet } from "react-native";
import { ThemedView, ThemedViewProps } from "../ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";

const Colors = {
  light: {
    containerBackground: "#F5F5F5",
  },
  dark: {
    containerBackground: "#1A1A1A",
  },
};

type ThemedVerticalContainerProps = ThemedViewProps & {
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export const ThemedVerticalContainer: React.FC<
  ThemedVerticalContainerProps
> = ({ style, lightColor, darkColor, ...otherProps }) => {
  const containerBackgroundColor = useThemeColor(
    {
      light: Colors.light.containerBackground,
      dark: Colors.dark.containerBackground,
    },
    "background"
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
