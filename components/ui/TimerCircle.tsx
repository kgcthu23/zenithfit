import React from 'react';

interface TimerCircleProps {
  progress: number; // 0 to 1
  size?: number;
  strokeWidth?: number;
  time: number;
  label: string;
  colorClassName?: string;
}

export const TimerCircle: React.FC<TimerCircleProps> = ({ progress, size = 280, strokeWidth = 12, time, label, colorClassName = 'text-cyan-400' }) => {
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - progress * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-slate-700"
          fill="transparent"
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className={`${colorClassName} transition-all duration-300`}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <span className="text-7xl font-bold tracking-tighter">{time}</span>
        <span className="text-xl uppercase text-slate-400 tracking-widest">{label}</span>
      </div>
    </div>
  );
};
