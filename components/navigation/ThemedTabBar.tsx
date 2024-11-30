import { View, Platform, TouchableOpacity, StyleSheet } from "react-native";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { ThemedText } from "../ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import ThemedTabBarButton from "./ThemedTabBarButton";

export function ThemedTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {

  
  const { colors } = useTheme();
  const textColor = useThemeColor({ light: "#11181C", dark: "#ECEDEE" }, "text");
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          typeof options.tabBarLabel === "function"
            ? options.tabBarLabel({
                focused: state.index === index,
                color: colors.text,
                position: "below-icon",
                children: route.name,
              })
            : options.tabBarLabel ?? options.title ?? route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <ThemedTabBarButton
            key={route.name}
            onPress={onPress}
            routeName={route.name as "index" | "explore" | "Stats" | "Profile"}
            onLongPress={onLongPress}
            isFocused={isFocused}
            color={isFocused ? "white" : textColor}
            label={String(label)} lightColor={""} darkColor={""}          
          />

        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    backgroundColor: "#F04444",
    paddingVertical: 0,
    borderRadius: 10,
  },
});

