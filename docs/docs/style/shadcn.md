---
title: shadcn/ui
---

## 1. Change your imports

In your ShadCN file `dropdown-menu.tsx` or `context-menu.tsx`, change the imports to use Zeego's components:

```diff
- import * as ContextMenu from '@radix-ui/react-context-menu';
+ import * as ContextMenu from 'zeego/context-menu';
```

## 2. Add `ItemTitle`

The one key difference between plain RadixUI and Zeego is that you need to use `ItemTitle` a child of `Item` to make the menu items work properly.

```tsx
<ContextMenu.Item key="item-1">
  <ContextMenu.ItemTitle>Item 1</ContextMenu.ItemTitle>
</ContextMenu.Item>
```

## 3. Add `key` prop

Additionally, you need to add the `key` prop to the `Item` component whenever you consume it.

```tsx
<ContextMenu.Item key="item-1">
  <ContextMenu.ItemTitle>Item 1</ContextMenu.ItemTitle>
</ContextMenu.Item>
```

You can run the TypeScript compiler to surface errors related to missing keys.
