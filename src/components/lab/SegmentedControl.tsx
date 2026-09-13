import React, { useRef, useEffect, useState } from 'react';
import { sound } from '../../utils/audio';

export interface SegmentOption<T extends string = string> {
  id: T;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
}

interface SegmentedControlProps<T extends string = string> {
  options: SegmentOption<T>[];
  selectedId: T;
  onChange: (id: T) => void;
  size?: 'sm' | 'md' | 'lg';
  ariaLabel?: string;
}

export function SegmentedControl<T extends string = string>({
  options,
  selectedId,
  onChange,
  size = 'md',
  ariaLabel = 'Navigation selector',
}: SegmentedControlProps<T>) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });

  const selectedIndex = options.findIndex((opt) => opt.id === selectedId);

  useEffect(() => {
    if (!containerRef.current) return;
    const buttons = containerRef.current.querySelectorAll<HTMLButtonElement>('button[role="tab"]');
    const targetBtn = buttons[selectedIndex];
    if (targetBtn) {
      setIndicatorStyle({
        left: targetBtn.offsetLeft,
        width: targetBtn.offsetWidth,
      });
    }
  }, [selectedIndex, options]);

  const handleSelect = (id: T) => {
    if (id !== selectedId) {
      sound.playHapticClick(1400, 0.012);
      onChange(id);
    }
  };

  const sizeClasses = {
    sm: 'p-0.5 text-xs h-8',
    md: 'p-1 text-xs sm:text-sm h-10',
    lg: 'p-1.5 text-sm sm:text-base h-12',
  };

  return (
    <div
      ref={containerRef}
      role="tablist"
      aria-label={ariaLabel}
      className={`relative inline-flex items-center rounded-full bg-white/[0.08] border border-white/[0.1] backdrop-blur-xl shadow-inner ${sizeClasses[size]}`}
    >
      {/* Sliding Active Pill Highlight */}
      <div
        className="absolute top-1 bottom-1 rounded-full bg-white text-black shadow-lg transition-all duration-300 pointer-events-none"
        style={{
          left: `${indicatorStyle.left}px`,
          width: `${indicatorStyle.width}px`,
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {options.map((opt) => {
        const isSelected = opt.id === selectedId;
        return (
          <button
            key={opt.id}
            role="tab"
            aria-selected={isSelected}
            onClick={() => handleSelect(opt.id)}
            className={`relative z-10 flex items-center justify-center gap-2 px-3 sm:px-4 h-full rounded-full font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
              isSelected ? 'text-black font-semibold' : 'text-white/70 hover:text-white'
            }`}
          >
            {opt.icon && <span className="flex-shrink-0">{opt.icon}</span>}
            <span>{opt.label}</span>
            {opt.badge !== undefined && (
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-black/10 text-black' : 'bg-white/10 text-white/80'
                }`}
              >
                {opt.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
