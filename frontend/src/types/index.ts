// API response types
export interface HighlightedFrame {
  frame_index: number;
  image: string;
}

export interface DetectionResult {
  output: 'REAL' | 'FAKE';
  confidence: number;
  highlighted_frames: HighlightedFrame[];  // <-- array!
  success: boolean;
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
  analyzeVideo: (videoFile: File | null) => Promise<void>;
  clearResults: () => void;
}

// button props
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}
