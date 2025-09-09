import React from 'react';
import { Upload, Video, X } from 'lucide-react';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/Button';
import { formatFileSize } from '../../../utils/fileUtils';
import { UI_MESSAGES } from '../../../utils/constants';
import type { FileUploadAreaProps } from '../../../types';

const FileUploadArea: React.FC<FileUploadAreaProps> = ({ 
  selectedFile, 
  dragActive, 
  onFileChange, 
  onDrag, 
  onDrop, 
  onClearFile 
}) => {
  const handleClick = () => {
    document.getElementById('video-input')?.click();
  };

  return (
    <Card className="w-full">
      <CardContent className="p-0">
        <div
          className={`
            border-2 border-dashed transition-all duration-200 cursor-pointer rounded-lg p-8 md:p-12
            ${dragActive 
              ? 'border-primary bg-accent' 
              : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-accent/50'
            }
          `}
          onDragEnter={onDrag}
          onDragLeave={onDrag}
          onDragOver={onDrag}
          onDrop={onDrop}
          onClick={handleClick}
        >
          <input
            type="file"
            id="video-input"
            accept="video/*"
            onChange={(e) => onFileChange(e.target.files?.[0] || null)}
            className="hidden"
          />
          
          <div className="text-center space-y-4">
            {selectedFile ? (
              <FileSelected 
                file={selectedFile} 
                onClear={onClearFile} 
              />
            ) : (
              <FilePrompt />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const FileSelected: React.FC<{ file: File; onClear: () => void }> = ({ file, onClear }) => (
  <div className="space-y-4">
    <div className="flex justify-center">
      <div className="p-4 bg-primary/10 rounded-full">
        <Video className="h-8 w-8 md:h-12 md:w-12" />
      </div>
    </div>
    <div className="space-y-2">
      <p className="text-sm font-medium text-primary">{UI_MESSAGES.FILE_SELECTED}</p>
      <p className="font-medium text-sm md:text-base break-all">{file.name}</p>
      <p className="text-xs md:text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
    </div>
    <Button
      variant="outline"
      size="sm"
      onClick={(e) => {
        e.stopPropagation();
        onClear();
      }}
      className="text-xs"
    >
      <X className="h-3 w-3 mr-1" />
      {UI_MESSAGES.REMOVE_FILE}
    </Button>
  </div>
);

const FilePrompt: React.FC = () => (
  <div className="space-y-4">
    <div className="flex justify-center">
      <div className="p-4 bg-muted rounded-full">
        <Upload className="h-8 w-8 md:h-12 md:w-12 text-muted-foreground" />
      </div>
    </div>
    <div className="space-y-2">
      <p className="text-sm md:text-base font-medium">{UI_MESSAGES.UPLOAD_PROMPT}</p>
      <p className="text-xs md:text-sm text-muted-foreground">
        {UI_MESSAGES.SUPPORTED_FORMATS}
      </p>
    </div>
  </div>
);

export default FileUploadArea;
