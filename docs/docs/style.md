---
title: Custom Styles
---

By default, all Zeego components are unstyled.

To apply styles, you can use the `style` prop where available.

These styles will typically only affect Web since the native components are often built-in iOS and Android elements.

```tsx
<DropdownMenu.Item style={{ height: 40 }} />
```

That said, the `style` prop alone will likely be insufficient. Chances are, you want to wrap this element to build your own custom components.

To make custom components, you'll first need to `create()` them. We'll see an example of this in the [custom components](/custom) guide.
