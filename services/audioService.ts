// Use a singleton to avoid creating multiple AudioContexts
let audioCtx: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
  if (typeof window !== 'undefined') {
    // FIX: Add a check for webkitAudioContext for Safari support.
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioCtx;
  }
  return null;
};

const playSound = (frequency: number, duration: number, type: OscillatorType = 'sine') => {
  const ctx = getAudioContext();
  if (!ctx) return;

  // Check if context is suspended (due to browser policy) and resume if needed
  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

  gainNode.gain.setValueAtTime(0.2, ctx.currentTime); // Volume
  gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration / 1000);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + duration / 1000);
};

export const playStartWorkSound = () => {
  playSound(880, 150, 'triangle'); // Higher pitch beep
};

export const playStartRestSound = () => {
  playSound(440, 150, 'sine'); // Lower pitch beep
};

export const playCompletionSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') {
    ctx.resume();
  }
  playSound(523.25, 100, 'sine'); // C5
  setTimeout(() => playSound(659.25, 100, 'sine'), 100); // E5
  setTimeout(() => playSound(783.99, 100, 'sine'), 200); // G5
  setTimeout(() => playSound(1046.50, 150, 'sine'), 300); // C6
};
