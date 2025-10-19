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

export const FULLBODY_CIRCUIT: HiitExercise[] = [
  { name: 'Clean and Press', duration: 30 },
  { name: 'Rest', duration: 30 },
  { name: 'Inverted Rows', duration: 30 },
  { name: 'Rest', duration: 30 },
  { name: 'Pushups', duration: 30 },
  { name: 'Rest', duration: 30 },
  { name: 'Dumbbell Row', duration: 30 },
  { name: 'Rest', duration: 30 },
  { name: 'Goblet Squats', duration: 45 },
  { name: 'Rest', duration: 30 },
  { name: 'Navy Seal Burpees', duration: 45 },
  { name: 'Rest', duration: 30 },
  { name: 'Dumbbell Lunges', duration: 45 },
  { name: 'Rest', duration: 30 },
];

export const FULLBODY_ROUNDS = 3;

export const DUMBBELL_WORKOUTS: DumbbellDay[] = [
  {
    day: 1,
    title: 'Push Day',
    focus: 'Chest, Shoulders, Triceps',
    warmup: [
      '5-10 min light cardio (jogging, cycling)',
      'Arm Circles (30s each way)',
      'Dynamic Chest Stretches (e.g., arm swings)',
      'Shoulder Rotations (30s each way)',
    ],
    exercises: [
      { name: 'Dumbbell Bench Press (Flat)', sets: '4 sets of 8-12 reps' },
      { name: 'Dumbbell Shoulder Press (Seated)', sets: '3 sets of 8-12 reps' },
      { name: 'Decline Push-ups', sets: '3 sets to failure (AMRAP)' },
      { name: 'Dumbbell Lateral Raises', sets: '3 sets of 12-15 reps' },
      { name: 'Dumbbell Skull Crushers', sets: '3 sets of 10-15 reps' },
      { name: 'Bench Dips', sets: '3 sets to failure (AMRAP)' },
    ],
    stretch: [
      'Chest Stretch in Doorway (30s each side)',
      'Overhead Triceps Stretch (30s each arm)',
      'Shoulder Stretch Across Body (30s each arm)',
    ],
  },
  {
    day: 2,
    title: 'Pull Day',
    focus: 'Back, Biceps, Rear Delts',
    warmup: [
      '5 min light cardio (rowing machine, jumping jacks)',
      'Cat-Cow Stretch (10 reps)',
      'Torso Twists (30s)',
      'Band Pull-Aparts (2 sets of 15)',
    ],
    exercises: [
      { name: 'Bent Over Dumbbell Row', sets: '4 sets of 8-12 reps' },
      { name: 'Inverted Rows', sets: '3 sets to failure (AMRAP)' },
      { name: 'Dumbbell Pullovers', sets: '3 sets of 10-15 reps' },
      { name: 'Rear Delt Flyes', sets: '3 sets of 12-15 reps' },
      { name: 'Dumbbell Bicep Curls', sets: '3 sets of 10-12 reps' },
      { name: 'Hammer Curls', sets: '3 sets of 10-12 reps' },
    ],
    stretch: [
      'Lat Stretch (30s each side)',
      'Biceps Stretch (30s each arm)',
      'Upper Back / Trapezius Stretch (30s)',
    ],
  },
  {
    day: 3,
    title: 'Leg Day',
    focus: 'Quads, Hamstrings, Glutes, Calves',
    warmup: [
      '5-10 min light cardio (cycling, skipping)',
      'Leg Swings (15 each leg, forward & side)',
      'Bodyweight Squats (20 reps)',
      'Hip Circles (30s each way)',
    ],
    exercises: [
      { name: 'Goblet Squats', sets: '4 sets of 8-12 reps' },
      { name: 'Dumbbell Romanian Deadlifts (RDLs)', sets: '4 sets of 10-15 reps' },
      { name: 'Bulgarian Split Squats', sets: '3 sets of 8-12 reps per leg' },
      { name: 'Dumbbell Calf Raises', sets: '4 sets of 15-20 reps' },
      { name: 'Glute Bridges (with Dumbbell)', sets: '3 sets of 15-20 reps' },
    ],
    stretch: [
      'Quad Stretch (30s each leg)',
      'Hamstring Stretch (30s each leg)',
      'Glute Stretch (Pigeon Pose, 30s each side)',
      'Calf Stretch on a step (30s each leg)',
    ],
  },
  {
    day: 4,
    title: 'Upper Body Volume',
    focus: 'Full Upper Body',
    warmup: [
      '5 min light cardio',
      'Arm Circles & Shoulder Rolls',
      'Dynamic Chest/Back Stretches',
      'Light Band Face Pulls (2 sets of 15)',
    ],
    exercises: [
      { name: 'Dumbbell Bench Press (Flat)', sets: '4 sets of 10-15 reps' },
      { name: 'Single-Arm Dumbbell Row', sets: '4 sets of 8-12 reps per arm' },
      { name: 'Arnold Press (Seated)', sets: '3 sets of 10-15 reps' },
      { name: 'Dumbbell Flies (Flat Bench)', sets: '3 sets of 12-15 reps' },
      { name: 'Dumbbell Shrugs', sets: '3 sets of 15-20 reps' },
      { name: 'Crossbody Hammer Curls', sets: '3 sets of 10-12 reps per arm' },
      { name: 'Dumbbell Kickbacks', sets: '3 sets of 12-15 reps per arm' },
    ],
    stretch: [
      'Full upper body stretch routine',
      'Hold each stretch for 30 seconds',
      'Focus on chest, back, shoulders, and arms',
    ],
  },
  {
    day: 5,
    title: 'Lower Body & Core',
    focus: 'Legs and Core',
    warmup: [
      '5 min light cardio',
      'Bodyweight Lunges (10 each leg)',
      'Glute Bridges (15 reps)',
      'Plank (30s)',
      'Bird-Dog (10 each side)',
    ],
    exercises: [
      { name: 'Dumbbell Front Squats', sets: '3 sets of 10-15 reps' },
      { name: 'Reverse Lunges', sets: '3 sets of 10-15 reps per leg' },
      { name: 'Sumo Squats', sets: '3 sets of 12-15 reps' },
    ],
    stretch: [
      'Full lower body stretching routine',
      'Include quad, hamstring, glute, and hip flexor stretches',
      'Cobra Stretch for abs (30s)',
      'Child\'s Pose for lower back (60s)',
    ],
  },
];