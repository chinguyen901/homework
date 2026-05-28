---
description: Quy tắc animation bắt buộc khi scroll. Áp dụng khi tạo mới screen hoặc thêm section có danh sách, card, chart.
globs: ["src/screens/**/*.tsx", "src/components/**/*.tsx"]
alwaysApply: false
---

# Scroll Animations

Mọi section xuất hiện trong viewport khi scroll đều phải có entrance animation. Đây là quy tắc **bắt buộc**, không phải tùy chọn.

## Thư viện chuẩn

```bash
npx expo install react-native-reanimated react-native-gesture-handler
```

Dùng `Animated.View` từ `react-native-reanimated` với `FadeInUp`, `FadeIn`, `FadeInLeft`.

## Pattern Mặc định theo Loại Content

### Card / List Item (FadeInUp + stagger)
```tsx
import Animated, { FadeInUp } from 'react-native-reanimated';

// Trong FlatList renderItem hoặc map:
<Animated.View entering={FadeInUp.delay(index * 80).duration(400)}>
  <TrendCard item={item} />
</Animated.View>
```

### Stats số (FadeIn + CountUp effect)
```tsx
import Animated, { FadeIn } from 'react-native-reanimated';

<Animated.View entering={FadeIn.duration(500)}>
  <CountUpText value={11356} suffix="" />
</Animated.View>
```

### Chart (FadeInLeft, bar grow từ 0)
```tsx
import Animated, { FadeInLeft } from 'react-native-reanimated';

<Animated.View entering={FadeInLeft.duration(500)}>
  <BarChart data={data} />
</Animated.View>
// Bar height animate từ 0 → target trong useEffect khi mount
```

### Hero Banner / Header Card (FadeIn + scale)
```tsx
entering={FadeIn.duration(400).springify()}
// Kết hợp với: transform: [{ scale: sharedValue từ 0.96 → 1 }]
```

## Giới hạn

- **Tối đa 600ms** cho bất kỳ animation nào — tránh cảm giác chậm
- Stagger delay giữa các items: **60–100ms** (không vượt quá 80 × số items)
- Không animate lại khi user scroll ngược lên — dùng `useRef` để track "đã animate"

## Trigger bằng Intersection Observer

```tsx
import { useAnimatedRef, useScrollViewOffset } from 'react-native-reanimated';

// Dùng onLayout + scroll offset để detect khi phần tử vào viewport
// Hoặc dùng thư viện: @shopify/flash-list với ViewabilityConfig
```

## Web (HTML demo)

Khi build HTML demo, dùng CSS `@keyframes` với `animation-fill-mode: both`:
```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-in { animation: fadeInUp 0.45s cubic-bezier(0.22, 1, 0.36, 1) both; }
```

> ⚠️ Lưu ý: Đừng dùng `display: flex; flex-direction: column` trên scroll container có fixed height — flex-shrink sẽ collapse children. Dùng `display: block` thay thế.
