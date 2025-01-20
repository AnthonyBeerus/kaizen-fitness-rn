import { format } from "date-fns";
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SingleBarChart, type Day } from "./single-bar-chart";
import React, { useRef, useState, useEffect } from "react";
import { IconButton } from "react-native-paper";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  withSequence,
  withTiming,
  useSharedValue,
} from "react-native-reanimated";
import { SegmentedControl } from "../SegmentedControl";
import { ThemedText } from "../ThemedText";
import { data } from "@/constants/bar-chart-data";

type Week = Day[];

type WeeklyBarChartProps = {
  weeks: Week[];
  activeWeekIndex: number;
  onWeekChange: (index: number) => void;
  lightColor?: string;
  darkColor?: string;
};

const options = ["Volume", "Sets", "Duration"];

export const WeeklyBarChart = ({
  weeks,
  activeWeekIndex,
  onWeekChange,
  lightColor,
  darkColor,
}: WeeklyBarChartProps) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const { width: windowWidth } = useWindowDimensions();
  const activeWeek = weeks[activeWeekIndex];
  const opacity = useSharedValue(1);
  const [displayedWeekIndex, setDisplayedWeekIndex] = useState(activeWeekIndex);

  const BarChartWidth = windowWidth * 0.8;
  const BarChartGap = 10;
  const BarWidth =
    (BarChartWidth - BarChartGap * (activeWeek.length - 1)) / activeWeek.length;
  const MaxBarHeight = 120;
  const ScrollViewHeight = 70;
  const activeWeekData = data[0]; 

  const handlePrevWeek = () => {
    const newIndex = Math.max(0, activeWeekIndex - 1);
    if (newIndex !== activeWeekIndex) {
      opacity.value = withSequence(
        withTiming(0, { duration: 150 }),
        withTiming(1, { duration: 150 })
      );
      // Update the displayed text after fade out
      setTimeout(() => {
        setDisplayedWeekIndex(newIndex);
      }, 150);
      onWeekChange(newIndex);
    }
  };

  const handleNextWeek = () => {
    const newIndex = Math.min(weeks.length - 1, activeWeekIndex + 1);
    if (newIndex !== activeWeekIndex) {
      opacity.value = withSequence(
        withTiming(0, { duration: 150 }),
        withTiming(1, { duration: 150 })
      );
      // Update the displayed text after fade out
      setTimeout(() => {
        setDisplayedWeekIndex(newIndex);
      }, 150);
      onWeekChange(newIndex);
    }
  };

  const iconColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "icon"
  );

   const backgroundColor = useThemeColor(
     { light: lightColor, dark: darkColor },
     "background"
   );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  // Update displayed week when activeWeekIndex changes from outside
  useEffect(() => {
    if (activeWeekIndex !== displayedWeekIndex) {
      opacity.value = withSequence(
        withTiming(0, { duration: 150 }),
        withTiming(1, { duration: 150 })
      );
      setTimeout(() => {
        setDisplayedWeekIndex(activeWeekIndex);
      }, 150);
    }
  }, [activeWeekIndex]);


    const [selectedOption, setSelectedOption] = useState("Volume");

  return (
    <View
      style={{
        height: ScrollViewHeight + MaxBarHeight,
        width: windowWidth,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 80,
      }}>
      <View
        style={{
          height: MaxBarHeight,
          flexDirection: "row",
          gap: BarChartGap,
          alignItems: "flex-end",
          marginHorizontal: (windowWidth - BarChartWidth) / 2,
        }}>
        {activeWeek.map((day, index) => (
          <View style={{ width: BarWidth, flexDirection: "column" }} key={index}>
            <ThemedText style={{ textAlign: "center" }}>
              {day.value}
            </ThemedText>
            <SingleBarChart
              key={index}
              maxHeight={MaxBarHeight}
              width={BarWidth}
              day={day}
            />
          </View>
          
        ))}
      </View>

      <View
        style={{
          width: windowWidth,
          height: ScrollViewHeight,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}>
        <IconButton
          icon={(props) => <ArrowLeft2 {...props} />}
          theme={{ colors: { primary: iconColor } }}
          mode="contained"
          style={{
            position: "absolute",
            left: 80,
            borderRadius: 10,
            margin: 0,
            backgroundColor: backgroundColor,
            opacity: activeWeekIndex === 0 ? 0.5 : 1,
            zIndex: 1,
          }}
          disabled={activeWeekIndex === 0}
          onPress={handlePrevWeek}
        />

        <Animated.View style={animatedStyle}>
          <ThemedText style={styles.label}>
            week of {format(weeks[displayedWeekIndex][0].day, "d MMMM")}
          </ThemedText>
        </Animated.View>

        <IconButton
          icon={(props) => <ArrowRight2 {...props} />}
          theme={{ colors: { primary: iconColor } }}
          mode="contained"
          style={{
            position: "absolute",
            right: 80,
            borderRadius: 10,
            margin: 0,
            backgroundColor: backgroundColor,
            opacity: activeWeekIndex === weeks.length - 1 ? 0.5 : 1,
            zIndex: 1,
          }}
          disabled={activeWeekIndex === weeks.length - 1}
          onPress={handleNextWeek}
        />
      </View>
      <SegmentedControl
        options={options}
        selectedOption={selectedOption}
        onOptionPress={setSelectedOption}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 20,
    fontFamily: "FiraCode-Regular",
  },
});
