---
description: Quy ước đặt tên, cấu trúc file TypeScript và patterns chuẩn. Áp dụng cho mọi file source code.
globs: ["src/**/*.ts", "src/**/*.tsx"]
alwaysApply: true
---

# Code Conventions

## Đặt tên File

| Loại         | Convention    | Ví dụ                      |
|--------------|---------------|----------------------------|
| Component    | PascalCase    | `TrendCard.tsx`            |
| Screen       | PascalCase    | `HomeScreen.tsx`           |
| Hook         | camelCase     | `useTrending.ts`           |
| Service      | camelCase     | `tiktokService.ts`         |
| Store        | camelCase     | `trendingStore.ts`         |
| Type/Interface | camelCase  | `trending.types.ts`        |
| Constant     | camelCase file | `appConstants.ts`         |

## TypeScript

```ts
// Dùng interface cho object shapes
interface TrendItem {
  id: string;
  name: string;
  views: number;
  growth: number;
}

// Dùng type cho union, alias
type TrendCategory = 'fashion' | 'food' | 'beauty' | 'gadget';

// KHÔNG dùng any
const data: unknown = apiResponse; // unknown thay vì any
const item = data as TrendItem;    // explicit cast sau khi validate

// Tất cả API response phải có type
async function fetchTrending(): Promise<TrendItem[]> { ... }
```

## Component Structure

```tsx
// Thứ tự trong file component:
// 1. Imports
// 2. Types/interfaces riêng của component
// 3. Component function
// 4. StyleSheet.create() ở cuối file

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

interface TrendCardProps {
  item: TrendItem;
  index: number;
  onPress: (id: string) => void;
}

export function TrendCard({ item, index, onPress }: TrendCardProps) {
  return (
    <Animated.View entering={FadeInUp.delay(index * 80)} style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
  },
});
```

## Hằng số

```ts
// SCREAMING_SNAKE_CASE cho constants toàn cục
export const CACHE_DURATION_MS = 5 * 60 * 1000;
export const MAX_HASHTAG_RESULTS = 50;
export const TRENDING_REFRESH_INTERVAL = 300_000;
```

## Hooks

```ts
// Hook tên bắt đầu bằng "use", trả về object (không phải array trừ useState)
export function useTrending(category?: TrendCategory) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['trending', category],
    queryFn: () => tiktokService.fetchTrending(category),
    staleTime: CACHE_DURATION_MS,
  });

  return { trends: data ?? [], isLoading, error };
}
```

## Service Layer

```ts
// Services gọi API, không gọi store trực tiếp
// Trả về typed data, throw Error có message rõ ràng
export const tiktokService = {
  async fetchTrending(category?: string): Promise<TrendItem[]> {
    const { data } = await axios.get('/api/trending', { params: { category } });
    return data;
  },
};
```

## Comments

Chỉ comment khi **tại sao** không rõ ràng từ code. Không comment "what":

```ts
// Đúng: lý do không rõ ràng
// RapidAPI giới hạn 100 req/min — cache aggressive để tránh bị block
const CACHE_TTL = 10 * 60 * 1000;

// Sai: code đã tự nói
// Lấy danh sách trending
const trends = await fetchTrending();
```