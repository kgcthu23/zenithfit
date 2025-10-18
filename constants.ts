
import type { DumbbellDay, HiitExercise } from './types';

export const BURPEE_CONFIG = {
  reps: 25,
  workDuration: 5,
  restDuration: 5,
};

export const HIIT_CIRCUIT: HiitExercise[] = [
  { name: 'Jumping Jacks', duration: 30 },
  { name: 'Rest', duration: 60 },
  { name: 'High Knees', duration: 30 },
  { name: 'Rest', duration: 60 },
  { name: 'Mountain Climbers', duration: 30 },
  { name: 'Rest', duration: 60 },
  { name: 'Burpees', duration: 30 },
  { name: 'Rest', duration: 60 },
  { name: 'Switch Lunges', duration: 30 },
  { name: 'Rest', duration: 60 },
];

export const HIIT_ROUNDS = 4;

export const DUMBBELL_WORKOUTS: DumbbellDay[] = [
  {
    day: 1,
    title: 'Push Day',
    focus: 'Chest, Shoulders, Triceps',
    exercises: [
      { name: 'Dumbbell Bench Press (Flat)', sets: '4 sets of 8-12 reps' },
      { name: 'Dumbbell Shoulder Press (Seated)', sets: '3 sets of 8-12 reps' },
      { name: 'Decline Push-ups', sets: '3 sets to failure (AMRAP)' },
      { name: 'Dumbbell Lateral Raises', sets: '3 sets of 12-15 reps' },
      { name: 'Dumbbell Skull Crushers', sets: '3 sets of 10-15 reps' },
      { name: 'Bench Dips', sets: '3 sets to failure (AMRAP)' },
    ],
  },
  {
    day: 2,
    title: 'Pull Day',
    focus: 'Back, Biceps, Rear Delts',
    exercises: [
      { name: 'Bent Over Dumbbell Row', sets: '4 sets of 8-12 reps' },
      { name: 'Inverted Rows', sets: '3 sets to failure (AMRAP)' },
      { name: 'Dumbbell Pullovers', sets: '3 sets of 10-15 reps' },
      { name: 'Rear Delt Flyes', sets: '3 sets of 12-15 reps' },
      { name: 'Dumbbell Bicep Curls', sets: '3 sets of 10-12 reps' },
      { name: 'Hammer Curls', sets: '3 sets of 10-12 reps' },
    ],
  },
  {
    day: 3,
    title: 'Leg Day',
    focus: 'Quads, Hamstrings, Glutes, Calves',
    exercises: [
      { name: 'Goblet Squats', sets: '4 sets of 8-12 reps' },
      { name: 'Dumbbell Romanian Deadlifts (RDLs)', sets: '4 sets of 10-15 reps' },
      { name: 'Bulgarian Split Squats', sets: '3 sets of 8-12 reps per leg' },
      { name: 'Dumbbell Calf Raises', sets: '4 sets of 15-20 reps' },
      { name: 'Glute Bridges (with Dumbbell)', sets: '3 sets of 15-20 reps' },
    ],
  },
  {
    day: 4,
    title: 'Upper Body Volume',
    focus: 'Full Upper Body',
    exercises: [
      { name: 'Dumbbell Bench Press (Flat)', sets: '4 sets of 10-15 reps' },
      { name: 'Single-Arm Dumbbell Row', sets: '4 sets of 8-12 reps per arm' },
      { name: 'Arnold Press (Seated)', sets: '3 sets of 10-15 reps' },
      { name: 'Dumbbell Flies (Flat Bench)', sets: '3 sets of 12-15 reps' },
      { name: 'Dumbbell Shrugs', sets: '3 sets of 15-20 reps' },
      { name: 'Crossbody Hammer Curls', sets: '3 sets of 10-12 reps per arm' },
      { name: 'Dumbbell Kickbacks', sets: '3 sets of 12-15 reps per arm' },
    ],
  },
  {
    day: 5,
    title: 'Lower Body & Core',
    focus: 'Legs and Core',
    exercises: [
      { name: 'Dumbbell Front Squats', sets: '3 sets of 10-15 reps' },
      { name: 'Reverse Lunges', sets: '3 sets of 10-15 reps per leg' },
      { name: 'Sumo Squats', sets: '3 sets of 12-15 reps' },
    ],
  },
];
