---
description: Cấu trúc thư mục chuẩn và nơi đặt các loại file. Tham khảo khi tạo file mới hoặc refactor.
globs: ["src/**/*"]
alwaysApply: false
---

# Project Structure

## Cây thư mục

```
src/
├── app/
│   ├── index.tsx              # Entry point, khởi tạo providers
│   └── navigation/
│       ├── RootNavigator.tsx  # Stack navigator gốc
│       └── TabNavigator.tsx   # Bottom tab navigator
│
├── screens/
│   ├── Home/
│   │   ├── HomeScreen.tsx     # Main screen component
│   │   ├── components/        # Components chỉ dùng trong Home
│   │   └── hooks/             # Hooks chỉ dùng trong Home
│   ├── Trending/
│   ├── Hashtags/
│   ├── Analytics/
│   ├── Saved/
│   └── Profile/
│
├── components/
│   ├── ui/                    # Primitive: Button, Card, Badge, Input, Skeleton
│   ├── charts/                # BarChart, LineChart, TrendMiniChart
│   └── layout/                # AppHeader, BottomTabBar, SafeWrapper
│
├── hooks/                     # Shared hooks
│   ├── useTrending.ts
│   ├── useHashtags.ts
│   └── useDebounce.ts
│
├── services/                  # API calls
│   ├── tiktokService.ts       # TikTok / RapidAPI calls
│   ├── authService.ts         # Firebase auth
│   └── supabaseClient.ts      # Supabase instance
│
├── stores/                    # Zustand stores
│   ├── trendingStore.ts
│   ├── userStore.ts
│   └── filterStore.ts
│
├── types/                     # TypeScript interfaces
│   ├── trending.types.ts
│   ├── hashtag.types.ts
│   └── user.types.ts
│
└── utils/                     # Pure helpers
    ├── formatters.ts          # số, tiền tệ, ngày
    ├── constants.ts           # app-wide constants
    └── analytics.ts           # event tracking helpers
```

## Quy tắc đặt file

- **Màn hình** → `src/screens/{ScreenName}/`
- **Component dùng chung** → `src/components/`
- **Component chỉ dùng 1 màn** → `src/screens/{Name}/components/`
- **Hook dùng chung** → `src/hooks/`
- **Hook chỉ dùng 1 màn** → `src/screens/{Name}/hooks/`
- **Không để logic trong file screen** — tách ra hook riêng

## Barrel Exports

Mỗi thư mục `components/ui/` nên có `index.ts`:
```ts
export { Button } from './Button';
export { Card } from './Card';
export { Badge } from './Badge';
```

Điều này cho phép: `import { Button, Card } from '@/components/ui'`

## Path Aliases

Cấu hình trong `tsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```
