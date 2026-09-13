import React, { useState } from 'react';
import { BatLogo } from '../components/BatLogo';
import { Terminal, Shield, LogIn } from 'lucide-react';

interface Props {
  onJoin: (username: string) => void;
}

export default function Onboarding({ onJoin }: Props) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().length >= 3) {
      onJoin(username.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] p-4 relative overflow-hidden">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#00FF41 1px, transparent 1px), linear-gradient(90deg, #00FF41 1px, transparent 1px)', backgroundSize: '40px 40px', transform: 'perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px)' }}></div>
      
      <div className="w-full max-w-md bg-[#0f0f11] border border-[#1a1a1c] p-8 rounded-2xl shadow-[0_0_50px_rgba(0,255,65,0.05)] relative z-10">
        <div className="flex flex-col items-center mb-8">
          <BatLogo className="w-20 h-20 text-[#111] drop-shadow-[0_0_15px_rgba(0,255,65,0.3)] mb-4" />
          <h1 className="text-3xl font-bold text-white tracking-tight">CyberDoctor</h1>
          <p className="text-gray-400 mt-2 text-center text-sm">Plataforma avançada de treinamento em cibersegurança.</p>
        </div>

        

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Codinome (Nickname)</label>
            <div className="relative">
              <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#161618] border border-[#222] rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#00FF41] focus:ring-1 focus:ring-[#00FF41] transition-all"
                placeholder="Ex: Neo, Trinity, h4x0r"
                maxLength={20}
                required
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={username.trim().length < 3}
            className="w-full bg-[#00FF41] hover:bg-[#00cc33] text-black font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LogIn className="w-5 h-5" />
            Iniciar Treinamento
          </button>
        </form>
      </div>
    </div>
  );
}
