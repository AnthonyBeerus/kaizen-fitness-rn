import { NavigationContainer } from "@react-navigation/native";
import { Stack } from "expo-router";
import React from "react";

const Layout = ({}) => {
  return(
     <Stack>
      <Stack.Screen name="stats" options={{ headerShown: false }} />
    </Stack>
  )
   
  
};

export default Layout;