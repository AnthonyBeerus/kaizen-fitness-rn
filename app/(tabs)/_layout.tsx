// TabLayout.tsx
import { Tabs } from "expo-router";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import ThemedHeader from "@/components/ThemedHeader";
import { ThemedTabBar } from "@/components/navigation/ThemedTabBar";
import { ScrollProvider } from "@/components/ScrollContext";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  



  return (
    <ScrollProvider>
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
    </ScrollProvider>
  );
}
