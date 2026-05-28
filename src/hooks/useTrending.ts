import { useQuery } from '@tanstack/react-query';
import { fetchTrending } from '@/services/tiktokService';
import { useFilterStore } from '@/stores/filterStore';
import { useUserStore } from '@/stores/userStore';
import { FREE_TRENDING_LIMIT } from '@/utils/constants';
import { TrendCategory } from '@/types/trending.types';

export function useTrending(overrideCategory?: TrendCategory | null) {
  const selectedCategory = useFilterStore((s) => s.selectedCategory);
  const dateRange = useFilterStore((s) => s.dateRange);
  const planTier = useUserStore((s) => s.planTier);

  const category = overrideCategory !== undefined ? overrideCategory : selectedCategory;
  const limit = planTier === 'free' ? FREE_TRENDING_LIMIT : undefined;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['trending', category, dateRange, planTier],
    queryFn: () => fetchTrending({ category: category ?? undefined, dateRange, limit }),
  });

  return { trends: data ?? [], isLoading, error, refetch };
}
