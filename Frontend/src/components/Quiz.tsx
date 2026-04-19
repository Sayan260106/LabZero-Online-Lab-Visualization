import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Question {
  question: string;
  options: string[];
  answer: string;
  topic?: string;
}

interface Props {
  questions: Question[];
  onExit: () => void;
}

const QuizPage: React.FC<Props> = ({ questions, onExit }) => {

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // ✅ NEW STATES
  const [level, setLevel] = useState<"basic" | "intermediate" | "difficult">("basic");
  const [correctStreak, setCorrectStreak] = useState(0);
  const [wrongTopics, setWrongTopics] = useState<Record<string, number>>({});

  const question = questions[current];

  // =========================
  // 🎯 HANDLE ANSWER
  // =========================
  const handleOptionClick = (option: string) => {
    if (answered) return;

    setSelected(option);
    setAnswered(true);

    const isCorrect = option === question.answer;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setCorrectStreak((prev) => prev + 1);

      // 🔥 ADAPTIVE DIFFICULTY
      if (correctStreak + 1 >= 2 && level === "basic") {
        setLevel("intermediate");
      }
      if (correctStreak + 1 >= 4 && level === "intermediate") {
        setLevel("difficult");
      }

    } else {
      setCorrectStreak(0);

      // 🎯 WEAK TOPIC TRACKING
      const topic = question.topic || "general";
      setWrongTopics((prev) => ({
        ...prev,
        [topic]: (prev[topic] || 0) + 1
      }));
    }
  };

  // =========================
  // NEXT QUESTION
  // =========================
  const handleNext = () => {
    setSelected(null);
    setAnswered(false);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const progress = ((current + 1) / questions.length) * 100;

  // =========================
  // 📊 RESULT DASHBOARD
  // =========================
  if (showResult) {
    const accuracy = ((score / questions.length) * 100).toFixed(1);

    const weakAreas = Object.entries(wrongTopics)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 to-black text-white p-6">

        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-full max-w-lg"
        >
          <h1 className="text-4xl font-bold mb-4 text-center">📊 Performance</h1>

          <div className="space-y-3 text-lg">
            <p>Score: <span className="text-green-400">{score}/{questions.length}</span></p>
            <p>Accuracy: <span className="text-blue-400">{accuracy}%</span></p>
            <p>Final Level: <span className="text-purple-400">{level}</span></p>
          </div>

          {/* 🔍 WEAK AREAS */}
          <div className="mt-6">
            <h2 className="text-xl mb-2">Weak Areas</h2>
            {weakAreas.length === 0 ? (
              <p className="text-green-400">None 🎉</p>
            ) : (
              weakAreas.map(([topic, count]) => (
                <p key={topic} className="text-red-400">
                  {topic} ({count} mistakes)
                </p>
              ))
            )}
          </div>

          <button
            onClick={onExit}
            className="mt-6 w-full py-3 bg-indigo-600 rounded-xl hover:bg-indigo-700"
          >
            Back
          </button>
        </motion.div>
      </div>
    );
  }

  // =========================
  // 🎯 QUIZ UI
  // =========================
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] to-indigo-900 text-white flex flex-col items-center justify-center p-6">

      {/* EXIT */}
      <button
        onClick={onExit}
        className="absolute top-6 left-6 px-4 py-2 bg-red-500 rounded-lg"
      >
        Exit
      </button>

      {/* LEVEL DISPLAY */}
      <div className="absolute top-6 right-6 px-4 py-2 bg-indigo-600 rounded-lg">
        {level.toUpperCase()}
      </div>

      {/* PROGRESS */}
      <div className="w-full max-w-2xl mb-6">
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm mt-2 text-right opacity-70">
          Question {current + 1} / {questions.length}
        </p>
      </div>

      {/* QUESTION */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          className="w-full max-w-2xl bg-white/10 backdrop-blur-xl p-8 rounded-3xl"
        >
          <h2 className="text-2xl mb-6">{question.question}</h2>

          <div className="space-y-4">
            {question.options.map((option, i) => {
              const isCorrect = option === question.answer;
              const isSelected = selected === option;

              let style = "bg-white/5 hover:bg-white/10";

              if (answered) {
                if (isCorrect) style = "bg-green-600";
                else if (isSelected) style = "bg-red-600";
              }

              return (
                <button
                  key={i}
                  onClick={() => handleOptionClick(option)}
                  className={`w-full text-left px-5 py-4 rounded-xl ${style}`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {answered && (
            <button
              onClick={handleNext}
              className="mt-6 w-full py-3 bg-indigo-600 rounded-xl"
            >
              {current + 1 === questions.length ? "Finish Quiz" : "Next"}
            </button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QuizPage;