import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

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
import {
    Avatar,
  Button,
  Card,
  Icon,
  IconButton,
  PaperProvider,
} from "react-native-paper";
import {
  Play,
  Edit,
  EmojiHappy,
  EmojiNormal,
  Happyemoji,
  Edit2,
  Star,
  Timer1,
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

type SuggestedWorkoutProps = {
  lightColor?: string;
  darkColor?: string;
};

export const SuggestedWorkout: React.FC<SuggestedWorkoutProps> = ({
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

    return (
      <ThemedView
        variant={"default"}
        style={{ backgroundColor: containerColor, borderRadius: 10 }}>
        <ThemedView
          variant={"default"}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <ThemedText type={"smallTitle"} style={{ paddingVertical: 10 }}>
            Recommended Workout
          </ThemedText>
          <Button
            icon={(props) => <Edit {...props} />}
            theme={{ colors: { primary: brandColor } }}
            mode="text"
            contentStyle={{ flexDirection: "row-reverse" }}
            style={{
              borderRadius: 10,
              justifyContent: "center",
            }}>
            <ThemedText style={{ color: brandColor }}>View Details</ThemedText>
          </Button>
        </ThemedView>
        <Card style={{ backgroundColor: containerColor, justifyContent: "space-between", }}>
          <Card.Content
            style={{
              flexDirection: "row",
              gap: 10,
              justifyContent: "space-between",
            }}>
            <View style={styles.container}>
              <Image
                source={require("../assets/images/workoutthumbnails/workoutthumbnail1.webp")}
                style={styles.image}
              />
            </View>
            <ThemedView
              variant={"inContainer"}
              style={{ justifyContent: "flex-start", gap: 12 }}>
              <ThemedText>Push Your Limits</ThemedText>
              <ThemedView
                variant={"inContainer"}
                style={{ flexDirection: "row", gap: 10 }}>
                <Button
                  icon={(props) => <Star {...props} />}
                  theme={{ colors: { primary: "#F04444" } }}
                  style={{ backgroundColor: "#373737", borderRadius: 10 }}
                  onPress={() =>
                    console.log("Open library of Advanced Workouts")
                  }>
                  <ThemedText>Advanced</ThemedText>
                </Button>
                <Button
                  icon={(props) => <Timer1 {...props} />}
                  theme={{ colors: { primary: "#F04444" } }}
                  style={{ backgroundColor: "#373737", borderRadius: 10 }}
                  onPress={() => console.log("Open Similarly timed workouts")}>
                  <ThemedText>30 min</ThemedText>
                </Button>
              </ThemedView>
            </ThemedView>
            <IconButton
              icon={(props) => <Play {...props} />}
              style={{
                backgroundColor: brandColor,
                borderRadius: 10,
                alignContent: "center",
                justifyContent: "center",
                marginLeft: 0,
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 0,
                paddingRight: 0,
              }}
              iconColor="#fff"
              size={40}
              onPress={() => console.log("Start Suggested Workout")}
            />
          </Card.Content>
        </Card>
      </ThemedView>
    );
};

const styles = StyleSheet.create({
  suggestedWorkout: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    height: 270,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 20, // Custom radius
    flex: 1,
  },
});
