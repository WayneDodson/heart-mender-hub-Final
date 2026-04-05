import React from 'react';

interface AdBannerProps {
  slot?: string;
  format?: 'horizontal' | 'rectangle' | 'vertical';
  className?: string;
}

/**
 * AdSense-ready ad placement component.
 * When VITE_ADSENSE_CLIENT is set in .env, renders real AdSense ads.
 * Until then, renders a clearly labelled placeholder so layout is preserved.
 */
const AdBanner: React.FC<AdBannerProps> = ({
  slot = 'placeholder',
  format = 'horizontal',
  className = '',
}) => {
  const adsenseClient = import.meta.env.VITE_ADSENSE_CLIENT;

  const dimensions: Record<string, string> = {
    horizontal: 'w-full h-[90px] min-h-[90px]',
    rectangle: 'w-full h-[250px] min-h-[250px]',
    vertical: 'w-[160px] h-[600px] min-h-[600px]',
  };

  // Once AdSense is approved, replace this block with the real ins tag
  if (adsenseClient) {
    return (
      <div className={`ad-container ${className}`}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={adsenseClient}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // Placeholder — shown until AdSense is approved
  return (
    <div
      className={`${dimensions[format]} ${className} flex items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50`}
      aria-label="Advertisement placeholder"
    >
      <div className="text-center text-gray-400">
        <p className="text-xs font-medium uppercase tracking-wide">Advertisement</p>
        <p className="text-xs mt-0.5 opacity-60">{format} · {slot}</p>
      </div>
    </div>
  );
};

export default AdBanner;
