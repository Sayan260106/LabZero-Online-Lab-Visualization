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
import { getElements } from './services/elementsService';
import { ElementData, Subject, Topic, ViewState, TopicId } from './types/types';
import { Language, translations } from './services/translations';
import { AuthProvider, useAuth } from './AuthContext';

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();

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
    setSelectedSubject(subject);
    setViewState(ViewState.SUBJECT);
  }, []);

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
          <div className="flex flex-col h-full">
            <div className="flex-1">
              <AtomVisualizer element={selectedElement} rotation={atomRotation} />
            </div>
            <div className="h-[420px] border-t border-white/5 overflow-y-auto">
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
          <div className="flex flex-col h-full">
            <div className="h-[350px] overflow-y-auto">
              <PeriodicTable
                elements={elements}
                onSelect={setSelectedElement}
                selectedSymbol={selectedElement.symbol}
              />
            </div>

            <div className="flex-1 p-8 grid xl:grid-cols-4 gap-8">
              <div className="xl:col-span-3">
                <QuantumConfigLab element={selectedElement} />
              </div>
              <AufbauChart atomicNumber={selectedElement.number} />
            </div>
          </div>
        );

      case TopicId.PERIODIC_TRENDS:
        return (
          <div className="p-8 space-y-8">
            <TrendsVisualizer />
            <ElementComparison />
          </div>
        );

      case TopicId.MOLECULAR_STRUCTURE:
        return (
          <div className="p-8 space-y-8">
            <BondingLab />
            <GeometryLab />
          </div>
        );

      case TopicId.QUANTUM_NUMBERS:
        return <QuantumNumbersLab />;

      case TopicId.HISTORICAL_MODELS:
        return <HistoricalModels />;
      
      case TopicId.MECHANICS: // Make sure this matches your TopicId enum
  return (
    <div className="p-8 space-y-8">
      <MechanicsVisualizer />
    </div>
  );
  case TopicId.ELECTROMAGNETISM:
  return (
    <div className="p-8 space-y-8">
      <ElectromagnetismVisualizer />
    </div>
  );

      default:
        return <div className="p-10 text-center">Coming Soon</div>;
    }
  }, [elements, selectedElement, atomRotation]);

  // ================= GESTURES =================
  const handleGestureRotate = (dx: number, dy: number) => {
    setAtomRotation({ dx, dy });
  };

  const handleGestureBack = () => {
    if (viewState === ViewState.TOPIC) handleBackToSubject();
    else if (viewState === ViewState.SUBJECT) handleBackToLanding();
  };

  // ================= AUTH =================
  if (isLoading) return null;
  if (!user) return <AuthPage />;

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-white">

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
              <motion.div key="landing">
                <LandingPage onSelectSubject={handleSelectSubject} language={language} />
              </motion.div>
            )}

            {viewState === ViewState.SUBJECT && selectedSubject && (
              <motion.div key="subject">
                <SubjectPage
                  subject={selectedSubject}
                  onSelectTopic={handleSelectTopic}
                  onBack={handleBackToLanding}
                  language={language}
                />

                {/* LEVEL SELECTOR */}
                <div className="fixed bottom-36 right-8 flex gap-2 z-[120]">
                  {["basic", "intermediate", "difficult"].map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setQuizLevel(lvl as any)}
                      className={`px-3 py-1 rounded text-xs ${
                        quizLevel === lvl ? "bg-indigo-600" : "bg-white/10"
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>

                {/* START QUIZ */}
                <button
                  onClick={startQuiz}
                  className="fixed bottom-24 right-8 px-5 py-3 bg-green-600 rounded-xl hover:bg-green-700 z-[120]"
                >
                  Start Quiz
                </button>
              </motion.div>
            )}

            {viewState === ViewState.TOPIC && selectedTopic && (
              <motion.div key="topic">
                <TopicPage
                  topic={selectedTopic}
                  onBack={handleBackToSubject}
                  visualization={renderVisualization(selectedTopic.id)}
                  language={language}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* AI BUTTON */}
          <button
            onClick={() => setShowAITutor(prev => !prev)}
            className="fixed bottom-8 right-8 w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center"
          >
            {showAITutor ? <X /> : <MessageSquare />}
          </button>

          {/* SETTINGS */}
          <button
            onClick={() => setShowSettings(prev => !prev)}
            className="fixed bottom-8 right-28 w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center"
          >
            <Settings />
          </button>

          <BottomNav
            currentView={viewState}
            onNavigate={setViewState}
            onOpenGlossary={() => setShowGlossary(true)}
            onOpenSettings={() => setShowSettings(prev => !prev)}
            onOpenProfile={() => setShowAuth(true)}
            language={language}
          />

          <AnimatePresence>
            {showGlossary && <Glossary language={language} onClose={() => setShowGlossary(false)} />}
            {showAuth && <AuthOverlay onClose={() => setShowAuth(false)} />}
          </AnimatePresence>

          <GestureController
            isActive={isGestureActive}
            onToggle={() => setIsGestureActive(prev => !prev)}
            onBack={handleGestureBack}
            onRotate={handleGestureRotate}
            onPositionChange={setGesturePos}
          />
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