---
title: Tailwind CSS
---

While there are a few different implementations of Tailwind CSS for React Native, these examples will use [`nativewind`](https://nativewind.dev).

To use Zeego with `nativewind`, you'll first wrap primitives with `styled`, and then again with `create`.

It's important that create is used at the outermost level.

```tsx
import * as DropdownMenu from 'zeego/dropdown-menu'
import { styled } from 'nativewind'

// you can write them separately
const TailwindItem = styled(DropdownMenu.Item, 'h-[25]')
const DropdownMenuItem = DropdownMenu.create(TailwindItem, 'Item')

// or you can chain them
const DropdownMenuItemTitle = Dropdown.create(
  styled(DropdownMenu.ItemTitle, 'font-bold'),
  'ItemTitle'
)

// ...your other components
```

Above, the `styled` function applies base styles to each component.

You can also override these styles with the `className` prop:

```tsx
<DropdownMenuItemTitle key="fernando" className="text-green-500">
  Fernando
</DropdownMenuItemTitle>
```
