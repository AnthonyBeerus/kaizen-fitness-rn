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
import { add } from "date-fns";
import { addDummyData } from "@/db/addDummyData";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export const DATABASE_NAME = "tasks";

export default function RootLayout() {
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

  const expoDb = openDatabaseSync(DATABASE_NAME);
  const db = drizzle(expoDb);
  const {success, error} = useMigrations(db, migrations)

  useEffect(() => {
    if (success) {
      addDummyData(db);
    }
  }, [success]);

  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <SQLiteProvider
        databaseName={DATABASE_NAME}
        options={{ enableChangeListener: true }}
        useSuspense>
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
    </Suspense>
  );
}
