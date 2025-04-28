
import React from 'react';
import TriStateToggle, { TriState } from './TriStateToggle';

interface PredicateInputProps {
  name: string;
  value: TriState;
  onChange: (value: TriState) => void;
}

const PredicateInput: React.FC<PredicateInputProps> = ({
  name,
  value,
  onChange,
}) => {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-white">
      <label className="text-sm font-medium text-slate-700" htmlFor={name}>
        {name}
      </label>
      <TriStateToggle
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default PredicateInput;
