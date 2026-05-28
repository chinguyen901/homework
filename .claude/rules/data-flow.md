---
description: Kiến trúc data flow từ TikTok API đến UI. Tham khảo khi implement tính năng fetch dữ liệu hoặc caching.
globs: ["src/services/**/*.ts", "src/hooks/**/*.ts", "src/stores/**/*.ts"]
alwaysApply: false
---

# Data Flow & API Architecture

## Luồng dữ liệu

```
TikTok / RapidAPI
      ↓
Supabase Edge Functions  ← xử lý, normalize, cache server-side
      ↓
React Query              ← client cache 5 phút (staleTime)
      ↓
Zustand Store            ← filter state, selected items, UI state
      ↓
Screen / Component
```

## React Query Configuration

```ts
// src/app/index.tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,      // 5 phút
      gcTime: 10 * 60 * 1000,         // 10 phút garbage collect
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});
```

## Query Keys Convention

```ts
// Dùng array keys, từ tổng quát → cụ thể
['trending']                          // tất cả trending
['trending', { category: 'fashion' }] // trending theo category
['hashtag', '#vaymaxiboho']           // hashtag cụ thể
['analytics', 'weekly']              // analytics tuần
['user', userId]                      // user profile
```

## Zustand Store Pattern

```ts
// Chỉ lưu UI state & user selections trong Zustand
// KHÔNG lưu server data (đó là việc của React Query)

interface FilterStore {
  selectedCategory: TrendCategory | null;
  dateRange: '1d' | '7d' | '30d';
  savedHashtags: string[];

  setCategory: (cat: TrendCategory | null) => void;
  setDateRange: (range: '1d' | '7d' | '30d') => void;
  toggleSaveHashtag: (tag: string) => void;
}
```

## Supabase Edge Functions

Dùng cho các tác vụ cần server-side:
- Gọi RapidAPI (ẩn API key)
- Aggregate và normalize TikTok data
- Cache kết quả trong Supabase Database (TTL 1 giờ)
- Webhook xử lý realtime alerts

```ts
// src/services/tiktokService.ts
export const tiktokService = {
  async fetchTrending(params: TrendingParams): Promise<TrendItem[]> {
    const { data, error } = await supabase.functions.invoke('get-trending', {
      body: params,
    });
    if (error) throw new Error(`Trending fetch failed: ${error.message}`);
    return data as TrendItem[];
  },
};
```

## Error Handling

```ts
// Tất cả lỗi API phải được typed và có message tiếng Việt cho user
class ApiError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode?: number
  ) {
    super(message);
  }
}

// Trong hook
const { data, error } = useTrending();
if (error) return <ErrorState message="Không thể tải xu hướng. Thử lại sau." />;
```

## Offline / Loading States

Mọi screen phải xử lý 3 trạng thái:
1. **Loading** → Skeleton UI (không dùng spinner đơn độc)
2. **Error** → Error card với nút "Thử lại"
3. **Empty** → Empty state với hướng dẫn hành động