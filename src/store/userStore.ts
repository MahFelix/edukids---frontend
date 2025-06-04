// src/store/userStore.ts
import { create } from 'zustand';

interface UserState {
  username: string;
  points: number;
  level: number;
  achievements: number;
  progress: number;
  avatarUrl: string | null;
  setUsername: (username: string) => void;
  addPoints: (amount: number) => void;
  setProgress: (progress: number) => void;
  setAvatarUrl: (url: string) => void;
}

const useUserStore = create<UserState>((set) => ({
  username: 'Maria',
  points: 1250,
  level: 5,
  achievements: 5,
  progress: 68,
  avatarUrl: null,
  
  setUsername: (username) => set({ username }),
  
  addPoints: (amount) => set((state) => {
    const newPoints = state.points + amount;
    // Lógica simplificada para nível
    const newLevel = Math.floor(newPoints / 300) + 1;
    return { 
      points: newPoints,
      level: newLevel > state.level ? newLevel : state.level
    };
  }),
  
  setProgress: (progress) => set({ progress }),
  
  setAvatarUrl: (url) => set({ avatarUrl: url }),
}));

export default useUserStore;