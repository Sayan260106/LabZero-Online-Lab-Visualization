import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import AtomVisualizer from './components/AtomicVisualizer';
import PeriodicTable from './components/PeriodicTable';
import LandingPage from './components/LandingPage';
import { ELEMENTS } from './constants';
import { ElementData, ViewState, TopicId, Subject, Topic } from './types';
import { Sparkles, MessageSquare, X } from 'lucide-react';

const App: React.FC = () => {
  const [selectedElement, setSelectedElement] = useState<ElementData>(ELEMENTS[0]);
  const [viewState, setViewState] = useState<ViewState>(ViewState.LANDING);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [showAITutor, setShowAITutor] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [atomRotation, setAtomRotation] = useState({ dx: 0, dy: 0 });

  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/status/')
      .then(res => res.json())
      .then(data => setMessage(data.status))
      .catch(err => setMessage("Backend offline"));
  }, []);

  // 🌗 Theme handling
  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [theme]);

  // 🔬 Visualization
  const renderVisualization = (topicId: TopicId) => {
    switch (topicId) {
      case TopicId.ATOMIC_STRUCTURE:
        return (
          <div className="flex flex-col h-full">

            <div className="flex-1 min-h-0">
              <AtomVisualizer element={selectedElement} rotation={atomRotation} />
            </div>

            <div className="h-[420px] border-t border-white/10 bg-slate-950/50 backdrop-blur-xl overflow-y-auto">
              <PeriodicTable
                onSelect={setSelectedElement}
                selectedSymbol={selectedElement.symbol}
              />
            </div>

            {/* Theory */}
            <div className="p-6 bg-slate-900 border-t border-white/10">
              <h2 className="text-2xl font-bold mb-3 text-indigo-400">
                Theory: Atomic Structure
              </h2>
              <p className="text-slate-300 leading-relaxed">
                Atoms consist of protons, neutrons, and electrons. Electrons are arranged
                in orbitals and determine chemical properties and bonding behavior.
              </p>
            </div>

          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 p-12 text-center">
            <div className="w-20 h-20 rounded-3xl bg-slate-900 flex items-center justify-center mb-6 border border-white/10">
              <Sparkles size={40} className="text-indigo-500" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-2 uppercase italic">
              Coming Soon
            </h3>

            <p className="max-w-md text-sm opacity-60">
              This module is under development.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-white transition-colors duration-500">

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

      {/* 🌗 Theme Toggle */}
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="fixed top-6 right-6 px-4 py-2 rounded-lg bg-indigo-600 text-white z-[200] hover:scale-105 transition"
      >
        {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      {/* 🔥 ANIMATED PAGES */}
      <AnimatePresence mode="wait">

        {/* Landing */}
        {viewState === ViewState.LANDING && (
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.4 }}
          >
            <LandingPage
              onSelectSubject={(subject) => {
                setSelectedSubject(subject);
                setViewState(ViewState.SUBJECT);
              }}
            />
          </motion.div>
        )}

        {/* Subject */}
        {viewState === ViewState.SUBJECT && selectedSubject && (
          <motion.div
            key="subject"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
            className="p-10"
          >
            <button
              onClick={() => setViewState(ViewState.LANDING)}
              className="mb-6 px-4 py-2 bg-indigo-600 rounded-lg"
            >
              ← Back
            </button>

            <h1 className="text-4xl font-bold mb-6">
              {selectedSubject.name}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedSubject.topics.map((topic) => (
                <div
                  key={topic.id}
                  onClick={() => {
                    setSelectedTopic(topic);
                    setViewState(ViewState.TOPIC);
                  }}
                  className="p-6 bg-slate-900 rounded-xl cursor-pointer hover:scale-105 transition"
                >
                  <h2 className="text-xl font-bold">{topic.name}</h2>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Topic */}
        {viewState === ViewState.TOPIC && selectedTopic && (
          <motion.div
            key="topic"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="p-10"
          >
            <button
              onClick={() => setViewState(ViewState.SUBJECT)}
              className="mb-6 px-4 py-2 bg-indigo-600 rounded-lg"
            >
              ← Back
            </button>

            <div className="h-[80vh]">
              {renderVisualization(selectedTopic.id)}
            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* 🤖 AI Button */}
      <button
        onClick={() => setShowAITutor(!showAITutor)}
        className={`fixed bottom-8 right-8 w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500 z-[100] ${
          showAITutor ? 'bg-rose-500 rotate-90' : 'bg-indigo-600 hover:scale-110'
        }`}
      >
        {showAITutor ? (
          <X className="text-white" size={28} />
        ) : (
          <MessageSquare className="text-white" size={28} />
        )}
      </button>

      {/* 🤖 AI Panel */}
      <div
        className={`fixed bottom-28 right-8 w-[420px] h-[550px] z-[100] transition-all duration-500 origin-bottom-right ${
          showAITutor
            ? 'scale-100 opacity-100'
            : 'scale-90 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-slate-900 h-full rounded-xl flex items-center justify-center text-slate-400 shadow-xl">
          AI Tutor Coming Soon...
        </div>
      </div>
      <div>
      <h1>LabZero Visualization</h1>
      <p>Backend Status: {message}</p>
    </div>
    </div>
    
  );
};

export default App;