import { useQuery } from '@tanstack/react-query';
import { fetchAnalytics } from '@/services/tiktokService';

export function useAnalytics() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['analytics'],
    queryFn: fetchAnalytics,
  });

  return {
    summary: data?.summary ?? null,
    chartData: data?.chartData ?? [],
    niches: data?.niches ?? [],
    isLoading,
    error,
  };
}
