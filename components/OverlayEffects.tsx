import React from 'react';

export const OverlayEffects: React.FC = () => {
  return (
    <>
      {/* Noise Texture */}
      <div className="fixed inset-0 z-50 pointer-events-none mix-blend-overlay opacity-30 bg-noise" />
      
      {/* Scanlines */}
      <div className="fixed inset-0 z-50 pointer-events-none scanlines opacity-20" />
      
      {/* Vignette-ish overlay */}
      <div className="fixed inset-0 z-40 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
    </>
  );
};