import React, { useState, useEffect, useCallback } from 'react';
import {
  Sparkles, MessageSquare, X, Settings, Eye, Moon, Sun, Languages
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

import LandingPage from './components/LandingPage';
import SubjectPage from './components/SubjectPage';
import TopicPage from './components/TopicPage';
import GestureController from './components/GestureController';
import BottomNav from './components/BottomNav';
import Glossary from './components/Glossary';
import AuthOverlay from './components/AuthOverlay';
import AuthPage from './components/AuthPage';

import QuizPage from './components/Quiz';
import { generateQuizAI } from './data/quizData';

import { ELEMENTS } from './utils/constants';
import { ElementData, Subject, Topic, ViewState, TopicId } from './types/types';
import { Language, translations } from './services/translations';
import { AuthProvider, useAuth } from './services/AuthContext';
import { getElements } from './services/elementsService';
import VectorCalculusLab from './components/VectorCalculusLab';
import PiVisualizationLab from './components/PiVisualizationLab';

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
  const [showAuth, setShowAuth] = useState(false);

  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [colorBlindMode, setColorBlindMode] = useState(false);
  const [language, setLanguage] = useState<Language>('en');

  const [isGestureActive, setIsGestureActive] = useState(false);
  const [atomRotation, setAtomRotation] = useState({ dx: 0, dy: 0 });
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
              <AtomVisualizer element={selectedElement} rotation={atomRotation} />
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
              <GeometryLab />
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
    setAtomRotation({ dx, dy });
    // Reset after a frame to avoid continuous rotation if not moving
    setTimeout(() => setAtomRotation({ dx: 0, dy: 0 }), 50);
  };

  // ================= AUTH =================
  if (isLoading) return null;

  return (
    <div className="h-screen w-full flex flex-col bg-[#020617] text-white overflow-hidden">

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
                  user={user}
                  onLoginClick={() => setShowAuth(true)}
                  onLogoutClick={logout}
                  onProfileClick={() => setShowAuth(true)}
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
            onToggleGesture={() => setIsGestureActive(!isGestureActive)}
            isGestureActive={isGestureActive}
            showSettings={showSettings}
            showGlossary={showGlossary}
            showAuth={showAuth}
            language={language}
          />

          <AnimatePresence>
            {showGlossary && <Glossary language={language} onClose={() => setShowGlossary(false)} />}
            {showAuth && <AuthOverlay onClose={() => setShowAuth(false)} />}
          </AnimatePresence>

          <GestureController 
            isActive={isGestureActive}
            onToggle={() => setIsGestureActive(!isGestureActive)}
            onBack={handleGestureBack}
            onScroll={handleGestureScroll}
            onRotate={handleGestureRotate}
            onSelect={handleGestureSelect}
            onPositionChange={setGesturePos}
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
        </>
      )}
    </div>
  );
};

const App: React.FC = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
