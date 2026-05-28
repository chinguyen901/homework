import { create } from 'zustand';
import { TrendCategory } from '@/types/trending.types';

interface FilterState {
  selectedCategory: TrendCategory | null;
  dateRange: '1d' | '7d' | '30d';
  savedHashtags: string[];
  setCategory: (cat: TrendCategory | null) => void;
  setDateRange: (range: '1d' | '7d' | '30d') => void;
  toggleSaveHashtag: (id: string) => void;
}

export const useFilterStore = create<FilterState>()((set) => ({
  selectedCategory: null,
  dateRange: '7d',
  savedHashtags: [],
  setCategory: (selectedCategory) => set({ selectedCategory }),
  setDateRange: (dateRange) => set({ dateRange }),
  toggleSaveHashtag: (id) =>
    set((s) => ({
      savedHashtags: s.savedHashtags.includes(id)
        ? s.savedHashtags.filter((h) => h !== id)
        : [...s.savedHashtags, id],
    })),
}));
