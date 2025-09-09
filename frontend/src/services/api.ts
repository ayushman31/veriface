import axios, { AxiosError } from 'axios';
import { API_ENDPOINTS } from '../utils/constants';
import type { DetectionResult, ApiResponse } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const detectDeepfake = async (videoFile: File): Promise<ApiResponse<DetectionResult>> => {
  const formData = new FormData();
  formData.append('video', videoFile);

  try {
    const response = await api.post<DetectionResult>(API_ENDPOINTS.DETECT, formData);
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

export default api;