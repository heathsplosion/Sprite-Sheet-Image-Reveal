import React, { useState, useEffect } from 'react';

interface InkRevealImageProps {
  src: string;
  alt?: string;
  maskUrl: string;
  maskBaseClass: string;
  animationClass: string;
  width: number;
  height: number;
}

export const InkRevealImage: React.FC<InkRevealImageProps> = ({ 
  src, 
  alt = "Revealed Image",
  maskUrl,
  maskBaseClass,
  animationClass,
  width,
  height
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [maskLoaded, setMaskLoaded] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const isReady = imgLoaded && maskLoaded;

  useEffect(() => {
    if (isReady) {
      const timer = setTimeout(() => {
        setShowAnimation(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isReady]);

  return (
    <div 
      className="relative inline-block overflow-hidden rounded-lg bg-[#FFFFFF] shadow-2xl"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {/* Loading State */}
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-[#808080]">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Preload Mask */}
      <img 
        src={maskUrl} 
        alt="" 
        className="absolute w-px h-px opacity-0 -z-10"
        onLoad={() => setMaskLoaded(true)}
        onError={() => setMaskLoaded(true)} 
      />

      {/* Preload Main Image */}
      <img
        src={src}
        alt={alt}
        className="absolute w-px h-px opacity-0 -z-10"
        onLoad={() => setImgLoaded(true)}
      />

      {/* The Revealed Layer */}
      <div 
        className={`
          absolute inset-0 z-10 bg-cover bg-center bg-no-repeat
          transition-opacity duration-300
          ${isReady ? 'opacity-100' : 'opacity-0'}
          ${isReady ? maskBaseClass : ''}
          ${showAnimation ? animationClass : ''}
        `}
        style={{
          backgroundImage: `url('${src}')`,
        }}
      />
    </div>
  );
};