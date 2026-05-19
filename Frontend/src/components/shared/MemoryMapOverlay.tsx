import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Brain, ChevronRight, ArrowLeft, Sparkles, Layers, Target } from 'lucide-react';
import { Subject, Topic } from '../../types/types';

interface MemoryMapOverlayProps {
  onClose: () => void;
  initialSubject?: Subject | null;
  subjects: Subject[];
}

interface MapNode {
  id: string;
  label: string;
  type: 'core' | 'main' | 'sub';
  description?: string;
  children?: MapNode[];
}

const COLOR_MAP: Record<string, string> = {
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
};

const MemoryMapOverlay: React.FC<MemoryMapOverlayProps> = ({ onClose, initialSubject, subjects }) => {
  const [step, setStep] = useState<'subject' | 'chapter' | 'map'>(initialSubject ? 'chapter' : 'subject');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(initialSubject || null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const handleSubjectSelect = (subject: Subject) => {
    setSelectedSubject(subject);
    setStep('chapter');
  };

  const handleTopicSelect = (topic: Topic) => {
    setSelectedTopic(topic);
    setStep('map');
  };

  const handleBack = () => {
    if (step === 'map') setStep('chapter');
    else if (step === 'chapter') setStep('subject');
  };

  const mapData = useMemo(() => {
    if (!selectedTopic) return null;

    const lines = selectedTopic.theory.split('\n');
    const nodes: MapNode[] = [];
    let currentMain: MapNode | null = null;

    nodes.push({ id: 'root', label: selectedTopic.name, type: 'core', children: [] });

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('## ')) {
        const label = trimmed.replace('## ', '');
        currentMain = { id: `main-${index}`, label, type: 'main', children: [] };
        nodes[0].children?.push(currentMain);
      } else if (trimmed.startsWith('- **') && currentMain) {
        const parts = trimmed.replace('- **', '').split('**:');
        const label = parts[0].replace(/\*\*:?$/, '').trim();
        const description = parts.slice(1).join('**:').trim();
        currentMain.children?.push({ id: `sub-${index}`, label, type: 'sub', description });
      } else if (trimmed.startsWith('### ') && currentMain) {
        const label = trimmed.replace('### ', '');
        currentMain.children?.push({ id: `sub-${index}`, label, type: 'sub' });
      }
    });

    if (nodes[0].children?.length === 0) {
      nodes[0].children?.push({
        id: 'gen-1',
        label: 'Key Concepts',
        type: 'main',
        children: [{ id: 'sub-gen-1', label: 'Fundamental Principles', type: 'sub' }]
      });
    }

    return nodes[0];
  }, [selectedTopic]);

  return (
    <div className="memory-map-overlay fixed inset-0 z-[300] flex items-center justify-center p-2 sm:p-4 md:p-8 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="memory-map-scrim absolute inset-0 backdrop-blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="memory-map-shell relative w-full h-full rounded-[24px] md:rounded-[28px] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="memory-map-header p-4 md:p-8 lg:p-10 flex items-center justify-between gap-4 z-20">
          <div className="flex min-w-0 items-center gap-3 md:gap-6">
            {step !== 'subject' && (
              <button
                onClick={handleBack}
                className="memory-map-icon-button w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-2xl flex items-center justify-center transition-all group"
              >
                <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
              </button>
            )}
            <div className="min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="memory-map-brand-icon w-10 h-10 shrink-0 rounded-xl flex items-center justify-center">
                  <Brain size={24} />
                </div>
                <h2 className="memory-map-title text-2xl md:text-3xl font-display font-bold tracking-tight">
                  Mind Map
                </h2>
                <div className="memory-map-badge hidden sm:block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest ml-2">
                  Structured View
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="memory-map-rule hidden sm:block h-px w-6" />
                <p className="memory-map-subtitle text-[10px] font-mono uppercase tracking-[0.18em] md:tracking-[0.4em] truncate">
                  {step === 'subject' && 'Explore Diverse Fields'}
                  {step === 'chapter' && `${selectedSubject?.name} Modules`}
                  {step === 'map' && `Visual Architecture: ${selectedTopic?.name}`}
                </p>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 md:gap-4">
            {step === 'map' && (
              <div className="memory-map-legend hidden lg:flex items-center gap-6 mr-8 px-6 py-2 rounded-2xl">
                <div className="flex items-center gap-2 text-[10px] font-mono">
                  <div className="memory-map-dot memory-map-dot-core w-2 h-2 rounded-full" />
                  Core Module
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono">
                  <div className="memory-map-dot memory-map-dot-branch w-2 h-2 rounded-full" />
                  Key Concepts
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono">
                  <div className="memory-map-dot memory-map-dot-detail w-2 h-2 rounded-full" />
                  Technical Details
                </div>
              </div>
            )}
            <button
              onClick={onClose}
              className="memory-map-close w-11 h-11 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-all"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="memory-map-content flex-1 min-h-0 overflow-auto p-4 md:p-8 lg:p-12 custom-scrollbar relative z-10">
          <AnimatePresence mode="wait">
            {step === 'subject' && (
              <motion.div
                key="subject-selection"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {subjects.map((subject, idx) => {
                  const colorClasses = COLOR_MAP[subject.color] || COLOR_MAP.purple;
                  return (
                    <button
                      key={subject.id}
                      onClick={() => handleSubjectSelect(subject)}
                      className="memory-map-selection-card group p-8 rounded-[24px] transition-all duration-500 text-left relative overflow-hidden flex flex-col h-[300px]"
                    >
                      <div className={`w-20 h-20 rounded-3xl ${colorClasses.split(' ')[0]} flex items-center justify-center ${colorClasses.split(' ')[1]} mb-8 group-hover:scale-110 transition-transform duration-500`}>
                        <Brain size={40} />
                      </div>
                      <div className="flex-1">
                        <h3 className="memory-map-card-title text-2xl font-bold mb-3 transition-colors uppercase">{subject.name}</h3>
                        <p className="memory-map-card-copy text-sm leading-relaxed">
                          Master {subject.name.toLowerCase()} through interactive visual architectures.
                        </p>
                      </div>
                      <div className="memory-map-card-footer flex items-center justify-between mt-auto pt-6">
                        <span className="text-[10px] font-mono uppercase tracking-widest">{subject.topics?.length || 0} Chapters</span>
                        <ChevronRight className="transition-colors" />
                      </div>
                    </button>
                  );
                })}
              </motion.div>
            )}

            {step === 'chapter' && selectedSubject && (
              <motion.div
                key="chapter-selection"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {selectedSubject.topics.map((topic, idx) => (
                  <button
                    key={topic.id}
                    onClick={() => handleTopicSelect(topic)}
                    className="memory-map-selection-card group p-7 rounded-[22px] transition-all duration-500 text-left relative overflow-hidden"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="memory-map-index w-12 h-12 rounded-2xl flex items-center justify-center transition-all font-mono font-bold">
                        {String(idx + 1).padStart(2, '0')}
                      </div>
                      <Sparkles size={16} className="memory-map-card-spark transition-colors" />
                    </div>
                    <h3 className="memory-map-card-title text-xl font-bold transition-colors mb-3 uppercase tracking-tight">{topic.name}</h3>
                    <p className="memory-map-card-copy text-xs leading-relaxed line-clamp-2 mb-6">{topic.description}</p>
                    <div className="memory-map-card-link flex items-center gap-2 text-[10px] font-mono transition-colors uppercase tracking-widest">
                      Explore Map <ChevronRight size={14} />
                    </div>
                  </button>
                ))}
              </motion.div>
            )}

            {step === 'map' && mapData && (
              <motion.div
                key="map-visualization"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="min-h-full w-full flex items-center justify-center"
              >
                <VisualMap node={mapData} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

const VisualMap: React.FC<{ node: MapNode }> = ({ node }) => {
  const children = node.children ?? [];
  const rootWidth = 300;
  const branchWidth = 430;
  const rootCenterX = 210;
  const branchLeft = 470;
  const branchCenterX = branchLeft + branchWidth / 2;
  const topPadding = 48;
  const branchGap = 28;
  const branchSlots = children.map((child) => {
    const detailsCount = child.children?.length || 0;
    return Math.max(188, 124 + detailsCount * 58);
  });
  const contentHeight = branchSlots.reduce((sum, height) => sum + height, 0) + Math.max(children.length - 1, 0) * branchGap;
  const mapHeight = Math.max(640, contentHeight + topPadding * 2);
  const mapWidth = 980;
  const rootCenterY = mapHeight / 2;
  let currentTop = topPadding + Math.max(0, (mapHeight - topPadding * 2 - contentHeight) / 2);
  const branches = children.map((child, idx) => {
    const height = branchSlots[idx];
    const top = currentTop;
    currentTop += height + branchGap;
    return {
      child,
      height,
      top,
      centerY: top + height / 2,
    };
  });

  return (
    <div
      className="memory-map-canvas relative shrink-0 overflow-visible"
      style={{ width: mapWidth, height: mapHeight }}
    >
      <svg
        className="absolute inset-0 z-10 pointer-events-none"
        viewBox={`0 0 ${mapWidth} ${mapHeight}`}
        width={mapWidth}
        height={mapHeight}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="mindmap-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--memory-map-line-a)" />
            <stop offset="100%" stopColor="var(--memory-map-line-b)" />
          </linearGradient>
        </defs>
        {branches.map(({ child, centerY }, idx) => (
          <motion.path
            key={`${child.id}-line`}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.72 }}
            transition={{ duration: 1.2, delay: idx * 0.12 }}
            d={`M ${rootCenterX + rootWidth / 2} ${rootCenterY} C ${rootCenterX + rootWidth / 2 + 70} ${rootCenterY}, ${branchLeft - 70} ${centerY}, ${branchLeft} ${centerY}`}
            stroke="url(#mindmap-line-grad)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="12 8"
          />
        ))}
      </svg>

      {/* Root Node */}
      <motion.div
        layoutId="root-node"
        className="memory-map-root-card absolute z-30 w-[300px] -translate-x-1/2 -translate-y-1/2 p-8 rounded-[28px] text-center group cursor-pointer"
        style={{ left: rootCenterX, top: rootCenterY }}
        whileHover={{ scale: 1.05 }}
      >
        <div className="memory-map-root-icon w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 backdrop-blur-xl shadow-inner group-hover:animate-pulse">
          <Brain size={38} className="text-white" />
        </div>
        <h4 className="text-2xl font-display font-black text-white uppercase leading-tight break-words">{node.label}</h4>
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="h-px w-4 bg-white/40" />
          <div className="text-[10px] font-mono text-white/80 tracking-[0.22em] uppercase font-bold">Scientific Core</div>
          <div className="h-px w-4 bg-white/40" />
        </div>
      </motion.div>

      {/* Connection Lines & Child Nodes */}
      {branches.map(({ child, height, top, centerY }, idx) => (
        <motion.div
          key={child.id}
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{
            delay: idx * 0.12 + 0.35,
            type: 'spring',
            stiffness: 80,
            damping: 14
          }}
          whileHover={{ scale: 1.02, zIndex: 40 }}
          className="absolute z-20 pointer-events-auto group/node"
          style={{ left: branchLeft, top, width: branchWidth, minHeight: height }}
        >
          <div className="memory-map-branch-card relative h-full p-5 rounded-[22px] backdrop-blur-3xl transition-all cursor-pointer overflow-hidden">
            <div className="memory-map-branch-aura absolute -top-10 -left-10 w-24 h-24 rounded-full blur-3xl opacity-0 group-hover/node:opacity-100 transition-opacity" />
            <div
              className="memory-map-anchor absolute left-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ top: centerY - top }}
            />

            <div className="flex items-start gap-3 mb-4 relative z-10">
              <div className="memory-map-branch-icon w-10 h-10 shrink-0 rounded-xl flex items-center justify-center transition-all duration-500">
                <Target size={20} />
              </div>
              <div className="min-w-0">
                <div className="memory-map-branch-kicker text-[10px] font-mono uppercase tracking-[0.24em] mb-1">Branch {String(idx + 1).padStart(2, '0')}</div>
                <h5 className="memory-map-branch-title text-lg font-bold transition-colors uppercase leading-tight break-words">{child.label}</h5>
              </div>
            </div>

            <div className="grid gap-2 relative z-10">
              {child.children?.map((sub, sIdx) => (
                <motion.div
                  key={sub.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.12 + sIdx * 0.08 + 0.55 }}
                  className="group/sub relative"
                >
                  <div className="memory-map-detail-card p-3 rounded-xl transition-all">
                    <div className="flex items-start gap-2 mb-1">
                      <div className="memory-map-detail-bullet mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full" />
                      <span className="memory-map-detail-title text-[11px] font-bold transition-colors uppercase leading-snug break-words">{sub.label}</span>
                    </div>
                    {sub.description && (
                      <p className="memory-map-detail-copy text-[10px] leading-normal pl-3.5 transition-colors">{sub.description}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="memory-map-watermark absolute bottom-2 right-2 transition-colors">
              <Layers size={32} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MemoryMapOverlay;
