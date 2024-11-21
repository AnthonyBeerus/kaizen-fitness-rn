import { Stack } from "expo-router";

const Layout = ({}) => {
  return <Stack>
    <Stack.Screen name="/stats/stats" options={{ headerShown: false }} />
  </Stack>;
};
