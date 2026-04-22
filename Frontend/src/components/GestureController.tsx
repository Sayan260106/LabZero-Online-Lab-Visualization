
import React, { useEffect, useRef, useState } from 'react';
// @ts-ignore
import { GestureRecognizer } from '@mediapipe/tasks-vision';
import { getGestureRecognizer } from '../services/gestureService';
import { Hand, Camera, Check, ArrowLeft, Move, Activity, MessageSquare, SunMoon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GestureControllerProps {
  onSelect?: () => void;
  onBack?: () => void;
  onScroll?: (delta: number) => void;
  onRotate?: (dx: number, dy: number) => void;
  onPositionChange?: (pos: { x: number, y: number } | null) => void;
  onToggleAITutor?: () => void;
  onToggleTheme?: () => void;
  isActive: boolean;
  onToggle: () => void;
}

const GestureController: React.FC<GestureControllerProps> = ({
  onSelect,
  onBack,
  onScroll,
  onRotate,
  onPositionChange,
  onToggleAITutor,
  onToggleTheme,
  isActive,
  onToggle
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const gestureRecognizerRef = useRef<GestureRecognizer | null>(null);
  const lastVideoTimeRef = useRef(-1);
  const lastGestureTimeRef = useRef(0);
  const lastProcessingTimeRef = useRef(0);
  
  const GESTURE_DEBOUNCE = 1500;
  const TARGET_FPS = 30;
  const FRAME_INTERVAL = 1000 / TARGET_FPS;
  const SMOOTHING_FACTOR = 0.35;
  const SAFE_AREA = 0.05; // 5% border
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentGesture, setCurrentGesture] = useState<string>('None');
  const [handPosition, setHandPosition] = useState<{ x: number, y: number } | null>(null);
  const lastHandPosRef = useRef<{ x: number, y: number } | null>(null);

  useEffect(() => {
    const initGestureRecognizer = async () => {
      try {
        const gestureRecognizer = await getGestureRecognizer();
        gestureRecognizerRef.current = gestureRecognizer;
        setIsLoaded(true);
      } catch (err) {
        console.error("Failed to initialize gesture recognizer:", err);
      }
    };

    if (isActive && !gestureRecognizerRef.current) {
      initGestureRecognizer();
    }
  }, [isActive]);

  useEffect(() => {
    let stream: MediaStream | null = null;
    let isRunning = true;

    const startCamera = async () => {
      if (isActive && videoRef.current) {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
              width: 640, 
              height: 480,
              frameRate: { ideal: TARGET_FPS }
            } 
          });
          videoRef.current.srcObject = stream;
          videoRef.current.addEventListener('loadeddata', predictGestures);
        } catch (err) {
          console.error("Camera access denied", err);
        }
      }
    };

    const predictGestures = async () => {
      if (!isRunning || !videoRef.current || !gestureRecognizerRef.current) return;

      const nowInMs = Date.now();
      
      // Frame skipping / FPS Control
      if (nowInMs - lastProcessingTimeRef.current < FRAME_INTERVAL) {
        if (isActive && isRunning) {
          requestAnimationFrame(predictGestures);
        }
        return;
      }

      if (videoRef.current.currentTime !== lastVideoTimeRef.current && videoRef.current.videoWidth > 0 && videoRef.current.videoHeight > 0) {
        lastVideoTimeRef.current = videoRef.current.currentTime;
        lastProcessingTimeRef.current = nowInMs;
        
        try {
          const results = gestureRecognizerRef.current.recognizeForVideo(videoRef.current, nowInMs);
          
          if (results.gestures.length > 0) {
            const gesture = results.gestures[0][0].categoryName;
            const landmarks = results.landmarks[0];
            const indexTip = landmarks[8];
            
            // Safe Area Check
            if (indexTip.x < SAFE_AREA || indexTip.x > (1 - SAFE_AREA) || indexTip.y < SAFE_AREA || indexTip.y > (1 - SAFE_AREA)) {
              // Out of bounds, ignore
              return;
            }

            // Normalization & Smoothing
            const rawX = 1 - indexTip.x;
            const rawY = indexTip.y;
            
            let smoothX = rawX;
            let smoothY = rawY;
            
            if (lastHandPosRef.current) {
              smoothX = lastHandPosRef.current.x + (rawX - lastHandPosRef.current.x) * SMOOTHING_FACTOR;
              smoothY = lastHandPosRef.current.y + (rawY - lastHandPosRef.current.y) * SMOOTHING_FACTOR;
            }

            const currentPos = { x: smoothX, y: smoothY };
            setCurrentGesture(gesture);
            setHandPosition(currentPos);
            onPositionChange?.(currentPos);

            const timeSinceLastGesture = nowInMs - lastGestureTimeRef.current;

            if (gesture === 'Thumb_Up' && timeSinceLastGesture > GESTURE_DEBOUNCE) {
              lastGestureTimeRef.current = nowInMs;
              const x = currentPos.x * window.innerWidth;
              const y = currentPos.y * window.innerHeight;
              const element = document.elementFromPoint(x, y) as HTMLElement;
              if (element) {
                element.click();
                onSelect?.();
              }
            } else if (gesture === 'Thumb_Down' && timeSinceLastGesture > GESTURE_DEBOUNCE) {
              lastGestureTimeRef.current = nowInMs;
              onBack?.();
            } else if (gesture === 'Victory' && timeSinceLastGesture > GESTURE_DEBOUNCE) {
              lastGestureTimeRef.current = nowInMs;
              onToggleAITutor?.();
            } else if (gesture === 'ILoveYou' && timeSinceLastGesture > GESTURE_DEBOUNCE) {
              lastGestureTimeRef.current = nowInMs;
              onToggleTheme?.();
            } else if (gesture === 'Open_Palm') {
              if (lastHandPosRef.current) {
                const dy = currentPos.y - lastHandPosRef.current.y;
                if (Math.abs(dy) > 0.01) {
                  onScroll?.(dy * 2000);
                }
              }
            } else if (gesture === 'Pointing_Up' || gesture === 'Closed_Fist') {
              if (lastHandPosRef.current) {
                const dx = currentPos.x - lastHandPosRef.current.x;
                const dy = currentPos.y - lastHandPosRef.current.y;
                if (Math.abs(dx) > 0.005 || Math.abs(dy) > 0.005) {
                  onRotate?.(dx * 1000, dy * 1000);
                }
              }
            }
            
            lastHandPosRef.current = currentPos;
          } else {
            setCurrentGesture('None');
            setHandPosition(null);
            onPositionChange?.(null);
            lastHandPosRef.current = null;
          }
        } catch (err) {
          console.error("MediaPipe recognition error:", err);
        }
      }

      if (isActive && isRunning) {
        requestAnimationFrame(predictGestures);
      }
    };

    if (isActive) {
      startCamera();
    } else {
      isRunning = false;
      if (stream && typeof (stream as MediaStream).getTracks === 'function') {
        (stream as MediaStream).getTracks().forEach(track => track.stop());
      }
    }

    return () => {
      isRunning = false;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isActive, onSelect, onBack, onScroll, onRotate, onToggleAITutor, onToggleTheme]);

  return (
    <div className={`fixed left-4 md:left-12 z-[100] transition-all duration-500 ${isActive ? 'bottom-28 md:bottom-12' : 'bottom-12'}`}>
      <div className={`
        relative flex items-center gap-4 p-2 rounded-2xl border transition-all duration-700
        ${isActive ? 'bg-[#020617] border-indigo-500/50 shadow-[0_0_50px_rgba(99,102,241,0.2)]' : 'bg-white/[0.02] border-white/5 md:flex hidden'}
      `}>
        {isActive && <div className="absolute inset-0 radial-track opacity-20 pointer-events-none rounded-2xl" />}

        <button
          onClick={onToggle}
          className={`
            relative w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-500 overflow-hidden group md:flex hidden
            ${isActive ? 'bg-indigo-600 text-white' : 'bg-white/5 text-slate-500 hover:text-white hover:bg-white/10'}
          `}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          {isActive ? <Hand size={28} /> : <Camera size={28} />}
        </button>

        <AnimatePresence>
          {isActive && (
            <motion.div 
              initial={{ opacity: 0, x: -20, width: 0 }}
              animate={{ opacity: 1, x: 0, width: 'auto' }}
              exit={{ opacity: 0, x: -20, width: 0 }}
              className="flex items-center gap-8 pr-8 overflow-hidden whitespace-nowrap"
            >
              <div className="h-10 w-px bg-white/10" />
              
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <Activity size={10} className="text-indigo-400" />
                  <span className="text-[9px] font-mono text-indigo-400 uppercase tracking-[0.3em]">Neural Engine</span>
                </div>
                <span className="text-sm font-display font-bold text-white tracking-tight">
                  {currentGesture === 'None' ? 'SCANNING...' : currentGesture.replace('_', ' ').toUpperCase()}
                </span>
              </div>

              <div className="flex gap-3">
                {[
                  { id: 'Thumb_Up', icon: Check, label: 'Select' },
                  { id: 'Thumb_Down', icon: ArrowLeft, label: 'Back' },
                  { id: 'Open_Palm', icon: Move, label: 'Scroll' },
                  { id: 'Victory', icon: MessageSquare, label: 'Tutor' },
                  { id: 'ILoveYou', icon: SunMoon, label: 'Theme' },
                ].map((g) => (
                  <div key={g.id} className="flex flex-col items-center gap-1.5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                      currentGesture === g.id 
                        ? 'bg-indigo-500 border-indigo-400 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)] scale-110' 
                        : 'bg-white/5 border-white/10 text-slate-600'
                    }`}>
                      <g.icon size={16} />
                    </div>
                    <span className="text-[7px] font-mono text-slate-500 uppercase tracking-widest">{g.label}</span>
                  </div>
                ))}
              </div>

              <div className="relative w-40 h-16 bg-black rounded-xl border border-white/10 overflow-hidden group">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale contrast-125 -scale-x-100"
                />
                <div className="absolute inset-0 bg-indigo-500/10 mix-blend-overlay" />
                <div className="absolute top-0 left-0 w-full h-px bg-indigo-500/20 animate-[scan_2s_linear_infinite]" />
                
                {handPosition && (
                  <motion.div 
                    layoutId="handMarker"
                    className="absolute w-3 h-3 border-2 border-indigo-400 rounded-full shadow-[0_0_15px_#6366f1] z-10"
                    style={{ 
                      left: `${handPosition.x * 100}%`, 
                      top: `${handPosition.y * 100}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <div className="absolute inset-[-4px] border border-indigo-400/30 rounded-full animate-ping" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(64px); }
        }
      `}</style>
    </div>
  );
};

export default GestureController;
