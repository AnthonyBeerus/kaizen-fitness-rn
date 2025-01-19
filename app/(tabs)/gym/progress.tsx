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
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  IconButton,
  PaperProvider,
  Searchbar,
  SegmentedButtons,
  Title,
} from "react-native-paper";
import ThemedSearchbar from "@/components/ThemedSearchbar";
import React from "react";
import ThemedButton from "@/components/ThemedButton";
import { WorkoutOverview } from "@/components/WorkoutOverview";
import Calendar from "@/components/Calender";
import PageTabbutton, { PageTabButtonType } from "@/components/navigation/PageTabbutton";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Edit, Folder, Play, Weight, WeightMeter } from "iconsax-react-native";
import { useBarChartLogic } from "@/components/Bar Chart/logic/BarChartLogic";
import BarChartCanvas from "@/components/Bar Chart/BarChartCanvas";
import AnimatedText from "@/components/Bar Chart/AnimatedText";
import { useSharedValue } from "react-native-reanimated";
import { Link, router } from "expo-router";
import { WeeklyBarChart } from "@/components/Bar Chart/WeeklyBarChart";
import { data } from "@/constants/bar-chart-data";
import { SegmentedControl } from "@/components/SegmentedControl";

const DATA = [
  { id: "1", title: "Item 1" },
  { id: "2", title: "Item 2" },
  { id: "3", title: "Item 3" },
];

const ROUTINENS = [
  { id: "1", title: "Routine 1" },
  { id: "2", title: "Routine 2" },
  { id: "3", title: "Routine 3" },
];

export enum PageTabs {
  Routine,
  Plans,
  Stats,
};

const options = ["Volume", "Sets", "Duration"];




export default function Progress() {
  const [value, setValue] = React.useState("");
  function setSelectedDate(date: Date): void {
    throw new Error("Function not implemented.");
  }
  const [selectedDate, setSelectedDate2] = useState<string | null>(null);

  const [selectedPageTab, setSelectedPageTab] = useState<PageTabs>(
    PageTabs.Routine
  );
  
  const pageTabbuttons: PageTabButtonType[] = [{title: "Routine"},{title:"Plans"}, {title: "Stats"}];
  
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
  const inverseButtonColor = useThemeColor(
          {
              light: Colors.dark.background,
              dark: Colors.light.background,
          },
          "text"
          );

  

  //Bar chart logic

   const data2 = [
      { label: "Sun", value: 100 },
     { label: "Mon", value: 120 },
     { label: "Tue", value: 150 },
     { label: "Wed", value: 200 },
     { label: "Thu", value: 170 },
     { label: "Fri", value: 90 },
      { label: "Sat", value: 75 },
   ];

   const canvasWidth = 400;
   const canvasHeight = 210;
   const selectedValue = useSharedValue<number>(0);
   const {
     x,
     y,
     barWidth,
     graphHeight,
     progress,
     selectedBar,
     startAnimation,
   } = useBarChartLogic(data2, canvasWidth, canvasHeight);

    useEffect(() => {
      startAnimation(); // Trigger animation on component mount
    }, [startAnimation]);

    const touchHandler = (e: any) => {
      console.log("Canvas touched:", e.nativeEvent);
    };

    const [activeWeekIndex, setActiveWeekIndex] = useState(0);

    const [selectedOption, setSelectedOption] = useState("Volume");

   const [totalVolumesPerWeek, setTotalVolumesPerWeek] = useState<number[]>([]);

   useEffect(() => {
     const calculateTotalVolumesPerWeek = () => {
       const totals = data.map((weekData) => {
         return weekData.reduce((acc, current) => acc + current.value, 0);
       });
       setTotalVolumesPerWeek(totals);
     };
     calculateTotalVolumesPerWeek();
   }, [data]);
  return (
    <PaperProvider
      settings={{
        icon: (props) => <Edit {...props} />,
      }}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
        variant="headerImage">
        {/* <ThemedSearchbar /> */}
        <ThemedView variant={"default"}>
          <ThemedView variant={"default"}>
            <ThemedView
              variant={"default"}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <ThemedText type={"smallTitle"} style={{ paddingVertical: 10 }}>
                Training
              </ThemedText>
              <Button
                icon={(props) => <Ionicons name="sparkles" {...props} />}
                theme={{ colors: { primary: iconColor } }}
                mode="text"
                contentStyle={{ flexDirection: "row-reverse" }}
                style={{
                  borderRadius: 10,
                  justifyContent: "center",
                }}
                onPress={() => console.log("Analyse")}>
                <ThemedText style={{ color: brandColor }}>Analyse</ThemedText>
              </Button>
            </ThemedView>
            <ThemedView variant={"inContainer"} style={{ borderRadius: 10 }}>
              <ThemedText type={"smallTitle"}> Total Volume Goes here</ThemedText>
              {/* Display the Total volume from the summy data, use animated text */}
              {/* {totalVolumesPerWeek.map((volume, index) => (
                <ThemedText key={index}>
                  Week {index + 1} Total Volume: {volume} pounds
                </ThemedText>
              ))} */}
              <WeeklyBarChart
                weeks={data}
                activeWeekIndex={activeWeekIndex}
                onWeekChange={setActiveWeekIndex}
              />
            </ThemedView>
          </ThemedView>
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
