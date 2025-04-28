
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import FileCard from '@/components/FileCard';
import CodePreview from '@/components/CodePreview';
import { Button } from '@/components/ui/button';

// Mock data for rule sets
const mockRuleSets = [
  {
    id: '1',
    name: 'contract_breach.pl',
    lastModified: '2 days ago',
    content: `% Contract Breach Analysis
breach(Party) :- 
  obligation(Party, Act),
  not performed(Party, Act),
  not has_excuse(Party).

has_excuse(Party) :-
  force_majeure,
  notified(Party, 'force_majeure', within_days(5)).

force_majeure :- pandemic.
force_majeure :- natural_disaster.
force_majeure :- war.

% Example facts
obligation(supplier, deliver_goods).
performed(supplier, deliver_goods) :- false.`
  },
  {
    id: '2',
    name: 'lease_termination.pl',
    lastModified: '5 days ago',
    content: `% Lease Termination Rules
valid_termination :-
  notice_period_respected,
  legitimate_reason,
  formal_requirements_met.

notice_period_respected :-
  notice_given(Date),
  required_notice_period(Days),
  current_date(CurrentDate),
  date_difference(CurrentDate, Date, ActualDays),
  ActualDays >= Days.

legitimate_reason :-
  reason(breach_of_contract);
  reason(tenant_default);
  reason(landlord_sale) ->
    first_refusal_offered.`
  },
  {
    id: '3',
    name: 'tort_liability.pl',
    lastModified: '1 week ago',
    content: `% Tort Liability Rules
liable(Defendant) :-
  duty_of_care(Defendant, Plaintiff),
  breach_of_duty(Defendant),
  causation(Defendant, Damages),
  damages(Plaintiff, Damages).

breach_of_duty(Defendant) :-
  standard_of_care(Standard),
  behavior(Defendant, Behavior),
  not meets_standard(Behavior, Standard).

causation(Defendant, Damages) :-
  cause_in_fact(Defendant, Damages),
  proximate_cause(Defendant, Damages).

% Defenses
not liable(Defendant) :-
  assumption_of_risk(Plaintiff);
  contributory_negligence(Plaintiff).`
  }
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [previewFile, setPreviewFile] = useState<(typeof mockRuleSets)[0] | null>(null);
  
  const handleFileUpload = () => {
    alert('File upload functionality would be implemented here');
    // In a real app, this would open a file picker and upload the selected file
  };
  
  const handleCreateCase = (fileId: string) => {
    navigate(`/case-editor/${fileId}`);
  };
  
  const handlePreview = (file: (typeof mockRuleSets)[0]) => {
    setPreviewFile(file);
  };
  
  const closePreview = () => {
    setPreviewFile(null);
  };

  return (
    <div className="container mx-auto fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Dashboard</h1>
        <p className="text-slate-500">Manage your rule sets and create new cases</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl card-shadow border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-slate-800">Rule-Set Library</h2>
              <Button 
                onClick={handleFileUpload}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                <Plus className="h-4 w-4 mr-1" />
                Upload Article
              </Button>
            </div>
            
            <div className="space-y-4">
              {mockRuleSets.length > 0 ? (
                mockRuleSets.map((file) => (
                  <FileCard
                    key={file.id}
                    fileName={file.name}
                    lastModified={file.lastModified}
                    onPreview={() => handlePreview(file)}
                    onCreateCase={() => handleCreateCase(file.id)}
                  />
                ))
              ) : (
                <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                  <p className="text-slate-500 mb-2">No rule-sets yet – upload a .pl file to begin</p>
                  <Button 
                    variant="outline" 
                    onClick={handleFileUpload}
                  >
                    Upload Your First File
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-xl card-shadow border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Quick Actions</h2>
            
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start text-left" 
                onClick={handleFileUpload}
              >
                Upload New Rule Set
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start text-left"
                onClick={() => navigate('/cases')}
              >
                View All Cases
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start text-left"
                onClick={() => navigate('/settings')}
              >
                Configure Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {previewFile && (
        <CodePreview
          isOpen={!!previewFile}
          onClose={closePreview}
          title={previewFile.name}
          code={previewFile.content}
        />
      )}
    </div>
  );
};

export default Dashboard;
