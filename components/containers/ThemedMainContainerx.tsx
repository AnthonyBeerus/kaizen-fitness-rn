// ThemedMainContainer.tsx
import React from "react";
import { ViewStyle, TextStyle, StyleSheet } from "react-native";
import { ThemedView, ThemedViewProps } from "../ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";

const Colors = {
  light: {
    containerBackground: "#F5F5F5", // Light container background
  },
  dark: {
    containerBackground: "#1A1A1A", // Dark container background
  },
};

type ThemedMainContainerProps = ThemedViewProps & {
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export const ThemedMainContainer: React.FC<ThemedMainContainerProps> = ({
  style,
  textStyle,
  lightColor,
  darkColor,
  ...otherProps
}) => {
  const containerBackgroundColor = useThemeColor(
    {
      light: Colors.light.containerBackground,
      dark: Colors.dark.containerBackground,
    },
    "background"
  );

  const padding = 20;
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
    width: "100%", // This ensures it takes full width, we can adjust this in specific use cases
    justifyContent: "center",
    alignItems: "center",
  },
});
