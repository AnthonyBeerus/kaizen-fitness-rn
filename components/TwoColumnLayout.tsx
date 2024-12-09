import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { ThemedView } from "./ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { ThemedVerticalContainer } from "./containers/ThemeVerticalContainer";
import { ThemedHorizontalContainer } from "./containers/ThemeHorizontalContainer";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "./ThemedText";

// Dynamically constrain to valid Ionicon names
type IoniconName = keyof typeof Ionicons.glyphMap;

type TwoColumnLayoutProps = {
  verticalContainerContent: React.ReactNode;
  horizontalContainerContents: [React.ReactNode, React.ReactNode];
  lightColor?: string;
  darkColor?: string;
  iconVertical: IoniconName;
  iconHorizontalTop: IoniconName;
  iconHorizontalBottom: IoniconName;
};

export const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({
  verticalContainerContent,
  horizontalContainerContents,
  lightColor,
  darkColor,
  iconVertical,
  iconHorizontalTop,
  iconHorizontalBottom,
}) => {
  const iconColor = useThemeColor(
    { light: Colors.light.brandColoricon, dark: Colors.dark.brandColoricon },
    "icon"
  );

  return (
    <ThemedView variant="default" style={styles.twoColumnLayout}>
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
        <ThemedHorizontalContainer
          variant="default"
          style={styles.horizontalContainer}>
          <View
            style={[
              styles.contentContainer,
              styles.horizontalContentContainer,
            ]}>
            <Ionicons name={iconHorizontalTop} size={34} color={iconColor} />
            <View style={styles.textContainer}>
              {typeof horizontalContainerContents[0] === "string" ? (
                <Text>{horizontalContainerContents[0]}</Text>
              ) : (
                horizontalContainerContents[0]
              )}
            </View>
          </View>
        </ThemedHorizontalContainer>

        <ThemedHorizontalContainer
          variant="default"
          style={styles.horizontalContainer}>
          <View
            style={[
              styles.contentContainer,
              styles.horizontalContentContainer,
            ]}>
            <Ionicons name={iconHorizontalBottom} size={34} color={iconColor} />
            <View style={styles.textContainer}>
              {typeof horizontalContainerContents[1] === "string" ? (
                <Text>{horizontalContainerContents[1]}</Text>
              ) : (
                horizontalContainerContents[1]
              )}
            </View>
          </View>
        </ThemedHorizontalContainer>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  twoColumnLayout: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    height: 200,
  },
  verticalContainer: {
    flex: 1,
  },
  rightColumn: {
    flex: 1.6,
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
});
