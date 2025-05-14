
import React from 'react';
import { AlertCircle } from 'lucide-react';

interface DisclaimerBannerProps {
  className?: string;
}

const DisclaimerBanner = ({ className = '' }: DisclaimerBannerProps) => {
  return (
    <div className={`bg-yellow-50 border-l-4 border-yellow-400 p-4 ${className}`}>
      <div className="flex flex-col items-center text-center">
        <div className="flex-shrink-0 mb-2">
          <AlertCircle className="h-5 w-5 text-yellow-500" />
        </div>
        <div>
          <p className="text-sm text-yellow-700">
            <strong>Disclaimer:</strong> The resources provided on this page are for informational purposes only and do not constitute medical or legal advice. Please consult with qualified professionals for guidance specific to your situation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerBanner;
