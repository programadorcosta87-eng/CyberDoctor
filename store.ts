import { useState, useEffect } from 'react';
import { UserProfile, ActivityHistory, Achievement, AVAILABLE_ACHIEVEMENTS, WorkspaceFile } from './types';

const STORAGE_KEY = 'cyberdoctor_profile';

const defaultProfile: UserProfile = {
  username: '',
  points: 0,
  joinedAt: 0,
  achievements: [],
  history: [],
  workspace: [],
};

export function useGameStore() {
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (!parsed.workspace) parsed.workspace = [];
        return parsed;
      }
    } catch (e) {
      console.error('Error reading localStorage', e);
    }
    return defaultProfile;
  });
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  const setUsername = (username: string) => {
    setProfile(prev => ({ ...prev, username, joinedAt: Date.now() }));
  };

  const addPoints = (points: number, activity: Omit<ActivityHistory, 'id' | 'timestamp' | 'pointsEarned'>) => {
    setProfile(prev => {
      const newPoints = prev.points + points;
      const newHistory = [
        { ...activity, id: Math.random().toString(36).substring(7), timestamp: Date.now(), pointsEarned: points },
        ...prev.history,
      ].slice(0, 50);
      
      let newAchievements = [...prev.achievements];
      
      const checkAch = (id: string) => {
        if (!newAchievements.find(a => a.id === id)) {
          const ach = AVAILABLE_ACHIEVEMENTS.find(a => a.id === id);
          if (ach) newAchievements.push({ ...ach, unlockedAt: Date.now() });
        }
      };

      if (activity.type === 'Lab') {
        checkAch('first_blood');
        const labCount = newHistory.filter(h => h.type === 'Lab').length;
        if (labCount >= 10) checkAch('red_team');
      }

      if (newPoints > 1000) checkAch('silver_tier');
      
      if (activity.title?.includes('100%')) checkAch('quiz_master');

      return {
        ...prev,
        points: newPoints,
        history: newHistory,
        achievements: newAchievements,
      };
    });
  };

  const extractFile = (file: Omit<WorkspaceFile, 'id' | 'extractedAt'>) => {
    setProfile(prev => {
      const newFile: WorkspaceFile = {
        ...file,
        id: Math.random().toString(36).substring(7),
        extractedAt: Date.now()
      };
      
      let newAchievements = [...prev.achievements];
      if (!newAchievements.find(a => a.id === 'data_broker')) {
        const ach = AVAILABLE_ACHIEVEMENTS.find(a => a.id === 'data_broker');
        if (ach) newAchievements.push({ ...ach, unlockedAt: Date.now() });
      }

      return {
        ...prev,
        workspace: [newFile, ...prev.workspace],
        achievements: newAchievements
      };
    });
  };

  const deleteFile = (id: string) => {
    setProfile(prev => ({
      ...prev,
      workspace: prev.workspace.filter(f => f.id !== id)
    }));
  };

  const resetProgress = () => {
    if (confirm('Tem certeza que deseja apagar todo o seu progresso? Esta ação não pode ser desfeita.')) {
      setProfile({ ...defaultProfile, username: profile.username, joinedAt: profile.joinedAt });
    }
  };

  const logout = () => {
    if (confirm('Deseja sair e apagar seu perfil deste navegador?')) {
      setProfile(defaultProfile);
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  return { profile, setUsername, addPoints, extractFile, deleteFile, resetProgress, logout, isOffline };
}
