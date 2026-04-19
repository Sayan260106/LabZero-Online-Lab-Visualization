import QuizPage from './components/Quiz';
import { generateQuizAI } from './data/quizData';

import { motion, AnimatePresence } from 'framer-motion';

import React, { useState, useEffect } from 'react';
import AtomVisualizer from './components/AtomicVisualizer';
import PeriodicTable from './components/PeriodicTable';
import TrendsVisualizer from './components/TrendsVisualizer';
import LandingPage from './components/LandingPage';
import { getElements } from './services/elementsService';
import SubjectPage from './components/SubjectPage';
import TopicPage from './components/TopicPage';
import GestureController from './components/GestureController';

import { ElementData, Subject, Topic, ViewState, TopicId } from './types/types';
import { MessageSquare, X } from 'lucide-react';
import { Language, translations } from './services/translations';

const App: React.FC = () => {

  const [elements, setElements] = useState<ElementData[]>([]);
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [viewState, setViewState] = useState<ViewState>(ViewState.LANDING);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const [showAITutor, setShowAITutor] = useState(false);
  const [language, setLanguage] = useState<Language>('en');

  const [atomRotation, setAtomRotation] = useState({ dx: 0, dy: 0 });

  // ✅ QUIZ STATES
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [quizLevel, setQuizLevel] = useState<'basic' | 'intermediate' | 'difficult'>('basic');

  // ✅ prevent same quiz repeat
  const [lastQuizHash, setLastQuizHash] = useState<string>("");

  useEffect(() => {
    getElements()
      .then(data => {
        if (data?.length) {
          setElements(data);
          setSelectedElement(data[0]);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  const t = (key: string) => translations[key]?.[language] || key;

  const handleSelectSubject = (subject: Subject) => {
    setSelectedSubject(subject);
    setViewState(ViewState.SUBJECT);
  };

  const handleSelectTopic = (topic: Topic) => {
    setSelectedTopic(topic);
    setViewState(ViewState.TOPIC);
  };

  const renderVisualization = (topicId: TopicId) => {
    if (isLoading) return <div className="p-10 text-white">Loading...</div>;

    switch (topicId) {
      case TopicId.ATOMIC_STRUCTURE:
        return (
          <>
            {selectedElement && (
              <AtomVisualizer element={selectedElement} rotation={atomRotation} />
            )}
            <PeriodicTable
              elements={elements}
              onSelect={setSelectedElement}
              selectedSymbol={selectedElement?.symbol || ''}
            />
          </>
        );

      case TopicId.PERIODIC_TRENDS:
        return <TrendsVisualizer />;

      default:
        return <div className="text-white p-10">Coming Soon</div>;
    }
  };

  // ✅ FINAL QUIZ START (ANTI-REPEAT + TRUE RANDOM CALL)
  const startQuiz = () => {
    if (!selectedSubject) return;

    let generated = generateQuizAI(selectedSubject.name, quizLevel);

    if (!generated || generated.length === 0) {
      alert("Quiz generation failed");
      return;
    }

    const hash = JSON.stringify(generated);

    // 🚫 prevent same quiz appearing twice
    if (hash === lastQuizHash) {
      generated = generateQuizAI(selectedSubject.name, quizLevel);
    }

    setLastQuizHash(JSON.stringify(generated));
    setQuizQuestions(generated);
    setShowQuiz(true);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white">

      {/* ✅ QUIZ SCREEN */}
      {showQuiz && (
        <QuizPage
          questions={quizQuestions}
          onExit={() => setShowQuiz(false)}
        />
      )}

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
                  onBack={() => setViewState(ViewState.LANDING)}
                  language={language}
                />

                {/* ✅ LEVEL SELECTOR */}
                <div className="fixed bottom-36 right-8 flex gap-2">
                  {["basic", "intermediate", "difficult"].map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setQuizLevel(lvl as any)}
                      className={`px-3 py-1 rounded capitalize transition ${
                        quizLevel === lvl
                          ? "bg-indigo-600"
                          : "bg-white/10 hover:bg-white/20"
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>

                {/* ✅ QUIZ BUTTON */}
                <button
                  onClick={startQuiz}
                  className="fixed bottom-24 right-8 px-5 py-3 bg-green-600 rounded-xl hover:bg-green-700 transition"
                >
                  Start Quiz
                </button>
              </motion.div>
            )}

            {viewState === ViewState.TOPIC && selectedTopic && (
              <motion.div key="topic">
                <TopicPage
                  topic={selectedTopic}
                  onBack={() => setViewState(ViewState.SUBJECT)}
                  visualization={renderVisualization(selectedTopic.id)}
                  language={language}
                />
              </motion.div>
            )}

          </AnimatePresence>

          {/* AI BUTTON */}
          <button
            onClick={() => setShowAITutor(!showAITutor)}
            className="fixed bottom-8 right-8 w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center"
          >
            {showAITutor ? <X /> : <MessageSquare />}
          </button>

          <GestureController
            isActive={false}
            onToggle={() => {}}
            onRotate={(dx, dy) => setAtomRotation({ dx, dy })}
          />
        </>
      )}
    </div>
  );
};

export default App;