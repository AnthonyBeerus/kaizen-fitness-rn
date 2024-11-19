import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";

const second = () => {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}>
      <ThemedView>
        <ThemedText>second modal</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
};

export default second;

const styles = StyleSheet.create({});
