import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Appbar, IconButton, PaperProvider, useTheme } from "react-native-paper";
import { useThemeColor } from "@/hooks/useThemeColor";

interface ThemedHeaderProps {
    icon?: string;
    title: string;
    lightColor?: string;
    darkColor?: string;
    
}

const ThemedHeader: React.FC<ThemedHeaderProps> = ({ title, icon, lightColor, darkColor }) => {
  const navigation = useNavigation();

  const iconColor = useThemeColor({ light: lightColor, dark: darkColor }, "icon");
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "background");

  return (
    <ThemedView style={styles.container} variant={"default"}>

      <Appbar.Header style={[{ backgroundColor }]}>
        <ThemedView variant={"default"} style={styles.headerContent}>
          <IconButton
            icon="chevron-left"
            size={30}
            onPress={navigation.goBack}
            iconColor={iconColor}
            style={styles.backButton}
          />
          <ThemedText style={styles.title}>{title}</ThemedText>
          <Appbar.Action size={30} icon="dots-vertical" style={[styles.backButton]} iconColor={iconColor}/>
        </ThemedView>
      </Appbar.Header>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  backButton: {
    
  },
  backText: {
    fontSize: 18,
  },
  headerContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    flex: 3,
  },
});

export default ThemedHeader;
