import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

type SegmentedControlProps = {
  options: string[];
  selectedOption: string;
  onOptionPress?: (option: string) => void;
  lightColor?: string;
  darkColor?: string;
};

const SegmentedControl: React.FC<SegmentedControlProps> = React.memo(
  ({ options, selectedOption, onOptionPress, lightColor, darkColor }) => {
    const { width: windowWidth } = useWindowDimensions();

    const internalPadding = 20;
    const segmentedControlWidth = windowWidth - 80;

    const itemWidth =
      (segmentedControlWidth - internalPadding) / options.length;

    const rStyle = useAnimatedStyle(() => {
      return {
        left: withTiming(
          itemWidth * options.indexOf(selectedOption) + internalPadding / 2
        ),
      };
    }, [selectedOption, options, itemWidth]);

    const activeBoxColor = useThemeColor(
      { light: lightColor, dark: darkColor },
      "containerBackground"
    );
    const containerColor = useThemeColor(
      { light: lightColor, dark: darkColor },
      "background"
    );
    const activeBoxShadow = useThemeColor(
      { light: lightColor, dark: darkColor },
      "brandColor"
    );
    

    return (
      <ThemedView
        style={[
          styles.container,
          {
            width: segmentedControlWidth,
            borderRadius: 10,
            paddingLeft: internalPadding / 2,
            backgroundColor: containerColor,
          },
        ]}
        variant={"default"}>
        <Animated.View
          style={[
            {
              width: itemWidth,
              shadowColor: activeBoxShadow,
              backgroundColor: activeBoxColor,
            },
            rStyle,
            styles.activeBox,
          ]}
        />
        {options.map((option) => {
          return (
            <TouchableOpacity
              onPress={() => {
                onOptionPress?.(option);
              }}
              key={option}
              style={[
                {
                  width: itemWidth,
                },
                styles.labelContainer,
              ]}>
              <ThemedText style={styles.label}>{option}</ThemedText>
            </TouchableOpacity>
          );
        })}
      </ThemedView>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 60,
  },
  activeBox: {
    position: "absolute",
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    elevation: 2,
    height: "80%",
    top: "10%",
  },
  labelContainer: { justifyContent: "center", alignItems: "center" },
  label: {
    fontFamily: "SF-Compact-Rounded-Medium",
    fontSize: 16,
  },
});

export { SegmentedControl };
