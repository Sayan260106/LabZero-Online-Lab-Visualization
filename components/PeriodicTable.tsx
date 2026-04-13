
import React from 'react';
import { ELEMENTS } from '../constants';
import { ElementData } from '../types';

interface PeriodicTableProps {
  onSelect: (element: ElementData) => void;
  selectedSymbol: string;
}

const PeriodicTable: React.FC<PeriodicTableProps> = ({ onSelect, selectedSymbol }) => {
  // Sort elements by atomic number to ensure correct sequence
  const sortedElements = [...ELEMENTS].sort((a, b) => a.number - b.number);

  return (
    <div className="overflow-x-auto pb-6 scrollbar-hide">
      <div className="grid gap-2 min-w-[1200px] p-2" style={{ gridTemplateColumns: 'repeat(18, minmax(0, 1fr))' }}>
        {Array.from({ length: 7 }).map((_, periodIdx) => (
          Array.from({ length: 18 }).map((_, groupIdx) => {
            const period = periodIdx + 1;
            const group = groupIdx + 1;
            const el = sortedElements.find(e => e.period === period && e.group === group);

            if (!el) return <div key={`${period}-${group}`} className="w-full aspect-square opacity-0"></div>;

            return (
              <button
                key={el.symbol}
                onClick={() => onSelect(el)}
                className={`
                  flex flex-col items-center justify-center rounded-xl transition-all duration-300 relative
                  ${selectedSymbol === el.symbol 
                    ? 'bg-indigo-600 border-indigo-400 scale-110 shadow-2xl shadow-indigo-500/40 z-50' 
                    : 'bg-white/5 hover:bg-white/15 border-white/10 hover:border-white/20'
                  }
                  border w-full aspect-square group
                `}
              >
                <span className={`absolute top-1 left-1.5 text-[7px] font-mono transition-colors ${selectedSymbol === el.symbol ? 'text-white/60' : 'text-white/20'}`}>{el.number}</span>
                <span className="text-base font-black tracking-tighter">{el.symbol}</span>
                <span className={`text-[6px] font-black uppercase truncate w-full text-center mt-0.5 transition-colors ${selectedSymbol === el.symbol ? 'text-white/60' : 'text-white/10'}`}>{el.name}</span>
                
                {selectedSymbol === el.symbol && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-pulse"></div>
                )}
              </button>
            );
          })
        ))}

        {/* Lanthanides & Actinides separate block */}
        <div className="col-span-full h-6"></div>
        
        <div className="col-span-2"></div>
        {sortedElements.filter(e => e.number >= 57 && e.number <= 71).map(el => (
           <ElementButton key={el.symbol} el={el} onSelect={onSelect} selectedSymbol={selectedSymbol} />
        ))}
        <div className="col-span-1"></div>

        <div className="col-span-2"></div>
        {sortedElements.filter(e => e.number >= 89 && e.number <= 103).map(el => (
           <ElementButton key={el.symbol} el={el} onSelect={onSelect} selectedSymbol={selectedSymbol} />
        ))}
      </div>
    </div>
  );
};

// Fixed typing to include key prop implicitly via React.FC and refined types for props
const ElementButton: React.FC<{ el: ElementData, onSelect: (el: ElementData) => void, selectedSymbol: string }> = ({ el, onSelect, selectedSymbol }) => (
  <button
    onClick={() => onSelect(el)}
    className={`
      flex flex-col items-center justify-center rounded-xl transition-all duration-300 relative
      ${selectedSymbol === el.symbol 
        ? 'bg-indigo-600 border-indigo-400 scale-110 shadow-2xl shadow-indigo-500/40 z-50' 
        : 'bg-white/5 hover:bg-white/15 border-white/10 hover:border-white/20'
      }
      border w-full aspect-square group
    `}
  >
    <span className={`absolute top-1 left-1.5 text-[7px] font-mono transition-colors ${selectedSymbol === el.symbol ? 'text-white/60' : 'text-white/20'}`}>{el.number}</span>
    <span className="text-base font-black tracking-tighter">{el.symbol}</span>
  </button>
);

export default PeriodicTable;
