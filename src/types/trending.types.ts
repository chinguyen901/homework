export type TrendCategory = 'fashion' | 'beauty' | 'food' | 'gadget' | 'home' | 'all';

export interface TrendItem {
  id: string;
  name: string;
  category: TrendCategory;
  price?: number;
  videoCount: number;
  views: number;
  growth: number;
  rank: number;
  icon?: string;
  isLive?: boolean;
}

export interface HashtagItem {
  id: string;
  tag: string;
  views: number;
  growth: number;
  rank: number;
  isNew?: boolean;
  progressPct: number;
}

export interface AnalyticsSummary {
  totalViews: number;
  trendingHashtags: number;
  hotProducts: number;
  viralVideos: number;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  secondaryValue?: number;
}

export type PlanTier = 'free' | 'pro' | 'business';
