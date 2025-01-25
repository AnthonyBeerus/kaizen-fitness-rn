import { Stack } from "expo-router/stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Suspense, useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import ThemedHeader from "@/components/ThemedHeader";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from "react";
import { ActivityIndicator } from "react-native";
import { SQLiteProvider, openDatabaseSync } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite/driver";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";
import { addDummyData } from "@/db/addDummyData";
import { FitnessDatabase } from "@/db/FitnessData/FitnessDbSeed";
import { add } from "date-fns";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export const DATABASE_NAME = "tasks";
export const ROUTINESDB = "routines";

export default function RootLayout() {
  

  const routineDb = openDatabaseSync(ROUTINESDB);
  const db = drizzle(routineDb);

  // Place all migrations logic before any conditional returns
  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    if (success) {
      FitnessDatabase(db);
    }
  }, [success]);

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
      <SQLiteProvider
        databaseName={ROUTINESDB}
        options={{ enableChangeListener: true }}
        >
          

        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack
            screenOptions={{
              header: ({ options }) => (
                <ThemedHeader
                  variant="default"
                  title={options.title ?? "Default Title"}
                />
              ),
            }}>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </GestureHandlerRootView>
      </SQLiteProvider>
    
  );
}
