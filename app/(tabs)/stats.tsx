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

export enum PageTabs {
  Stats,
  insights,
  Profile,
}

export default function MentalHealthScreen() {

  const [selectedPageTab, setSelectedPageTab] = useState<PageTabs>(PageTabs.Stats);

  const pageTabbuttons: PageTabButtonType[] = [{title: "Stats"},{title:"Insights"}, {title: "Profile"}];

  return (
    <>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
        variant="headerImage"
        
        >
        <PageTabbutton
          pageTabbuttons={pageTabbuttons}
          selectedPageTab={selectedPageTab}
          setSelectedPageTab={setSelectedPageTab}
        />
        <ThemedView variant={"default"}>
          {selectedPageTab === PageTabs.Stats && (
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
          )}
          {selectedPageTab === PageTabs.insights && (
            <ThemedText>Insights</ThemedText>
          )}
          {selectedPageTab === PageTabs.Profile && (
            <ThemedText>Profile</ThemedText>
          )}
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
