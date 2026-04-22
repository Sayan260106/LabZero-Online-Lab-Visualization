
import React from 'react';
import { Home, Book, User, Settings, Sparkles, MessageSquare, X } from 'lucide-react';
import { motion } from 'motion/react';
import { ViewState } from '../types/types';

interface BottomNavProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onOpenGlossary: () => void;
  onOpenSettings: () => void;
  onOpenProfile: () => void;
  showSettings?: boolean;
  showAITutor?: boolean;
  showGlossary?: boolean;
  showAuth?: boolean;
  language: string;
}

const BottomNav: React.FC<BottomNavProps> = ({
  currentView,
  onNavigate,
  onOpenGlossary,
  onOpenSettings,
  onOpenProfile,
  showSettings,
  showAITutor,
  showGlossary,
  showAuth,
  language
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[150] px-4 pb-4 md:hidden">
      <div className="bg-[#020617]/80 backdrop-blur-2xl border border-white/10 rounded-[32px] p-2 flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <button 
          onClick={() => onNavigate(ViewState.LANDING)}
          className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all ${
            currentView === ViewState.LANDING ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-slate-500 hover:text-white hover:bg-white/5'
          }`}
        >
          <Home size={20} />
          <span className="text-[8px] font-mono mt-1">HOME</span>
        </button>

        <button 
          onClick={onOpenGlossary}
          className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all ${
            showGlossary ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30' : 'text-slate-500 hover:text-white hover:bg-white/5'
          }`}
        >
          <Book size={20} />
          <span className="text-[8px] font-mono mt-1">BOOK</span>
        </button>

        <button 
          onClick={onOpenProfile}
          className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all ${
            showAuth ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'text-slate-500 hover:text-white hover:bg-white/5'
          }`}
        >
          <User size={20} />
          <span className="text-[8px] font-mono mt-1">USER</span>
        </button>

        <button 
          onClick={onOpenSettings}
          className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all ${
            showSettings ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30' : 'text-slate-500 hover:text-white hover:bg-white/5'
          }`}
        >
          <Settings size={20} className={showSettings ? 'rotate-90 transition-transform duration-500' : ''} />
          <span className="text-[8px] font-mono mt-1">SET</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNav;
