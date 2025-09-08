export const validateVideoFile = (file: File) => {
    const validTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/wmv'];
    return validTypes.includes(file.type);
  };
  
  export const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  export const getFileExtension = (filename: string) => {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
  };
  
  export const isVideoFile = (file: File) => {
    return file && file.type.startsWith('video/');
  };