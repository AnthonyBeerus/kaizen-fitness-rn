import { Tabs } from 'expo-router';
import React, { useRef } from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Animated } from 'react-native';
import ThemedHeader from '@/components/ThemedHeader';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Ionicons } from '@expo/vector-icons';
import { ThemedTabBar } from '@/components/navigation/ThemedTabBar';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  

  return (
    <Tabs
      tabBar={props => <ThemedTabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        header: ({ options }) => (
          <ThemedHeader title={options.title ?? "Default Title"} />
        ),
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].background,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          header: ({ options }) => (
            <ThemedHeader title={options.title ?? "Default Title"} />
          ),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "compass" : "compass-outline"}
              size={30}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: "Stats",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "pie-chart" : "pie-chart-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
