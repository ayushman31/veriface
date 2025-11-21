import { useState } from 'react';
import { detectDeepfake, getSuspiciousFrames } from '../services/api';
import { UI_MESSAGES } from '../utils/constants';
import type { UseDetectionReturn, DetectionResult, HighlightedFrame } from '../types';

export const useDetection = (): UseDetectionReturn => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [suspiciousFrames, setSuspiciousFrames] = useState<HighlightedFrame[]>([]);
  const [loadingFrames, setLoadingFrames] = useState(false);
  const [framesError, setFramesError] = useState<string | null>(null);

  const analyzeVideo = async (videoFile: File | null) => {
    if (!videoFile) {
      setError(UI_MESSAGES.NO_FILE_ERROR);
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setSuspiciousFrames([]);
    setFramesError(null);

    const response = await detectDeepfake(videoFile);

    if (response.success && response.data) {
      console.log('Detection result:', response.data);
      setResult(response.data);
    } else {
      setError(response.error || 'An unknown error occurred');
    }

    setLoading(false);
  };

  const fetchSuspiciousFrames = async (analysisId: string) => {
    console.log('Fetching suspicious frames for analysis ID:', analysisId);
    setLoadingFrames(true);
    setFramesError(null);

    try {
      // Poll for results with a maximum number of attempts
      const maxAttempts = 30; // 30 seconds max wait time
      let attempts = 0;

      const pollForFrames = async (): Promise<void> => {
        console.log(`Polling attempt ${attempts + 1} for analysis ID: ${analysisId}`);
        const response = await getSuspiciousFrames(analysisId);
        console.log('Response:', response);
        
        if (response.success && response.data) {
          if (response.data.status === 'completed' && response.data.frames) {
            setSuspiciousFrames(response.data.frames);
            setLoadingFrames(false);
            return;
          } else if (response.data.status === 'processing') {
            attempts++;
            if (attempts < maxAttempts) {
              // Wait 1 second before polling again
              setTimeout(pollForFrames, 1000);
              return;
            } else {
              setFramesError('Processing is taking longer than expected. Please try again.');
              setLoadingFrames(false);
              return;
            }
          }
        } else {
          setFramesError(response.error || 'Failed to fetch suspicious frames');
          setLoadingFrames(false);
        }
      };

      await pollForFrames();
    } catch (error) {
      setFramesError('An error occurred while fetching suspicious frames');
      setLoadingFrames(false);
    }
  };

  const clearResults = () => {
    setResult(null);
    setError(null);
    setSuspiciousFrames([]);
    setFramesError(null);
  };

  return {
    loading,
    result,
    error,
    suspiciousFrames,
    loadingFrames,
    framesError,
    analyzeVideo,
    fetchSuspiciousFrames,
    clearResults,
  };
};
