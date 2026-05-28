import { useQuery } from '@tanstack/react-query';
import { fetchHashtags } from '@/services/tiktokService';
import { useFilterStore } from '@/stores/filterStore';
import { useUserStore } from '@/stores/userStore';
import { FREE_HASHTAG_DAILY_LIMIT } from '@/utils/constants';

export function useHashtags() {
  const dateRange = useFilterStore((s) => s.dateRange);
  const planTier = useUserStore((s) => s.planTier);
  const limit = planTier === 'free' ? FREE_HASHTAG_DAILY_LIMIT : undefined;

  const { data, isLoading, error } = useQuery({
    queryKey: ['hashtags', dateRange, planTier],
    queryFn: () => fetchHashtags({ dateRange, limit }),
  });

  return { hashtags: data ?? [], isLoading, error };
}
