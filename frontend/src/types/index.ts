// API response types
export interface HighlightedFrame {
  frame_index: number;
  image: string;
  probability:number;
}

export interface DetectionResult {
  output: 'REAL' | 'FAKE';
  confidence: number;
  analysis_id: string | null;
  has_suspicious_frames: boolean;
  highlighted_frames?: HighlightedFrame[];  // Optional for backward compatibility
  success: boolean;
}

export interface SuspiciousFramesResult {
  status: 'processing' | 'completed';
  frames?: HighlightedFrame[];
  message?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// component props types
export interface FileUploadAreaProps {
  selectedFile: File | null;
  dragActive: boolean;
  onFileChange: (file: File | null) => void;
  onDrag: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onClearFile: () => void;
}

export interface UploadBoxProps {
  dragActive: boolean;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrag: (e: React.DragEvent<HTMLDivElement>) => void;
  onClick: () => void;
  onFileChange: (file: File | null) => void;
}

export interface VideoPreviewProps {
  file: File;
  onClearFile: () => void;
}

export interface UploadFormProps {
  selectedFile: File | null;
  dragActive: boolean;
  loading: boolean;
  onFileChange: (file: File | null) => void;
  onDrag: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onClearFile: () => void;
  onSubmit: () => void;
}

export interface ResultCardProps {
  result: DetectionResult;
  suspiciousFrames: HighlightedFrame[];
  loadingFrames: boolean;
  framesError: string | null;
  onFetchSuspiciousFrames: (analysisId: string) => void;
}

export interface ErrorMessageProps {
  message: string;
  onClose?: () => void;
}

export interface LayoutProps {
  children: React.ReactNode;
}

// hook return types
export interface UseFileUploadReturn {
  selectedFile: File | null;
  dragActive: boolean;
  error: string | null;
  handleFileChange: (file: File | null) => void;
  handleDrag: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  clearFile: () => void;
  clearError: () => void;
}

export interface UseDetectionReturn {
  loading: boolean;
  result: DetectionResult | null;
  error: string | null;
  suspiciousFrames: HighlightedFrame[];
  loadingFrames: boolean;
  framesError: string | null;
  analyzeVideo: (videoFile: File | null) => Promise<void>;
  fetchSuspiciousFrames: (analysisId: string) => Promise<void>;
  clearResults: () => void;
}

// button props
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}
