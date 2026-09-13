import React from 'react';
import { UserProfile } from '../types';
import { getLevelInfo } from '../utils';
import { Trophy, Activity, Target, ShieldCheck, Info, X } from 'lucide-react';
import { useState } from 'react';

interface Props {
  profile: UserProfile;
}

export default function Dashboard({ profile }: Props) {
  const [showLevelsModal, setShowLevelsModal] = useState(false);
  
  const allLevels = [
    { name: 'Bronze', min: 0, color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500' },
    { name: 'Prata', min: 1001, color: 'text-gray-300', bg: 'bg-gray-300/10', border: 'border-gray-300' },
    { name: 'Ouro', min: 3001, color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400' },
    { name: 'Diamante', min: 7001, color: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400' },
    { name: 'Mestre Hacker', min: 15001, color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500' },
    { name: 'CyberPro', min: 100000, color: 'text-[#00FF41]', bg: 'bg-[#00FF41]/10', border: 'border-[#00FF41]' },
    { name: 'BatMax', min: 200000, color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500' },
  ];

  const levelInfo = getLevelInfo(profile.points);

  return (
    <div className="space-y-6">
      <div className="flex flex-col mb-2">
        <h1 className="text-3xl font-bold text-white tracking-tight">Painel de Controle</h1>
        <p className="text-[#00FF41] mt-1 text-lg font-mono break-words">Bem-vindo(a) de volta, <span className="font-bold text-white break-all">{profile.username}</span>_</p>
      </div>
      
      {/* Level Card */}
      <div className={`p-6 rounded-2xl border ${levelInfo.bg} ${levelInfo.border} flex flex-col md:flex-row items-center gap-6 relative overflow-hidden`}>
        <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
          <ShieldCheck className={`w-40 h-40 ${levelInfo.color}`} />
        </div>
        
        <div className="flex-1 z-10 w-full">
          <div className="flex items-center justify-between mb-1">
            <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">Nível Atual</p>
            <button onClick={() => setShowLevelsModal(true)} className="text-gray-400 hover:text-white flex items-center gap-1 text-xs transition-colors bg-[#161618] px-2 py-1 rounded border border-[#222]">
              <Info className="w-3 h-3" /> Ver Níveis
            </button>
          </div>
          <h2 className={`text-4xl md:text-5xl font-black ${levelInfo.color} mb-4`}>{levelInfo.name}</h2>
          
          <div className="w-full bg-[#161618] rounded-full h-3 mb-2 border border-[#222]">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ${levelInfo.name === 'Bronze' ? 'bg-orange-500' : levelInfo.name === 'Prata' ? 'bg-gray-300' : levelInfo.name === 'Ouro' ? 'bg-yellow-400' : levelInfo.name === 'Diamante' ? 'bg-cyan-400' : levelInfo.name === 'Mestre Hacker' ? 'bg-purple-500' : 'bg-[#00FF41]'}`} 
              style={{ width: `${Math.min(100, Math.max(0, levelInfo.progress))}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">{profile.points} pts</span>
            {levelInfo.next !== Infinity && (
              <span className="text-gray-400">Próximo: {levelInfo.next} pts</span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Stats */}
        <div className="bg-[#0f0f11] border border-[#1a1a1c] rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-400" /> Estatísticas
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-[#1a1a1c] pb-2">
              <span className="text-gray-400">Labs Concluídos</span>
              <span className="font-bold text-white">{profile.history.filter(h => h.type === 'Lab').length}</span>
            </div>
            <div className="flex justify-between items-center border-b border-[#1a1a1c] pb-2">
              <span className="text-gray-400">Quizzes Resolvidos</span>
              <span className="font-bold text-white">{profile.history.filter(h => h.type === 'Quiz').length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Conquistas</span>
              <span className="font-bold text-[#00FF41]">{profile.achievements.length}</span>
            </div>
          </div>
        </div>

        {/* History */}
        <div className="bg-[#0f0f11] border border-[#1a1a1c] rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-400" /> Atividade Recente
          </h3>
          {profile.history.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-4">Nenhuma atividade ainda. Vá para o Laboratório!</p>
          ) : (
            <div className="space-y-3">
              {profile.history.slice(0, 4).map(item => (
                <div key={item.id} className="flex justify-between items-center bg-[#161618] p-3 rounded-lg border border-[#222]">
                  <div className="min-w-0 flex-1 pr-2">
                    <p className="text-sm font-medium text-gray-200 truncate">{item.title}</p>
                    <p className="text-xs text-gray-500">{new Date(item.timestamp).toLocaleDateString()}</p>
                  </div>
                  <div className="text-[#00FF41] font-bold text-sm shrink-0">+{item.pointsEarned}</div>
                </div>
              ))}
            </div>
          )}
        </div>
          </div>
      
      {showLevelsModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f0f11] border border-[#1a1a1c] rounded-2xl w-full max-w-md p-6 relative shadow-[0_0_50px_rgba(0,255,65,0.05)] max-h-[90vh] flex flex-col">
            <button onClick={() => setShowLevelsModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-400" /> Tabela de Níveis
            </h2>
            <div className="space-y-3 overflow-y-auto flex-1 pr-2 hide-scrollbar">
              {allLevels.map((lvl, idx) => {
                const isCurrent = levelInfo.name === lvl.name;
                return (
                  <div key={lvl.name} className={`flex items-center justify-between p-3 rounded-xl border transition-all ${isCurrent ? lvl.bg + ' ' + lvl.border : 'bg-[#161618] border-[#222]'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${lvl.bg.replace('/10', '')}`}></div>
                      <span className={`font-bold ${isCurrent ? lvl.color : 'text-gray-300'}`}>{lvl.name}</span>
                    </div>
                    <span className="font-mono text-sm text-gray-400">{lvl.min.toLocaleString('pt-BR')} pts</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 pt-4 border-t border-[#1a1a1c]">
              <p className="text-sm text-gray-400 text-center">
                Sua pontuação: <span className="font-bold text-[#00FF41]">{profile.points}</span>
                {levelInfo.next !== Infinity && (
                  <span> — Faltam <span className="font-bold text-white">{levelInfo.next - profile.points}</span> para o próximo nível.</span>
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
