---
description: Quy trình bắt buộc chụp screenshot và so sánh với design gốc sau mỗi thay đổi UI đáng kể.
globs: ["src/screens/**/*.tsx", "src/components/**/*.tsx", "*.html"]
alwaysApply: true
---

# Screenshot Verification

Sau mỗi thay đổi UI đáng kể, **bắt buộc** chụp screenshot và so sánh với `Demo_App_1.png`. Không chuyển sang task tiếp theo nếu có sai lệch rõ ràng.

## Định nghĩa "Thay đổi đáng kể"

- Tạo mới một màn hình (screen)
- Thêm hoặc sửa component lớn (card, list, chart, modal)
- Thay đổi layout tổng thể (header, navigation, spacing)
- Cập nhật color hoặc typography ảnh hưởng > 1 component

Không cần screenshot cho: fix bug logic, thay đổi text copy, sửa TypeScript types.

## Quy trình

1. **Chạy app** trên Expo Go hoặc simulator
2. **Chụp màn hình** màn hình vừa thay đổi
3. **So sánh** với `Demo_App_1.png` theo checklist:
   - [ ] Màu sắc đúng (primary `#7C3AED`, không bị lệch sang blue hay pink)
   - [ ] Spacing và padding nhất quán (horizontal: 20px)
   - [ ] Border radius đúng (card: 16px, list item: 12px)
   - [ ] Typography đúng weight và size
   - [ ] Shadow card hiển thị nhẹ, không quá đậm
4. **Fix sai lệch** trước khi tiếp tục

## Trong môi trường HTML Demo

Dùng Playwright để tự động chụp:

```js
const { chromium } = require('playwright');
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto('file:///path/to/index.html');
await page.waitForTimeout(1000);
// Force-flush animations (headless có thể skip CSS animations)
await page.evaluate(() => {
  document.querySelectorAll('.animate-in').forEach(el => {
    el.style.animation = 'none';
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
});
await page.waitForTimeout(300);
await page.screenshot({ path: 'screenshot_check.png' });
await browser.close();
```

## Lưu file screenshot

Đặt tên theo pattern: `screenshot_v{N}.png` (tăng dần), lưu tại root project.

## Khi phát hiện sai lệch

Ưu tiên sửa theo thứ tự:
1. Màu sai → cập nhật CSS variable / StyleSheet token
2. Kích thước sai → kiểm tra `Dimensions` vs hardcode
3. Font sai → verify Inter đã load, kiểm tra fontWeight
4. Shadow/border sai → đối chiếu lại design token trong `design-system.md`