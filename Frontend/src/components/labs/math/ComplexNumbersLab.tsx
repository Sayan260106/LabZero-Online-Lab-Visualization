import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCw, Info, Magnet, Sparkles } from 'lucide-react';

const ComplexNumbersLab: React.FC = () => {
  const [point, setPoint] = useState({ x: 1, y: 0.5 });
  const [showUnitCircle, setShowUnitCircle] = useState(true);
  const [isError, setIsError] = useState(false);

  // Trigger visual error
  const triggerError = () => {
    setIsError(true);
    setTimeout(() => setIsError(false), 500);
  };

  // Rotate point by 90 degrees (Multiply by i)
  const rotate90 = () => {
    if (Math.abs(point.x) < 0.01 && Math.abs(point.y) < 0.01) {
      triggerError();
      return;
    }
    setPoint(prev => ({ x: -prev.y, y: prev.x }));
  };

  // Convert to display coordinates
  const scale = 120;
  const toDisplay = (val: number, isY: boolean) => {
    return isY ? 250 - val * scale : 250 + val * scale;
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-full">
      <div className={`flex-1 bg-[var(--bg-panel)] backdrop-blur-xl border border-[var(--border-glass)] p-8 rounded-[40px] flex flex-col justify-center items-center relative overflow-hidden transition-colors duration-300 ${isError ? 'bg-rose-500/20 border-rose-500/50' : ''}`}>
        <AnimatePresence>
          {isError && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
            >
               <div className="bg-rose-500 text-white px-6 py-3 rounded-2xl font-mono text-xs uppercase tracking-widest shadow-2xl">
                 Singularity Warning: Value too small
               </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="w-full h-full bg-[linear-gradient(var(--border-glass)_1px,transparent_1px),linear-gradient(90deg,var(--border-glass)_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        <svg viewBox="0 0 500 500" className="w-[350px] h-[350px] relative z-10">
          {/* Unit Circle */}
          {showUnitCircle && (
            <circle cx="250" cy="250" r={scale} fill="none" stroke="var(--color-primary)" strokeWidth="1" strokeDasharray="4 4" opacity="0.2" />
          )}

          {/* Axes */}
          <line x1="50" y1="250" x2="450" y2="250" stroke="var(--text-muted)" strokeWidth="1" opacity="0.2" />
          <line x1="250" y1="50" x2="250" y2="450" stroke="var(--text-muted)" strokeWidth="1" opacity="0.2" />

          {/* Point Vector */}
          <motion.line
            x1="250"
            y1="250"
            animate={{ x2: toDisplay(point.x, false), y2: toDisplay(point.y, true) }}
            stroke="var(--color-primary)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Point */}
          <motion.circle
            animate={{ cx: toDisplay(point.x, false), cy: toDisplay(point.y, true) }}
            r="8"
            fill="var(--color-primary)"
            className="cursor-pointer"
            drag
            dragConstraints={{ left: 50, right: 450, top: 50, bottom: 450 }}
            onDrag={(_, info) => {
              const rect = (document.querySelector('svg') as any)?.getBoundingClientRect();
              if (rect) {
                const newX = (point.x * scale + info.delta.x) / scale;
                const newY = (point.y * scale - info.delta.y) / scale;
                setPoint({ x: newX, y: newY });
              }
            }}
          />
          
          {/* Labels */}
          <text x="460" y="245" fill="var(--text-muted)" fontSize="10" className="font-mono font-bold opacity-60">RE</text>
          <text x="255" y="40" fill="var(--text-muted)" fontSize="10" className="font-mono font-bold opacity-60">IM</text>
        </svg>

        <div className="mt-8 flex gap-4">
          <button 
            onClick={rotate90}
            className="px-6 py-3 rounded-2xl bg-[var(--color-primary)] text-white text-xs font-mono uppercase tracking-widest hover:opacity-90 transition-all flex items-center gap-2 shadow-lg"
          >
            <RotateCw size={14} /> Multiply by i (90°)
          </button>
          <button 
            onClick={() => setPoint({ x: 1, y: 0 })}
            className="px-6 py-3 rounded-2xl bg-[var(--bg-panel)] border border-[var(--border-glass)] text-[var(--text-primary)] text-xs font-mono uppercase tracking-widest hover:bg-[var(--color-primary)]/10 transition-all"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="w-full lg:w-96 space-y-6">
        <div className="p-8 rounded-[32px] bg-[var(--bg-panel)] border border-[var(--border-glass)] space-y-4 shadow-xl">
          <div className="text-[var(--color-primary)] font-mono text-[10px] uppercase tracking-widest mb-1 flex items-center gap-2 font-bold">
            <Magnet size={12} /> Live Coordinates
          </div>
          <div className="text-3xl font-display font-bold text-[var(--text-primary)]">
            {point.x.toFixed(2)} + {point.y.toFixed(2)}<span className="text-[var(--color-primary)] italic">i</span>
          </div>
          <p className="text-[var(--text-muted)] text-xs leading-relaxed font-medium">
            In complex analysis, multiplying by <span className="text-[var(--text-primary)] font-mono font-bold">i</span> is a rotational operator. Drag the point or use the button to see the Argand plane in action.
          </p>
        </div>

        <div className="p-8 rounded-[32px] bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 space-y-4">
          <h3 className="text-[var(--text-primary)] font-bold text-sm flex items-center gap-2">
            <Sparkles size={16} className="text-[var(--color-primary)]" />
            Mathematical Fact
          </h3>
          <p className="text-[var(--text-muted)] text-xs font-medium leading-relaxed">
            Did you know? Euler's formula <span className="font-mono text-[var(--text-primary)] italic">eⁱᶿ = cosᶿ + i sinᶿ</span> relates trigonometric functions to complex powers.
          </p>
        </div>

        <button 
          onClick={() => setShowUnitCircle(!showUnitCircle)}
          className="w-full p-4 rounded-2xl bg-[var(--bg-panel)] border border-[var(--border-glass)] text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all flex items-center justify-center gap-2 font-bold"
        >
          <Info size={14} /> {showUnitCircle ? 'Hide' : 'Show'} Unit Circle (r=1)
        </button>
      </div>
    </div>
  );
};

export default ComplexNumbersLab;
