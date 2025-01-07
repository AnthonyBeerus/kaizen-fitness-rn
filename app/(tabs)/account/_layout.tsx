/* eslint-disable prettier/prettier */
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import React, { useRef } from "react";
import {
  Animated,
  I18nManager,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  View,
} from "react-native";

const TABS = [
  { title: "profile", icon: "home-outline", iconActive: "person" },
  { title: "achievements", icon: "settings-outline", iconActive: "settings" },
  { title: "friends", icon: "settings-outline", iconActive: "settings" },
];
const Tab = createMaterialTopTabNavigator();
export const MaterialTopTabs = withLayoutContext(Tab.Navigator);

type MyTabBarProps = {
  lightColor?: string;
  darkColor?: string;
  state: any;
  navigation: any;
  position: any;
  tabs: any;
};

function MyTabBar({ state, navigation, position, tabs, lightColor, darkColor }: MyTabBarProps) {
  const layoutWidth = useRef(0);

  const tabBarBackgroundColor = useThemeColor(
    {
      light: lightColor,
      dark: darkColor,
    },
    "containerBackground"
  );
  const tabBarFadedTextColor = useThemeColor(
    {
      light: lightColor,
      dark: darkColor,
    },
    "fadedText"
  );

  return (
    <View
      style={[styles.tabsContainer, { backgroundColor: tabBarBackgroundColor }]}
      onLayout={(e) =>
        (layoutWidth.current = e.nativeEvent.layout.width || 300)
      }>
      {state.routes.map((route: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined; }, index: number) => {
        const isFocused = state.index === index;
        const onPress = () => {
          !isFocused && navigation.navigate({ name: route.name, merge: true });
        };

        const inputRange = state.routes.map((_: any, i: any) => i);
        const translateX = Animated.multiply(
          position.interpolate({
            inputRange,
            outputRange: inputRange.map((i: number) => {
              const diff = i - index;
              const x = layoutWidth.current / tabs.length;
              return diff > 0 ? x : diff < 0 ? -x : 0;
            }),
          }),
          I18nManager.isRTL ? -1 : 1
        );

        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i: any) => (i === index ? 1 : 0)),
        });

        return (
          <TouchableOpacity
            key={`${route.name}_${index}`}
            style={styles.tabButton}
            onPress={onPress}>
            {/* Static inactive state */}
            <View style={styles.iconTextContainer}>
              <ThemedText style={[styles.inactiveText, {color: tabBarFadedTextColor}]}>{route.name}</ThemedText>
            </View>

            {/* Sliding background */}
            <Animated.View
              style={[styles.tabBgColor, { transform: [{ translateX }] }]}
            />

            {/* Animated opacity for active state */}
            <Animated.View
              style={[
                styles.iconTextContainer,
                styles.activeTextContainer,
                { opacity },
              ]}>
              <Text style={styles.activeText}>{route.name}</Text>
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const renderCustomTabView = (props: React.JSX.IntrinsicAttributes & MyTabBarProps) => <MyTabBar {...props} tabs={TABS} />;

export default function ScrollableMaskedTabView( { lightColor, darkColor }: MyTabBarProps) {
  const tabBarBackgroundColor = useThemeColor(
    {
      light: lightColor,
      dark: darkColor,
    },
    "background"
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: tabBarBackgroundColor }}>
      <MaterialTopTabs tabBar={(props) => renderCustomTabView({ ...props, tabs: TABS })}>
        {TABS.map((tab) => (
          <MaterialTopTabs.Screen key={tab.title} name={tab.title} />
        ))}
      </MaterialTopTabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: "row",
    height: 50,
    margin: 16,
    borderRadius: 10,
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    paddingHorizontal: 69, // Add padding for better spacing
  },
  iconTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
  },
  activeTextContainer: {
    zIndex: 2,
  },
  tabBgColor: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#F04444",
    borderRadius: 10,
  },
  activeText: {
    fontSize: 14,
    flexShrink: 0, // Prevent shrinking
    flexWrap: "nowrap", // Prevent wrapping
    padding: 16,
    color: "white",
  },
  inactiveText: {
    fontSize: 14,
    flexShrink: 0, // Prevent shrinking
    flexWrap: "nowrap", // Prevent wrapping
    padding: 16,
  },
});
