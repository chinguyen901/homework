---
description: Design tokens, màu sắc, typography và visual style cho TikTok Auto Center. Áp dụng khi tạo hoặc chỉnh sửa bất kỳ component UI nào.
globs: ["src/**/*.tsx", "src/**/*.css", "*.html"]
alwaysApply: false
---

# Design System

Dựa trên UI mockup `Demo_App_1.png`. Mọi thành phần UI phải tuân theo các token dưới đây — không tự ý dùng màu hoặc kích thước ngoài bảng này.

## Color Tokens

| Token            | Hex       | Usage                        |
|------------------|-----------|------------------------------|
| `--primary`      | `#7C3AED` | Buttons, active states, links |
| `--primary-dark` | `#5B21B6` | Gradient end, hover states   |
| `--primary-light`| `#A78BFA` | Chart bars, decorative       |
| `--primary-bg`   | `#EDE9FE` | Badge backgrounds, tinted bg |
| `--bg`           | `#F8F7FF` | App background               |
| `--card`         | `#FFFFFF` | Card surfaces                |
| `--text`         | `#1F2937` | Body text                    |
| `--text-sub`     | `#6B7280` | Secondary/caption text       |
| `--success`      | `#10B981` | Positive trends (▲)          |
| `--danger`       | `#EF4444` | Negative trends (▼), errors  |
| `--warning`      | `#F59E0B` | Neutral/stable indicators    |
| `--border`       | `#E5E7EB` | Dividers, card borders       |

## Gradient Header

Dùng gradient này cho mọi màn header chính:
```css
background: linear-gradient(145deg, #7C3AED 0%, #5B21B6 60%, #4C1D95 100%);
```

## Typography

- **Font**: Inter (Google Fonts) — fallback `sans-serif`
- **Sizes**: 9px (micro) → 12px (caption) → 13px (body-sm) → 14px (body) → 16px (title-sm) → 18px (title) → 22px (heading) → 32px+ (display)
- **Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold)
- Không dùng `font-size` nhỏ hơn **11px** trong bất kỳ component nào

## Spacing & Shape

- **Card border-radius**: `16px` (large cards), `12px` (list items), `10px` (small chips)
- **Card shadow**: `0 4px 20px rgba(124, 58, 237, 0.10)`
- **Card shadow sm**: `0 2px 8px rgba(0, 0, 0, 0.06)`
- **Padding ngang mặc định**: `20px`

## Component Patterns

**Stats Card (hero)**
- Background: `rgba(255,255,255,0.12)` với `backdrop-filter: blur(10px)`
- Border: `1px solid rgba(255,255,255,0.18)`
- Hiển thị số lớn (display size) + 3 mini stat-pills bên dưới

**List Item**
- Icon 44×44px, border-radius 12px, màu nền pastel theo category
- Tên (600 weight) + sub-text (text-sub)
- Giá trị bên phải + badge tăng trưởng (success/danger)

**Badge / Chip**
- Trending: `background: var(--primary-bg); color: var(--primary)`
- Hot: `background: #FEF3C7; color: #D97706`
- New: `background: var(--primary-bg); color: var(--primary)`
