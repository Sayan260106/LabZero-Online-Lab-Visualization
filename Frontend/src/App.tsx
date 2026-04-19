import React, { useState, useEffect } from 'react';
import AtomVisualizer from './components/AtomicVisualizer';
import PeriodicTable from './components/PeriodicTable';
// import AITutor from './components/AITutor';
import AufbauChart from './components/AufbauChart';
import TrendsVisualizer from './components/TrendsVisualizer';
import ElementComparison from './components/ElementComparison';
import BondingLab from './components/BondingLab';
import GeometryLab from './components/GeometryLab';
import HistoricalModels from './components/HistoricalModels';
import QuantumConfigLab from './components/QuantumConfigLab';
import QuantumNumbersLab from './components/QuantumNumbersLab';
import LandingPage from './components/LandingPage';
// import { getElements } from './services/elementsService';
// import GraphVisualizer from './components/GraphVisualizer';
import SubjectPage from './components/SubjectPage';
import TopicPage from './components/TopicPage';
import GestureController from './components/GestureController';
import AuthOverlay from './components/AuthOverlay';
import { AuthProvider, useAuth } from './AuthContext';
import { ELEMENTS, SUBJECTS } from './utils/constants';
import { ElementData, Subject, Topic, ViewState, TopicId } from './types/types';
import { Sparkles, MessageSquare, X, Settings, Eye, Moon, Sun, Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, translations } from './services/translations';
import AuthPage from './components/AuthPage';


