import React from 'react';
import { Subject, SubjectId } from '../types';
import { SUBJECTS } from '../constants';
import { Beaker, Zap, Calculator, Dna, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onSelectSubject: (subject: Subject) => void;
}

const iconMap: Record<string, any> = {
  Beaker,
  Zap,
  Calculator,
  Dna,
};

const LandingPage: React.FC<LandingPageProps> = ({ onSelectSubject }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-20">
        <h1 className="text-7xl font-black tracking-tighter text-white uppercase italic mb-6">
          Omni<span className="text-indigo-500">Science</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
          The ultimate interactive laboratory for exploring the fundamental principles of the universe.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {SUBJECTS.map((subject) => {
          const Icon = iconMap[subject.icon] || Beaker;
          const colorClassMap = {
            emerald: 'hover:border-emerald-500/50 hover:bg-emerald-500/5',
            blue: 'hover:border-blue-500/50 hover:bg-blue-500/5',
            amber: 'hover:border-amber-500/50 hover:bg-amber-500/5',
            rose: 'hover:border-rose-500/50 hover:bg-rose-500/5',
          };
          const colorClass = colorClassMap[subject.color as keyof typeof colorClassMap] || 'hover:border-indigo-500/50 hover:bg-indigo-500/5';

          const iconColorClassMap = {
            emerald: 'text-emerald-500 bg-emerald-500/10',
            blue: 'text-blue-500 bg-blue-500/10',
            amber: 'text-amber-500 bg-amber-500/10',
            rose: 'text-rose-500 bg-rose-500/10',
          };
          const iconColorClass = iconColorClassMap[subject.color as keyof typeof iconColorClassMap] || 'text-indigo-500 bg-indigo-500/10';

          return (
            <button
              key={subject.id}
              onClick={() => onSelectSubject(subject)}
              className={`group relative p-8 rounded-3xl border border-white/5 bg-slate-900/50 backdrop-blur-xl transition-all duration-500 text-left ${colorClass}`}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${iconColorClass}`}>
                <Icon size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{subject.name}</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Explore {subject.topics.length} interactive modules in {subject.name.toLowerCase()}.
              </p>
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                Enter Lab <ArrowRight size={16} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LandingPage;
