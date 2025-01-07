/* eslint-disable prettier/prettier */
// app/(tabs)/home/screen1.tsx
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { WorkoutOverview } from "@/components/WorkoutOverview";
import React from "react";
import { View, Text } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function Plans() {
  return (
     <ParallaxScrollView
          headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
          variant="headerImage">
          <ThemedView variant={"default"}>
              <ThemedText>Plans</ThemedText>
            </ThemedView>
        </ParallaxScrollView>
  );
}
