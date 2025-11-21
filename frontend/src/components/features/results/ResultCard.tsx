import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/Button";
import { DETECTION_STATUS } from "../../../utils/constants";
import type { ResultCardProps, HighlightedFrame } from "../../../types";

const ResultCard: React.FC<ResultCardProps> = ({ 
  result, 
  suspiciousFrames, 
  loadingFrames, 
  framesError,
  onFetchSuspiciousFrames 
}) => {
  const isReal = result.output === DETECTION_STATUS.REAL;

  const statusBg = isReal ? "bg-teal-800 border-teal-700" : "bg-red-800/30 border-red-700";
  const statusText = isReal ? "text-teal-400" : "text-red-300";
  const statusTitle = isReal ? "REAL" : "FAKE";

  return (
    <Card className="w-full p-4 md:p-6 space-y-6 animate-slide-up bg-gray-800 border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-semibold text-gray-100">
          Analysis Report
        </CardTitle>
      </CardHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`p-6 rounded-xl ${statusBg} border`}>
          <h3 className={`text-sm font-medium mb-1 ${statusText}`}>Status</h3>
          <p className={`text-3xl font-bold ${statusText}`}>{statusTitle}</p>
          <p className={`text-xs mt-2 ${statusText}`}>
            {isReal
              ? "No signs of video manipulation detected."
              : "Potential manipulation detected."}
          </p>
        </div>

        <div className="p-6 rounded-xl bg-gray-700 border border-gray-600">
          <h3 className="text-sm font-medium mb-1 text-gray-300">Confidence Score</h3>
          <p className="text-3xl font-bold text-teal-400">{result.confidence.toFixed(2)}%</p>
          <div className="mt-2 w-full bg-gray-600 rounded-full h-3">
            <div
              className="h-3 rounded-full bg-teal-600 transition-all duration-500"
              style={{ width: `${Math.min(result.confidence, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {!isReal && result.has_suspicious_frames && (
        <SuspiciousFramesSection 
          analysisId={result.analysis_id}
          suspiciousFrames={suspiciousFrames}
          loadingFrames={loadingFrames}
          framesError={framesError}
          onFetchFrames={onFetchSuspiciousFrames}
        />
      )}

      {!isReal && result.highlighted_frames?.length > 0 && (
        <HighlightedFramesGallery frames={result.highlighted_frames} />
      )}
    </Card>
  );
};

const SuspiciousFramesSection: React.FC<{
  analysisId: string | null;
  suspiciousFrames: HighlightedFrame[];
  loadingFrames: boolean;
  framesError: string | null;
  onFetchFrames: (analysisId: string) => void;
}> = ({ analysisId, suspiciousFrames, loadingFrames, framesError, onFetchFrames }) => {
  const handleFetchFrames = () => {
    console.log('Button clicked, analysisId:', analysisId);
    if (analysisId) {
      onFetchFrames(analysisId);
    } else {
      console.error('No analysis ID available');
    }
  };

  return (
    <Card className="mt-6 bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-100">
          Most Suspicious Frames
        </CardTitle>
        <p className="text-sm text-gray-400">
          Analyze the frames that show the strongest signs of manipulation
        </p>
      </CardHeader>
      <CardContent>
        {suspiciousFrames.length === 0 && !loadingFrames && !framesError && (
          <div className="text-center py-8">
            <Button 
              onClick={handleFetchFrames}
              disabled={!analysisId}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Show Suspicious Frames
            </Button>
            <p className="text-xs text-gray-500 mt-2">
              Click to analyze and highlight the most suspicious frames
            </p>
          </div>
        )}

        {loadingFrames && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Analyzing suspicious frames...</p>
            <p className="text-xs text-gray-500 mt-1">This may take a few seconds</p>
          </div>
        )}

        {framesError && (
          <div className="text-center py-8">
            <p className="text-red-400 mb-4">{framesError}</p>
            <Button 
              onClick={handleFetchFrames}
              disabled={!analysisId}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Try Again
            </Button>
          </div>
        )}

        {suspiciousFrames.length > 0 && (
          <HighlightedFramesGallery frames={suspiciousFrames} />
        )}
      </CardContent>
    </Card>
  );
};

const HighlightedFramesGallery: React.FC<{ frames: HighlightedFrame[] }> = ({ frames }) => (
  <div className="overflow-x-auto">
    <div className="flex items-start gap-4 pb-4">
      {frames.map((f, i) => (
        <div
          key={i}
          className="min-w-[320px] rounded-xl border border-gray-700 bg-gray-800 shadow p-2"
        >
          <img
            src={`data:image/jpeg;base64,${f.image}`}
            alt={`Frame ${f.frame_index}`}
            className="rounded-lg w-full h-auto"
          />
          <p className="text-xs text-gray-400 text-center mt-1">
            Frame #{f.frame_index} - {f.probability?.toFixed(2)}%
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default ResultCard;
