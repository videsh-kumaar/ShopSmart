import React from 'react';
import '@google/model-viewer';
import './ARView.css';

interface ARViewProps {
  modelSrc: string;
  onClose: () => void;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}

const ARView: React.FC<ARViewProps> = ({ modelSrc, onClose }) => {
  const isSketchfab = modelSrc.includes('sketchfab.com');

  return (
    <div className="ar-view-container">
      <div className="ar-view-backdrop" onClick={onClose}></div>
      <div className="ar-view-content">
        {isSketchfab ? (
          <iframe
            title="Sketchfab 3D Model"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; fullscreen; xr-spatial-tracking"
            src={modelSrc}
            style={{ width: '100%', height: '100%' }}
          ></iframe>
        ) : (
          <model-viewer
            src={modelSrc}
            alt="A 3D model of the product"
            ar
            ar-modes="webxr scene-viewer quick-look"
            camera-controls
            auto-rotate
            style={{ width: '100%', height: '100%' }}
          >
            <button slot="ar-button" className="ar-button">
              View in your space
            </button>
          </model-viewer>
        )}
        <button onClick={onClose} className="close-button">
          &times;
        </button>
      </div>
    </div>
  );
};

export default ARView;
