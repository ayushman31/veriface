import axios, { AxiosError } from 'axios';
import { API_ENDPOINTS } from '../utils/constants';
import type { DetectionResult, SuspiciousFramesResult, ApiResponse } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const detectDeepfake = async (videoFile: File): Promise<ApiResponse<DetectionResult>> => {
  const formData = new FormData();
  formData.append('video', videoFile);

  try {
    const response = await api.post<DetectionResult>(API_ENDPOINTS.DETECT, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const axiosError = error as AxiosError<{ error: string }>;
    return {
      success: false,
      error: axiosError.response?.data?.error || 'An error occurred while processing the video',
    };
  }
};

export const getSuspiciousFrames = async (analysisId: string): Promise<ApiResponse<SuspiciousFramesResult>> => {
  try {
    console.log(`Making API call to: /api/suspicious-frames/${analysisId}`);
    const response = await api.get<SuspiciousFramesResult>(`/api/suspicious-frames/${analysisId}`);
    console.log('API response:', response.data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('API error:', error);
    const axiosError = error as AxiosError<{ error: string }>;
    return {
      success: false,
      error: axiosError.response?.data?.error || 'An error occurred while fetching suspicious frames',
    };
  }
};

export default api;