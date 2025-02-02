import React, { useState } from "react";
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
import PageTabbutton, { PageTabButtonType } from "@/components/navigation/PageTabbutton";

const DATA = [
  { id: "1", title: "Stat 1" },
  { id: "2", title: "Stat 2" },
  { id: "3", title: "Stat 3" },
  { id: "4", title: "Stat 4" },
  { id: "5", title: "Stat 5" },
  { id: "6", title: "Stat 6" },
];

export enum PageTabs {
  Stats,
  insights,
  Profile,
}

export default function Profile() {

  const [selectedPageTab, setSelectedPageTab] = useState<PageTabs>(PageTabs.Stats);

  const pageTabbuttons: PageTabButtonType[] = [{title: "Stats"},{title:"Insights"}, {title: "Profile"}];



  return (
    <>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
        variant="headerImage">
        
        <ThemedView variant={"default"}>
          
            <FlashList
              data={DATA}
              renderItem={({ item }) => (
                <Link asChild href="../../../stats/stats">
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
        </ThemedView>
      </ParallaxScrollView>
    </>
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
