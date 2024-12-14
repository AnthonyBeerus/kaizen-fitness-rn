import React from "react";
import { StyleSheet, Platform, Pressable, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { TwoColumnLayout } from "@/components/TwoColumnLayout";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedMainContainer } from "@/components/containers/ThemedMainContainerx";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Colors } from "@/constants/Colors"; // Import the Colors for light and dark theme colors
import FlashList from "@shopify/flash-list/dist/FlashList";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";

const DATA = [
  { id: "1", title: "Stat 1" },
  { id: "2", title: "Stat 2" },
  { id: "3", title: "Stat 3" },
];

export default function ProfileScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      variant="headerImage"
      title="Profile"
      subtitle="Welcome to the Profile Screen"
      >
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
