import { useState } from 'react';
import { validateVideoFile } from '../utils/fileUtils';
import { UI_MESSAGES } from '../utils/constants';
import type { UseFileUploadReturn } from '../types';

export const useFileUpload = (): UseFileUploadReturn => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (file: File | null) => {
    if (!file) {
      setSelectedFile(null);
      return;
    }

    if (validateVideoFile(file)) {
      setSelectedFile(file);
      setError(null);
    } else {
      setError(UI_MESSAGES.INVALID_FILE_ERROR);
      setSelectedFile(null);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  return {
    selectedFile,
    dragActive,
    error,
    handleFileChange,
    handleDrag,
    handleDrop,
    clearFile,
    clearError,
  };
};