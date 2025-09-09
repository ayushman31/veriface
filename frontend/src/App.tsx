import Layout from './components/layout/Layout';
import UploadForm from './components/features/upload/UploadForm';
import ResultCard from './components/features/results/ResultCard';
import ErrorMessage from './components/ui/ErrorMessage';
import { Button } from './components/ui/Button';
import { useFileUpload } from './hooks/useFileUpload';
import { useDetection } from './hooks/useDetection';

function App() {
  const {
    selectedFile,
    dragActive,
    error: uploadError,
    handleFileChange,
    handleDrag,
    handleDrop,
    clearFile,
    clearError,
  } = useFileUpload();

  const {
    loading,
    result,
    error: detectionError,
    analyzeVideo,
    clearResults,
  } = useDetection();

  const handleSubmit = () => {
    analyzeVideo(selectedFile);
  };

  const handleNewAnalysis = () => {
    clearFile();
    clearResults();
  };

  return (
    <Layout>
      <div className="space-y-6 md:space-y-8">
        {/* Upload Form */}
        <UploadForm
          selectedFile={selectedFile}
          dragActive={dragActive}
          loading={loading}
          onFileChange={handleFileChange}
          onDrag={handleDrag}
          onDrop={handleDrop}
          onClearFile={clearFile}
          onSubmit={handleSubmit}
        />

        {/* Error Messages */}
        {uploadError && (
          <ErrorMessage 
            message={uploadError} 
            onClose={clearError} 
          />
        )}

        {detectionError && (
          <ErrorMessage 
            message={detectionError} 
            onClose={clearResults} 
          />
        )}

        {/* Results */}
        {result && (
          <div className="space-y-6">
            <ResultCard result={result} />
            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={handleNewAnalysis}
                className="w-full sm:w-auto"
              >
                Analyze Another Video
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default App
