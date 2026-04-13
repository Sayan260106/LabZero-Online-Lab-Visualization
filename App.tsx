import React, { useState, useEffect } from 'react';
import AtomVisualizer from './components/AtomicVisualizer';
import PeriodicTable from './components/PeriodicTable';
// import AITutor from './components/AITutor';
// import AufbauChart from './components/AufbauChart';
import TrendsVisualizer from './components/TrendsVisualizer';
// import ElementComparison from './components/ElementComparison';
// import BondingLab from './components/BondingLab';
// import GeometryLab from './components/GeometryLab';
// import HistoricalModels from './components/HistoricalModels';
// import QuantumConfigLab from './components/QuantumConfigLab';
// import QuantumNumbersLab from './components/QuantumNumbersLab';
import LandingPage from './components/LandingPage';
// import SubjectPage from './components/SubjectPage';
// import TopicPage from './components/TopicPage';
// import GestureController from './components/GestureController';
import { ELEMENTS, SUBJECTS } from './constants';
import { ElementData, Subject, Topic, ViewState, TopicId } from './types';
import { Sparkles, MessageSquare, X } from 'lucide-react';

const App: React.FC = () => {
  const [selectedElement, setSelectedElement] = useState<ElementData>(ELEMENTS[0]);
  const [viewState, setViewState] = useState<ViewState>(ViewState.LANDING);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [showAITutor, setShowAITutor] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
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
              <PeriodicTable onSelect={setSelectedElement} selectedSymbol={selectedElement.symbol} />
            </div>
          </div>
        );
    //   case TopicId.MOLECULAR_STRUCTURE:
    //     return (
    //       <div className="grid grid-cols-1 lg:grid-cols-2 h-full gap-px bg-white/5 overflow-y-auto">
    //         <div className="bg-[#020617] p-8">
    //           <BondingLab />
    //         </div>
    //         <div className="bg-[#020617] p-8">
    //           <GeometryLab />
    //         </div>
    //       </div>
    //     );
    //   case TopicId.QUANTUM_NUMBERS:
    //     return (
    //       <div className="h-full overflow-y-auto p-8">
    //         <QuantumNumbersLab />
    //       </div>
    //     );
    //   case TopicId.PERIODIC_TRENDS:
    //     return (
    //       <div className="grid grid-cols-1 lg:grid-cols-2 h-full gap-px bg-white/5 overflow-y-auto">
    //         <div className="bg-[#020617] p-8">
    //           <TrendsVisualizer />
    //         </div>
    //         <div className="bg-[#020617] p-8">
    //           <ElementComparison />
    //         </div>
    //       </div>
    //     );
    //   case TopicId.HISTORICAL_MODELS:
    //     return (
    //       <div className="h-full overflow-y-auto p-8">
    //         <HistoricalModels />
    //       </div>
    //     );
    //   case TopicId.QUANTUM_CONFIG:
    //     return (
    //       <div className="grid grid-cols-1 lg:grid-cols-2 h-full gap-px bg-white/5 overflow-y-auto">
    //         <div className="bg-[#020617] p-8">
    //           <QuantumConfigLab element={selectedElement} />
    //         </div>
    //         <div className="bg-[#020617] p-8">
    //           <AufbauChart atomicNumber={selectedElement.number} />
    //         </div>
    //       </div>
    //     );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 p-12 text-center">
            <div className="w-20 h-20 rounded-3xl bg-slate-900 flex items-center justify-center mb-6 border border-white/5">
              <Sparkles size={40} className="text-indigo-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-tighter italic">Coming Soon</h3>
            <p className="max-w-md mx-auto text-sm font-mono uppercase tracking-widest opacity-50">
              Our scientists are working hard to bring this interactive module to life.
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

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] selection:bg-indigo-500/30 transition-colors duration-400">
      {/* Structural Overlays */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

      {viewState === ViewState.LANDING && (
        <LandingPage onSelectSubject={handleSelectSubject} />
      )}

      {/* {viewState === ViewState.SUBJECT && selectedSubject && (
        <SubjectPage
          subject={selectedSubject}
          onSelectTopic={handleSelectTopic}
          onBack={handleBackToLanding}
        />
      )} */}

      {/*
      {viewState === ViewState.TOPIC && selectedTopic && (
        <TopicPage
          topic={selectedTopic}
          onBack={handleBackToSubject}
          visualization={renderVisualization(selectedTopic.id)}
        />
      )}
      */}

      {/* AI Tutor Floating Button */}
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

      {/* AI Tutor Panel */}
      <div className={`fixed bottom-28 right-8 w-[450px] h-[600px] z-[100] transition-all duration-500 origin-bottom-right ${
        showAITutor ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-10 pointer-events-none'
      }`}>
        {/* <AITutor currentElement={selectedElement} /> */}
      </div>

      {/* <GestureController 
        isActive={isGestureActive}
        onToggle={() => setIsGestureActive(!isGestureActive)}
        onBack={handleGestureBack}
        onScroll={handleGestureScroll}
        onRotate={handleGestureRotate}
        onSelect={handleGestureSelect}
        onPositionChange={setGesturePos}
      /> */}

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

export default App;
