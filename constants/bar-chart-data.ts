import { startOfWeek } from "date-fns";

export const BACKGROUND_COLOR = "#3E3649";

// Calculate the date of the Monday from three weeks ago
const mondayFromThreeWeeksAgo = startOfWeek(
  new Date().getTime() - 86400000 * 21, // Subtract 21 days (3 weeks) in milliseconds from the current date
  {
    weekStartsOn: 1, // Set the week to start on Monday (1)
  }
);

const normalizeValue = (
  value: number,
  minVal: number,
  maxVal: number
): number => {
  return (value - minVal) / (maxVal - minVal);
};

// Generate raw data first to find min/max values
const rawData = new Array(7).fill(null).map((_, weekIndex) => {
  return new Array(7).fill(null).map((__, dayIndex) => {
    // Adjusted ranges to ensure max volume is around 15,000
    const sets = Math.floor(Math.random() * 3) + 3; // 3 to 5 sets
    const reps = Math.floor(Math.random() * 3) + 5; // 5 to 7 reps
    const weight = Math.floor(Math.random() * 100) + 100; // 100 to 200 pounds
    return sets * reps * weight;
  });
});

// Find min and max values
const allValues = rawData.flat();
const minVolume = Math.min(...allValues);
const maxVolume = Math.min(Math.max(...allValues), 15000); // Ensure max volume does not exceed 15,000

// Generate data for a 7x7 grid (7 weeks, 7 days each)
export const data = new Array(7).fill(null).map((_, weekIndex) => {
  return new Array(7).fill(null).map((__, dayIndex) => {
    // Calculate the date for each day in the grid
    const day = new Date(
      mondayFromThreeWeeksAgo.getTime() + 86400000 * (weekIndex * 7 + dayIndex) // Add the corresponding number of days in milliseconds
    );

    // Adjusted ranges to ensure max volume is around 15,000
    const sets = Math.floor(Math.random() * 3) + 3; // 3 to 5 sets
    const reps = Math.floor(Math.random() * 3) + 5; // 5 to 7 reps
    const weight = Math.floor(Math.random() * 100) +250; // 100 to 200 pounds
    const value = sets * reps * weight;

    const maxValue= 9999;

    // Ensure value does not exceed 15,000
    const cappedValue = Math.min(value, maxValue);

    // Normalize between 0-1 with max volume capped at 15,000
    const normalizedValue = normalizeValue(cappedValue, 0, maxValue);

    return {
      day: day,
      value: cappedValue,
      normalizedValue: normalizedValue,
    };
  });
});

/*
Example of a resulting object in the 'data' array:
[
  [
    { day: 2024-06-24T00:00:00.000Z, value: 0.123456789 }, // Monday of the first week
    { day: 2024-06-25T00:00:00.000Z, value: 0.987654321 }, // Tuesday of the first week
    { day: 2024-06-26T00:00:00.000Z, value: 0.456789123 }, // Wednesday of the first week
    { day: 2024-06-27T00:00:00.000Z, value: 0.654321987 }, // Thursday of the first week
    { day: 2024-06-28T00:00:00.000Z, value: 0.789123456 }, // Friday of the first week
    { day: 2024-06-29T00:00:00.000Z, value: 0.321987654 }, // Saturday of the first week
    { day: 2024-06-30T00:00:00.000Z, value: 0.987654321 }, // Sunday of the first week
  ],
  [
    { day: 2024-07-01T00:00:00.000Z, value: 0.123456789 }, // Monday of the second week
    // ... (similar objects for each day of the second week)
  ],
  // ... (similar arrays for each subsequent week)
]
*/
