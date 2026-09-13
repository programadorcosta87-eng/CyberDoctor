import React, { useState, useEffect } from 'react';
import { Shield, CheckCircle2, XCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { generateQuiz, QuizQuestion } from '../data/quizzes';

interface Props {
  onSuccess: (points: number, title: string) => void;
}

export default function Quizzes({ onSuccess }: Props) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    startNewQuiz();
  }, []);

  const startNewQuiz = () => {
    setQuestions(generateQuiz(5));
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizFinished(false);
  };

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    
    if (index === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizFinished(true);
      const points = score * 50; // 50 points per correct answer
      if (points > 0) {
        onSuccess(points, `Quiz Completo (${score}/${questions.length} ${score === questions.length ? '- 100%' : ''})`);
      }
    }
  };

  if (questions.length === 0) return null;

  if (quizFinished) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-[#00FF41]/10 border border-[#00FF41] flex items-center justify-center mb-4">
          <Shield className="w-12 h-12 text-[#00FF41]" />
        </div>
        <h2 className="text-3xl font-bold text-white">Quiz Concluído!</h2>
        <p className="text-gray-400 text-lg">Você acertou {score} de {questions.length} questões.</p>
        <p className="text-[#00FF41] font-bold text-xl">+{score * 50} pts</p>
        
        <button 
          onClick={startNewQuiz}
          className="mt-8 bg-[#00FF41] text-black font-bold px-8 py-3 rounded-xl hover:bg-[#00cc33] transition-all flex items-center gap-2"
        >
          <RefreshCw className="w-5 h-5" /> Fazer Outro Quiz
        </button>
      </div>
    );
  }

  const q = questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Avaliação de Conhecimento</h1>
        <p className="text-gray-400 mt-2">Teste seus conhecimentos teóricos. Questão {currentQuestion + 1} de {questions.length}</p>
      </div>

      <div className="bg-[#0f0f11] border border-[#1a1a1c] p-6 md:p-8 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-white mb-6 leading-relaxed">{q.question}</h3>
        
        <div className="space-y-3">
          {q.options.map((option, idx) => {
            let itemClass = "bg-[#161618] border-[#222] hover:border-[#00FF41]/50 text-gray-300";
            let Icon = null;

            if (showResult) {
              if (idx === q.correctAnswer) {
                itemClass = "bg-[#00FF41]/10 border-[#00FF41] text-[#00FF41]";
                Icon = CheckCircle2;
              } else if (idx === selectedAnswer) {
                itemClass = "bg-red-500/10 border-red-500 text-red-500";
                Icon = XCircle;
              } else {
                itemClass = "bg-[#161618] border-[#222] opacity-50 text-gray-500";
              }
            }

            return (
              <button
                key={idx}
                disabled={showResult}
                onClick={() => handleAnswer(idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${itemClass}`}
              >
                <span>{option}</span>
                {Icon && <Icon className="w-5 h-5" />}
              </button>
            );
          })}
        </div>

        {showResult && (
          <div className="mt-6 p-4 bg-[#161618] border border-[#222] rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#00FF41] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-bold mb-1">Explicação</p>
              <p className="text-gray-400 text-sm leading-relaxed">{q.explanation}</p>
            </div>
          </div>
        )}
      </div>

      {showResult && (
        <div className="flex justify-end">
          <button 
            onClick={nextQuestion}
            className="bg-[#00FF41] hover:bg-[#00cc33] text-black font-bold px-8 py-3 rounded-xl transition-all"
          >
            {currentQuestion < questions.length - 1 ? 'Próxima Questão' : 'Ver Resultados'}
          </button>
        </div>
      )}
    </div>
  );
}
