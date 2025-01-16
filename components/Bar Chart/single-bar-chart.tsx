import { useThemeColor } from "@/hooks/useThemeColor";
import { format } from "date-fns";
import React from "react";
import { Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { ThemedText } from "../ThemedText";

export type Day = {
  day: Date;
  value: number; // 0 - 1
  normalizedValue: number;
};

type SingleBarChartProps = {
  maxHeight: number;
  width: number;
  day: Day;
  lightColor?: string;
    darkColor?: string;
};

export const SingleBarChart = ({
  maxHeight,
  width,
  day,
    lightColor,
    darkColor,
}: SingleBarChartProps) => {
  const rStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(maxHeight * day.normalizedValue),
      opacity: withTiming(day.normalizedValue),
    };
  }, [day.normalizedValue, maxHeight]);

  const barColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "brandColor"
  );

  return (
    <View>
      <Animated.View
        style={[
          {
            width: width,
            backgroundColor: barColor,
            borderRadius: 15,
            borderCurve: "continuous",
          },
          rStyle,
        ]}
      />
      <ThemedText
        style={{
          width: width,
          textAlign: "center",
          fontSize: 12,
          marginTop: 5,
          fontFamily: "FiraCode-Regular",
          textTransform: "lowercase",
        }}>
        {format(day.day, "eeeee")}
      </ThemedText>
    </View>
  );
};
