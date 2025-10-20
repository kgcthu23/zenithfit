import type { WorkoutDay } from './types';

export const BURPEE_CONFIG = {
  reps: 25,
  workDuration: 5,
  restDuration: 5,
};

// FIX: Add HIIT_ROUNDS and HIIT_CIRCUIT constants to resolve import errors.
export const HIIT_ROUNDS = 3;
export const HIIT_CIRCUIT = [
  { name: 'Jumping Jacks', duration: 45 },
  { name: 'Rest', duration: 15 },
  { name: 'High Knees', duration: 45 },
  { name: 'Rest', duration: 15 },
  { name: 'Butt Kicks', duration: 45 },
  { name: 'Rest', duration: 15 },
  { name: 'Mountain Climbers', duration: 45 },
  { name: 'Rest', duration: 15 },
  { name: 'Burpees', duration: 45 },
  { name: 'Rest Between Rounds', duration: 60 },
];

// FIX: Add FULLBODY_ROUNDS and FULLBODY_CIRCUIT constants to resolve import errors.
export const FULLBODY_ROUNDS = 3;
export const FULLBODY_CIRCUIT = [
  { name: 'Squats', duration: 45 },
  { name: 'Rest', duration: 15 },
  { name: 'Push-ups', duration: 45 },
  { name: 'Rest', duration: 15 },
  { name: 'Lunges', duration: 45 },
  { name: 'Rest', duration: 15 },
  { name: 'Dumbbell Rows', duration: 45 },
  { name: 'Rest', duration: 15 },
  { name: 'Plank', duration: 60 },
  { name: 'Rest Between Rounds', duration: 60 },
];

export const NEW_WORKOUT_PROGRAM: WorkoutDay[] = [
  {
    day: 1,
    title: 'Full Body Heavy',
    groups: [
      {
        title: 'Main Lifts',
        sets: 3,
        exercises: [
          { name: 'Chest Press', weight: 50, reps: '8', unit: 'lbs' },
          { name: 'Bent Over Rows', weight: 50, reps: '8', unit: 'lbs' },
          { name: 'Deadlift', weight: 50, reps: '8', unit: 'lbs' },
          { name: 'Shoulder Press', weight: 40, reps: '8', unit: 'lbs' },
          { name: 'Front Squat', weight: 40, reps: '8', unit: 'lbs' },
        ],
      },
    ],
  },
  {
    day: 2,
    title: 'HIIT',
    youtubeUrl: 'https://www.youtube.com/embed/jPRZJcowjs4',
  },
  {
    day: 3,
    title: 'Arms & Abs',
    description: 'Superset Style',
    groups: [
      {
        title: 'Superset 1',
        sets: 3,
        exercises: [
          { name: 'Dumbbell Curls', weight: 30, reps: '8-12', unit: 'lbs' },
          { name: 'Tricep Extensions', weight: 30, reps: '8-12', unit: 'lbs' },
        ],
      },
      {
        title: 'Superset 2',
        sets: 3,
        exercises: [
          { name: 'Cross Body Curls', weight: 30, reps: '10-15', unit: 'lbs' },
          { name: 'Tricep Kickbacks', weight: 30, reps: '10-15', unit: 'lbs' },
        ],
      },
      {
        title: 'Core Circuit',
        sets: 3,
        exercises: [
          { name: 'Abs Wheel Rollouts', reps: '8-15' },
          { name: 'Plank', reps: '30-60', unit: 'sec' },
        ],
      },
    ],
  },
  {
    day: 4,
    title: 'Full Body Moderate',
    groups: [
      {
        title: 'Main Lifts',
        sets: 3,
        exercises: [
          { name: 'Chest Press', weight: 40, reps: '12', unit: 'lbs' },
          { name: 'Bent Over Rows', weight: 40, reps: '12', unit: 'lbs' },
          { name: 'Romanian Deadlift (RDL)', weight: 50, reps: '10-15', unit: 'lbs' },
          { name: 'Shoulder Press', weight: 30, reps: '12', unit: 'lbs' },
          { name: 'Front Squat', weight: 30, reps: '12', unit: 'lbs' },
        ],
      },
    ],
  },
  {
    day: 5,
    title: 'HIIT',
    youtubeUrl: 'https://www.youtube.com/embed/jPRZJcowjs4',
  },
  {
    day: 6,
    title: 'Rest',
    description: 'Crucial for recovery and growth.',
  },
  {
    day: 7,
    title: 'Rest',
    description: 'Crucial for recovery and growth.',
  },
];