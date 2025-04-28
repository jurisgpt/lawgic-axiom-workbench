
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface CodePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  code: string;
}

const CodePreview: React.FC<CodePreviewProps> = ({
  isOpen,
  onClose,
  title,
  code,
}) => {
  const lines = code.split('\n');

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="code-block">
          {lines.map((line, index) => (
            <div key={index} className="code-line">
              <span className="line-number">{index + 1}</span>
              <span className="code-content">{line}</span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CodePreview;
