import { useState } from 'react';
import { detectDeepfake } from '../services/api';
import { UI_MESSAGES } from '../utils/constants';

export const useDetection = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null); //FI : if here string data type does not work then change it to any
  const [error, setError] = useState<string | null>(null);

  const analyzeVideo = async (videoFile: File) => {
    if (!videoFile) {
      setError(UI_MESSAGES.NO_FILE_ERROR);
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const response = await detectDeepfake(videoFile);

    if (response.success) {
      setResult(response.data);
    } else {
      setError(response.error);
    }

    setLoading(false);
  };

  const clearResults = () => {
    setResult(null);
    setError(null);
  };

  return {
    loading,
    result,
    error,
    analyzeVideo,
    clearResults,
  };
};