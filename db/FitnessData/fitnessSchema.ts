import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

// Muscle groups and exercise categories
export const muscleGroups = sqliteTable("muscle_groups", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(), // e.g., "Chest", "Back", "Quadriceps"
  category: text("category"), // e.g., "Push", "Pull", "Legs"
});

// Main exercises table
export const exercises = sqliteTable("exercises", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
  difficulty_level: text("difficulty_level"), // "Beginner", "Intermediate", "Advanced"
  equipment_needed: text("equipment_needed"),
  form_tips: text("form_tips"),
  common_mistakes: text("common_mistakes"),
});

// Junction table for exercises and muscle groups
export const exerciseMuscles = sqliteTable("exercise_muscles", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  exercise_id: integer("exercise_id")
    .notNull()
    .references(() => exercises.id),
  muscle_group_id: integer("muscle_group_id")
    .notNull()
    .references(() => muscleGroups.id),
  is_primary: integer("is_primary").notNull(), // 0 or 1
});

// Workout routines
export const routines = sqliteTable("routines", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
  difficulty_level: text("difficulty_level"),
  estimated_weeks: integer("estimated_weeks"),
  days_per_week: integer("days_per_week"),
  is_template: integer("is_template").default(0),
});

// Individual workout days within a routine
export const workoutDays = sqliteTable("workout_days", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  routine_id: integer("routine_id")
    .notNull()
    .references(() => routines.id),
  name: text("name").notNull(),
  day_order: integer("day_order").notNull(),
  estimated_minutes: integer("estimated_minutes"),
  intensity_level: text("intensity_level"),
});

// Junction table for workout days and exercises
export const workoutExercises = sqliteTable("workout_exercises", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  workout_day_id: integer("workout_day_id")
    .notNull()
    .references(() => workoutDays.id),
  exercise_id: integer("exercise_id")
    .notNull()
    .references(() => exercises.id),
  order: integer("order").notNull(),
  sets: integer("sets"),
  reps: integer("reps"),
  weight: real("weight"),
  rest_seconds: integer("rest_seconds"),
  notes: text("notes"),
});

// Type definitions for TypeScript
export type MuscleGroup = typeof muscleGroups.$inferSelect;
export type Exercise = typeof exercises.$inferSelect;
export type ExerciseMuscle = typeof exerciseMuscles.$inferSelect;
export type Routine = typeof routines.$inferSelect;
export type WorkoutDay = typeof workoutDays.$inferSelect;
export type WorkoutExercise = typeof workoutExercises.$inferSelect;
