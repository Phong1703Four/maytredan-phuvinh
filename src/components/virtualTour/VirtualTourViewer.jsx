import React, { useEffect, useRef, useState } from 'react';
import { VREngine } from '../../lib/virtualTour/VREngine';
import { DataLoader } from '../../lib/virtualTour/DataLoader';
import { Loader2, Compass, Map, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './virtualTour.css';

export default function VirtualTourViewer({ startNodeId, onExit, spotData }) {
  const containerRef = useRef(null);
  const [engine, setEngine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentNode, setCurrentNode] = useState(null);
  const [showInfo, setShowInfo] = useState(null);

  useEffect(() => {
    let vrEngine;
    let isMounted = true;
    
    const init = async () => {
      if (!containerRef.current) return;
      
      const dataLoader = new DataLoader();
      await dataLoader.loadTourData('/data/tour.json');
      
      if (!isMounted) return;
      
      vrEngine = new VREngine(containerRef.current, dataLoader, {
        onLoading: (isLoading) => setLoading(isLoading),
        onNodeChanged: (node) => setCurrentNode(node),
        onHotspotClick: (hotspot) => {
          if (hotspot.type === 'move') {
            vrEngine.loadNode(hotspot.targetId);
          } else if (hotspot.type === 'info' || hotspot.type === 'product' || hotspot.type === 'video') {
            setShowInfo(hotspot);
          }
        }
      });
      
      vrEngine.start();
      
      const nodeToLoad = startNodeId || dataLoader.getStartNode() || 'spot_1';
      await vrEngine.loadNode(nodeToLoad);
      
      setEngine(vrEngine);
    };

    init();

    return () => {
      isMounted = false;
      if (vrEngine) {
        vrEngine.dispose();
      }
    };
  }, [startNodeId]);

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      {/* 3D Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />
      
      {/* Loading Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-50">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-white font-medium">Loading 360° Environment...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* UI Overlay */}
      <div className="absolute top-4 left-4 z-40 bg-black/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 flex items-center gap-3">
        <Compass className="w-5 h-5 text-primary" />
        <div>
          <h3 className="text-white font-bold text-sm">{currentNode ? currentNode.name : 'Phú Vinh Village'}</h3>
          <p className="text-white/60 text-xs">Virtual Tour 5D</p>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-white/80 text-xs flex items-center gap-2 pointer-events-none">
        <Map className="w-4 h-4" /> Drag to look around, scroll to zoom
      </div>

      {/* Info Modal */}
      <AnimatePresence>
        {showInfo && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-sm bg-card rounded-2xl shadow-2xl border border-border p-5">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-bold text-foreground text-lg flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" /> {showInfo.title}
              </h4>
              <button onClick={() => setShowInfo(null)} className="p-1 rounded-md hover:bg-muted text-muted-foreground"><X className="w-4 h-4" /></button>
            </div>
            {showInfo.description && <p className="text-sm text-muted-foreground mb-4">{showInfo.description}</p>}
            {showInfo.type === 'product' && (
              <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                <p className="text-sm font-semibold text-primary">Price: {showInfo.price}</p>
              </div>
            )}
            {showInfo.type === 'video' && (
              <div className="aspect-video bg-black rounded-xl overflow-hidden mb-2">
                <iframe src={showInfo.url} className="w-full h-full" frameBorder="0" allowFullScreen></iframe>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
