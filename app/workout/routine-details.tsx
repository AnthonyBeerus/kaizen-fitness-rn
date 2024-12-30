import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import PageTabbutton, {
  PageTabButtonType,
} from "@/components/navigation/PageTabbutton";
import { useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { Card } from "react-native-paper";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";
import { ThemedHorizontalContainer } from "@/components/containers/ThemeHorizontalContainer";
import { View } from "react-native";
import React from "react";
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";




const DATA = [
  { id: "1", title: "Chest Press", subTitle: "Chest Triceps", set_reps: "3x8" },
  {
    id: "2",
    title: "Dumbell Rows",
    subTitle: "Back, Biceps",
    set_reps: "3x12",
  },
  { id: "3", title: "Squats", subTitle: "Legs", set_reps: "3x10" },
];
type RoutineDetailsProps = {
  lightColor?: string;
  darkColor?: string;
};

export default function RoutineDetailsScreen(lightColor: string, darkColor: string) {

  const pageTabbuttons: PageTabButtonType[] = [
    { title: "Meals" },
    { title: "Hydration" },
    { title: "Recipes" },
  ];
  const iconColor = useThemeColor(
      { light: lightColor, dark: darkColor },
      "brandColor"
    );
  
    const brandColorIcon = useThemeColor(
      { light: Colors.dark.text, dark: Colors.dark.text },
      "text"
    );
  
    const pillContainerColor = useThemeColor(
      { light: lightColor, dark: darkColor },
      "fadedText"
    );
  
    const containerColor = useThemeColor(
      {
        light: Colors.light.containerBackground,
        dark: Colors.dark.containerBackground,
      },
      "containerBackground"
    );
  
    const incontainerColor = useThemeColor(
      {
        light: lightColor,
        dark: darkColor,
      },
      "inContainerBackground"
    );
  
    const brandColor = useThemeColor(
      { light: Colors.light.brandColor, dark: Colors.dark.brandColor },
      "brandColor"
    );
  
    const inverseButtonColor = useThemeColor(
      {
        light: Colors.dark.background,
        dark: Colors.light.background,
      },
      "text"
    );
  
    const backgroundColor = useThemeColor(
      { light: Colors.light.background, dark: Colors.dark.background },
      "background"
    );

    function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
      const styleAnimation = useAnimatedStyle(() => {
        console.log("showRightProgress:", prog.value);
        console.log("appliedTranslation:", drag.value);

        return {
          transform: [{ translateX: drag.value + 50 }],
        };
      });

      return (
        <Reanimated.View style={styleAnimation}>
          <ThemedView
            variant={"transparent"}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "red",
              width: 50,
            }}>
            <ThemedText type="smallTitle">Delete</ThemedText>
          </ThemedView>
        </Reanimated.View>
      );
    }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      variant="headerImage">
      <Card
        style={{
          borderRadius: 10,
         
          backgroundColor: backgroundColor,
        }}>
        <FlashList
          data={DATA}
          renderItem={({ item }) => (
            <ReanimatedSwipeable
              containerStyle={styles.swipeable}
              friction={2}
              enableTrackpadTwoFingerGesture
              rightThreshold={40}
              renderRightActions={RightAction}>
              <Card
                style={{
                  borderRadius: 0,
                 
                  backgroundColor: containerColor,
                  elevation: 0,
                }}>
                <ThemedHorizontalContainer
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    height: 66,
                    backgroundColor: containerColor,
                  }}
                  variant={"default"}>
                  <ThemedView
                    variant={"transparent"}
                    style={[
                      styles.pillContainer,
                      { backgroundColor: pillContainerColor },
                    ]}></ThemedView>
                  <ThemedView variant={"transparent"} style={{ flex: 10 }}>
                    <ThemedText
                      type="smallTitle"
                      style={{
                        paddingTop: 20,
                        paddingLeft: 20,
                        justifyContent: "space-between",
                      }}>
                      {item.title}
                    </ThemedText>
                  </ThemedView>
                  <ThemedView
                    variant={"transparent"}
                    style={[styles.sets_repsContainer]}>
                    <ThemedText type="smallTitle">{item.set_reps}</ThemedText>
                  </ThemedView>
                </ThemedHorizontalContainer>
              </Card>
            </ReanimatedSwipeable>
          )}
          estimatedItemSize={100}
          ItemSeparatorComponent={() => <View style={{ height: 0 }} />}
        />
      </Card>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  swipeable: {
    height: 50,
    alignItems: "center",
  },
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
  workoutOverview: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    height: 270,
  },
  viewDetailsSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  verticalContainer: {
    flex: 1,
    height: 260,
    justifyContent: "space-around",
  },
  rightColumn: {
    flex: 2.6,
    justifyContent: "space-between",
    gap: 0,
    margin: 0,
    padding: 0,
    height: 260,
    borderRadius: 10,
  },
  horizontalContainer: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  verticalContentContainer: {
    flexDirection: "column", // Stack icon above text
    alignItems: "center", // Center align icon and text horizontally
    justifyContent: "center", // Center align icon and text vertically
  },
  horizontalContentContainer: {
    justifyContent: "center", // Center icon and text horizontally
    alignItems: "center", // Center icon and text vertically
    margin: 25, // Adds spacing between icon and text for horizontal layout
  },
  textContainer: {
    marginLeft: 8,
    marginTop: 4,
    alignContent: "stretch", // Optional: Adds spacing between icon and text for vertical layout
  },
  sets_repsContainer: {
    height: 20,
    borderRadius: 5,
    margin: 20,
    flex: 3,
    alignItems: "flex-start",
  },
  pillContainer: {
    backgroundColor: "red",
    height: 20,
    borderRadius: 5,
    margin: 20,
    marginRight: 0,
    flex: 0.5,
  },
});
