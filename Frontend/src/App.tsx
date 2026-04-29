import React, { useState, useEffect, useCallback } from 'react';
import {
  Sparkles, MessageSquare, X, Settings, Eye, Moon, Sun, Languages, BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AtomVisualizer from './components/AtomicVisualizer';
import PeriodicTable from './components/PeriodicTable';
import AufbauChart from './components/AufbauChart';
import TrendsVisualizer from './components/TrendsVisualizer';
import ElementComparison from './components/ElementComparison';
import BondingLab from './components/BondingLab';
import GeometryLab from './components/GeometryLab';
import HistoricalModels from './components/HistoricalModels';
import QuantumConfigLab from './components/QuantumConfigLab';
import QuantumNumbersLab from './components/QuantumNumbersLab';

import MechanicsVisualizer from './components/MechanicsVisualizer';
import ElectromagnetismVisualizer from './components/ElectromagnetismVisualizer';

import MicrobiologyLab from './components/MicrobiologyLab';
import CellBiologyLab from './components/CellBiologyLab';

import VectorCalculusLab from './components/VectorCalculusLab';
import PiVisualizationLab from './components/PiVisualizationLab';
import ComplexNumbersLab from './components/ComplexNumbersLab';
import PythagorasLab from './components/PythagorasLab';


import LandingPage from './components/LandingPage';
import SubjectPage from './components/SubjectPage';
import TopicPage from './components/TopicPage';
import TeacherDashboard from './components/TeacherDashboard';
import InstituteDashboard from './components/InstituteDashboard';
import GestureController from './components/GestureController';
import BottomNav from './components/BottomNav';
import Glossary from './components/Glossary';
import AuthOverlay from './components/AuthOverlay';
import AuthPage from './components/AuthPage';

import QuizPage from './components/Quiz';
import { generateQuizAI } from './data/quizData';
import { Skeleton } from 'boneyard-js/react';

import { ELEMENTS } from './utils/constants';
import { ElementData, Subject, Topic, ViewState, TopicId } from './types/types';
import { Language, translations } from './services/translations';
import { AuthProvider, useAuth } from './context/AuthContext';
import { getElements } from './services/elementsService';


const BackgroundLayer = ({ theme }: { theme: 'dark' | 'light' }) => (
  <div className={`fixed inset-0 z-[-1] overflow-hidden pointer-events-none transition-colors duration-700 ${theme === 'dark' ? 'bg-[#020617]' : 'bg-[#fafaf8]'}`}>
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        x: [0, 100, 0],
        y: [0, 50, 0],
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[120px] transition-colors duration-700 ${theme === 'dark' ? 'bg-sky-500/10' : 'bg-sky-300/20'}`}
    />
    <motion.div
      animate={{
        scale: [1, 1.3, 1],
        x: [0, -100, 0],
        y: [0, -50, 0],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[150px] transition-colors duration-700 ${theme === 'dark' ? 'bg-indigo-500/10' : 'bg-emerald-300/20'}`}
    />
    <motion.div
      animate={{
        scale: [1, 1.5, 1],
        x: [0, 50, -50, 0],
        y: [0, 100, 50, 0],
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute top-[20%] left-[40%] w-[40vw] h-[40vw] rounded-full blur-[130px] transition-colors duration-700 ${theme === 'dark' ? 'bg-violet-600/10' : 'bg-violet-300/20'}`}
    />
    <div className={`absolute inset-0 backdrop-blur-[50px] transition-colors duration-700 ${theme === 'dark' ? 'bg-slate-950/20' : 'bg-white/20'}`} />
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
  </div>
);

const AppContent: React.FC = () => {
  const { user, isLoading, logout } = useAuth();

  const [elements, setElements] = useState<ElementData[]>(ELEMENTS);
  const [selectedElement, setSelectedElement] = useState<ElementData>(ELEMENTS[0]);

  const [viewState, setViewState] = useState<ViewState>(ViewState.LANDING);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const [showAITutor, setShowAITutor] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);
  const [showAuth, setShowAuth] = useState(() => new URLSearchParams(window.location.search).get('auth') === '1');

  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [colorBlindMode, setColorBlindMode] = useState(false);
  const [language, setLanguage] = useState<Language>('en');

  const [isGestureActive, setIsGestureActive] = useState(false);
  const [atomRotation, setAtomRotation] = useState({ dx: 0, dy: 0 });
  const [atomZoom, setAtomZoom] = useState(1);
  const [moleculeRotation, setMoleculeRotation] = useState({ dx: 0, dy: 0 });
  const [moleculeZoom, setMoleculeZoom] = useState(1);
  const [gesturePos, setGesturePos] = useState<{ x: number; y: number } | null>(null);

  // ================= QUIZ =================
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [quizLevel, setQuizLevel] = useState<'basic' | 'intermediate' | 'difficult'>('basic');

  // ================= FETCH =================
  useEffect(() => {
    getElements()
      .then((data) => {
        if (data?.length) {
          setElements(data);
          setSelectedElement(data[0]);
        }
      })
      .catch(console.error);
  }, []);

  // ================= THEME =================
  useEffect(() => {
    document.body.classList.toggle('light-mode', theme === 'light');
  }, [theme]);

  useEffect(() => {
    document.body.classList.toggle('colorblind-mode', colorBlindMode);
  }, [colorBlindMode]);

  const t = (key: string) => translations[key]?.[language] || key;

  // ================= NAVIGATION =================
  const handleSelectSubject = useCallback((subject: Subject) => {
    if (!user) {
      setShowAuth(true);
      return;
    }
    setSelectedSubject(subject);
    setViewState(ViewState.SUBJECT);
  }, [user]);

  const handleSelectTopic = useCallback((topic: Topic) => {
    setSelectedTopic(topic);
    setViewState(ViewState.TOPIC);
  }, []);

  const handleBackToLanding = () => {
    setViewState(ViewState.LANDING);
    setSelectedSubject(null);
  };

  const handleDashboardClick = () => {
    setViewState(ViewState.DASHBOARD);
  };

  const handleBackToSubject = () => {
    setViewState(ViewState.SUBJECT);
    setSelectedTopic(null);
  };

  // ================= QUIZ =================
  const startQuiz = () => {
    if (!selectedSubject) return;

    const generated = generateQuizAI(selectedSubject.name, quizLevel);

    if (!generated || generated.length === 0) {
      alert("Quiz generation failed");
      return;
    }

    setQuizQuestions(generated);
    setShowQuiz(true);
  };

  // ================= VISUALIZATION =================
  const renderVisualization = useCallback((topicId: TopicId) => {
    switch (topicId) {
      case TopicId.ATOMIC_STRUCTURE:
        return (
          <div className="flex flex-col h-full overflow-hidden">
            <div className="flex-[3] relative min-h-[300px]">
              <AtomVisualizer
                element={selectedElement}
                rotation={atomRotation}
                zoom={atomZoom}
              />
            </div>
            <div className="flex-[2] border-t border-white/5 overflow-y-auto bg-black/40">
              <PeriodicTable
                elements={elements}
                onSelect={setSelectedElement}
                selectedSymbol={selectedElement.symbol}
              />
            </div>
          </div>
        );

      case TopicId.QUANTUM_CONFIG:
        return (
          <div className="flex flex-col h-full overflow-hidden">
            <div className="flex-1 overflow-y-auto bg-black/40 border-b border-white/5">
              <PeriodicTable
                elements={elements}
                onSelect={setSelectedElement}
                selectedSymbol={selectedElement.symbol}
              />
            </div>

            <div className="flex-[2] p-8 grid xl:grid-cols-4 gap-8 min-h-0 overflow-y-auto">
              <div className="xl:col-span-3">
                <QuantumConfigLab element={selectedElement} />
              </div>
              <div className="h-full min-h-[400px]">
                <AufbauChart atomicNumber={selectedElement.number} />
              </div>
            </div>
          </div>
        );

      case TopicId.PERIODIC_TRENDS:
        return (
          <div className="h-full overflow-y-auto p-4 md:p-8 space-y-12 bg-[#020617]">
            <section className="max-w-7xl mx-auto">
              <TrendsVisualizer />
            </section>
            <section className="max-w-7xl mx-auto">
              <ElementComparison />
            </section>
          </div>
        );

      case TopicId.MOLECULAR_STRUCTURE:
        return (
          <div className="h-full overflow-y-auto p-4 md:p-8 space-y-12 bg-[#020617]">
            <section className="max-w-7xl mx-auto">
              <BondingLab />
            </section>
            <section className="max-w-7xl mx-auto">
              <GeometryLab rotation={moleculeRotation} zoom={moleculeZoom} />
            </section>
          </div>
        );

      case TopicId.QUANTUM_NUMBERS:
        return (
          <div className="h-full overflow-y-auto">
            <QuantumNumbersLab />
          </div>
        );

      case TopicId.HISTORICAL_MODELS:
        return (
          <div className="h-full overflow-y-auto">
            <HistoricalModels />
          </div>
        );
      
      case TopicId.MECHANICS:
        return (
          <div className="h-full overflow-y-auto p-4 md:p-8 bg-[#020617]">
            <div className="max-w-7xl mx-auto">
              <MechanicsVisualizer />
            </div>
          </div>
        );

      case TopicId.ELECTROMAGNETISM:
        return (
          <div className="h-full overflow-y-auto p-4 md:p-8 bg-[#020617]">
            <div className="max-w-7xl mx-auto">
              <ElectromagnetismVisualizer />
            </div>
          </div>
        );
      
      case TopicId.MICROBIOLOGY:
  return (
    <div className="p-8 space-y-8 h-[700px]">
      <MicrobiologyLab />
    </div>
  );

case TopicId.CELL_BIOLOGY:
  return (
    <div className="p-8 space-y-8 h-[700px]">
      <CellBiologyLab />
    </div>
  );
    case TopicId.VECTOR_CALCULUS:
  return (
    <div className="p-8 space-y-8 h-[700px]">
      <VectorCalculusLab/>
    </div>
  );
  case TopicId.PI_APPROXIMATION:
  return (
    <div className="p-8 space-y-8 h-[700px]">
      <PiVisualizationLab/>
    </div>
  );
  case TopicId.COMPLEX_NUMBERS:
  return (
    <div className="h-full overflow-hidden p-4 md:p-8 bg-[#020617]">
      <ComplexNumbersLab />
    </div>
  );
  case TopicId.PYTHAGORAS_THEOREM:
  return (
    <div className="h-full overflow-hidden p-4 md:p-8 bg-[#020617]">
      <PythagorasLab />
    </div>
  );
  
      default:
        return <div className="p-10 text-center">Coming Soon</div>;
    }
  }, [elements, selectedElement, atomRotation]);

  // ================= GESTURES =================
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
    if (selectedTopic?.id === TopicId.MOLECULAR_STRUCTURE) {
      setMoleculeRotation({ dx, dy });
      setTimeout(() => setMoleculeRotation({ dx: 0, dy: 0 }), 50);
      return;
    }

    setAtomRotation({ dx, dy });
    setTimeout(() => setAtomRotation({ dx: 0, dy: 0 }), 50);
  };

  const handleGestureZoom = (delta: number) => {
    if (selectedTopic?.id === TopicId.MOLECULAR_STRUCTURE) {
      setMoleculeZoom((prev) => Math.min(1.8, Math.max(0.7, prev + delta * 0.00012)));
      return;
    }

    setAtomZoom((prev) => Math.min(1.8, Math.max(0.7, prev + delta * 0.00012)));
  };

  const handleResetZoom = useCallback(() => {
    const startMZoom = moleculeZoom;
    const startAZoom = atomZoom;
    const targetZoom = 1.0;
    const duration = 1200; // Slow reset
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing: easeInOutCubic
      const ease = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      setMoleculeZoom(startMZoom + (targetZoom - startMZoom) * ease);
      setAtomZoom(startAZoom + (targetZoom - startAZoom) * ease);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [moleculeZoom, atomZoom, selectedTopic]);

  // ================= AUTH =================

  return (
    <Skeleton name="labzero-main" loading={isLoading}>
      <div className={`h-screen w-full flex flex-col bg-transparent overflow-hidden relative transition-colors duration-500 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
      <BackgroundLayer theme={theme} />

      {/* ================= QUIZ SCREEN ================= */}
      <AnimatePresence>
        {showQuiz && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200]"
          >
            <QuizPage
              questions={quizQuestions}
              onExit={() => setShowQuiz(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {!showQuiz && (
        <>
          <AnimatePresence mode="wait">
            {viewState === ViewState.LANDING && (
              <motion.div key="landing" className="h-full w-full overflow-y-auto">
                <LandingPage 
                  onSelectSubject={handleSelectSubject} 
                  language={language} 
                  theme={theme}
                  user={user}
                  onLoginClick={() => setShowAuth(true)}
                  onLogoutClick={logout}
                  onProfileClick={() => setShowAuth(true)}
                  onOpenGlossary={() => setShowGlossary(true)}
                  onDashboardClick={() => setViewState(ViewState.DASHBOARD)}
                />
              </motion.div>
            )}

            {viewState === ViewState.SUBJECT && selectedSubject && (
              <motion.div key="subject" className="h-full w-full overflow-y-auto">
                <SubjectPage
                  subject={selectedSubject}
                  onSelectTopic={handleSelectTopic}
                  onBack={handleBackToLanding}
                  language={language}
                  onStartQuiz={startQuiz}
                  quizLevel={quizLevel}
                  onLevelChange={setQuizLevel}
                />
              </motion.div>
            )}

            {viewState === ViewState.TOPIC && selectedTopic && (
              <motion.div key="topic" className="h-full w-full">
                <TopicPage
                  topic={selectedTopic}
                  onBack={handleBackToSubject}
                  visualization={renderVisualization(selectedTopic.id)}
                  language={language}
                  onStartQuiz={startQuiz}
                />
              </motion.div>
            )}

            {viewState === ViewState.DASHBOARD && user && (
              <motion.div key="dashboard" className="h-full w-full">
                {user.role === 'teacher' ? (
                  <TeacherDashboard onBack={handleBackToLanding} />
                ) : (
                  <InstituteDashboard onBack={handleBackToLanding} />
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* SETTINGS */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`fixed bottom-8 right-28 w-16 h-16 rounded-2xl hidden md:flex items-center justify-center transition-all duration-500 z-[110] ${
              showSettings ? 'bg-indigo-500 rotate-90' : 'bg-white/5 border border-white/10 hover:bg-white/10'
            }`}
          >
            <Settings size={24} className={showSettings ? 'text-white' : 'text-slate-400'} />
          </button>

          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className="fixed bottom-24 md:bottom-28 left-4 right-4 md:left-auto md:right-28 md:w-72 glass-panel p-6 rounded-3xl z-[110] border border-white/10 origin-bottom-right mx-auto max-w-[calc(100vw-32px)]"
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

                  <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-amber-300">
                        <BookOpen size={16} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-300">Glossary</span>
                        <span className="text-[8px] font-mono text-slate-500">Open quick science definitions</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setShowGlossary(true);
                        setShowSettings(false);
                      }}
                      className="rounded-xl bg-amber-500 px-3 py-2 text-[10px] font-mono uppercase tracking-widest text-slate-950 transition-colors hover:bg-amber-400"
                    >
                      Open
                    </button>
                  </div>

                  {/* SKELETON DEBUG TOGGLE */}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <BottomNav 
            currentView={viewState}
            onNavigate={setViewState}
            onOpenGlossary={() => setShowGlossary(!showGlossary)}
            onOpenSettings={() => setShowSettings(!showSettings)}
            onOpenProfile={() => setShowAuth(!showAuth)}
            onToggleGesture={() => {
              if (user?.role !== 'student') {
                setIsGestureActive(!isGestureActive);
              }
            }}
            isGestureActive={isGestureActive}
            showSettings={showSettings}
            showGlossary={showGlossary}
            showAuth={showAuth}
            language={language}
            user={user}
          />

          <AnimatePresence>
            {showGlossary && <Glossary language={language} onClose={() => setShowGlossary(false)} />}
            {showAuth && <AuthOverlay onClose={() => setShowAuth(false)} />}
          </AnimatePresence>

          <GestureController 
            isActive={isGestureActive && user?.role !== 'student'}
            onToggle={() => {
              if (user?.role !== 'student') {
                setIsGestureActive(!isGestureActive);
              }
            }}
            onBack={handleGestureBack}
            onScroll={handleGestureScroll}
            onRotate={handleGestureRotate}
            onZoom={handleGestureZoom}
            onResetZoom={handleResetZoom}
            onSelect={handleGestureSelect}
            onPositionChange={setGesturePos}
            onToggleTheme={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
          />

          {isGestureActive && gesturePos && user?.role !== 'student' && (
            <motion.div 
              className="fixed w-8 h-8 rounded-full border-2 border-indigo-500 bg-indigo-500/20 pointer-events-none z-[200] flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.5)]"
              animate={{ 
                left: `${gesturePos.x * 100}%`, 
                top: `${gesturePos.y * 100}%` 
              }}
              transition={{ type: 'spring', stiffness: 1000, damping: 60, mass: 1 }}
              style={{ 
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="w-1 h-1 bg-white rounded-full" />
            </motion.div>
          )}
        </>
      )}
    </div>
    </Skeleton>
  );
};

const App: React.FC = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
