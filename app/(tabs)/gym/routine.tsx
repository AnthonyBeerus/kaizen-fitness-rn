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


export default function Routine() {
  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      variant="headerImage">
      <ThemedView
        variant={"default"}
        style={{ backgroundColor: "#242424", borderRadius: 10 }}>
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
            theme={{ colors: { primary: "#F04444" } }}
            mode="text"
            contentStyle={{ flexDirection: "row-reverse" }}
            style={{
              borderRadius: 10,
              justifyContent: "center",
            }}>
            <ThemedText style={{ color: "#F04444" }}>View Details</ThemedText>
          </Button>
        </ThemedView>
        <Card style={{ backgroundColor: "#242424" }}>
          <Card.Content
            style={{
              flexDirection: "row",
              gap: 10,
              flex: 1,
              justifyContent: "space-between",
            }}>
            <IconButton
              icon="camera"
              iconColor="#fff"
              size={40}
              onPress={() => console.log("Pressed")}
            />
            <ThemedView
              variant={"inContainer"}
              style={{ justifyContent: "flex-start" }}>
              <ThemedText>Push Your Limits</ThemedText>
              <ThemedView
                variant={"inContainer"}
                style={{ flexDirection: "row", gap: 10 }}>
                <Button
                  icon={(props) => <Star {...props} />}
                  theme={{ colors: { primary: "#F04444" } }}
                  style={{ backgroundColor: "#373737", borderRadius: 10 }}>
                  <ThemedText>Advanced</ThemedText>
                </Button>
                <Button
                  icon={(props) => <Timer1 {...props} />}
                  theme={{ colors: { primary: "#F04444" } }}
                  style={{ backgroundColor: "#373737", borderRadius: 10 }}>
                  <ThemedText>30 min</ThemedText>
                </Button>
              </ThemedView>
            </ThemedView>
            <IconButton
              icon={(props) => <Play {...props} />}
              style={{ backgroundColor: "#F04444", borderRadius: 10 }}
              iconColor="#fff"
              size={40}
              onPress={() => console.log("Pressed")}
            />
          </Card.Content>
        </Card>
      </ThemedView>
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

