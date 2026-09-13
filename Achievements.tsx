import React, { useState } from 'react';
import { UserProfile, AVAILABLE_ACHIEVEMENTS } from '../types';
import { Lock, Unlock, Trophy } from 'lucide-react';

export default function AchievementsView({ profile }: { profile: UserProfile }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <Trophy className="text-yellow-400 w-8 h-8" /> Conquistas
        </h1>
        <p className="text-gray-400 mt-2">Sua estante de troféus. Complete desafios e evolua para desbloquear mais.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {AVAILABLE_ACHIEVEMENTS.map(ach => {
          const unlocked = profile.achievements.find(a => a.id === ach.id);
          return (
            <div 
              key={ach.id} 
              className={`p-4 rounded-xl border flex items-start gap-4 transition-all ${
                unlocked ? 'bg-[#0f0f11] border-[#00FF41]/30 shadow-[0_0_15px_rgba(0,255,65,0.05)]' : 'bg-[#050505] border-[#1a1a1c] opacity-50 grayscale'
              }`}
            >
              <div className={`p-3 rounded-lg ${unlocked ? 'bg-[#00FF41]/10 text-[#00FF41]' : 'bg-[#161618] text-gray-500'}`}>
                {unlocked ? <Unlock className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
              </div>
              <div>
                <h3 className={`font-bold ${unlocked ? 'text-white' : 'text-gray-400'}`}>{ach.title}</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{ach.description}</p>
                {unlocked && (
                  <p className="text-[10px] text-[#00FF41] mt-2 font-mono">
                    Desbloqueado em {new Date(unlocked.unlockedAt!).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
