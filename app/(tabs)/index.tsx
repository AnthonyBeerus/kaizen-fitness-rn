import { Image, StyleSheet, Platform, FlatList, View, Animated } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { TwoColumnLayout } from "@/components/TwoColumnLayout";
import { Colors } from "@/constants/Colors";
import { ThemedMainContainer } from "@/components/containers/ThemedMainContainerx";
import { FlashList } from "@shopify/flash-list";
import { useRef } from "react";


const DATA = [
  { id: "1", title: "Item 1" },
  { id: "2", title: "Item 2" },
  { id: "3", title: "Item 3" },
];

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      variant="ThemedHeader"
      >
      <ThemedView variant="default" style={styles.titleContainer}>
        <ThemedText type="title">Home</ThemedText>
      </ThemedView>
      <TwoColumnLayout
        verticalContainerContent={<ThemedText>ROOBA</ThemedText>}
        horizontalContainerContents={[
          <ThemedText>ZOOBA</ThemedText>,
          <ThemedText>GOOBA</ThemedText>,
        ]}
        lightColor={Colors.light.icon} // Pass light theme icon color
        darkColor={Colors.dark.icon} // Pass dark theme icon color
      />
      <ThemedText>Programs</ThemedText>
      <FlashList
        data={DATA}
        renderItem={({ item }) => (
          <ThemedMainContainer variant="default">
            <ThemedView variant="inContainer">
              <ThemedText>{item.title}</ThemedText>
            </ThemedView>
          </ThemedMainContainer>
        )}
        estimatedItemSize={100}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
});
