/* eslint-disable prettier/prettier */
// app/(tabs)/home/screen1.tsx
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { WorkoutOverview } from "@/components/WorkoutOverview";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FlashList } from "@shopify/flash-list";
import { Bookmark, Car, Lock1, Play, Star, Timer1 } from "iconsax-react-native";
import React from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import { Button, Card, IconButton } from "react-native-paper";
import { Colors } from "react-native/Libraries/NewAppScreen";

const cardData = [
  {
    title: "Workout Plans",
    subtitle: "Choose a plan to get started",
    duration: "6 weeks",
    name: "Workout",
  },
  {
    title: "Fitness Programs",
    subtitle: "Select a program to improve fitness",
    duration: "12 weeks",
    name: "Fitness",
  },
  {
    title: "Strength Training",
    subtitle: "Build strength with this plan",
    duration: "8 weeks",
    name: "Strength",
  },
  {
    title: "Endurance Training",
    subtitle: "Improve endurance with this plan",
    duration: "10 weeks",
    name: "Endurance",
  },
  // Add more items here...
];

const localImage = require("../../../assets/images/workoutthumbnails/workoutplanthumbnail1.png");

export default function Plans() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      variant="headerImage">
      <ThemedView variant={"default"}>
        <FlashList
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          data={cardData}
          renderItem={({ item }) => (
            <Card
              style={{
                backgroundColor: "#272727",
                justifyContent: "space-between",
                
              }}>
              <Card.Content
                style={{
                  flexDirection: "row",
                  gap: 10,
                  justifyContent: "space-evenly",
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 10,
                  }}>
                  <Image
                    source={localImage}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 20, // Custom radius
                      flex: 1,
                      paddingRight: 40,
                    }}
                  />
                </View>
                <ThemedView
                  variant={"inContainer"}
                  style={{ justifyContent: "center", gap: 20 }}>
                  <ThemedText type="subtitle" style={{ color: "white" }}>
                    {item.name}
                  </ThemedText>
                  <ThemedView
                    variant={"inContainer"}
                    style={{ flexDirection: "row", gap: 10 }}>
                    <Button
                      icon={(props) => <Star {...props} />}
                      theme={{ colors: { primary: "#F04444" } }}
                      style={{ backgroundColor: "#272727", borderRadius: 10 }}
                      onPress={() =>
                        console.log("Open library of Advanced Workouts")
                      }>
                      <ThemedText>Advanced</ThemedText>
                    </Button>
                    <Button
                      icon={(props) => <Timer1 {...props} />}
                      theme={{ colors: { primary: "#F04444" } }}
                      style={{ backgroundColor: "#272727", borderRadius: 10 }}
                      onPress={() =>
                        console.log("Open Similarly timed workouts")
                      }>
                      <ThemedText>30 min</ThemedText>
                    </Button>
                  </ThemedView>
                </ThemedView>
                <IconButton
                  icon={(props) => <Bookmark {...props} />}
                  iconColor="#fff"
                  size={30}
                  onPress={() => console.log("Start Suggested Workout")}
                />
              </Card.Content>
            </Card>
          )}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}
