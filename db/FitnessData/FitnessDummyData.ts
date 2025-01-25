import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import AsyncStorage from "expo-sqlite/kv-store";
import {
  muscleGroups,
  exercises,
  exerciseMuscles,
  routines,
  workoutDays,
  workoutExercises,
} from "./fitnessSchema";

export const FitnessDummyData = async (db: ExpoSQLiteDatabase) => {
  const value = AsyncStorage.getItemSync("dbInitialized");
  if (value) return;

  console.log("Inserting dummy data into fitness schema");

  // Insert into muscle_groups
  await db.insert(muscleGroups).values([
    { name: "Chest", category: "Push" },
    { name: "Back", category: "Pull" },
    { name: "Quadriceps", category: "Legs" },
    { name: "Biceps", category: "Pull" },
    { name: "Triceps", category: "Push" },
  ]);

  // Insert into exercises
  await db.insert(exercises).values([
    {
      name: "Bench Press",
      description: "Chest exercise",
      difficulty_level: "Intermediate",
      equipment_needed: "Barbell",
      form_tips: "Keep elbows at 45 degrees",
      common_mistakes: "Overarching back",
    },
    {
      name: "Pull-Up",
      description: "Back and biceps exercise",
      difficulty_level: "Advanced",
      equipment_needed: "Pull-up bar",
      form_tips: "Engage lats",
      common_mistakes: "Swinging body",
    },
    {
      name: "Squat",
      description: "Lower body exercise",
      difficulty_level: "Intermediate",
      equipment_needed: "Barbell",
      form_tips: "Keep weight on heels",
      common_mistakes: "Knees caving in",
    },
  ]);

  // Insert into exercise_muscles (junction table)
  await db.insert(exerciseMuscles).values([
    { exercise_id: 1, muscle_group_id: 1, is_primary: 1 },
    { exercise_id: 2, muscle_group_id: 2, is_primary: 1 },
    { exercise_id: 3, muscle_group_id: 3, is_primary: 1 },
    { exercise_id: 3, muscle_group_id: 2, is_primary: 0 },
  ]);

  // Insert into routines
  await db.insert(routines).values([
    {
      name: "Beginner Push-Pull-Legs",
      description: "Full week workout routine",
      difficulty_level: "Beginner",
      estimated_weeks: 8,
      days_per_week: 3,
      is_template: 1,
    },
    {
      name: "Intermediate Push-Pull-Legs",
      description: "Full week workout routine",
      difficulty_level: "Intermediate",
      estimated_weeks: 8,
      days_per_week: 6,
      is_template: 1,
    },
    {
      name: "Advanced Push-Pull-Legs",
      description: "Full week workout routine",
      difficulty_level: "Advanced",
      estimated_weeks: 8,
      days_per_week: 6,
      is_template: 1,
    },
  ]);

  // Insert into workout_days
  await db.insert(workoutDays).values([
    {
      routine_id: 1,
      name: "Push Day",
      day_order: 1,
      estimated_minutes: 60,
      intensity_level: "Moderate",
    },
    {
      routine_id: 1,
      name: "Pull Day",
      day_order: 2,
      estimated_minutes: 60,
      intensity_level: "Moderate",
    },
    {
      routine_id: 1,
      name: "Leg Day",
      day_order: 3,
      estimated_minutes: 60,
      intensity_level: "Moderate",
    },
  ]);

  // Insert into workout_exercises
  await db.insert(workoutExercises).values([
    {
      workout_day_id: 1,
      exercise_id: 1,
      order: 1,
      sets: 4,
      reps: 10,
      weight: 50,
      rest_seconds: 90,
      notes: "Progressively overload weekly",
    },
    {
      workout_day_id: 2,
      exercise_id: 2,
      order: 1,
      sets: 3,
      reps: 8,
      weight: 0,
      rest_seconds: 120,
      notes: "Perform strict reps",
    },
    {
      workout_day_id: 3,
      exercise_id: 3,
      order: 1,
      sets: 5,
      reps: 5,
      weight: 80,
      rest_seconds: 120,
      notes: "Focus on depth",
    },
  ]);

  AsyncStorage.setItemSync("dbInitialized", "true");
};
