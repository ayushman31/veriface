import React from 'react';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Progress } from '../../ui/progress';
import { DETECTION_STATUS } from '../../../utils/constants';
import type { ResultCardProps } from '../../../types';

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const isReal = result.output === DETECTION_STATUS.REAL;
  const IconComponent = isReal ? CheckCircle : XCircle;
  const iconColor = isReal ? 'text-green-600' : 'text-red-600';
  const statusColor = isReal ? 'text-green-600' : 'text-red-600';

  return (
    <Card className="w-full animate-slide-up">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          <div className={`p-3 rounded-full ${isReal ? 'bg-green-50' : 'bg-red-50'}`}>
            <IconComponent className={`h-8 w-8 md:h-12 md:w-12 ${iconColor}`} />
          </div>
        </div>
        <CardTitle className="text-2xl md:text-3xl">Detection Complete</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <StatusDisplay 
            label="Status" 
            value={result.output} 
            className={statusColor}
          />
          <ConfidenceDisplay confidence={result.confidence} />
        </div>
        
        <ResultDescription isReal={isReal} confidence={result.confidence} />
        {/* NEW SECTION */}
        {!isReal && result.highlighted_frame && (
          <HighlightedFrameDisplay 
          frame={result.highlighted_frame} 
          frameIndex={result.frame_index} 
          />
        )}

      </CardContent>
    </Card>
  );
};

const StatusDisplay: React.FC<{ label: string; value: string; className: string }> = ({ 
  label, 
  value, 
  className 
}) => (
  <Card>
    <CardContent className="p-4 md:p-6 text-center">
      <h3 className="text-sm font-medium text-muted-foreground mb-2">{label}</h3>
      <p className={`text-2xl md:text-3xl font-bold ${className}`}>
        {value}
      </p>
    </CardContent>
  </Card>
);

const ConfidenceDisplay: React.FC<{ confidence: number }> = ({ confidence }) => (
  <Card>
    <CardContent className="p-4 md:p-6">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-muted-foreground">Confidence</h3>
          <span className="text-xl md:text-2xl font-bold">{confidence.toFixed(1)}%</span>
        </div>
        <Progress value={confidence} className="h-2" />
        <div className="flex items-center text-xs text-muted-foreground">
          <AlertTriangle className="h-3 w-3 mr-1" />
          {confidence < 70 ? 'Low confidence' : confidence < 90 ? 'Medium confidence' : 'High confidence'}
        </div>
      </div>
    </CardContent>
  </Card>
);

const ResultDescription: React.FC<{ isReal: boolean; confidence: number }> = ({ 
  isReal, 
  confidence 
}) => (
  <Card className="bg-muted/50">
    <CardContent className="p-4 md:p-6">
      <div className="space-y-2">
        <h4 className="font-medium text-sm">Analysis Summary</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {isReal 
            ? `This video appears to be authentic based on our AI analysis with ${confidence.toFixed(1)}% confidence.`
            : `This video shows signs of manipulation and may be a deepfake with ${confidence.toFixed(1)}% confidence.`
          }
        </p>
        {confidence < 70 && (
          <div className="text-xs text-muted-foreground mt-2 p-2 bg-yellow-50 rounded border-l-2 border-yellow-200">
            <strong>Note:</strong> Low confidence results should be interpreted with caution. Consider analyzing additional footage for more reliable detection.
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);
const HighlightedFrameDisplay: React.FC<{ frame: string; frameIndex: number | null }> = ({
  frame,
  frameIndex
}) => (
  <Card className="overflow-hidden">
    <CardHeader>
      <CardTitle className="text-lg md:text-xl">Most Suspicious Frame</CardTitle>
      <p className="text-sm text-muted-foreground">
        Frame #{frameIndex} was identified as having the highest signs of manipulation.
      </p>
    </CardHeader>

    <CardContent className="flex justify-center">
      <img
        src={`data:image/jpeg;base64,${frame}`}
        alt="Suspicious frame"
        className="rounded-xl shadow-md border w-full md:w-2/3"
      />
    </CardContent>
  </Card>
);


export default ResultCard;