const AppContent: React.FC = () => {
  const { user, isLoading: authLoading } = useAuth();
  const [selectedElement, setSelectedElement] = useState<ElementData>(ELEMENTS[0]);
  const [viewState, setViewState] = useState<ViewState>(ViewState.LANDING);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [showAITutor, setShowAITutor] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [colorBlindMode, setColorBlindMode] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [isGestureActive, setIsGestureActive] = useState(false);
  const [atomRotation, setAtomRotation] = useState({ dx: 0, dy: 0 });
  const [gesturePos, setGesturePos] = useState<{ x: number, y: number } | null>(null);

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [theme]);

  useEffect(() => {
    if (colorBlindMode) {
      document.body.classList.add('colorblind-mode');
    } else {
      document.body.classList.remove('colorblind-mode');
    }
  }, [colorBlindMode]);

  const t = (key: string) => translations[key]?.[language] || key;

  const handleSelectSubject = (subject: Subject) => {
    setSelectedSubject(subject);
    setViewState(ViewState.SUBJECT);
  };

  const handleSelectTopic = (topic: Topic) => {
    setSelectedTopic(topic);
    setViewState(ViewState.TOPIC);
  };

  const handleBackToLanding = () => {
    setViewState(ViewState.LANDING);
    setSelectedSubject(null);
  };

  const handleBackToSubject = () => {
    setViewState(ViewState.SUBJECT);
    setSelectedTopic(null);
  };

  const renderVisualization = (topicId: TopicId) => {
    switch (topicId) {
      case TopicId.ATOMIC_STRUCTURE:
        return (
          <div className="flex flex-col h-full">
            <div className="flex-1 min-h-0">
              <AtomVisualizer element={selectedElement} rotation={atomRotation} />
            </div>
            <div className="h-[420px] border-t border-white/5 bg-slate-950/50 backdrop-blur-xl overflow-y-auto">
              <PeriodicTable onSelect={setSelectedElement} selectedSymbol={selectedElement.symbol} elements={[]} />
            </div>
          </div>
        );
      case TopicId.MOLECULAR_STRUCTURE:
        return (
          <div className="grid grid-cols-1 h-full gap-8 bg-[#020617] overflow-y-auto p-8">
            <div className="w-full">
              <BondingLab />
            </div>
            <div className="w-full">
              <GeometryLab />
            </div>
          </div>
        );
      case TopicId.QUANTUM_NUMBERS:
        return (
          <div className="h-full overflow-y-auto p-8">
            <QuantumNumbersLab />
          </div>
        );
      case TopicId.PERIODIC_TRENDS:
        return (
          <div className="grid grid-cols-1 h-full gap-8 bg-[#020617] overflow-y-auto p-8">
            <div className="w-full">
              <TrendsVisualizer />
            </div>
            <div className="w-full">
              <ElementComparison />
            </div>
          </div>
        );
      case TopicId.HISTORICAL_MODELS:
        return (
          <div className="h-full overflow-y-auto p-8">
            <HistoricalModels />
          </div>
        );
      case TopicId.QUANTUM_CONFIG:
        return (
          <div className="grid grid-cols-1 h-full gap-8 bg-[#020617] overflow-y-auto p-8">
            <div className="w-full">
              <QuantumConfigLab element={selectedElement} />
            </div>
            <div className="w-full">
              <AufbauChart atomicNumber={selectedElement.number} />
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 p-12 text-center">
            <div className="w-20 h-20 rounded-3xl bg-slate-900 flex items-center justify-center mb-6 border border-white/5">
              <Sparkles size={40} className="text-indigo-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-tighter italic">Coming Soon</h3>
            <p className="max-w-md mx-auto text-sm font-mono uppercase tracking-widest opacity-50">
              Our Developers are working hard to bring this interactive module to life.
            </p>
          </div>
        );
    }
  };

  const handleGestureSelect = () => {
    // This is a bit complex since we don't have the exact coordinates in this component easily
    // But we can trigger a generic "Click" or use a ref from GestureController
    // For now, let's assume GestureController handles the coordinate-based click if we pass it a ref
  };

  const handleGestureBack = () => {
    if (viewState === ViewState.TOPIC) {
      handleBackToSubject();
    } else if (viewState === ViewState.SUBJECT) {
      handleBackToLanding();
    }
  };

  const handleGestureScroll = (delta: number) => {
    window.scrollBy({ top: delta, behavior: 'smooth' });
    // Also scroll any scrollable containers
    const scrollable = document.querySelector('.overflow-y-auto');
    if (scrollable) {
      scrollable.scrollBy({ top: delta, behavior: 'smooth' });
    }
  };

  const handleGestureRotate = (dx: number, dy: number) => {
    setAtomRotation({ dx, dy });
    // Reset after a frame to avoid continuous rotation if not moving
    setTimeout(() => setAtomRotation({ dx: 0, dy: 0 }), 50);
  };

  if (authLoading) return null;

  if (!user) {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] selection:bg-indigo-500/30 transition-colors duration-400">
      {/* Structural Overlays */}
      <div className="fixed inset-0 pointer-events-none z-50 grainy opacity-40"></div>

      <AnimatePresence mode="wait">
        {viewState === ViewState.LANDING && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1"
          >
            <LandingPage onSelectSubject={handleSelectSubject} language={language} />
          </motion.div>
        )}

        {viewState === ViewState.SUBJECT && selectedSubject && (
          <motion.div
            key="subject"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1"
          >
            <SubjectPage
              subject={selectedSubject}
              onSelectTopic={handleSelectTopic}
              onBack={handleBackToLanding}
              language={language}
            />
          </motion.div>
        )}

        {viewState === ViewState.TOPIC && selectedTopic && (
          <motion.div
            key="topic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1"
          >
            <TopicPage
              topic={selectedTopic}
              onBack={handleBackToSubject}
              visualization={renderVisualization(selectedTopic.id)}
              language={language}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Accessibility Settings Toggle */}
      <button
        onClick={() => setShowSettings(!showSettings)}
        className={`fixed bottom-8 right-28 w-16 h-16 rounded-2xl hidden md:flex items-center justify-center transition-all duration-500 z-[110] ${
          showSettings ? 'bg-indigo-500 rotate-90' : 'bg-white/5 border border-white/10 hover:bg-white/10'
        }`}
      >
        <Settings size={24} className={showSettings ? 'text-white' : 'text-slate-400'} />
      </button>

      {/* Accessibility Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-28 right-28 w-72 glass-panel p-6 rounded-3xl z-[110] border border-white/10 origin-bottom-right hidden md:block"
          >
            <h3 className="text-xs font-mono uppercase tracking-[0.3em] text-indigo-400 mb-6 flex items-center gap-2">
              <Eye size={12} />
              {t('accessibility')}
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-300">{t('colorblindMode')}</span>
                  <span className="text-[8px] font-mono text-slate-500">{t('enhancedContrast')}</span>
                </div>
                <button
                  onClick={() => setColorBlindMode(!colorBlindMode)}
                  className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${
                    colorBlindMode ? 'bg-indigo-500' : 'bg-slate-800'
                  }`}
                >
                  <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all duration-300 ${
                    colorBlindMode ? 'left-6' : 'left-1'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-300">{t('theme')}</span>
                  <span className="text-[8px] font-mono text-slate-500">{theme === 'dark' ? t('dark') : t('light')} Visuals</span>
                </div>
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                >
                  {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
                </button>
              </div>

              <div className="flex flex-col gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-2">
                  <Languages size={12} className="text-indigo-400" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-300">{t('language')}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(['en', 'bn', 'hi'] as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`py-2 rounded-lg text-[10px] font-mono uppercase tracking-widest transition-all ${
                        language === lang 
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                          : 'bg-slate-800 text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Tutor Floating Button */}
      <button
        onClick={() => setShowAITutor(!showAITutor)}
        className={`fixed bottom-8 right-8 w-16 h-16 rounded-2xl hidden md:flex items-center justify-center shadow-2xl transition-all duration-500 z-[100] ${
          showAITutor ? 'bg-rose-500 rotate-90' : 'bg-indigo-600 hover:scale-110'
        }`}
      >
        {showAITutor ? (
          <X className="text-white" size={28} />
        ) : (
          <MessageSquare className="text-white" size={28} />
        )}
      </button>

      {/* AI Tutor Panel */}
      {/* <div className={`fixed bottom-28 right-8 w-full md:w-[450px] h-full md:h-[600px] z-[100] transition-all duration-500 origin-bottom-right ${
        showAITutor ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-10 pointer-events-none'
      }`}>
        <AITutor currentElement={selectedElement} language={language} />
      </div> */}

      {/* One-Handed UI Fallback */}
      {/* <BottomNav 
        currentView={viewState}
        onNavigate={setViewState}
        onOpenGlossary={() => setShowGlossary(true)}
        onOpenSettings={() => setShowSettings(!showSettings)}
        onOpenAITutor={() => setShowAITutor(!showAITutor)}
        onOpenProfile={() => setShowAuth(true)}
        language={language}
      /> */}

      <AnimatePresence>
        {/* {showGlossary && (
          <Glossary language={language} onClose={() => setShowGlossary(false)} />
        )} */}
        {showAuth && (
          <AuthOverlay onClose={() => setShowAuth(false)} />
        )}
      </AnimatePresence>

      <GestureController 
        isActive={isGestureActive}
        onToggle={() => setIsGestureActive(!isGestureActive)}
        onBack={handleGestureBack}
        onScroll={handleGestureScroll}
        onRotate={handleGestureRotate}
        onSelect={handleGestureSelect}
        onPositionChange={setGesturePos}
        onToggleAITutor={() => setShowAITutor(prev => !prev)}
        onToggleTheme={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
      />

      {isGestureActive && gesturePos && (
        <div 
          className="fixed w-8 h-8 rounded-full border-2 border-indigo-500 bg-indigo-500/20 pointer-events-none z-[200] flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-transform duration-75"
          style={{ 
            left: `${gesturePos.x * 100}%`, 
            top: `${gesturePos.y * 100}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="w-1 h-1 bg-white rounded-full" />
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;