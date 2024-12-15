import {
  Image,
  StyleSheet,
  Platform,
  FlatList,
  View,
  Animated,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { TwoColumnLayout } from "@/components/TwoColumnLayout";
import { Colors } from "@/constants/Colors";
import { ThemedMainContainer } from "@/components/containers/ThemedMainContainerx";
import { FlashList } from "@shopify/flash-list";
import { useRef, useState } from "react";
import {
  Button,
  IconButton,
  PaperProvider,
  Searchbar,
  SegmentedButtons,
} from "react-native-paper";
import ThemedSearchbar from "@/components/ThemedSearchbar";
import React from "react";
import ThemedButton from "@/components/ThemedButton";
import { WorkoutOverview } from "@/components/WorkoutOverview";
import Calendar from "@/components/Calender";
import PageTabbutton, { PageTabButtonType } from "@/components/navigation/PageTabbutton";
import { useThemeColor } from "@/hooks/useThemeColor";

const DATA = [
  { id: "1", title: "Item 1" },
  { id: "2", title: "Item 2" },
  { id: "3", title: "Item 3" },
];

const PROGRAMNS = [
  { id: "1", title: "Program 1" },
  { id: "2", title: "Program 2" },
  { id: "3", title: "Program 3" },
];

export enum PageTabs {
  Plans,
  Progress,
  Log,
};



export default function HomeScreen() {
  const [value, setValue] = React.useState("");
  function setSelectedDate(date: Date): void {
    throw new Error("Function not implemented.");
  }
  const [selectedDate, setSelectedDate2] = useState<string | null>(null);

  const [selectedPageTab, setSelectedPageTab] = useState<PageTabs>(
    PageTabs.Plans
  );
  
    const pageTabbuttons: PageTabButtonType[] = [{title: "Plans"},{title:"Progress"}, {title: "Log"}];
  
  const containerColor = useThemeColor(
    { light: Colors.light.containerBackground, dark: Colors.dark.containerBackground },
    "containerBackground"
  )
  const iconColor = useThemeColor(
    { light: Colors.light.brandColor, dark: Colors.dark.brandColor },
    "brandColor"
  );

  return (
    <>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
        variant="headerImage">
        {/* <ThemedSearchbar /> */}
        <PageTabbutton
          pageTabbuttons={pageTabbuttons}
          selectedPageTab={selectedPageTab}
          setSelectedPageTab={setSelectedPageTab}
        />
        <ThemedView variant={"default"}>
          {selectedPageTab === PageTabs.Plans && (
            <ThemedView variant={"default"}>
              <ThemedView
                variant={"default"}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                <ThemedText style={{ padding: 10 }}>Today's Workout</ThemedText>
              </ThemedView>
                <WorkoutOverview
                  verticalContainerContent={<ThemedText>Strength</ThemedText>}
                  iconVertical={"barbell"}
                  horizontalContainerContents={[
                    <ThemedText>ZOOBA</ThemedText>,
                    <ThemedText>GOOBA</ThemedText>,
                  ]}
                  iconHorizontalTop={"link"}
                  iconHorizontalBottom={"link"}
                  lightColor={Colors.light.icon} // Pass light theme icon color
                  darkColor={Colors.dark.icon} // Pass dark theme icon color
                />
              

              <ThemedView
                variant={"default"}
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  paddingVertical: 10,
                }}>
                <ThemedText>Programs</ThemedText>
                <Button mode="text" style={{ borderRadius: 10 }}>
                  View All
                </Button>
              </ThemedView>

              <FlashList
                data={DATA}
                renderItem={({}) => (
                  <ThemedMainContainer
                    style={{
                      flex: 1,
                      justifyContent: "space-between",
                    }}
                    variant="default"></ThemedMainContainer>
                )}
                estimatedItemSize={100}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
              />
            </ThemedView>
          )}
          {selectedPageTab === PageTabs.Progress && (
            <ThemedText>Progress</ThemedText>
          )}
          {selectedPageTab === PageTabs.Log && (
            <ThemedView variant={"default"}>
              <Calendar
                onSelectDate={(date: string) => setSelectedDate2(date)}
                selected={selectedDate || ""}
              />
            </ThemedView>
          )}
        </ThemedView>

        {/* <ThemedButton
        variant="primary"
        title="Start"
        onPress={() => {
          console.log("Start");
        }}
      /> */}
      </ParallaxScrollView>
    </>
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
