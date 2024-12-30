import React from "react";
import { StyleSheet } from "react-native";
import { Appbar, IconButton } from "react-native-paper";
import { useRouter } from "expo-router"; // For Expo Router navigation
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

interface ThemedHeaderProps {
  icon?: string;
  title: string;
  lightColor?: string;
  darkColor?: string;
  variant?: "default" | "backAction";
}

const ThemedHeader: React.FC<ThemedHeaderProps> = ({
  title,
  icon,
  lightColor,
  darkColor,
  variant = "default",
}) => {
  // Replace React Navigation's "useNavigation" with Expo Router's "useRouter" if you're using Expo Router
  const router = useRouter();

  const iconColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "icon"
  );
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <ThemedView style={styles.container} variant="default">
      <Appbar.Header style={[{ backgroundColor }]}>
        {variant === "backAction" && (
          <ThemedView variant="default" style={styles.headerContent}>
            <IconButton
              icon="chevron-left"
              size={30}
              onPress={() => router.back()} // Go back using Expo Router
              iconColor={iconColor}
              style={styles.backButton}
            />
            <ThemedText style={styles.backactiontitle}>{title}</ThemedText>
            <Appbar.Action
              size={30}
              icon={icon ?? "dots-vertical"}
              style={styles.backButton}
              iconColor={iconColor}
              onPress={() => console.log("Action button pressed")}
            />
          </ThemedView>
        )}
        {variant === "default" && (
          <Appbar.Content title={title} titleStyle={{ color: iconColor }} />
        )}
      </Appbar.Header>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  backButton: {
    marginLeft: 0,
  },
  backactiontitle: {
    fontSize: 18,
    marginLeft: 10,
    flex: 1,
  },
});

export default ThemedHeader;
