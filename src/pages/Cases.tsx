
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Calendar, File, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data for cases
const mockCases = [
  {
    id: '1',
    title: 'Smith v. Johnson Contract Dispute',
    ruleSet: 'contract_breach.pl',
    lastUpdated: 'April 20, 2025',
    status: 'Completed',
    hasResults: true
  },
  {
    id: '2',
    title: 'ABC Corp Lease Termination',
    ruleSet: 'lease_termination.pl',
    lastUpdated: 'April 15, 2025',
    status: 'In Progress',
    hasResults: false
  },
  {
    id: '3',
    title: 'Medical Malpractice Analysis',
    ruleSet: 'tort_liability.pl',
    lastUpdated: 'April 10, 2025',
    status: 'Draft',
    hasResults: false
  }
];

const Cases: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Cases</h1>
        <p className="text-slate-500">Manage and analyze your legal cases</p>
      </div>
      
      <div className="bg-white rounded-xl card-shadow border border-slate-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-slate-800">Your Cases</h2>
          <Button 
            className="bg-indigo-600 hover:bg-indigo-700"
            onClick={() => navigate('/')}
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            New Case
          </Button>
        </div>
        
        <div className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="pb-3 text-left font-medium text-slate-500">Case Name</th>
                  <th className="pb-3 text-left font-medium text-slate-500">Rule Set</th>
                  <th className="pb-3 text-left font-medium text-slate-500">Last Updated</th>
                  <th className="pb-3 text-left font-medium text-slate-500">Status</th>
                  <th className="pb-3 text-right font-medium text-slate-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {mockCases.map((caseItem) => (
                  <tr key={caseItem.id} className="hover:bg-slate-50">
                    <td className="py-4 pr-4 align-top">
                      <div className="font-medium text-slate-900">{caseItem.title}</div>
                    </td>
                    <td className="py-4 pr-4 align-top">
                      <div className="flex items-center">
                        <File className="h-4 w-4 text-indigo-600 mr-1" />
                        <span>{caseItem.ruleSet}</span>
                      </div>
                    </td>
                    <td className="py-4 pr-4 align-top">
                      <div className="flex items-center text-slate-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{caseItem.lastUpdated}</span>
                      </div>
                    </td>
                    <td className="py-4 pr-4 align-top">
                      <div className={`
                        inline-block px-2 py-1 rounded-full text-xs font-medium
                        ${caseItem.status === 'Completed' 
                          ? 'bg-success/10 text-success' 
                          : caseItem.status === 'In Progress'
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'bg-slate-100 text-slate-700'}
                      `}>
                        {caseItem.status}
                      </div>
                    </td>
                    <td className="py-4 text-right align-top">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(caseItem.hasResults ? '/results' : `/case-editor/${caseItem.id}`)}
                      >
                        {caseItem.hasResults ? 'View Results' : 'Edit Case'}
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cases;
