import React from 'react';
import { ShieldAlert, LogOut, Trash2, Home, Terminal, BookOpen, Trophy, ShieldHalf, Activity } from 'lucide-react';
import { BatLogo } from './BatLogo';
import { UserProfile } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  profile: UserProfile;
  isOffline: boolean;
  currentView: string;
  onChangeView: (view: string) => void;
  onLogout: () => void;
  onReset: () => void;
}

export default function Layout({ children, profile, isOffline, currentView, onChangeView, onLogout, onReset }: LayoutProps) {
  const [isFullscreenLogo, setIsFullscreenLogo] = React.useState(false);
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'lab', label: 'Laboratório', icon: Terminal },
    { id: 'quizzes', label: 'Quizzes', icon: ShieldHalf },
    { id: 'library', label: 'Biblioteca', icon: BookOpen },
    { id: 'achievements', label: 'Conquistas', icon: Trophy },
    { id: 'workspace', label: 'Meu Trabalho', icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col md:flex-row text-gray-300">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-[#0a0a0b] border-r border-[#1a1a1c] h-screen sticky top-0">
        <div className="p-6 flex items-center gap-3">
          <BatLogo className="w-8 h-8 text-[#111]" />
          <span className="text-xl font-bold text-white tracking-tight">CyberDoctor</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                currentView === item.id 
                  ? 'bg-[#00FF41]/10 text-[#00FF41] border border-[#00FF41]/20' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-[#1a1a1c] space-y-2">
          <div className="flex items-center justify-between px-2 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7D52FF] to-[#00FF41] flex items-center justify-center font-bold text-white">
                {profile.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-bold text-white truncate max-w-[100px]">{profile.username}</p>
                <p className="text-xs text-[#00FF41]">{profile.points} pts</p>
              </div>
            </div>
          </div>
          <button onClick={onReset} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-400/10 rounded-lg transition-all">
            <Trash2 className="w-4 h-4" /> Resetar
          </button>
          <button onClick={onLogout} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:bg-[#161618] hover:text-white rounded-lg transition-all">
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-[#0a0a0b] border-b border-[#1a1a1c]">
          <div className="flex items-center gap-2 min-w-0 cursor-pointer" onClick={() => setIsFullscreenLogo(true)}>
            <BatLogo className="w-6 h-6 text-[#111] shrink-0" />
            <span className="font-bold text-white truncate text-sm sm:text-base">CyberDoctor</span>
          </div>
          <div className="text-xs font-bold text-[#00FF41] bg-[#00FF41]/10 px-2 py-1 rounded whitespace-nowrap ml-2 shrink-0">
            {profile.points} pts
          </div>
        </header>

        {isOffline && (
          <div className="bg-yellow-500/10 border-b border-yellow-500/20 px-4 py-2 flex items-center justify-center gap-2 text-yellow-500 text-sm">
            <ShieldAlert className="w-4 h-4" />
            <span>Modo Offline: Progresso será salvo localmente.</span>
          </div>
        )}

        <div className="flex-1 relative overflow-hidden">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0a0a0b] border-t border-[#1a1a1c] flex justify-between px-2 py-2 overflow-x-auto overflow-y-hidden z-50 snap-x hide-scrollbar">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => onChangeView(item.id)}
            className={`flex flex-col items-center p-2 rounded-lg transition-all min-w-[4rem] snap-center shrink-0 ${
              currentView === item.id ? 'text-[#00FF41]' : 'text-gray-500'
            }`}
          >
            <item.icon className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
          {isFullscreenLogo && (
        <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center">
          <div className="animate-pulse">
             <BatLogo className="w-64 h-64 text-[#111] drop-shadow-[0_0_50px_rgba(0,255,65,0.8)]" />
          </div>
          <button 
            onClick={() => setIsFullscreenLogo(false)}
            className="mt-12 text-[#00FF41] border border-[#00FF41] hover:bg-[#00FF41]/20 px-8 py-3 rounded-xl font-bold transition-all"
          >
            Voltar
          </button>
        </div>
      )}
    </div>
  );
}
