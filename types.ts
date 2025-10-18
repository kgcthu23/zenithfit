
export enum Page {
  Dashboard = 'DASHBOARD',
  Burpees = 'BURPEES',
  HIIT = 'HIIT',
  Dumbbell = 'DUMBBELL',
}

export interface HiitExercise {
  name: string;
  duration: number;
}

export interface DumbbellExercise {
  name: string;
  sets: string;
}

export interface DumbbellDay {
  day: number;
  title: string;
  focus: string;
  exercises: DumbbellExercise[];
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