import React from "react";
import { StyleSheet, Platform } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { TwoColumnLayout } from "@/components/TwoColumnLayout";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedMainContainer } from "@/components/containers/ThemedMainContainerx";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Colors } from "@/constants/Colors"; // Import the Colors for light and dark theme colors

export default function ProfileScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      variant="headerImage"
      title="Profile"
      subtitle="Welcome to the Profile Screen"
      >
      <ThemedText type="title">Profile</ThemedText>
      {/* Using TwoColumnLayout with icon theme colors */}
      <TwoColumnLayout
        verticalContainerContent={<ThemedText>BOOBA</ThemedText>}
        horizontalContainerContents={[
          <ThemedText>ZOOBA</ThemedText>,
          <ThemedText>GOOBA</ThemedText>,
        ]}
        lightColor={Colors.light.icon} // Pass light theme icon color
        darkColor={Colors.dark.icon} // Pass dark theme icon color
      />
      <ThemedText type="subtitle">Stuff</ThemedText>
      <ThemedMainContainer variant={"inContainer"}>
        <ThemedText>Stuff</ThemedText>
      </ThemedMainContainer>
      <ThemedMainContainer variant={"inContainer"}>
        <ThemedText>More Stuff</ThemedText>
      </ThemedMainContainer>
      <ThemedMainContainer variant={"inContainer"}>
        <ThemedText>Even Stuff</ThemedText>
      </ThemedMainContainer>
      <ThemedMainContainer variant={"inContainer"}>
        <ThemedText> The Stuff Ends</ThemedText>
      </ThemedMainContainer>
      <ThemedMainContainer variant={"inContainer"}>
        <ThemedText>Just kidding lol! MORE Stuff</ThemedText>
      </ThemedMainContainer>
      <ThemedMainContainer variant={"inContainer"}>
        <ThemedText>And more stuff</ThemedText>
      </ThemedMainContainer>
      <ThemedMainContainer variant={"inContainer"}>
        <ThemedText>And even more stuff</ThemedText>
      </ThemedMainContainer>
      <ThemedMainContainer variant={"inContainer"}>
        <ThemedText>And the stuff ends here</ThemedText>
      </ThemedMainContainer>
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
