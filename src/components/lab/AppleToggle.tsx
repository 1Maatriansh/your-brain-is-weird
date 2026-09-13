import React from 'react';
import { sound } from '../../utils/audio';

interface AppleToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: 'sm' | 'md';
}

export const AppleToggle: React.FC<AppleToggleProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  size = 'md',
}) => {
  const handleToggle = () => {
    if (disabled) return;
    const next = !checked;
    sound.playToggle(next);
    onChange(next);
  };

  const isSmall = size === 'sm';

  return (
    <label
      className={`inline-flex items-center justify-between gap-3 select-none ${
        disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
      }`}
    >
      {(label || description) && (
        <div className="flex flex-col text-left">
          {label && <span className="text-sm font-medium text-white/90">{label}</span>}
          {description && <span className="text-xs text-white/50">{description}</span>}
        </div>
      )}

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={handleToggle}
        className={`relative inline-flex flex-shrink-0 cursor-pointer rounded-full transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
          isSmall ? 'h-5 w-9' : 'h-7 w-12'
        } ${checked ? 'bg-[#34c759] shadow-[0_0_12px_rgba(52,199,89,0.3)]' : 'bg-[#3a3a3c]'}`}
      >
        <span
          className={`pointer-events-none inline-block transform rounded-full bg-white shadow-md ring-0 transition duration-300 ease-in-out ${
            isSmall
              ? `h-4 w-4 mt-0.5 ml-0.5 ${checked ? 'translate-x-4' : 'translate-x-0'}`
              : `h-6 w-6 mt-0.5 ml-0.5 ${checked ? 'translate-x-5' : 'translate-x-0'}`
          }`}
        />
      </button>
    </label>
  );
};
