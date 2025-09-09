import React from 'react';
import { Video, Loader2 } from 'lucide-react';
import FileUploadArea from './FileUploadArea';
import { Button } from '../../ui/Button';
import { UI_MESSAGES } from '../../../utils/constants';
import type { UploadFormProps } from '../../../types';

const UploadForm: React.FC<UploadFormProps> = ({
  selectedFile,
  dragActive,
  loading,
  onFileChange,
  onDrag,
  onDrop,
  onClearFile,
  onSubmit,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
      <FileUploadArea
        selectedFile={selectedFile}
        dragActive={dragActive}
        onFileChange={onFileChange}
        onDrag={onDrag}
        onDrop={onDrop}
        onClearFile={onClearFile}
      />

      <div className="flex justify-center">
        <Button
          type="submit"
          disabled={!selectedFile || loading}
          size="lg"
          className="w-full sm:w-auto px-8 py-3 text-base"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {UI_MESSAGES.ANALYZING}
            </>
          ) : (
            <>
              <Video className="mr-2 h-4 w-4" />
              {UI_MESSAGES.DETECT_DEEPFAKE}
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default UploadForm;
