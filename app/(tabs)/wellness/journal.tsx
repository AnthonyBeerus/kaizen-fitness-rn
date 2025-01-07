import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import PageTabbutton, { PageTabButtonType } from "@/components/navigation/PageTabbutton";
import { ThemedView } from "@/components/ThemedView";
import { ThemedMainContainer } from "@/components/containers/ThemedMainContainerx";
import { FlashList } from "@shopify/flash-list";
import { Link } from "expo-router";

const DATA = [
  { id: "1", title: "Stat 1" },
  { id: "2", title: "Stat 2" },
  { id: "3", title: "Stat 3" },
];



export default function Journal() {
  return (
    <>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
        variant="headerImage"
        
        >
        <ThemedView variant={"default"}>
            <ThemedText>Journal</ThemedText>          
        </ThemedView>
      </ParallaxScrollView>
    </>
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