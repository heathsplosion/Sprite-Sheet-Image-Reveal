import React, { useState } from 'react';
import { InkRevealImage } from './components/InkRevealImage';

const App: React.FC = () => {
  const [key, setKey] = useState(0);

  const handleReplay = () => {
    setKey(prev => prev + 1);
  };

  const IMAGE_URL = "images/example.jpg";

  // Card dimensions
  const WIDTH = 300;
  const HEIGHT = 450; 

  return (
    <div className="min-h-screen w-full bg-[#808080] flex flex-col items-center justify-center p-8">
      
      <div className="mb-10 text-center">
        <h1 className="text-white/80 text-xl font-light tracking-widest uppercase mb-2">
          Paint Reveal
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
        
        {/* Paint Reveal Image */}
        <div className="flex flex-col items-center gap-4">
          <InkRevealImage 
            key={`right-${key}`}
            src={IMAGE_URL}
            alt="Sleep Walker"
            maskUrl="images/video-clip-mask.png"
            maskBaseClass="mask-right-base"
            animationClass="animate-right"
            width={WIDTH}
            height={HEIGHT}
          />
        </div>

      </div>

      <button 
        onClick={handleReplay}
        className="mt-16 px-8 py-3 border border-white/30 text-white/70 hover:bg-white/10 hover:text-white transition-all duration-300 rounded-full text-xs font-bold uppercase tracking-widest cursor-pointer"
      >
        Replay Animation
      </button>

    </div>
  );
};

export default App;