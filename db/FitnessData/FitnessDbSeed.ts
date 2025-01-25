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

export const FitnessDatabase = async (db: ExpoSQLiteDatabase) => {
  try {
    const value = AsyncStorage.getItemSync("fitnessDbInitialized");
    console.log("Existing initialization value:", value);
    if (value) {
      console.log("Database already initialized");
      return;
    }

    // Rest of initialization code...
  } catch (error) {
    console.error("Database initialization error:", error);
  }

  console.log("Initializing fitness database...");

  // Insert muscle groups
  console.log("Inserting muscle groups...");
  await db.insert(muscleGroups).values([
    { name: "Chest", category: "Push" },
    { name: "Front Deltoids", category: "Push" },
    { name: "Triceps", category: "Push" },
    { name: "Back", category: "Pull" },
    { name: "Rear Deltoids", category: "Pull" },
    { name: "Biceps", category: "Pull" },
    { name: "Quadriceps", category: "Legs" },
    { name: "Hamstrings", category: "Legs" },
    { name: "Calves", category: "Legs" },
    { name: "Core", category: "Core" },
  ]);

  // Insert exercises
  console.log("Inserting exercises...");
  await db.insert(exercises).values([
    {
      name: "Bench Press",
      description:
        "Lying on a flat bench, lower a barbell to your chest and press it back up",
      difficulty_level: "Intermediate",
      equipment_needed: "Barbell, Bench",
      form_tips:
        "Keep wrists straight, feet flat on ground, back slightly arched",
      common_mistakes: "Bouncing bar off chest, uneven bar path",
    },
    {
      name: "Push-ups",
      description: "Standard bodyweight push-up from plank position",
      difficulty_level: "Beginner",
      equipment_needed: "None",
      form_tips: "Keep body straight, hands shoulder-width apart",
      common_mistakes: "Sagging hips, incomplete range of motion",
    },
    {
      name: "Squat",
      description: "Barbell back squat",
      difficulty_level: "Intermediate",
      equipment_needed: "Barbell, Rack",
      form_tips: "Keep chest up, knees tracking over toes",
      common_mistakes: "Knees caving in, leaning too far forward",
    },
    {
      name: "Pull-ups",
      description: "Overhead pulling exercise",
      difficulty_level: "Intermediate",
      equipment_needed: "Pull-up Bar",
      form_tips: "Start from dead hang, pull until chin over bar",
      common_mistakes: "Insufficient range of motion, excessive swinging",
    },
    {
      name: "Deadlift",
      description: "Compound pulling exercise from floor",
      difficulty_level: "Intermediate",
      equipment_needed: "Barbell",
      form_tips: "Neutral spine, bar against shins, hip hinge",
      common_mistakes: "Rounding back, starting with bar too far from body",
    },
  ]);

  // Link exercises to muscle groups
  console.log("Linking exercises to muscle groups...");
  await db.insert(exerciseMuscles).values([
    // Bench Press muscles
    { exercise_id: 1, muscle_group_id: 1, is_primary: 1 }, // Chest primary
    { exercise_id: 1, muscle_group_id: 2, is_primary: 0 }, // Front delts secondary
    { exercise_id: 1, muscle_group_id: 3, is_primary: 0 }, // Triceps secondary

    // Push-ups muscles
    { exercise_id: 2, muscle_group_id: 1, is_primary: 1 }, // Chest primary
    { exercise_id: 2, muscle_group_id: 3, is_primary: 0 }, // Triceps secondary

    // Squat muscles
    { exercise_id: 3, muscle_group_id: 7, is_primary: 1 }, // Quads primary
    { exercise_id: 3, muscle_group_id: 8, is_primary: 0 }, // Hamstrings secondary

    // Pull-ups muscles
    { exercise_id: 4, muscle_group_id: 4, is_primary: 1 }, // Back primary
    { exercise_id: 4, muscle_group_id: 6, is_primary: 0 }, // Biceps secondary

    // Deadlift muscles
    { exercise_id: 5, muscle_group_id: 8, is_primary: 1 }, // Hamstrings primary
    { exercise_id: 5, muscle_group_id: 4, is_primary: 0 }, // Back secondary
  ]);

  // Insert a sample routine
  console.log("Creating sample routine...");
  await db.insert(routines).values({
    name: "Beginner Full Body",
    description: "3-day full body routine for beginners",
    difficulty_level: "Beginner",
    estimated_weeks: 8,
    days_per_week: 3,
    is_template: 1,
  });

  // Insert workout days
  console.log("Creating workout days...");
  await db.insert(workoutDays).values([
    {
      routine_id: 1,
      name: "Full Body A",
      day_order: 1,
      estimated_minutes: 45,
      intensity_level: "Moderate",
    },
    {
      routine_id: 1,
      name: "Full Body B",
      day_order: 2,
      estimated_minutes: 45,
      intensity_level: "Moderate",
    },
    {
      routine_id: 1,
      name: "Full Body C",
      day_order: 3,
      estimated_minutes: 45,
      intensity_level: "Moderate",
    },
  ]);

  // Insert exercises for the first workout day
  console.log("Adding exercises to workout days...");
  await db.insert(workoutExercises).values([
    {
      workout_day_id: 1,
      exercise_id: 2, // Push-ups
      order: 1,
      sets: 3,
      reps: 10,
      rest_seconds: 60,
      notes: "Focus on form, modify if needed",
    },
    {
      workout_day_id: 1,
      exercise_id: 4, // Pull-ups
      order: 2,
      sets: 3,
      reps: 5,
      rest_seconds: 90,
      notes: "Use assisted pull-up machine if needed",
    },
    {
      workout_day_id: 1,
      exercise_id: 3, // Squat
      order: 3,
      sets: 3,
      reps: 10,
      rest_seconds: 90,
      notes: "Start with bodyweight, progress to barbell",
    },
  ]);

  AsyncStorage.setItemSync("fitnessDbInitialized", "true");
  console.log("Fitness database initialization complete!");
};
