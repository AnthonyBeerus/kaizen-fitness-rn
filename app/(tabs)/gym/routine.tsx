import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import PageTabbutton, {
  PageTabButtonType,
} from "@/components/navigation/PageTabbutton";
import { useState } from "react";
import React from "react";
import { WorkoutOverview } from "@/components/WorkoutOverview";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Button, Card, Checkbox, IconButton, useTheme } from "react-native-paper";
import ThemedSwitch from "@/components/Switch";
import { Edit, Play, Star, Timer1 } from "iconsax-react-native";
import { FlashList } from "@shopify/flash-list";
import ThemedProgressBar from "@/components/ProgressBar";
import { SuggestedWorkout } from "@/components/SuggestedWorkout";


export default function Routine() {
  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      variant="headerImage">
      <SuggestedWorkout/>
      <ThemedView variant={"default"}>
        <WorkoutOverview
          lightColor={Colors.light.icon} // Pass light theme icon color
          darkColor={Colors.dark.icon} // Pass dark theme icon color
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",

  },
});
function useThemeColor(arg0: { light: string; dark: string; }, arg1: string) {
  throw new Error("Function not implemented.");
}

