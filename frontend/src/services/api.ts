import axios from 'axios';
import { API_ENDPOINTS } from '../utils/constants';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const detectDeepfake = async (videoFile: File) => {
  const formData = new FormData();
  formData.append('video', videoFile);

  try {
    const response = await api.post(API_ENDPOINTS.DETECT, formData);
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.error || 'An error occurred while processing the video',
    };
  }
};

export default api;