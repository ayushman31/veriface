import { useState } from 'react';
import { detectDeepfake } from '../services/api';
import { UI_MESSAGES } from '../utils/constants';
import type { UseDetectionReturn, DetectionResult } from '../types';

export const useDetection = (): UseDetectionReturn => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeVideo = async (videoFile: File | null) => {
    if (!videoFile) {
      setError(UI_MESSAGES.NO_FILE_ERROR);
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const response = await detectDeepfake(videoFile);

    if (response.success && response.data) {
      setResult(response.data);
    } else {
      setError(response.error || 'An unknown error occurred');
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