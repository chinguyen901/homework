# TikTok Auto Center

Ứng dụng mobile giúp chủ shop online, affiliate marketer và content creator nắm bắt xu hướng TikTok theo thời gian thực — phân tích hashtag hot, sản phẩm trending, video viral.

**Target users:** Chủ shop online, affiliate marketer, content creator bán hàng TikTok Shop.

**Design reference:** `Demo_App_1.png` — violet/purple UI, card-based, phone mockup style.

---

## Trạng thái dự án hiện tại

> **Phase: State & Service Layer** — 5 screens dùng React Query hooks + Zustand stores. Mock data trong service layer. Chưa kết nối backend thật.

### Đã hoàn thành

| File / Thư mục | Mô tả |
|----------------|-------|
| `index.html` | HTML prototype gốc — giữ làm blueprint tham chiếu UI |
| `Demo_App_1.png` | Ảnh design gốc dùng làm chuẩn so sánh |
| `App.tsx` | Entry point Expo — re-export từ `src/app/index.tsx` |
| `index.ts` | Expo register root component |
| `app.json` | Expo config: name "TikTok Auto Center", slug "tiktok-auto-center" |
| `babel.config.js` | Babel: path aliases `@/*` → `src/*`, react-native-reanimated plugin |
| `tsconfig.json` | TypeScript strict + path alias `@/*` → `src/*` |
| `package.json` | Expo SDK 56 + toàn bộ stack đã install |
| `src/utils/theme.ts` | Design tokens: Colors, FontSize, FontWeight, Spacing, Radius, Shadow, Gradient |
| `src/utils/constants.ts` | App constants: cache duration, rate limits |
| `src/utils/formatters.ts` | Format số, tiền tệ VNĐ, % tăng trưởng |
| `src/types/trending.types.ts` | TypeScript types: TrendItem, HashtagItem, AnalyticsSummary, PlanTier |
| `src/components/ui/` | Badge, Card, StatPill, Skeleton, Button + barrel export `index.ts` |
| `src/components/layout/` | AppHeader (gradient), SafeWrapper (safe area) + barrel export |
| `src/app/index.tsx` | Root providers: QueryClient + GestureHandlerRootView + SafeAreaProvider |
| `src/app/navigation/TabNavigator.tsx` | 5-tab bottom navigation: Home/Trending/Hashtag/Analytics/Profile |
| `src/app/navigation/RootNavigator.tsx` | Stack navigator bọc TabNavigator |
| `src/screens/Home/HomeScreen.tsx` | Gradient header, stats hero card, quick actions, trend chips, product list |
| `src/screens/Trending/TrendingScreen.tsx` | Search, filter chips, 5 product rank cards, LIVE badge |
| `src/screens/Hashtags/HashtagScreen.tsx` | Search, time tabs, 7 hashtag rows với gradient progress bars |
| `src/screens/Analytics/AnalyticsScreen.tsx` | Summary grid 2×2, bar chart animated (2-series), niche progress bars |
| `src/screens/Profile/ProfileScreen.tsx` | Gradient header, avatar, stats 3-col, 3 menu sections |
| `.claude/rules/` | 8 rule files theo Claude Code spec |
| `.claude/agents/` | 2 sub-agents: `researcher` và `review` |
| `.claude/settings.json` | Hook âm thanh khi Claude kết thúc task |

### Việc cần làm tiếp theo

- [x] **Phase 5 — Zustand stores:** `filterStore.ts` (category, dateRange), `userStore.ts` (plan tier) ✅
- [x] **Phase 5 — Service skeleton:** `supabaseClient.ts` (stub), `tiktokService.ts` (mock data) ✅
- [x] **Phase 5 — React Query hooks:** `useTrending.ts`, `useHashtags.ts`, `useAnalytics.ts` ✅
- [x] **Phase 5 — Screens update:** Tất cả 5 screens dùng hooks, skeleton loading ✅
- [ ] **Phase 5 — Backend thật:** Tạo `.env.local` với Supabase keys → deploy Edge Functions → thay mock bằng real API
- [ ] **Phase 5 — Firebase Auth:** Google Sign-In + Email/Password qua `authService.ts`
- [ ] **Phase 6 — Error states:** Error card + retry button, empty state cho mỗi screen
- [ ] **Phase 6 — Monetization gates:** Modal upsell Pro khi Free vượt giới hạn
- [ ] Cập nhật `CLAUDE.md` trạng thái sau mỗi session làm việc

---

## Cách chạy app

```bash
# Dev server (quét QR bằng Expo Go trên điện thoại)
npx expo start

# Android emulator
npx expo start --android

# iOS simulator (cần macOS)
npx expo start --ios

# Type check
npx tsc --noEmit
```

---

## Claude Configuration

### Rules (`.claude/rules/`)

| File | Nội dung | `alwaysApply` |
|------|----------|---------------|
| [design-system.md](.claude/rules/design-system.md) | Color tokens, typography, spacing, component patterns | `false` (glob: `*.tsx, *.html`) |
| [mobile-guidelines.md](.claude/rules/mobile-guidelines.md) | Mobile-friendly, safe area, touch targets, font scale | `true` |
| [scroll-animations.md](.claude/rules/scroll-animations.md) | Entrance animations, stagger, thư viện, giới hạn 600ms | `false` (glob: screens, components) |
| [screenshot-verification.md](.claude/rules/screenshot-verification.md) | Quy trình chụp & so sánh với Demo_App_1.png | `true` |
| [tech-stack.md](.claude/rules/tech-stack.md) | Thư viện được phê duyệt, env vars, dev commands | `false` |
| [code-conventions.md](.claude/rules/code-conventions.md) | Naming, TypeScript, component structure, comments | `true` |
| [project-structure.md](.claude/rules/project-structure.md) | Cây thư mục, nơi đặt file, barrel exports | `false` |
| [data-flow.md](.claude/rules/data-flow.md) | API architecture, React Query, Zustand, error handling | `false` |

