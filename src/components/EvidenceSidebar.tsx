
import React from 'react';
import { TriState } from './TriStateToggle';

interface Evidence {
  name: string;
  value: TriState;
}

interface EvidenceSidebarProps {
  evidence: Evidence[];
}

const getValueDisplay = (value: TriState): JSX.Element => {
  switch (value) {
    case 'true':
      return <span className="px-1.5 py-0.5 bg-success/10 text-success rounded text-xs">True</span>;
    case 'false':
      return <span className="px-1.5 py-0.5 bg-error/10 text-error rounded text-xs">False</span>;
    default:
      return <span className="px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded text-xs">Unknown</span>;
  }
};

const EvidenceSidebar: React.FC<EvidenceSidebarProps> = ({ evidence }) => {
  if (evidence.length === 0) {
    return (
      <div className="p-4 border border-slate-200 rounded-xl bg-white shadow-soft">
        <p className="text-slate-500 text-sm text-center">No evidence added yet</p>
      </div>
    );
  }

  return (
    <div className="p-4 border border-slate-200 rounded-xl bg-white shadow-soft">
      <h3 className="font-medium text-slate-800 mb-3">Current Evidence</h3>
      
      <div className="space-y-2">
        {evidence.map((item) => (
          <div 
            key={item.name} 
            className="p-2 text-sm bg-slate-50 rounded flex justify-between items-center"
          >
            <span className="text-slate-700">{item.name}</span>
            {getValueDisplay(item.value)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EvidenceSidebar;
