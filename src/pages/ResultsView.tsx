
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy, Download, FileJson, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ModelTree, { ModelNode } from '@/components/ModelTree';
import WhyNotModal from '@/components/WhyNotModal';

// Mock data for model tree
const mockModels: ModelNode[] = [
  {
    id: '1',
    name: 'Breach of Contract',
    status: 'success',
    children: [
      {
        id: '1-1',
        name: 'obligation(supplier, deliver_goods)',
        status: 'success',
      },
      {
        id: '1-2',
        name: 'performed(supplier, deliver_goods)',
        status: 'failure',
      },
      {
        id: '1-3',
        name: 'has_excuse(supplier)',
        status: 'failure',
        children: [
          {
            id: '1-3-1',
            name: 'force_majeure',
            status: 'failure',
          },
          {
            id: '1-3-2',
            name: 'notified(supplier, force_majeure, within_days(5))',
            status: 'unknown',
            assumed: true,
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Alternative Analysis',
    status: 'failure',
    children: [
      {
        id: '2-1',
        name: 'obligation(supplier, deliver_goods)',
        status: 'success',
      },
      {
        id: '2-2',
        name: 'performed(supplier, deliver_goods)',
        status: 'failure',
      },
      {
        id: '2-3',
        name: 'has_excuse(supplier)',
        status: 'success',
        children: [
          {
            id: '2-3-1',
            name: 'force_majeure',
            status: 'success',
            assumed: true,
          },
          {
            id: '2-3-2',
            name: 'notified(supplier, force_majeure, within_days(5))',
            status: 'success',
          }
        ]
      }
    ]
  }
];

// Mock justification HTML
const mockJustification = `
<h2>Justification for Breach of Contract</h2>
<p>The supplier is in breach of contract due to the following:</p>
<ul>
  <li>The supplier has an obligation to deliver goods</li>
  <li>The supplier has not performed the delivery of goods</li>
  <li>The supplier does not have a valid excuse because:
    <ul>
      <li>There is no force majeure situation</li>
      <li>Since there is no force majeure, the notification requirement is not applicable</li>
    </ul>
  </li>
</ul>
<p>Therefore, all conditions for breach of contract have been met.</p>
`;

const ResultsView: React.FC = () => {
  const navigate = useNavigate();
  const [selectedModel, setSelectedModel] = useState<string>('1');
  const [whyNotOpen, setWhyNotOpen] = useState(false);
  
  const handleModelSelect = (id: string) => {
    setSelectedModel(id);
    
    // If the selected model has failure status, open WhyNot modal
    const findModel = (nodes: ModelNode[]): ModelNode | undefined => {
      for (const node of nodes) {
        if (node.id === id) return node;
        if (node.children) {
          const found = findModel(node.children);
          if (found) return found;
        }
      }
      return undefined;
    };
    
    const model = findModel(mockModels);
    if (model?.status === 'failure' && id !== '2') {
      setWhyNotOpen(true);
    }
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };
  
  const handleDownloadHTML = () => {
    const element = document.createElement('a');
    const file = new Blob([mockJustification], {type: 'text/html'});
    element.href = URL.createObjectURL(file);
    element.download = 'justification.html';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  
  const handleExportJSON = () => {
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(mockModels, null, 2)], {type: 'application/json'});
    element.href = URL.createObjectURL(file);
    element.download = 'results.json';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <>
      <div className="container mx-auto fade-in">
        <div className="mb-8 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/case-editor/1')}
            className="mr-2"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Reasoning Results</h1>
            <p className="text-slate-500">Review the generated models and justifications</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Model Tree */}
          <div className="lg:col-span-1">
            <ModelTree
              models={mockModels}
              selectedId={selectedModel}
              onSelect={handleModelSelect}
            />
          </div>
          
          {/* Justification View */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl card-shadow border border-slate-200 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                <h2 className="font-medium text-slate-800">Justification</h2>
                
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleCopyLink}
                    aria-label="Copy link"
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy Link
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleDownloadHTML}
                    aria-label="Download HTML"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    HTML
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleExportJSON}
                    aria-label="Export JSON"
                  >
                    <FileJson className="h-4 w-4 mr-1" />
                    JSON
                  </Button>
                </div>
              </div>
              
              <Tabs defaultValue="rendered" className="p-4">
                <TabsList className="mb-4">
                  <TabsTrigger value="rendered">Rendered</TabsTrigger>
                  <TabsTrigger value="raw">Raw</TabsTrigger>
                </TabsList>
                
                <TabsContent value="rendered">
                  <div className="prose prose-slate max-w-none"
                    dangerouslySetInnerHTML={{ __html: mockJustification }} 
                  />
                </TabsContent>
                
                <TabsContent value="raw">
                  <pre className="bg-slate-100 p-4 rounded-lg overflow-x-auto text-sm font-mono text-slate-800">
                    {mockJustification}
                  </pre>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      
      {/* Why Not Modal */}
      <WhyNotModal
        isOpen={whyNotOpen}
        onClose={() => setWhyNotOpen(false)}
        requirements={[
          { id: '1', name: 'Supplier must have notified within 5 days', field: 'notified(supplier, force_majeure, within_days(5))' },
          { id: '2', name: 'Force majeure condition must be present', field: 'force_majeure' }
        ]}
      />
    </>
  );
};

export default ResultsView;
