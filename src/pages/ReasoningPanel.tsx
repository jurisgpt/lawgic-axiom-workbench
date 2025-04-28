
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Settings, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';

const ReasoningPanel: React.FC = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [output, setOutput] = useState<string[]>([]);
  const [scaspFlags, setScaspFlags] = useState({
    pos: true,
    neg: false
  });
  const [toggles, setToggles] = useState({
    force_majeure: false,
    pandemic: false,
    natural_disaster: false
  });
  
  // Simulate CLI output streaming
  useEffect(() => {
    if (progress < 100) {
      const timer = setTimeout(() => {
        setProgress(prev => {
          const next = Math.min(prev + 10, 100);
          
          // Add sample output at certain progress points
          if (next === 20) {
            setOutput(prev => [...prev, "Loading knowledge base..."]);
          } else if (next === 40) {
            setOutput(prev => [...prev, "Parsing rule set..."]);
          } else if (next === 60) {
            setOutput(prev => [...prev, "Computing stable models..."]);
          } else if (next === 80) {
            setOutput(prev => [...prev, "Generating justifications..."]);
          } else if (next === 100) {
            setOutput(prev => [...prev, "Reasoning complete!"]);
            // When complete, navigate to results
            setTimeout(() => navigate('/results'), 1000);
          }
          
          return next;
        });
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [progress, navigate]);
  
  const handleScaspFlagChange = (flag: keyof typeof scaspFlags) => {
    setScaspFlags(prev => ({
      ...prev,
      [flag]: !prev[flag]
    }));
  };
  
  const handleToggleChange = (toggle: keyof typeof toggles) => {
    setToggles(prev => ({
      ...prev,
      [toggle]: !prev[toggle]
    }));
  };
  
  return (
    <div className="fixed inset-0 bg-black/20 z-50 flex justify-end">
      <div className="w-full max-w-lg bg-white h-full shadow-xl slide-in overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 border-b border-slate-200">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-xl font-semibold text-slate-800">Reasoning Settings</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate(-1)}
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="p-6 space-y-8">
          {/* s(CASP) Flags */}
          <div>
            <h3 className="text-lg font-medium text-slate-800 mb-3 flex items-center">
              <Settings className="mr-2 h-5 w-5 text-indigo-600" />
              s(CASP) Flags
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="flag-pos" 
                  checked={scaspFlags.pos}
                  onCheckedChange={() => handleScaspFlagChange('pos')}
                />
                <label 
                  htmlFor="flag-pos"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  --pos (Show positive support)
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="flag-neg" 
                  checked={scaspFlags.neg}
                  onCheckedChange={() => handleScaspFlagChange('neg')}
                />
                <label 
                  htmlFor="flag-neg"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  --neg (Show negative support)
                </label>
              </div>
            </div>
          </div>
          
          {/* Ambiguous Predicates */}
          <div>
            <h3 className="text-lg font-medium text-slate-800 mb-3">
              Ambiguous Predicates
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label 
                  htmlFor="toggle-force-majeure"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  force_majeure
                </label>
                <Switch 
                  id="toggle-force-majeure" 
                  checked={toggles.force_majeure}
                  onCheckedChange={() => handleToggleChange('force_majeure')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label 
                  htmlFor="toggle-pandemic"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  pandemic
                </label>
                <Switch 
                  id="toggle-pandemic" 
                  checked={toggles.pandemic}
                  onCheckedChange={() => handleToggleChange('pandemic')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label 
                  htmlFor="toggle-natural-disaster"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  natural_disaster
                </label>
                <Switch 
                  id="toggle-natural-disaster" 
                  checked={toggles.natural_disaster}
                  onCheckedChange={() => handleToggleChange('natural_disaster')}
                />
              </div>
            </div>
          </div>
          
          {/* Progress Section */}
          <div>
            <h3 className="text-lg font-medium text-slate-800 mb-3">Reasoning Progress</h3>
            
            <div className="space-y-4">
              <Progress value={progress} className="h-2" />
              
              <div className="p-3 bg-slate-100 rounded-lg font-mono text-sm max-h-60 overflow-y-auto">
                {output.map((line, index) => (
                  <div key={index} className="py-0.5">{line}</div>
                ))}
                {progress < 100 && <div className="animate-pulse">_</div>}
              </div>
            </div>
          </div>
          
          {/* Run Button */}
          <div className="pt-4">
            <Button 
              className="w-full bg-indigo-600 hover:bg-indigo-700"
              disabled={progress > 0}
              onClick={() => setProgress(10)}
            >
              <Play className="h-4 w-4 mr-2" />
              Run Reasoner
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReasoningPanel;
