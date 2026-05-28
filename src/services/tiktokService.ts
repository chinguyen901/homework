import { supabase } from './supabaseClient';
import {
  TrendItem,
  HashtagItem,
  AnalyticsSummary,
  ChartDataPoint,
  NicheItem,
  FetchTrendingParams,
  FetchHashtagsParams,
} from '@/types/trending.types';

export async function fetchTrending(params: FetchTrendingParams = {}): Promise<TrendItem[]> {
  const { data, error } = await supabase.functions.invoke<TrendItem[]>('get-trending', {
    body: params,
  });
  if (error) throw new Error(`Trending: ${error.message}`);
  return data ?? [];
}

export async function fetchHashtags(params: FetchHashtagsParams & { query?: string } = {}): Promise<HashtagItem[]> {
  const { data, error } = await supabase.functions.invoke<HashtagItem[]>('get-hashtags', {
    body: params,
  });
  if (error) throw new Error(`Hashtags: ${error.message}`);
  return data ?? [];
}

export async function fetchAnalytics(): Promise<{
  summary: AnalyticsSummary;
  chartData: ChartDataPoint[];
  niches: NicheItem[];
}> {
  type AnalyticsResponse = {
    summary: AnalyticsSummary;
    chartData: ChartDataPoint[];
    niches: NicheItem[];
  };
  const { data, error } = await supabase.functions.invoke<AnalyticsResponse>('get-analytics');
  if (error) throw new Error(`Analytics: ${error.message}`);
  return data!;
}
