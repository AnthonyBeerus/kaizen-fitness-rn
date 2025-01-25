CREATE TABLE `exercise_muscles` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`exercise_id` integer NOT NULL,
	`muscle_group_id` integer NOT NULL,
	`is_primary` integer NOT NULL,
	FOREIGN KEY (`exercise_id`) REFERENCES `exercises`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`muscle_group_id`) REFERENCES `muscle_groups`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `exercises` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`difficulty_level` text,
	`equipment_needed` text,
	`form_tips` text,
	`common_mistakes` text
);
--> statement-breakpoint
CREATE TABLE `muscle_groups` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`category` text
);
--> statement-breakpoint
CREATE TABLE `routines` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`difficulty_level` text,
	`estimated_weeks` integer,
	`days_per_week` integer,
	`is_template` integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `workout_days` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`routine_id` integer NOT NULL,
	`name` text NOT NULL,
	`day_order` integer NOT NULL,
	`estimated_minutes` integer,
	`intensity_level` text,
	FOREIGN KEY (`routine_id`) REFERENCES `routines`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `workout_exercises` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`workout_day_id` integer NOT NULL,
	`exercise_id` integer NOT NULL,
	`order` integer NOT NULL,
	`sets` integer,
	`reps` integer,
	`weight` real,
	`rest_seconds` integer,
	`notes` text,
	FOREIGN KEY (`workout_day_id`) REFERENCES `workout_days`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`exercise_id`) REFERENCES `exercises`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
DROP TABLE `lists`;--> statement-breakpoint
DROP TABLE `tasks`;