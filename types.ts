
export enum Page {
  Dashboard = 'DASHBOARD',
  Burpees = 'BURPEES',
  WorkoutProgram = 'WORKOUT_PROGRAM',
}

export interface Exercise {
  name: string;
  weight?: number;
  reps?: string;
  unit?: 'lbs' | 'sec';
}

export interface WorkoutGroup {
  title: string;
  sets?: number;
  exercises: Exercise[];
}

export interface WorkoutDay {
  day: number;
  title: string;
  description?: string;
  youtubeUrl?: string;
  groups?: WorkoutGroup[];
}

export interface WorkoutLogEntry {
  id: string;
  name: string;
  date: string; // ISO String
}

// FIX: Export the CompletedWorkout type to resolve the import error in WorkoutCalendar.tsx.
export interface CompletedWorkout {
  date: string; // YYYY-MM-DD
  count: number;
}
