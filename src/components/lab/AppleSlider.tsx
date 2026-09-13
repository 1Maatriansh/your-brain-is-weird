import React, { useRef } from 'react';
import { sound } from '../../utils/audio';

interface AppleSliderProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  accentColor?: string;
  onChange: (val: number) => void;
  description?: string;
}

export const AppleSlider: React.FC<AppleSliderProps> = ({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '%',
  accentColor = '#0a84ff',
  onChange,
  description,
}) => {
  const lastSoundVal = useRef(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseFloat(e.target.value);
    if (Math.abs(num - lastSoundVal.current) >= 5) {
      sound.playHapticClick(1000 + num * 8, 0.01);
      lastSoundVal.current = num;
    }
    onChange(num);
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col gap-2 w-full select-none">
      <div className="flex items-center justify-between">
        <span className="text-xs sm:text-sm font-medium text-white/90">{label}</span>
        <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-md bg-white/10 text-white">
          {value}
          {unit}
        </span>
      </div>

      {description && <span className="text-[11px] text-white/50 -mt-1">{description}</span>}

      <div className="relative flex items-center h-6">
        {/* Track Background */}
        <div className="absolute left-0 right-0 h-2 rounded-full bg-white/10 overflow-hidden">
          {/* Active Fill */}
          <div
            className="h-full rounded-full transition-all duration-75"
            style={{
              width: `${percentage}%`,
              backgroundColor: accentColor,
              boxShadow: `0 0 10px ${accentColor}88`,
            }}
          />
        </div>

        {/* Real Range Input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          aria-label={label}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
        />

        {/* Thumb */}
        <div
          className="absolute w-5 h-5 rounded-full bg-white shadow-lg border border-black/20 pointer-events-none transform -translate-x-1/2 transition-transform duration-75 hover:scale-110 active:scale-125"
          style={{
            left: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
};
