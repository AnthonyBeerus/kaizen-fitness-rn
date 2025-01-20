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
      tabBar={(props) => <ThemedTabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        header: ({ options }) => (
          <ThemedHeader
            variant="default"
            title={options.title ?? "Default Title"}
          />
        ),
        tabBarStyle: {
          position: "absolute",
          bottom: 27,
          left: 16,
          right: 16,
          height: 72,
          elevation: 0,
          backgroundColor: "white",
          borderRadius: 16,
          alignItems: "center",
          justifyContent: "center",
        },
      }}>
      <Tabs.Screen
        name="gym"
        options={{
          title: "Gym",
        }}
      />
      <Tabs.Screen
        name="nutrition"
        options={{
          title: "Nutrition",
        }}
      />
      <Tabs.Screen
        name="ai"
        options={{
          title: "aI",
        }}
      />
      <Tabs.Screen
        name="wellness"
        options={{
          title: "Wellness Hub",
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
        }}
      />
    </Tabs>
  );
}
