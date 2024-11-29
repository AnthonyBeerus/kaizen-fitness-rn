import React from "react";
import { StyleSheet, Platform, View, Pressable } from "react-native";
import { Link } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedMainContainer } from "@/components/containers/ThemedMainContainerx";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Colors } from "@/constants/Colors"; // Import the Colors for light and dark theme colors
import FlashList from "@shopify/flash-list/dist/FlashList";
import { ThemedView } from "@/components/ThemedView";
import Ionicons from "@expo/vector-icons/Ionicons";

const DATA = [
  { id: "1", title: "Stat 1" },
  { id: "2", title: "Stat 2" },
  { id: "3", title: "Stat 3" },
];

export default function StatsScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      variant="headerImage"
      >
      <ThemedText type="title">Charts</ThemedText>
      <FlashList
        data={DATA}
        renderItem={({ item }) => (
          <Link asChild href="../stats/stats">
            <Pressable onPress={() => console.log(item.title)}>
              <ThemedMainContainer variant={"default"}>
                <ThemedView variant={"inContainer"}>
                  <ThemedText>{item.title}</ThemedText>
                </ThemedView>
              </ThemedMainContainer>
            </Pressable>
          </Link>
        )}
        estimatedItemSize={10}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </ParallaxScrollView>
  );
}

export const options = {
  headerShown: false, // This removes the header for the StatsScreen
};

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  boxStyle: {
    marginBottom: 10,
  },
});
