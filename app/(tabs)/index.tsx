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
  Card,
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
import { Edit, Folder, Play } from "iconsax-react-native";

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
    { light: Colors.light.icon, dark: Colors.dark.icon },
    "icon"
  );

  const brandColor = useThemeColor(
      { light: Colors.light.brandColor, dark: Colors.dark.brandColor },
      "brandColor"
  )

  return (
    <PaperProvider
      settings={{
        icon: (props) => <Edit {...props} />,
      }}>
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
                <ThemedText style={{ paddingVertical: 10 }}>Today's Workout</ThemedText>
                <Button
                  icon={"Edit"}
                  theme={{ colors: { primary: iconColor } }}
                  mode="text"
                  contentStyle={{ flexDirection: "row-reverse" }}
                  style={{
                    borderRadius: 10,
                    justifyContent: "center",
                  }}
                  onPress={() => console.log("View Details")}>
                  <ThemedText style={{ color: brandColor }}>
                    View Details
                  </ThemedText>
                </Button>
              </ThemedView>
              <WorkoutOverview
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
                  marginTop: 10,
                }}>
                <ThemedText>Programs</ThemedText>
                <Button mode="text" style={{ borderRadius: 10 }}>
                  View All
                </Button>
              </ThemedView>
              <PaperProvider
                settings={{
                  icon: (props) => <Folder {...props} />,
                }}>
                <FlashList
                  data={DATA}
                  horizontal
                  renderItem={({}) => (
                    <Card
                      style={{
                        width: 200,
                        height: 100,
                        marginRight: 10,
                        elevation: 5,
                        borderRadius: 10,
                        backgroundColor: containerColor,
                      }}>
                      <Card.Title
                        title="Card Title"
                        subtitle="Card Subtitle"
                        left={(props) => (
                          <Folder {...props} color={iconColor} size={30} />
                        )}
                      />
                    </Card>
                  )}
                  estimatedItemSize={100}
                  ItemSeparatorComponent={() => (
                    <View style={{ height: 100 }} />
                  )}
                />
              </PaperProvider>
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
      </ParallaxScrollView>
    </PaperProvider>
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
