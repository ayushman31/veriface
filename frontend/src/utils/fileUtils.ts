export const validateVideoFile = (file: File) => {
  const allowedExt = ['mp4', 'mov', 'avi', 'wmv'];

  const nameExt = file.name.split('.').pop()?.toLowerCase() || "";
  const mime = file.type?.toLowerCase() || "";

  // Case 1: Normal browser-uploaded videos
  if (mime.startsWith("video/")) return true;

  // Case 2: Dataset files with missing or wrong MIME type
  if (allowedExt.includes(nameExt)) return true;

  // Case 3: Some systems mark MP4 as "application/octet-stream"
  if (mime === "application/octet-stream" && nameExt === "mp4") return true;

  return false;
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