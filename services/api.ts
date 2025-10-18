import type { WorkoutLogEntry } from '../types';

const STORAGE_KEY = 'zenithFitWorkoutLog';
const API_LATENCY = 500; // 500ms delay to simulate network

/**
 * Fetches the entire workout log from the mock backend (localStorage).
 * @returns A promise that resolves to an array of workout log entries.
 */
export const getWorkoutLog = (): Promise<WorkoutLogEntry[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        const savedData = localStorage.getItem(STORAGE_KEY);
        const log = savedData ? JSON.parse(savedData) : [];
        resolve(log);
      } catch (error) {
        console.error("Failed to fetch workout log from storage", error);
        resolve([]); // Resolve with an empty array on error
      }
    }, API_LATENCY);
  });
};

/**
 * Adds a new workout log entry to the mock backend (localStorage).
 * @param workoutName - The name of the completed workout.
 * @returns A promise that resolves to the newly created workout log entry.
 */
export const addWorkoutLogEntry = (workoutName: string): Promise<WorkoutLogEntry> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const newEntry: WorkoutLogEntry = {
          id: `${Date.now()}-${Math.random()}`,
          name: workoutName,
          date: new Date().toISOString(),
        };

        // First, get the current log
        const savedData = localStorage.getItem(STORAGE_KEY);
        const currentLog: WorkoutLogEntry[] = savedData ? JSON.parse(savedData) : [];
        
        // Add the new entry and save
        const updatedLog = [newEntry, ...currentLog];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLog));
        
        resolve(newEntry);
      } catch (error) {
        console.error("Failed to add workout log entry to storage", error);
        reject(error);
      }
    }, API_LATENCY);
  });
};
