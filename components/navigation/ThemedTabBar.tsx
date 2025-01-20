// ThemedTabBar.tsx
import {
  View,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { useEffect } from "react";
import { ThemedText } from "../ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import ThemedTabBarButton from "./ThemedTabBarButton";
import ThemedFAB from "../ThemedFAB";
import { useScroll } from "../ScrollContext";

const TABBAR_HEIGHT = 80; // Adjust this value based on your tab bar height

export function ThemedTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { colors } = useTheme();
  const textColor = useThemeColor(
    { light: "#11181C", dark: "#ECEDEE" },
    "text"
  );
  const { scrollY } = useScroll();

  // Create an interpolated value for the translation
  const translateY = scrollY.interpolate({
    inputRange: [-50, 0, 50], // Adjust these values to control sensitivity
    outputRange: [0, 0, TABBAR_HEIGHT], // Hide the tab bar by moving it down
    extrapolate: "clamp",
  });

  // Create an interpolated value for opacity
  const opacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          opacity,
        },
      ]}>
      <View style={styles.tabBar}>
        {state.routes.map(
          (
            route: { key: string; name: string; params?: object },
            index: number
          ) => {
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
                routeName={
                  route.name as "index" | "explore" | "Stats" | "Profile"
                }
                onLongPress={onLongPress}
                isFocused={isFocused}
                color={isFocused ? "white" : textColor}
                label={String(label)}
                lightColor={""}
                darkColor={""}
              />
            );
          }
        )}
      </View>
      <ThemedFAB />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabBar: {
    position: "absolute",
    bottom: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    backgroundColor: "#F04444",
    paddingVertical: 0,
    borderRadius: 6,
  },
});
