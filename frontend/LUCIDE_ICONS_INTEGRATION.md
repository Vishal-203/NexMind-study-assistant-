# Lucide Icons Integration Guide

## Current Implementation

The dashboard uses semantic icon markup with `data-icon` attributes for future icon integration:

```html
<!-- Example: Notification bell -->
<button class="icon-btn" data-icon="bell"></button>

<!-- Example: Flame icon (Study Streak) -->
<div class="stat-badge__icon" data-icon="flame"></div>
```

## Icon Mapping

Current emojis replaced with Lucide icon names:

| Icon Name | Use Case | Component |
|-----------|----------|-----------|
| `bell` | Notifications | Top navbar |
| `settings` | Settings | Top navbar |
| `menu` | Hamburger menu | Mobile header |
| `flame` | Study Streak | Hero badges, stat cards |
| `book-open` | Notes | Stat cards, hero badges |
| `check-circle` | Completed Tasks | Quick stats |
| `clock` | Pending Tasks | Quick stats |
| `brain` | AI Assistant | (Future) |
| `target` | Tasks/Planner | (Future) |
| `user` | Profile | (Future) |
| `layout-dashboard` | Dashboard | (Future) |

## Integration Option 1: Inline SVG Replacement (Simplest)

Replace `data-icon` attributes with inline SVG:

```html
<!-- Before -->
<button class="icon-btn" data-icon="bell"></button>

<!-- After -->
<button class="icon-btn">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
</button>
```

## Integration Option 2: Lucide React (If using React)

If converting to React, install and use Lucide React:

```bash
npm install lucide-react
```

```jsx
import { Bell, Settings, Flame, BookOpen, CheckCircle, Clock } from 'lucide-react';

export function Dashboard() {
  return (
    <>
      <button className="icon-btn">
        <Bell size={20} />
      </button>
      <button className="icon-btn">
        <Settings size={20} />
      </button>
    </>
  );
}
```

## Integration Option 3: CSS Background Images

Use CSS to render SVG icons as background images:

```css
[data-icon="bell"]::before {
  content: "";
  display: inline-block;
  width: 20px;
  height: 20px;
  background-image: url('data:image/svg+xml;utf8,...');
  background-size: contain;
  background-repeat: no-repeat;
}
```

## Integration Option 4: Icon Font (Heroicons)

Install and use Heroicons:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/heroicons@latest/solid/index.css" />

<button class="icon-btn">
  <span class="hi hi-bell"></span>
</button>
```

## Recommended Approach for NexMind

**For vanilla HTML/CSS** (current approach):
- Use Option 1 (Inline SVG) for full control and no dependencies

**For React migration** (future):
- Use Option 2 (Lucide React) for component-based reusability

**For quick implementation**:
- Download SVGs from [lucide.dev](https://lucide.dev)
- Replace `[data-icon="*"]` elements with inline SVG
- Maintain the existing CSS styling

## Example: Adding Bell Icon

### Step 1: Get Lucide Bell SVG
From lucide.dev, copy the bell icon SVG.

### Step 2: Replace in HTML
```html
<!-- Old -->
<button aria-label="Notifications" class="icon-btn" data-icon="bell"></button>

<!-- New -->
<button aria-label="Notifications" class="icon-btn">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
</button>
```

### Step 3: Verify CSS works
The existing CSS will automatically style the SVG:
- `stroke="currentColor"` uses the button's color
- `stroke-width="2"` matches the professional weight
- CSS transitions will work on hover

## CSS That Works with Lucide Icons

The existing nexmind-redesign.css already supports Lucide icons:

```css
.icon-btn {
  background: transparent;
  border: none;
  color: rgba(245, 251, 255, 0.95);
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.icon-btn:hover {
  opacity: 1;
}

/* SVG icons inherit color and size */
.icon-btn svg {
  width: 20px;
  height: 20px;
}
```

## Batch Icon Replacement Script

To replace all `data-icon` attributes with SVGs, you can create a JavaScript file:

```javascript
const iconMap = {
  'bell': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
  'settings': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m5.08-5.08l4.24-4.24"/></svg>',
  // ... add more icons
};

document.querySelectorAll('[data-icon]').forEach(el => {
  const iconName = el.getAttribute('data-icon');
  if (iconMap[iconName]) {
    el.innerHTML = iconMap[iconName];
  }
});
```

## Next Steps

1. **Option A**: Manually replace each `data-icon` with inline SVG (takes ~10 minutes)
2. **Option B**: Wait for React migration and use Lucide React components
3. **Option C**: Use the batch script approach for automated replacement

Choose based on your timeline and technical preferences!
