
import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

export type ModelStatus = 'success' | 'failure' | 'unknown';

export interface ModelNode {
  id: string;
  name: string;
  status: ModelStatus;
  assumed?: boolean;
  children?: ModelNode[];
}

interface ModelTreeProps {
  models: ModelNode[];
  onSelect: (id: string) => void;
  selectedId?: string;
}

const ModelTreeItem: React.FC<{
  node: ModelNode;
  depth: number;
  selectedId?: string;
  onSelect: (id: string) => void;
}> = ({ node, depth, selectedId, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = node.children && node.children.length > 0;
  
  const toggleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
  };

  const getStatusColor = () => {
    switch (node.status) {
      case 'success': return 'bg-success';
      case 'failure': return 'bg-error';
      default: return 'bg-slate-400';
    }
  };

  return (
    <div>
      <div 
        className={`
          flex items-center py-2 px-2 rounded-lg cursor-pointer text-sm
          ${selectedId === node.id ? 'bg-indigo-100' : 'hover:bg-slate-100'}
        `}
        onClick={() => onSelect(node.id)}
        style={{ paddingLeft: `${(depth * 16) + 8}px` }}
      >
        {hasChildren ? (
          <button 
            onClick={toggleOpen}
            className="mr-1 focus:outline-none"
            aria-label={isOpen ? 'Collapse' : 'Expand'}
          >
            {isOpen ? (
              <ChevronDown className="h-4 w-4 text-slate-500" />
            ) : (
              <ChevronRight className="h-4 w-4 text-slate-500" />
            )}
          </button>
        ) : (
          <span className="w-5" />
        )}
        
        <span className={`w-3 h-3 rounded-full ${getStatusColor()} mr-2`} />
        
        <span className="text-slate-800">{node.name}</span>
        
        {node.assumed && (
          <span className="ml-2 w-2 h-2 rounded-full bg-warning" />
        )}
      </div>
      
      {isOpen && hasChildren && (
        <div>
          {node.children!.map((child) => (
            <ModelTreeItem 
              key={child.id} 
              node={child} 
              depth={depth + 1} 
              selectedId={selectedId}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ModelTree: React.FC<ModelTreeProps> = ({
  models,
  selectedId,
  onSelect,
}) => {
  return (
    <div className="border border-slate-200 rounded-xl bg-white p-2 overflow-y-auto">
      <div className="text-sm font-medium text-slate-700 mb-2 px-2">Models</div>
      <div className="space-y-0.5">
        {models.map((model) => (
          <ModelTreeItem
            key={model.id}
            node={model}
            depth={0}
            selectedId={selectedId}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default ModelTree;
