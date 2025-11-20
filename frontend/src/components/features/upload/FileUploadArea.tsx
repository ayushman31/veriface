import React from 'react';
import { Upload, X } from 'lucide-react';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/Button';
import type { FileUploadAreaProps, UploadBoxProps, VideoPreviewProps } from '../../../types';

const FileUploadArea: React.FC<FileUploadAreaProps> = ({ 
  selectedFile, 
  dragActive, 
  onFileChange, 
  onDrag, 
  onDrop, 
  onClearFile,
}) => {
  const handleClick = () => {
    document.getElementById('video-input')?.click();
  };

  return (
    <Card className="w-full border border-gray-700 rounded-2xl shadow-sm px-4 py-6 bg-gray-800">
      <CardContent className="p-0">
        {selectedFile ? (
          <VideoPreview file={selectedFile} onClearFile={onClearFile} />
        ) : (
          <UploadBox
            dragActive={dragActive}
            onDrop={onDrop}
            onDrag={onDrag}
            onClick={handleClick}
            onFileChange={onFileChange}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default FileUploadArea;

// ------------------------------
// UPLOAD BOX
// ------------------------------
const UploadBox: React.FC<UploadBoxProps> = ({
  dragActive,
  onDrop,
  onDrag,
  onClick,
  onFileChange
}) => (
  <div
    className={`
      rounded-2xl p-8 md:p-12 cursor-pointer
      border-2 border-dashed ${dragActive ? 'border-teal-400 bg-gray-700' : 'border-gray-600 hover:bg-gray-700'}
      transition-all duration-200
    `}
    onDragEnter={onDrag}
    onDragLeave={onDrag}
    onDragOver={onDrag}
    onDrop={onDrop}
    onClick={onClick}
  >
    <input
      type="file"
      id="video-input"
      accept="video/*"
      onChange={(e) => onFileChange(e.target.files?.[0] || null)}
      className="hidden"
    />
    <FilePrompt />
  </div>
);

// ------------------------------
// VIDEO PREVIEW
// ------------------------------
const VideoPreview: React.FC<VideoPreviewProps> = ({
  file,
  onClearFile
}) => {
  const videoURL = React.useMemo(() => URL.createObjectURL(file), [file]);

  return (
    <div className="rounded-2xl border border-gray-700 p-6 relative bg-gray-800">
      <h2 className="text-xl font-semibold text-gray-100 mb-4">Video Preview</h2>
      <div className="flex justify-center">
        <video
          src={videoURL}
          controls
          className="w-[600px] h-[260px] object-cover rounded-2xl shadow-md bg-gray-900"
          onError={() => alert('This video format is not supported by your browser.')}
        >
          <source src={videoURL} type={file.type || "video/mp4"} />
          Your browser does not support preview for this video codec.
        </video>
      </div>
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-400">{file.name}</p>
        <Button
          variant="outline"
          size="sm"
          className="text-xs border-gray-600 hover:border-teal-400 hover:bg-gray-700"
          onClick={onClearFile}
        >
          <X className="h-3 w-3 mr-1" />
          Remove
        </Button>
      </div>
    </div>
  );
};

// ------------------------------
// UPLOAD PROMPT
// ------------------------------
const FilePrompt: React.FC = () => (
  <div className="text-center space-y-4">
    <div className="flex justify-center">
      <div className="p-4 rounded-full bg-gray-700">
        <Upload className="h-10 w-10 text-teal-400" />
      </div>
    </div>
    <p className="text-lg font-medium text-gray-100">
      Drag and drop your video file here
    </p>
    <p className="text-sm text-gray-400">or</p>
    <Button
      className="bg-teal-600 hover:bg-teal-500 text-white px-6 py-2 rounded-full text-sm font-semibold"
      onClick={(e) => {
        e.stopPropagation();
        document.getElementById('video-input')?.click();
      }}
    >
      Browse Files
    </Button>
    <p className="text-sm text-gray-400 pt-2">
      Supported formats: MP4, MOV, AVI. Max file size: 500MB
    </p>
  </div>
);
