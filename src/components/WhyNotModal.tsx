
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, AlertCircle, ArrowRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface Requirement {
  id: string;
  name: string;
  field: string;
}

interface WhyNotModalProps {
  isOpen: boolean;
  onClose: () => void;
  requirements: Requirement[];
}

const WhyNotModal: React.FC<WhyNotModalProps> = ({
  isOpen,
  onClose,
  requirements
}) => {
  const navigate = useNavigate();
  
  const handleJumpToField = (field: string) => {
    // In a real app, we would navigate to the case editor and focus on the field
    navigate('/case-editor/1');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center text-error">
            <AlertCircle className="h-5 w-5 mr-2" />
            Why This Result Failed
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-slate-700 mb-4">
            This result failed due to the following missing or violated requirements:
          </p>
          
          <div className="space-y-3">
            {requirements.map((req) => (
              <div 
                key={req.id}
                className="flex items-start justify-between p-3 rounded-lg border border-error/30 bg-error/5"
              >
                <div className="flex-1">
                  <p className="font-medium text-error">{req.name}</p>
                  <p className="text-sm text-slate-600">{req.field}</p>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-error"
                  onClick={() => handleJumpToField(req.field)}
                >
                  Edit <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WhyNotModal;
