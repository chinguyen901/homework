import { create } from 'zustand';
import { PlanTier } from '@/types/trending.types';

interface UserState {
  planTier: PlanTier;
  userId: string;
  displayName: string;
  avatarInitial: string;
  setUser: (userId: string, displayName: string) => void;
  setPlan: (tier: PlanTier) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  planTier: 'pro',
  userId: 'local-user-1',
  displayName: 'Nguyen Chi',
  avatarInitial: 'N',
  setUser: (userId, displayName) =>
    set({ userId, displayName, avatarInitial: displayName[0]?.toUpperCase() ?? 'U' }),
  setPlan: (planTier) => set({ planTier }),
}));
