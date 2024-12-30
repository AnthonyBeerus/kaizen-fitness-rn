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
          <ThemedHeader variant='backAction' title={options.title ?? "Default Title"} />
        ),
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].background,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Gym",
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Nutrition",
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: "Wellness Hub",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />
    </Tabs>
  );
}
