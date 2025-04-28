
import React from 'react';
import { Check, X, HelpCircle } from 'lucide-react';

export type TriState = 'true' | 'false' | 'unknown';

interface TriStateToggleProps {
  value: TriState;
  onChange: (value: TriState) => void;
  disabled?: boolean;
}

const TriStateToggle: React.FC<TriStateToggleProps> = ({ 
  value, 
  onChange,
  disabled = false
}) => {
  const getNextState = () => {
    switch (value) {
      case 'unknown': return 'true';
      case 'true': return 'false';
      case 'false': return 'unknown';
    }
  };

  const handleClick = () => {
    if (!disabled) {
      onChange(getNextState());
    }
  };

  const getStateStyles = () => {
    switch (value) {
      case 'true':
        return 'bg-success text-white';
      case 'false':
        return 'bg-error text-white';
      case 'unknown':
      default:
        return 'bg-slate-300 text-slate-700';
    }
  };

  const getStateIcon = () => {
    switch (value) {
      case 'true':
        return <Check size={16} />;
      case 'false':
        return <X size={16} />;
      case 'unknown':
      default:
        return <HelpCircle size={16} />;
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center w-8 h-8 rounded-full
        transition-colors focus-ring
        ${getStateStyles()}
        ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:opacity-90'}
      `}
      aria-label={`Toggle state: currently ${value}`}
    >
      {getStateIcon()}
    </button>
  );
};

export default TriStateToggle;
