import React, { useState } from 'react';
import { useGameStore } from './store';
import Onboarding from './views/Onboarding';
import Layout from './components/Layout';
import Dashboard from './views/Dashboard';
import Workspace from './views/Workspace';
import Lab from './views/Lab';
import Library from './views/Library';
import AchievementsView from './views/Achievements';
import Quizzes from './views/Quizzes';

export default function App() {
  const { profile, setUsername, addPoints, extractFile, deleteFile, resetProgress, logout, isOffline } = useGameStore();
  const [currentView, setCurrentView] = useState('dashboard');
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });

  const handleSuccess = (points: number, title: string) => {
    addPoints(points, { type: title?.includes('Quiz') ? 'Quiz' : 'Lab', title });
    setToast({ message: `+${points} pts: ${title}`, visible: true });
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);
  };

  if (!profile.username) {
    return <Onboarding onJoin={setUsername} />;
  }

  const views = [
    { id: 'dashboard', content: <Dashboard profile={profile} /> },
    { id: 'lab', content: <Lab onSuccess={handleSuccess} onExtractFile={extractFile} /> },
    { id: 'quizzes', content: <Quizzes onSuccess={handleSuccess} /> },
    { id: 'library', content: <Library /> },
    { id: 'achievements', content: <AchievementsView profile={profile} /> },
    { id: 'workspace', content: <Workspace profile={profile} onDeleteFile={deleteFile} /> },
  ];

  return (
    <>
      <Layout 
         profile={profile} 
         isOffline={isOffline} 
         currentView={currentView}
        onChangeView={setCurrentView}
        onLogout={logout}
        onReset={resetProgress}
      >
        {views.map(view => (
          <div 
            key={view.id}
            style={{ display: currentView === view.id ? 'block' : 'none' }}
            className="absolute inset-0 overflow-y-auto overflow-x-hidden p-4 md:p-8"
          >
            <div className="max-w-5xl mx-auto pb-20 md:pb-0 min-h-full flex flex-col">
              {view.content}
            </div>
          </div>
        ))}
      </Layout>

      {/* Toast Notification */}
      {toast.visible && (
        <div className="fixed top-4 right-4 z-50 bg-[#00FF41] text-black px-4 py-3 rounded-lg shadow-lg font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-300">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          {toast.message}
        </div>
      )}
    </>
  );
}
