// ThemedMainContainer.tsx
import React from "react";
import { ViewStyle, TextStyle, StyleSheet } from "react-native";
import { ThemedView, ThemedViewProps } from "../ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";


type ThemedMainContainerProps = ThemedViewProps & {
  style?: ViewStyle;
  textStyle?: TextStyle;
  lightColor?: string;
  darkColor?: string;
};

export const ThemedMainContainer: React.FC<ThemedMainContainerProps> = ({
  style,
  textStyle,
  lightColor,
  darkColor,
  ...otherProps
}) => {
  const containerBackgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "containerBackground"
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
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
});
