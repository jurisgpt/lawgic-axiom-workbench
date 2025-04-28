
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2, Save, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PredicateInput from '@/components/PredicateInput';
import { Badge } from '@/components/ui/badge';
import EvidenceSidebar from '@/components/EvidenceSidebar';
import { TriState } from '@/components/TriStateToggle';

// Mock data for predicates
const mockPredicates = [
  { id: '1', name: 'obligation(supplier, deliver_goods)' },
  { id: '2', name: 'performed(supplier, deliver_goods)' },
  { id: '3', name: 'has_excuse(supplier)' },
  { id: '4', name: 'force_majeure' },
  { id: '5', name: 'pandemic' },
  { id: '6', name: 'natural_disaster' },
  { id: '7', name: 'war' },
  { id: '8', name: 'notified(supplier, force_majeure, within_days(5))' }
];

// Mock data for discretion criteria
const mockDiscretionCriteria = [
  { id: '1', name: 'economic_hardship' },
  { id: '2', name: 'good_faith_effort' },
  { id: '3', name: 'proportional_response' },
  { id: '4', name: 'substantial_compliance' },
  { id: '5', name: 'unjust_enrichment' }
];

const CaseEditor: React.FC = () => {
  const { fileId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [predicateValues, setPredicateValues] = useState<Record<string, TriState>>({});
  const [selectedDiscretion, setSelectedDiscretion] = useState<string[]>([]);
  
  // Initialize evidence with default values
  useEffect(() => {
    const defaultValues: Record<string, TriState> = {};
    mockPredicates.forEach(predicate => {
      defaultValues[predicate.id] = 'unknown';
    });
    setPredicateValues(defaultValues);
    setLoading(false);
  }, [fileId]);
  
  const handlePredicateChange = (id: string, value: TriState) => {
    setPredicateValues(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const toggleDiscretionCriterion = (id: string) => {
    setSelectedDiscretion(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };
  
  const handleSave = () => {
    // In a real app, we would save the case data here
    console.log('Saving case data:', { predicateValues, selectedDiscretion });
    alert('Case saved!');
  };
  
  const handleRunReasoner = () => {
    // In a real app, this would send the data to the reasoner
    navigate('/reasoning');
  };
  
  // Create evidence list for the sidebar
  const evidence = Object.entries(predicateValues)
    .filter(([_, value]) => value !== 'unknown')
    .map(([id, value]) => {
      const predicate = mockPredicates.find(p => p.id === id);
      return {
        name: predicate?.name || '',
        value
      };
    });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Case Editor</h1>
        <p className="text-slate-500">Enter evidence for your case</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-8">
          {/* Predicates Section */}
          <div className="bg-white rounded-xl card-shadow border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Predicates</h2>
            
            <div className="space-y-3">
              {mockPredicates.map((predicate) => (
                <PredicateInput
                  key={predicate.id}
                  name={predicate.name}
                  value={predicateValues[predicate.id]}
                  onChange={(value) => handlePredicateChange(predicate.id, value)}
                />
              ))}
            </div>
          </div>
          
          {/* Discretion Section */}
          <div className="bg-white rounded-xl card-shadow border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Discretion Criteria</h2>
            <p className="text-sm text-slate-500 mb-4">
              Select applicable discretionary criteria for this case:
            </p>
            
            <div className="flex flex-wrap gap-2">
              {mockDiscretionCriteria.map((criterion) => {
                const isSelected = selectedDiscretion.includes(criterion.id);
                return (
                  <Badge
                    key={criterion.id}
                    variant={isSelected ? "default" : "outline"}
                    className={`cursor-pointer px-3 py-1 text-sm ${
                      isSelected 
                        ? 'bg-indigo-600 hover:bg-indigo-700' 
                        : 'hover:bg-slate-100'
                    }`}
                    onClick={() => toggleDiscretionCriterion(criterion.id)}
                  >
                    {criterion.name}
                  </Badge>
                );
              })}
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleSave}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Evidence
            </Button>
            
            <Button
              className="bg-indigo-600 hover:bg-indigo-700"
              onClick={handleRunReasoner}
            >
              Save Evidence & Run Reasoner
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
        
        <div className="sticky top-24">
          <EvidenceSidebar evidence={evidence} />
        </div>
      </div>
    </div>
  );
};

export default CaseEditor;
