import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { ThemedView } from "./ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { ThemedVerticalContainer } from "./containers/ThemeVerticalContainer";
import { ThemedHorizontalContainer } from "./containers/ThemeHorizontalContainer";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "./ThemedText";
import { FlashList } from "@shopify/flash-list";
import { ThemedMainContainer } from "./containers/ThemedMainContainerx";
import ThemedButton from "./ThemedButton";
import { color } from "d3";
import { Button, IconButton, PaperProvider } from "react-native-paper";
import { Play, Edit } from "iconsax-react-native";

// Dynamically constrain to valid Ionicon names
type IoniconName = keyof typeof Ionicons.glyphMap;

const DATA = [
  { id: "1", 
    title: "Chest Press", 
    subTitle: "Chest Triceps", 
    set_reps: "3x8" 
  },
  {
    id: "2",
    title: "Dumbell Rows",
    subTitle: "Back, Biceps",
    set_reps: "3x12",
  },
];


type WorkoutOverviewProps = {
  verticalContainerContent: React.ReactNode;
  horizontalContainerContents: [React.ReactNode, React.ReactNode];
  lightColor?: string;
  darkColor?: string;
  iconVertical: IoniconName;
  iconHorizontalTop: IoniconName;
  iconHorizontalBottom: IoniconName;
};

export const WorkoutOverview: React.FC<WorkoutOverviewProps> = ({
  verticalContainerContent,
  horizontalContainerContents,
  lightColor,
  darkColor,
  iconVertical,
  iconHorizontalTop,
  iconHorizontalBottom,
}) => {
  const iconColor = useThemeColor(
    { light: lightColor, dark: darkColor},
    "brandColor"
  );

  const pillContainerColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "fadedText"
  )

  const containerColor = useThemeColor(
      { light: Colors.light.containerBackground, dark: Colors.dark.containerBackground },
      "containerBackground"
    )

  const brandColor = useThemeColor(
    { light: Colors.light.brandColor, dark: Colors.dark.brandColor },
    "brandColor"
  )

  return (
    <ThemedView variant={"default"} style={{ gap: 0, paddingVertical: 10 }}>
      <ThemedView variant="default" style={styles.workoutOverview}>
        <ThemedVerticalContainer
          variant="default"
          style={styles.verticalContainer}>
          <View
            style={[styles.contentContainer, styles.verticalContentContainer]}>
            <Ionicons name={iconVertical} size={34} color={iconColor} />
            <View style={styles.textContainer}>
              {typeof verticalContainerContent === "string" ? (
                <ThemedText>{verticalContainerContent}</ThemedText>
              ) : (
                verticalContainerContent
              )}
            </View>
          </View>
        </ThemedVerticalContainer>
        <View style={styles.rightColumn}>
          <FlashList
            data={DATA}
            renderItem={({ item }) => (
              <ThemedHorizontalContainer
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
                variant={"inContainer"}>
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
                  <ThemedView
                    variant={"transparent"}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}>
                    <ThemedText
                      type="smallSubtitle"
                      style={{
                        paddingTop: 10,
                        paddingBottom: 20,
                        paddingLeft: 20,
                        justifyContent: "space-between",
                      }}>
                      {item.subTitle}
                    </ThemedText>
                  </ThemedView>
                </ThemedView>
                <ThemedView
                  variant={"transparent"}
                  style={[styles.sets_repsContainer]}>
                  <ThemedText type="smallTitle">{item.set_reps}</ThemedText>
                </ThemedView>
              </ThemedHorizontalContainer>
            )}
            estimatedItemSize={100}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          />
        </View>
      </ThemedView>
      <PaperProvider
        settings={{
          icon: (props) => <Edit {...props} />,
        }}>
        <ThemedView variant={"inContainer"} style={styles.viewDetailsSection}>
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
            <ThemedText style={{ color: brandColor }}>View Details</ThemedText>
          </Button>
          <IconButton
            containerColor={containerColor}
            mode="contained"
            iconColor={brandColor}
            icon={(props) => <Play {...props} />}
            size={30}
            style={{ borderRadius: 10, alignContent: "center" }}
            onPress={() => console.log("Start Workout")}
          />
        </ThemedView>
      </PaperProvider>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  workoutOverview: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    height: 220,
  },
  viewDetailsSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  verticalContainer: {
    flex: 1,
  },
  rightColumn: {
    flex: 2.5,
    justifyContent: "space-between",
    gap: 10,
  },
  horizontalContainer: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
    marginLeft: 0,
    marginTop: 40,
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
