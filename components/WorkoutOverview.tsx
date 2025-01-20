import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import { ThemedView } from "./ThemedView";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { ThemedVerticalContainer } from "./containers/ThemeVerticalContainer";
import { ThemedHorizontalContainer } from "./containers/ThemeHorizontalContainer";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "./ThemedText";
import { FlashList } from "@shopify/flash-list";
import { ThemedMainContainer } from "./containers/ThemedMainContainerx";
import ThemedButton from "./ThemedButton";
import { color } from "d3";
import { Button, Card, Icon, IconButton, PaperProvider } from "react-native-paper";
import {
  Play,
  Edit,
  EmojiHappy,
  EmojiNormal,
  Happyemoji,
  Edit2,
} from "iconsax-react-native";
import VerticalSlider from "rn-vertical-slider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { router } from "expo-router";

const DATA = [
  { id: "1", title: "Chest Press", subTitle: "Chest Triceps", set_reps: "3x8" },
  {
    id: "2",
    title: "Dumbell Rows",
    subTitle: "Back, Biceps",
    set_reps: "3x12",
  },
  { id: "3", title: "Squats", subTitle: "Legs", set_reps: "3x10" },
];

type WorkoutOverviewProps = {
  lightColor?: string;
  darkColor?: string;
};

export const WorkoutOverview: React.FC<WorkoutOverviewProps> = ({
  lightColor,
  darkColor,
}) => {
  const iconColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "brandColor"
  );

  const brandColorIcon = useThemeColor(
    { light: Colors.dark.text, dark: Colors.dark.text },
    "text"
  );

  const pillContainerColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "fadedText"
  );

  const containerColor = useThemeColor(
    {
      light: Colors.light.containerBackground,
      dark: Colors.dark.containerBackground,
    },
    "containerBackground"
  );

  const incontainerColor = useThemeColor(
    {
      light: lightColor,
      dark: darkColor,
    },
    "inContainerBackground"
  );

  const brandColor = useThemeColor(
    { light: Colors.light.brandColor, dark: Colors.dark.brandColor },
    "brandColor"
  );

  const inverseButtonColor = useThemeColor(
    {
      light: Colors.dark.background,
      dark: Colors.light.background,
    },
    "text"
  );

  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    "background"
  );

  const [value, setValue] = useState(0);
  const [vertValue, setVertValue] = useState(0);

  // Utility to interpolate colors
  const interpolateColor = (
    value: number,
    min: number,
    max: number,
    colors: string[]
  ) => {
    const range = max - min;
    const relativeValue = (value - min) / range;

    if (relativeValue <= 0.5) {
      // Blend between colors[0] (blue) and colors[1] (green)
      const weight = relativeValue * 2; // Scale 0–0.5 to 0–1
      return blendColors(colors[0], colors[1], weight);
    } else {
      // Blend between colors[1] (green) and colors[2] (red)
      const weight = (relativeValue - 0.5) * 2; // Scale 0.5–1 to 0–1
      return blendColors(colors[1], colors[2], weight);
    }
  };

  // Linear color blending
  const blendColors = (color1: string, color2: string, weight: number) => {
    const c1 = parseInt(color1.slice(1), 16); // Convert hex to int
    const c2 = parseInt(color2.slice(1), 16);

    const r1 = (c1 >> 16) & 0xff;
    const g1 = (c1 >> 8) & 0xff;
    const b1 = c1 & 0xff;

    const r2 = (c2 >> 16) & 0xff;
    const g2 = (c2 >> 8) & 0xff;
    const b2 = c2 & 0xff;

    const r = Math.round(r1 + (r2 - r1) * weight);
    const g = Math.round(g1 + (g2 - g1) * weight);
    const b = Math.round(b1 + (b2 - b1) * weight);

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  const trackColor = interpolateColor(value, 1, 5, [
    "#449AF0",
    "#F5B257",
    brandColor,
  ]);

  return (
    <ThemedView variant={"default"} style={{ gap: 0, paddingVertical: 0 }}>
      <ThemedView
        variant={"default"}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
        <ThemedText type={"smallTitle"} style={{ paddingVertical: 10 }}>
          Today's Workout
        </ThemedText>
        <Button
          icon={(props) => <Edit {...props} />}
          theme={{ colors: { primary: iconColor } }}
          mode="text"
          contentStyle={{ flexDirection: "row-reverse" }}
          style={{
            borderRadius: 10,
            justifyContent: "center",
          }}
          onPress={() => router.push("../../../workout/routine-details")}>
          <ThemedText style={{ color: brandColor }}>View Details</ThemedText>
        </Button>
      </ThemedView>
      <ThemedView variant="default" style={styles.workoutOverview}>
        <ThemedVerticalContainer
          variant="default"
          style={styles.verticalContainer}>
          <ThemedText type="smallSubtitle">Intensity</ThemedText>
          <VerticalSlider
            value={value}
            onChange={(value) => setValue(value)}
            height={150}
            width={40}
            step={0.1}
            min={1}
            max={5}
            borderRadius={5}
            minimumTrackTintColor={trackColor}
            maximumTrackTintColor={backgroundColor}
            showIndicator={true}
            containerStyle={{
              backgroundColor: backgroundColor,
              borderRadius: 10,
            }}
            sliderStyle={{
              backgroundColor: backgroundColor,
              borderRadius: 5,
              width: 40,
              height: 180,
            }}
          />
        </ThemedVerticalContainer>
        <View style={[{ backgroundColor: containerColor }, styles.rightColumn]}>
          <FlashList
            data={DATA}
            renderItem={({ item }) => (
              <Card
                style={{
                  borderRadius: 10,
                  margin: 10,
                  backgroundColor: containerColor,
                }}>
                <ThemedHorizontalContainer
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    height: 66,
                    backgroundColor: containerColor,
                  }}
                  variant={"default"}>
                  <ThemedView
                    variant={"transparent"}
                    style={[
                      styles.pillContainer,
                      { backgroundColor: pillContainerColor },
                    ]}></ThemedView>
                  <ThemedView variant={"transparent"} style={{ flex: 10 }}>
                    <ThemedText
                      type="smallTitle"
                      style={{
                        paddingTop: 20,
                        paddingLeft: 20,
                        justifyContent: "space-between",
                      }}>
                      {item.title}
                    </ThemedText>
                  </ThemedView>
                  <ThemedView
                    variant={"transparent"}
                    style={[styles.sets_repsContainer]}>
                    <ThemedText type="smallTitle">{item.set_reps}</ThemedText>
                  </ThemedView>
                </ThemedHorizontalContainer>
              </Card>
            )}
            estimatedItemSize={100}
            ItemSeparatorComponent={() => <View style={{ height: 0 }} />}
          />
        </View>
      </ThemedView>
      <ThemedView
        variant="default"
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 10,
        }}>
        <IconButton
          icon={(props) => <Play {...props} />}
          theme={{ colors: { primary: brandColorIcon } }}
          mode="contained"
          style={{
            borderRadius: 10,
            margin: 0,
            width: "100%",
            backgroundColor: brandColor,
            flex: 3,
          }}
          onPress={() => console.log("Start Workout")}
        />
        <IconButton
          icon={(props) => <Ionicons name="sparkles" {...props} />}
          theme={{ colors: { primary: containerColor } }}
          mode="contained"
          style={{
            borderRadius: 10,
            margin: 0,
            width: "100%",
            backgroundColor: inverseButtonColor,
            flex: 1,
          }}
          onPress={() => console.log("AI insights")}
        />
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  workoutOverview: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    height: 270,
  },
  viewDetailsSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  verticalContainer: {
    flex: 1,
    height: 260,
    justifyContent: "space-around",
  },
  rightColumn: {
    flex: 2.6,
    justifyContent: "space-between",
    gap: 0,
    margin: 0,
    padding: 0,
    height: 260,
    borderRadius: 10,
    
  },
  horizontalContainer: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  verticalContentContainer: {
    flexDirection: "column", // Stack icon above text
    alignItems: "center", // Center align icon and text horizontally
    justifyContent: "center", // Center align icon and text vertically
  },
  horizontalContentContainer: {
    justifyContent: "center", // Center icon and text horizontally
    alignItems: "center", // Center icon and text vertically
    margin: 25, // Adds spacing between icon and text for horizontal layout
  },
  textContainer: {
    marginLeft: 8,
    marginTop: 4,
    alignContent: "stretch", // Optional: Adds spacing between icon and text for vertical layout
  },
  sets_repsContainer: {
    height: 20,
    borderRadius: 5,
    margin: 20,
    flex: 3,
    alignItems: "flex-start",
  },
  pillContainer: {
    backgroundColor: "red",
    height: 20,
    borderRadius: 5,
    margin: 20,
    marginRight: 0,
    flex: 0.5,
  },
});