### Agents (`.claude/agents/`)

| Agent | Model | Dùng khi |
|-------|-------|----------|
| `researcher` | claude-sonnet-4-6 | Tra cứu thư viện, so sánh công nghệ, tóm tắt ≤500 từ + Recommendation |
| `review` | claude-sonnet-4-6 | Đánh giá code/content, điểm mạnh/yếu + Recommendation |

### Hooks (`.claude/settings.json`)

- **Stop hook:** Phát âm thanh `Windows Notify System Generic.wav` mỗi khi Claude kết thúc turn

---

## Core Features

| Màn hình | Chức năng chính | Trạng thái |
|----------|-----------------|------------|
| **Home** | Stats card (11K+ trending), quick actions, trend chips ngang, top sản phẩm | ✅ RN screen (mock data) |
| **Trending** | Sản phẩm rank #1–#5, filter chips, LIVE badge, 3 stats/card | ✅ RN screen (mock data) |
| **Hashtag** | Top 7 hashtag viral, bar progress, % badge, "Mới bùng" label | ✅ RN screen (mock data) |
| **Analytics** | Summary grid 2×2, bar chart 2-series animated, Top Niche progress bars | ✅ RN screen (mock data) |
| **Profile** | Avatar, stats 3-col, menu sections, Pro plan badge | ✅ RN screen (mock data) |

## Monetization

- **Free:** 5 hashtag searches/ngày, top 10 trending
- **Pro (99k/tháng):** Unlimited, alerts, export CSV
- **Business (299k/tháng):** API access, multi-account, báo cáo nâng cao

---

## Tech Stack hiện tại (đã install)

| Vai trò | Package | Version |
|---------|---------|---------|
| Framework | expo | ~56.0.5 |
| Language | typescript | ~6.0.3 |
| Navigation | @react-navigation/native + bottom-tabs + stack | latest |
| Animations | react-native-reanimated | ^4.4.0 |
| Gestures | react-native-gesture-handler | latest |
| Data fetching | @tanstack/react-query | latest |
| State | zustand | latest |
| HTTP | axios | latest |
| UI | react-native-paper | latest |
| Charts | react-native-gifted-charts | latest |
| Icons | @expo/vector-icons | latest |
| Gradient | expo-linear-gradient | latest |
| Safe area | react-native-safe-area-context | latest |
| Backend | @supabase/supabase-js | latest |
| Path resolver | babel-plugin-module-resolver | latest |

---

## Cấu trúc thư mục hiện tại

```
src/
├── app/
│   ├── index.tsx              ← Entry, tất cả providers ở đây
│   └── navigation/
│       ├── RootNavigator.tsx  ← Stack bọc TabNavigator
│       └── TabNavigator.tsx   ← 5 tabs bottom nav
├── screens/
│   ├── Home/HomeScreen.tsx
│   ├── Trending/TrendingScreen.tsx
│   ├── Hashtags/HashtagScreen.tsx
│   ├── Analytics/AnalyticsScreen.tsx
│   └── Profile/ProfileScreen.tsx
├── components/
│   ├── ui/          ← Badge, Card, StatPill, Skeleton, Button, index.ts
│   └── layout/      ← AppHeader, SafeWrapper, index.ts
├── types/
│   └── trending.types.ts
└── utils/
    ├── theme.ts     ← Colors, FontSize, FontWeight, Spacing, Radius, Shadow
    ├── constants.ts
    └── formatters.ts
```

**Đã tạo ở Phase 5 (session 2):**
```
src/
├── hooks/           ← useTrending.ts, useHashtags.ts, useAnalytics.ts ✅
├── services/        ← supabaseClient.ts (stub), tiktokService.ts (mock) ✅
│                       authService.ts (chưa có)
└── stores/          ← filterStore.ts, userStore.ts ✅
```

---

## Ghi chú kỹ thuật

- Tên thư mục "App Tiktok" có khoảng trắng → `create-expo-app .` bị lỗi. Đã workaround: tạo project ở thư mục temp `tiktok-auto-center` rồi copy sang.
- `baseUrl` deprecated trong TypeScript 6.0 → đã thêm `"ignoreDeprecations": "6.0"` vào `tsconfig.json`.
- `react-native-reanimated@4.x` dùng `react-native-worklets@0.9.x` nhưng `expo-modules-core@56` expect `0.8.x` → chỉ là peer dep warning, không ảnh hưởng runtime.
- Path alias `@/*` cần cả 2: `tsconfig.json` (cho TypeScript) + `babel.config.js` (cho bundler runtime).
- Tất cả screens dùng `useSafeAreaInsets()` từ `react-native-safe-area-context` — không hardcode padding.
- Màn hình sử dụng mock data dạng constant arrays — khi kết nối API chỉ cần thay bằng React Query hooks.
- HTML prototype `index.html` vẫn giữ nguyên tại root — mở trực tiếp trên browser để tham khảo UI.
