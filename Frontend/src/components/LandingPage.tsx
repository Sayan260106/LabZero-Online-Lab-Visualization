import React from 'react';
import { Subject } from '../types/types';
import { SUBJECTS } from '../utils/constants';
import { Beaker, Zap, Calculator, Dna, ArrowRight, Globe, Sparkles, User as UserIcon, LogOut, BookOpen, Search, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { Language, translations } from '../services/translations';

interface LandingPageProps {
  onSelectSubject: (subject: Subject) => void;
  language: Language;
  user?: any;
  onLoginClick?: () => void;
  onLogoutClick?: () => void;
  onProfileClick?: () => void;
  onOpenGlossary?: () => void;
  selectedClass?: string | null; // NEW: Receives the selected class
  onBack?: () => void;
}

const iconMap: Record<string, any> = {
  Beaker,
  Zap,
  Calculator,
  Dna,
};

const LandingPage: React.FC<LandingPageProps> = ({ 
  onSelectSubject, 
  language,
  user,
  onLoginClick,
  onLogoutClick,
  onProfileClick,
  onOpenGlossary,
  selectedClass,
  onBack
  
}) => {
  const t = (key: string) => translations[key]?.[language] || key;
  const displayedSubjects = selectedClass 
    ? SUBJECTS.filter((subject: any) => 
        !subject.targetClass || subject.targetClass.includes(selectedClass)
      )
    : SUBJECTS;
  return (
    <div className="relative min-h-screen overflow-hidden grainy">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-500/10 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,transparent_70%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-20">
        {onBack && (
          <motion.button 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="mb-12 flex items-center gap-3 text-slate-400 hover:text-white transition-colors group"
          >
            <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
              <ArrowLeft size={16} />
            </div>
            <span className="text-xs font-mono uppercase tracking-[0.2em]">Change Standard</span>
          </motion.button>
        )}
        {/* Auth Controls */}
        <div className="absolute top-8 right-6 flex items-center gap-4 z-50">
          {!user ? (
            <button 
              onClick={onLoginClick}
              className="px-6 py-2.5 bg-primary/20 hover:bg-primary text-primary hover:text-white border border-primary/50 rounded-full text-xs font-mono uppercase tracking-widest transition-all shadow-lg shadow-primary/20 backdrop-blur-md"
            >
              Login / Sign Up
            </button>
          ) : (
            <div className="flex items-center gap-3 bg-[#020617]/50 backdrop-blur-md p-2 pl-4 border border-white/10 rounded-full shadow-xl">
              <span className="text-xs font-medium text-slate-300">
                Welcome, <span className="text-white font-bold">{user.first_name || user.username}</span>
              </span>
              {(user.role === 'teacher' || user.role === 'institute') && (
                <button 
                  onClick={onDashboardClick}
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-[10px] font-mono uppercase tracking-widest transition-all shadow-lg shadow-indigo-600/20"
                >
                  Dashboard
                </button>
              )}
              <button 
                onClick={onProfileClick}
                className="p-2 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-full transition-colors"
                title="Profile Dashboard"
              >
                <UserIcon size={16} />
              </button>
              <button 
                onClick={onLogoutClick}
                className="p-2 bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 rounded-full transition-colors"
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          )}
        </div>

        <header className="mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="h-px w-12 bg-primary" />
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-primary">
              {selectedClass ? `${selectedClass} Curriculum` : 'The Future of Learning'}
            </span>          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-8xl md:text-9xl font-display font-bold tracking-tighter text-white leading-[0.8] mb-12"
          >
            LabZero<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{translations.omniScience[language].split(' ')[1]}</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end"
          >
            <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed max-w-xl">
              {t('labDescription')}
            </p>
            <div className="flex flex-wrap gap-4 md:justify-end">
              <div className="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center gap-2">
                <Globe size={14} className="text-primary" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-300">Real-time Visuals</span>
              </div>
              <div className="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center gap-2">
                <Sparkles size={14} className="text-rose-400" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-300">AI Powered</span>
              </div>
            </div>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden">
          {displayedSubjects.map((subject, index) => {
            const Icon = iconMap[subject.icon] || Beaker;
            const accentColor = {
              emerald: 'group-hover:text-emerald-400',
              blue: 'group-hover:text-blue-400',
              amber: 'group-hover:text-amber-400',
              rose: 'group-hover:text-rose-400',
            }[subject.color] || 'group-hover:text-primary';

            return (
              <motion.button
                key={subject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                onClick={() => onSelectSubject(subject)}
                className="group relative p-10 bg-[#020617] hover:bg-white/[0.02] transition-all duration-500 text-left flex flex-col h-[400px]"
              >
                <div className="flex-1">
                  <div className={`w-12 h-12 mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 text-slate-500 ${accentColor}`}>
                    <Icon size={48} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-3xl font-display font-medium text-white mb-4 tracking-tight">{subject.name}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-light">
                    {subject.topics.length} specialized modules exploring the core mechanics of {subject.name.toLowerCase()}.
                  </p>
                </div>
                
                <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-600 group-hover:text-slate-400 transition-colors">{t('enterLab')}</span>
                  <ArrowRight size={18} className={`transition-all duration-500 -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 ${accentColor}`} />
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-50 ${accentColor}`} />
                </div>
              </motion.button>
            );
          })}
        </div>

        <section className="mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] p-8 md:p-10"
          >
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(244,63,94,0.12),transparent_30%)]" />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2">
                  <BookOpen size={14} className="text-amber-300" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-amber-200">Glossary Hub</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-white">
                  Open the science glossary from the home screen
                </h3>
                <p className="mt-4 max-w-xl text-sm md:text-base text-slate-400 leading-relaxed">
                  Search quick definitions for chemistry, physics, biology, and math terms before entering a lab.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-[10px] font-mono uppercase tracking-[0.25em] text-slate-300">
                  Offline Terms
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-[10px] font-mono uppercase tracking-[0.25em] text-slate-300">
                  Searchable
                </div>
                <button
                  onClick={onOpenGlossary}
                  className="inline-flex items-center gap-3 rounded-2xl bg-amber-500 px-6 py-4 text-[10px] font-mono uppercase tracking-[0.25em] text-slate-950 transition-all hover:bg-amber-400"
                >
                  <Search size={14} />
                  Open Glossary
                </button>
              </div>
            </div>
          </motion.div>
        </section>

        <footer className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-600">
            © 2024 OmniScience Laboratory / v2.4.0
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-600 hover:text-primary transition-colors">Documentation</a>
            <a href="#" className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-600 hover:text-primary transition-colors">Research</a>
            <a href="#" className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-600 hover:text-primary transition-colors">Contact</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
