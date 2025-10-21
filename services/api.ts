import type { WorkoutLogEntry, WorkoutDay } from '../types';

const WORKOUT_LOG_KEY = 'zenith-fit-workout-log';

/**
 * Fetches the workout log from localStorage.
 * @returns A promise that resolves to an array of workout log entries.
 */
export const getWorkoutLog = async (): Promise<WorkoutLogEntry[]> => {
  try {
    const logJSON = localStorage.getItem(WORKOUT_LOG_KEY);
    if (!logJSON) {
      return [];
    }
    const log: WorkoutLogEntry[] = JSON.parse(logJSON);
    // Ensure data is sorted by date descending, as it's no longer done by a query
    return log.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error("Error fetching workout log from localStorage:", error);
    return []; // Return empty array on error
  }
};

/**
 * Adds a new workout log entry to localStorage.
 * @param workoutName - The name of the completed workout.
 * @param workoutDetails - Optional detailed breakdown of the workout.
 * @returns A promise that resolves to the newly created workout log entry.
 */
export const addWorkoutLogEntry = async (
  workoutName: string,
  workoutDetails?: Omit<WorkoutDay, 'day' | 'youtubeUrl'>
): Promise<WorkoutLogEntry> => {
  try {
    const currentLog = await getWorkoutLog();
    const newEntry: WorkoutLogEntry = {
      id: new Date().getTime().toString(), // Simple unique ID
      name: workoutName,
      date: new Date().toISOString(),
      workoutDetails: workoutDetails,
    };
    
    // Prepend new entry to maintain descending order before next fetch
    const updatedLog = [newEntry, ...currentLog];
    
    localStorage.setItem(WORKOUT_LOG_KEY, JSON.stringify(updatedLog));
    
    return newEntry;
  } catch (error) {
    console.error("Error adding workout log entry to localStorage:", error);
    throw error; // Rethrow to be handled by the caller
  }
};