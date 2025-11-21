import Layout from './components/layout/Layout';
import IntroCard from './components/layout/IntroCard';
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
    suspiciousFrames,
    loadingFrames,
    framesError,
    analyzeVideo,
    fetchSuspiciousFrames,
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
        {/*Intro Card*/}
        <IntroCard />
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
            <ResultCard 
              result={result}
              suspiciousFrames={suspiciousFrames}
              loadingFrames={loadingFrames}
              framesError={framesError}
              onFetchSuspiciousFrames={fetchSuspiciousFrames}
            />
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
