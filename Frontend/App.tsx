import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";

import AtomVisualizer from './components/AtomicVisualizer';
import PeriodicTable from './components/PeriodicTable';
import LandingPage from './components/LandingPage';
import GraphVisualizer from './components/GraphVisualizer';

import { ELEMENTS } from './constants';
import { ElementData, ViewState, TopicId, Subject, Topic } from './types';

import { MessageSquare, X } from 'lucide-react';

const App: React.FC = () => {

  const [selectedElement, setSelectedElement] = useState<ElementData>(ELEMENTS[0]);
  const [viewState, setViewState] = useState<ViewState>(ViewState.LANDING);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [showAITutor, setShowAITutor] = useState(false);

  const [theme, setTheme] = useState<'dark' | 'light'>('light'); // default safe

  const [atomRotation, setAtomRotation] = useState({ dx: 0, dy: 0 });
  const [message, setMessage] = useState("Loading...");

  // ✅ Detect system theme AFTER mount (prevents crash)
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  // ✅ Backend check
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/status/')
      .then(res => res.json())
      .then(data => setMessage(data.status))
      .catch(() => setMessage("Backend offline"));
  }, []);

  // ✅ APPLY DARK MODE (TAILWIND)
  useEffect(() => {
    const html = document.documentElement;

    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [theme]);

  // 🔬 Renderer
  const renderVisualization = (topicId: TopicId) => {

    if (topicId === TopicId.ATOMIC_STRUCTURE) {
      return (
        <div className="flex flex-col h-full">

          <div className="flex-1 min-h-0">
            <AtomVisualizer element={selectedElement} rotation={atomRotation} />
          </div>

          <div className="h-[420px] border-t border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-xl overflow-y-auto">
            <PeriodicTable
              onSelect={setSelectedElement}
              selectedSymbol={selectedElement.symbol}
            />
          </div>

          <div className="p-6 bg-black/5 dark:bg-white/5 backdrop-blur-xl border-t border-black/10 dark:border-white/10">
            <h2 className="text-2xl font-bold mb-3 text-indigo-500">
              Theory: Atomic Structure
            </h2>
            <p>
              Atoms consist of protons, neutrons, and electrons arranged in orbitals.
              Electron configuration determines chemical properties and bonding.
            </p>
          </div>

        </div>
      );
    }

    return (
      <div className="p-8 space-y-6 overflow-y-auto h-full">

        <h1 className="text-3xl font-bold text-indigo-500">
          {selectedTopic?.name}
        </h1>

        <div className="space-y-6">
          {selectedTopic?.theory?.split('\n\n').map((block, i) => (

            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl border 
              bg-black/5 dark:bg-white/5 
              border-black/10 dark:border-white/10
              shadow-lg hover:scale-[1.02] transition"
            >

              {block.split('\n').map((line, index) => {

                if (line.startsWith('$$') && line.endsWith('$$')) {
                  return (
                    <BlockMath key={index}>
                      {line.replace(/\$\$/g, '')}
                    </BlockMath>
                  );
                }

                if (!line.startsWith('-') && line.length < 60) {
                  return (
                    <h3 key={index} className="text-lg font-semibold text-indigo-400">
                      {line}
                    </h3>
                  );
                }

                if (line.startsWith('-')) {
                  return (
                    <li key={index} className="ml-5 list-disc">
                      {line.replace('-', '')}
                    </li>
                  );
                }

                return <p key={index}>{line}</p>;
              })}

            </motion.div>

          ))}
        </div>

        {selectedSubject?.name === "Mathematics" && (
          <GraphVisualizer />
        )}

      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-500 
    bg-white text-slate-900 
    dark:bg-slate-950 dark:text-white">

      {/* 🌗 Theme Toggle */}
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="fixed top-6 right-6 px-4 py-2 rounded-lg bg-indigo-600 text-white z-[200]"
      >
        {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
      </button>

      {/* Backend Status */}
      <div className="fixed bottom-4 left-4 text-sm opacity-70">
        Backend: {message}
      </div>

      <AnimatePresence mode="wait">

        {viewState === ViewState.LANDING && (
          <LandingPage
            onSelectSubject={(subject) => {
              setSelectedSubject(subject);
              setViewState(ViewState.SUBJECT);
            }}
          />
        )}

        {viewState === ViewState.SUBJECT && selectedSubject && (
          <div className="p-10">
            <button onClick={() => setViewState(ViewState.LANDING)}>← Back</button>

            <h1 className="text-4xl font-bold mb-6">{selectedSubject.name}</h1>

            <div className="grid md:grid-cols-2 gap-6">
              {selectedSubject.topics.map((topic) => (
                <div
                  key={topic.id}
                  onClick={() => {
                    setSelectedTopic(topic);
                    setViewState(ViewState.TOPIC);
                  }}
                  className="p-6 rounded-xl border cursor-pointer 
                  bg-black/5 dark:bg-white/5"
                >
                  <h2>{topic.name}</h2>
                  <p>{topic.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {viewState === ViewState.TOPIC && selectedTopic && (
          <div className="p-10">
            <button onClick={() => setViewState(ViewState.SUBJECT)}>← Back</button>
            <div className="h-[80vh]">
              {renderVisualization(selectedTopic.id)}
            </div>
          </div>
        )}

      </AnimatePresence>

      {/* 🤖 AI Button */}
      <button
        onClick={() => setShowAITutor(!showAITutor)}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center"
      >
        {showAITutor ? <X size={28} /> : <MessageSquare size={28} />}
      </button>

    </div>
  );
};

export default App;