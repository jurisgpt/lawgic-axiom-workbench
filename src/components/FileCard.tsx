
import React from 'react';
import { FileText, Eye, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileCardProps {
  fileName: string;
  lastModified: string;
  onPreview: () => void;
  onCreateCase: () => void;
}

const FileCard: React.FC<FileCardProps> = ({
  fileName,
  lastModified,
  onPreview,
  onCreateCase,
}) => {
  return (
    <div className="bg-white rounded-xl card-shadow p-4 border border-slate-200">
      <div className="flex items-start">
        <div className="bg-indigo-100 p-2 rounded-lg">
          <FileText className="h-6 w-6 text-indigo-600" />
        </div>
        <div className="ml-3 flex-1">
          <h3 className="font-medium text-slate-900">{fileName}</h3>
          <p className="text-sm text-slate-500">Modified {lastModified}</p>
        </div>
      </div>
      
      <div className="mt-4 flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 text-slate-700"
          onClick={onPreview}
        >
          <Eye className="h-4 w-4 mr-1" />
          Preview
        </Button>
        
        <Button
          variant="default"
          size="sm"
          className="flex-1 bg-indigo-600 hover:bg-indigo-700"
          onClick={onCreateCase}
        >
          <Play className="h-4 w-4 mr-1" />
          Create Case
        </Button>
      </div>
    </div>
  );
};

export default FileCard;
