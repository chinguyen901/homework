---
description: Quy tắc bắt buộc để đảm bảo app thân thiện với mọi thiết bị mobile. Áp dụng cho toàn bộ code UI/layout.
globs: ["src/**/*.tsx", "src/**/*.ts", "*.html"]
alwaysApply: true
---

# Mobile-Friendly Guidelines

App phải hiển thị tốt trên mọi kích thước màn hình mobile, từ iPhone SE (375px) đến iPhone 15 Pro Max (430px) và các Android tương đương.

## Kích thước & Layout

- **Không hardcode width/height** bằng pixel cố định cho layout containers
- Dùng `Dimensions.get('window')`, `%`, `flex`, hoặc `StyleSheet` dynamic values
- Test ít nhất 2 breakpoint: **375px** (nhỏ) và **430px** (lớn)

## Touch Targets

- Mọi element tương tác (button, list item, tab) phải có vùng touch tối thiểu **44×44px** — theo Apple HIG & Material Design
- Dùng `padding` để mở rộng vùng tap thay vì phụ thuộc vào kích thước visual

## Safe Area

- Luôn dùng `SafeAreaView` hoặc `useSafeAreaInsets` cho màn hình chính
- Không để content bị che bởi notch, Dynamic Island, hoặc home indicator
- Bottom nav phải có padding bottom = `safeArea.bottom + 8px`

```tsx
// Đúng
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const insets = useSafeAreaInsets();
<View style={{ paddingBottom: insets.bottom + 8 }}>

// Sai
<View style={{ paddingBottom: 20 }}>
```

## Font Scale

- Dùng `StyleSheet.create()` — không inline style `fontSize`
- Tối thiểu `fontSize: 11` trong mọi component
- Không tắt `allowFontScaling` trừ khi có lý do cụ thể (accessibility)

## Scroll & Overflow

- List dài dùng `FlatList` hoặc `SectionList` — không dùng `ScrollView` cho hàng trăm items
- Horizontal scroll dùng `ScrollView horizontal showsHorizontalScrollIndicator={false}`
- Tránh nested `ScrollView` cùng chiều (gây gesture conflict)

## Responsive Images

- Ảnh sản phẩm/avatar dùng `resizeMode="cover"` với container có kích thước cố định
- Không dùng kích thước ảnh tuyệt đối mà không có `flexShrink`
