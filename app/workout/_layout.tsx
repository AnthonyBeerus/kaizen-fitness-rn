import ThemedHeader from "@/components/ThemedHeader";
import { Stack } from "expo-router";
import React from "react";

const Layout = ({}) => {
  return (
    <Stack
      screenOptions={{
        header: ({ options }) => (
          <ThemedHeader
            variant="backAction"
            title={options.title ?? "Default Title"}
          />
        ),
      }}>
      <Stack.Screen name="routine-details" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;