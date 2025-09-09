import React from 'react';
import { AlertCircle, X } from 'lucide-react';
import { Alert, AlertDescription } from './alert';
import { Button } from './Button';
import type { ErrorMessageProps } from '../../types';

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClose }) => {
  return (
    <Alert variant="destructive" className="animate-slide-up">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="flex justify-between items-center">
        <span className="text-sm">{message}</span>
        {onClose && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-6 w-6 p-0 hover:bg-destructive/20"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default ErrorMessage;
