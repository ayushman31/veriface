export const SUPPORTED_VIDEO_FORMATS = ['MP4', 'AVI', 'MOV', 'WMV'];

export const API_ENDPOINTS = {
  DETECT: '/api/detect',
  SUSPICIOUS_FRAMES: '/api/suspicious-frames',
};

export const DETECTION_STATUS = {
  REAL: 'REAL',
  FAKE: 'FAKE',
};

export const UI_MESSAGES = {
  UPLOAD_PROMPT: 'Drop your video here or click to browse files',
  SUPPORTED_FORMATS: 'Supports MP4, AVI, MOV, WMV formats',
  FILE_SELECTED: 'File Selected',
  REMOVE_FILE: 'Remove file',
  ANALYZING: 'Analyzing Video...',
  DETECT_DEEPFAKE: 'Detect DeepFake',
  NO_FILE_ERROR: 'Please select a video file',
  INVALID_FILE_ERROR: 'Please select a valid video file (MP4, AVI, MOV, WMV)',
  PROCESSING_ERROR: 'An error occurred while processing the video',
};