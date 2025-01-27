import { useScroll } from "@/components/ScrollContext";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Bookmark, Star, Timer1 } from "iconsax-react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { View, Image, Animated, StyleSheet } from "react-native";
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
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFooter,
  BottomSheetTextInput,
  BottomSheetView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import ThemedBottomSheetModal from "@/components/ThemedBottomSheetModal";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetDefaultFooterProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetFooter/types";
import { Picker } from "@react-native-picker/picker";


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

    // Create a map to track unique routine IDs
    const uniqueRoutineIds = new Map<number, Routine>();

    const groupedByRoutineId = formatedData?.reduce(
      (acc: { [key: string]: Routine[] }, routine) => {
        // Use a unique key for each routine
        const key = uniqueRoutineIds.has(routine.id)
          ? `${routine.id}-${uniqueRoutineIds.get(routine.id)!.name}`
          : `${routine.id}`;

        if (!acc[key]) {
          acc[key] = [];
        }

        acc[key].push(routine);
        uniqueRoutineIds.set(routine.id, routine);
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

  // Theme hooks
  const cardBackground = useThemeColor(
    {
      light: Colors.light.card,
      dark: Colors.dark.card,
    },
    "containerBackground"
  );

  const buttonBackground = useThemeColor(
    {
      light: Colors.light.brandColor,
      dark: Colors.dark.brandColor,
    },
    "brandColor"
  );
  const cancelbuttonBackground = useThemeColor(
    {
      light: Colors.light.container,
      dark: Colors.dark.container,
    },
    "containerBackground"
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

  // Bottom Sheet Logic
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { dismiss } = useBottomSheetModal();

  // callbacks
  const handlePresentModalPress = () => bottomSheetModalRef.current?.present();
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  // Add form state
  const [routineName, setRoutineName] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Beginner");
  const [selectedWeeks, setSelectedWeeks] = useState("4");

  // Define difficulty levels array
  const difficultyLevels = ["Beginner", "Intermediate", "Advanced"];

  // Modified handleAddRoutine function
  const handleAddRoutine = async () => {
    try {
      // Validate form data
      if (!routineName.trim()) {
        // You might want to add proper error handling/messaging here
        console.error("Routine name is required");
        return;
      }

      // Insert the new routine with form data
      await drizzleDb.insert(routines).values({
        name: routineName.trim(),
        difficulty_level: selectedDifficulty,
        estimated_weeks: parseInt(selectedWeeks),
      });

      // Reset form
      setRoutineName("");
      setSelectedDifficulty("Beginner");
      setSelectedWeeks("4");

      // Close modal
      dismiss();
    } catch (error) {
      console.error("Error adding routine:", error);
    }
  };

  // renders
  const renderFooter = useCallback(
    (props: React.JSX.IntrinsicAttributes & BottomSheetDefaultFooterProps) => (
      <BottomSheetFooter {...props} bottomInset={24}>
        <View style={styles.footerContainer}>
          <Button
            onPress={handleAddRoutine}
            style={{ backgroundColor: buttonBackground }}
            icon={(props) => <Ionicons name="add" {...props} />}
            mode="contained">
            Add Routine
          </Button>
          <Button
            style={{ backgroundColor: cancelbuttonBackground }}
            onPress={() => {
              // Reset form on cancel
              setRoutineName("");
              setSelectedDifficulty("Beginner");
              setSelectedWeeks("4");
              dismiss();
            }}
            icon={(props) => <Ionicons name="close" {...props} />}
            mode="contained">
            Cancel
          </Button>
        </View>
      </BottomSheetFooter>
    ),
    [routineName, selectedDifficulty, selectedWeeks] // Add dependencies
  );

  return (
    <ThemedView
      variant={"inContainer"}
      style={{ flex: 1, backgroundColor: backgroundColor }}>
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        style={{ backgroundColor: backgroundColor }}>
        <Button
          onPress={handlePresentModalPress}
          icon={(props) => <Ionicons name="add" {...props} />}
          mode="contained">
          Add Routine
        </Button>

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
        />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          backgroundStyle={{ backgroundColor: backgroundColor }}
          handleIndicatorStyle={{ backgroundColor: iconColor }}
          footerComponent={renderFooter}
          enablePanDownToClose={true}
          snapPoints={["70%", "90%"]}
          onChange={handleSheetChanges}>
          <BottomSheetView style={{ padding: 16, gap: 20 }}>
            <ThemedView variant={"default"} style={{ alignItems: "center" }}>
              <ThemedText type="title">Add Routine</ThemedText>
            </ThemedView>
            <BottomSheetTextInput
              style={{ backgroundColor: cardBackground }}
              placeholder="Routine Name"
              placeholderTextColor={iconColor}
              value={routineName}
              onChangeText={setRoutineName}
            />
            <ThemedView
              variant={"default"}
              style={{ backgroundColor: cardBackground, padding: 10 }}>
              <ThemedText>Difficulty Level</ThemedText>
              <Picker
                selectedValue={selectedDifficulty}
                style={{
                  height: 50,
                  width: "100%",
                  color: iconColor,
                  backgroundColor: cardBackground,
                }}
                itemStyle={{
                  color: iconColor,
                  borderRadius: 10,
                  backgroundColor: cardBackground,
                }}
                mode="dropdown"
                dropdownIconColor={iconColor}
                onValueChange={(itemValue) => setSelectedDifficulty(itemValue)}>
                {difficultyLevels.map((level) => (
                  <Picker.Item
                    key={level}
                    label={level}
                    value={level}
                    style={{
                      color: iconColor,
                      borderRadius: 10,
                      backgroundColor: cardBackground,
                    }}
                  />
                ))}
              </Picker>
            </ThemedView>
            <ThemedView
              variant={"default"}
              style={{ backgroundColor: cardBackground, padding: 10 }}>
              <ThemedText>Estimated Weeks</ThemedText>
              <Picker
                selectedValue={selectedWeeks}
                style={{
                  height: 50,
                  width: "100%",
                  color: iconColor,
                  backgroundColor: cardBackground,
                }}
                itemStyle={{
                  color: iconColor,
                  borderRadius: 10,
                  backgroundColor: cardBackground,
                }}
                mode="dropdown"
                dropdownIconColor={iconColor}
                onValueChange={(itemValue) => setSelectedWeeks(itemValue)}>
                {[4, 5, 6, 7, 8, 9, 10, 11, 12].map((week) => (
                  <Picker.Item
                    key={week}
                    label={week.toString()}
                    value={week.toString()}
                    style={{
                      color: iconColor,
                      borderRadius: 10,
                      backgroundColor: cardBackground,
                    }}
                  />
                ))}
              </Picker>
            </ThemedView>
          </BottomSheetView>
        </BottomSheetModal>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: "center",
  },
  input: {
    height: 50,
    paddingHorizontal: 16,
    borderRadius: 4,
    fontSize: 15,
    fontWeight: "500",
  },
  footerContainer: {
    padding: 12,
    margin: 12,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  footerText: {
    textAlign: "center",
  },
});
