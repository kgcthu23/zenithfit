/**
 * Checks if the Vibration API is supported by the browser.
 * @returns {boolean} True if supported, false otherwise.
 */
const isSupported = (): boolean => {
  return typeof window !== 'undefined' && 'vibrate' in navigator;
};

/**
 * A short, sharp vibration for simple confirmations like completing a rep or exercise.
 */
export const triggerAction = () => {
  if (isSupported()) {
    navigator.vibrate(50);
  }
};

/**
 * A slightly longer vibration for starting a workout.
 */
export const triggerStart = () => {
  if (isSupported()) {
    navigator.vibrate(100);
  }
};

/**
 * A double vibration for pausing or resuming the timer.
 */
export const triggerPause = () => {
  if (isSupported()) {
    navigator.vibrate([50, 50, 50]);
  }
};

/**
 * A more distinct pattern for successfully completing an entire workout.
 */
export const triggerCompletion = () => {
  if (isSupported()) {
    navigator.vibrate([100, 50, 100]);
  }
};
