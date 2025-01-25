import { useScroll } from "@/components/ScrollContext";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Bookmark, Star, Timer1 } from "iconsax-react-native";
import React, { useEffect, useState } from "react";
import { View, Image, Animated } from "react-native";
import { Button, Card, IconButton } from "react-native-paper";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { openDatabaseSync, useSQLiteContext } from "expo-sqlite";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { routines, Routine, workoutDays } from "@/db/FitnessData/fitnessSchema";
import * as schema from "@/db/FitnessData/fitnessSchema";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { eq } from "drizzle-orm";
import { SectionList } from "react-native";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ROUTINESDB } from "@/app/_layout";
import { RoutineCard } from "@/components/RoutineCard";

interface Section {
  title: string;
  data: Routine[];
}

const localImage = require("../../../assets/images/workoutthumbnails/workoutplanthumbnail1.png");

export default function Plans() {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });
  useDrizzleStudio(db);
  const [sections, setSections] = useState<Section[]>([]);

  const { data } = useLiveQuery(
    drizzleDb
      .select()
      .from(routines)
      .leftJoin(workoutDays, eq(routines.id, workoutDays.routine_id))
  );

  useEffect(() => {
    if (!data) return;

    const formatedData = data?.map((item) => ({
      ...item.routines,
      workout_day_name: item.workout_days?.name,
    }));

    const groupedByRoutineId = formatedData?.reduce(
      (acc: { [key: string]: Routine[] }, routine) => {
        if (!acc[routine.id]) {
          acc[routine.id] = [];
        }
        acc[routine.id].push(routine);
        return acc;
      },
      {}
    );

    setSections(
      Object.entries(groupedByRoutineId).map(([title, data]) => ({
        title,
        data,
      }))
    );
  }, [data]);

  const handleDeleteTask = async (routine_id: number) => {
    try {
      await drizzleDb.delete(routines).where(eq(routines.id, routine_id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddDummyTask = async () => {
    // Add to the first list by default
    await drizzleDb.insert(routines).values({
      name: `Task ${Math.floor(Math.random() * 1000)}`,
    });
  };
  // Theme hooks from original Plans component
  const cardBackground = useThemeColor(
    {
      light: Colors.light.card,
      dark: Colors.dark.card,
    },
    "containerBackground"
  );

  const buttonBackground = useThemeColor(
    {
      light: Colors.light.card,
      dark: Colors.dark.card,
    },
    "background"
  );

  const backgroundColor = useThemeColor(
    {
      light: Colors.light.containerBackground,
      dark: Colors.dark.containerBackground,
    },
    "background"
  );

  const iconColor = useThemeColor(
    {
      light: Colors.light.card,
      dark: Colors.dark.card,
    },
    "icon"
  );

  const { scrollY } = useScroll();

  return (
    <Animated.ScrollView
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
      scrollEventThrottle={16}
      style={{ backgroundColor: backgroundColor }}>
      <SectionList
        sections={sections}
        renderItem={({ item }) => (
          <RoutineCard routine={item} localImage={localImage} />
        )}
        renderSectionHeader={({ section }) => (
          <ThemedView
            variant={"default"}
            style={{
              height: 40,
              justifyContent: "center",
              paddingLeft: 16,
              backgroundColor: backgroundColor,
            }}>
            <ThemedText>List:{section.title}</ThemedText>
          </ThemedView>
        )}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <ThemedView variant={"default"} />}
        ListFooterComponent={
          <Button
            icon={(props) => <Ionicons name="add" {...props} />}
            onPress={handleAddDummyTask}
            children={undefined}
          />
        }
      />
    </Animated.ScrollView>
  );
}
