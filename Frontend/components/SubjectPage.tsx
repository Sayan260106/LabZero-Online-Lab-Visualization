import React from 'react';
import { Subject, Topic } from '../types';
import { ArrowLeft, ArrowRight, Beaker, Zap, Calculator, Dna } from 'lucide-react';
import { motion } from 'motion/react';

interface SubjectPageProps {
  subject: Subject;
  onSelectTopic: (topic: Topic) => void;
  onBack: () => void;
}

const iconMap: Record<string, any> = {
  Beaker,
  Zap,
  Calculator,
  Dna,
};

const SubjectPage: React.FC<SubjectPageProps> = ({ subject, onSelectTopic, onBack }) => {
  const Icon = iconMap[subject.icon] || Beaker;

  return (
    <div className="relative min-h-screen grainy">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center gap-3 text-slate-500 hover:text-white transition-colors mb-20 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Back to Subjects</span>
        </motion.button>

        <header className="mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-8"
          >
            <div className="w-24 h-24 rounded-3xl flex items-center justify-center bg-white/[0.02] border border-white/5 text-primary shadow-2xl">
              <Icon size={48} strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-6xl md:text-7xl font-display font-bold tracking-tighter text-white uppercase leading-none">
                {subject.name}
              </h2>
              <div className="flex items-center gap-3 mt-4">
                <div className="h-px w-8 bg-primary" />
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.4em]">Laboratory Modules / {subject.topics.length} Units</p>
              </div>
            </div>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 gap-6">
          {subject.topics.map((topic, index) => (
            <motion.button
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSelectTopic(topic)}
              className="group relative p-10 bg-[#020617] hover:bg-white/[0.02] border border-white/5 rounded-[40px] transition-all duration-500 text-left flex flex-col md:flex-row md:items-center gap-10 overflow-hidden"
            >
              <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center text-slate-500 group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-500 shrink-0">
                <Icon size={32} strokeWidth={1.5} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-[9px] font-mono text-slate-600 uppercase tracking-[0.2em] group-hover:text-primary transition-colors">
                    Unit {index + 1}
                  </div>
                  <div className="h-px w-4 bg-white/10" />
                </div>
                <h3 className="text-3xl font-display font-bold text-white mb-3 tracking-tight group-hover:text-primary transition-colors uppercase">{topic.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-light max-w-3xl">
                  {topic.description}
                </p>
              </div>
              
              <div className="flex items-center gap-6 shrink-0">
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-slate-600 group-hover:text-slate-400 transition-colors">Initialize</span>
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-slate-800">Module</span>
                </div>
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary transition-colors">
                  <ArrowRight size={20} className="text-primary transition-all duration-500 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
                </div>
              </div>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubjectPage;
