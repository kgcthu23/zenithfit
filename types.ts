
export enum Page {
  Dashboard = 'DASHBOARD',
  Burpees = 'BURPEES',
  WorkoutProgram = 'WORKOUT_PROGRAM',
  Hiit = 'HIIT',
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
  workoutDetails?: Omit<WorkoutDay, 'day' | 'youtubeUrl'>;
}

// FIX: Add CompletedWorkout interface to resolve import errors.
export interface CompletedWorkout {
  date: string; // Format: YYYY-MM-DD
  count: number;
}