---
description: Các thư viện và công nghệ được phê duyệt cho dự án. Tham khảo khi thêm dependency mới hoặc chọn giải pháp kỹ thuật.
globs: ["package.json", "app.json", "src/**/*.ts", "src/**/*.tsx"]
alwaysApply: false
---

# Tech Stack

Không tự ý thêm thư viện ngoài danh sách này trừ khi thảo luận trước. Ưu tiên Expo managed workflow.

## Core

| Vai trò          | Thư viện                        | Ghi chú                        |
|------------------|---------------------------------|--------------------------------|
| Framework        | React Native (Expo SDK 51+)     | Managed workflow               |
| Language         | TypeScript (strict mode)        | Không dùng `any`               |
| Navigation       | React Navigation v6             | Stack + Bottom Tab             |
| State            | Zustand                         | Nhỏ gọn, không boilerplate     |
| Data fetching    | TanStack Query (React Query v5) | Cache 5 phút mặc định          |
| HTTP             | Axios                           | Với interceptor cho auth token |

## UI & Styling

| Vai trò       | Thư viện                    | Ghi chú                    |
|---------------|-----------------------------|----------------------------|
| UI components | React Native Paper          | Base, override theme       |
| Animations    | react-native-reanimated v3  | Bắt buộc cho scroll anim   |
| Gestures      | react-native-gesture-handler| Peer dep của reanimated    |
| Charts        | react-native-gifted-charts  | Bar, line, pie             |
| Icons         | @expo/vector-icons          | Đã bundle với Expo         |
| Safe area     | react-native-safe-area-context | Bắt buộc cho notch/bar  |

## Backend & Auth

| Vai trò      | Thư viện / Service         | Ghi chú                          |
|--------------|----------------------------|----------------------------------|
| Database     | Supabase (PostgreSQL)      | + Realtime subscriptions         |
| Auth         | Firebase Authentication    | Google Sign-In + Email/Password  |
| TikTok data  | RapidAPI (TikTok endpoints)| Fallback: TikTok Research API    |
| Edge logic   | Supabase Edge Functions    | Xử lý & cache data TikTok        |

## Dev Tools

```bash
npx expo start           # Dev server (scan QR với Expo Go)
npx expo start --ios     # iOS Simulator
npx expo start --android # Android Emulator
npx tsc --noEmit         # Type check (không compile)
npx expo lint            # ESLint
```

## Environment Variables

Tất cả env vars phải có prefix `EXPO_PUBLIC_` để dùng trong client code:

```env
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
EXPO_PUBLIC_RAPIDAPI_KEY=
EXPO_PUBLIC_FIREBASE_API_KEY=
```

Lưu trong `.env.local` — **không commit lên git**.

## Không dùng

- Redux / MobX → đã có Zustand
- Styled-components / NativeWind → dùng `StyleSheet.create()`
- AsyncStorage trực tiếp → wrap trong service layer
- `fetch()` trực tiếp → dùng Axios
