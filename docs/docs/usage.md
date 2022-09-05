---
title: Usage
---

Here we'll look at a quick overview of what it looks like to use Zeego.

The examples will use [Dripsy](https://dripsy.dev) for styling, but you can use any styling solution you want.

For a full overview of using custom styles and components, see the [styling guide](/style).

## 1. Create your primitives

Create a file for your primitives, and create each component.

Here, you can add custom styles and interactions.

> If you've used [Radix UI](https://www.radix-ui.com/docs/primitives/overview/getting-started#2-style-each-part) before, this will look familiar.

```tsx
// design-system/dropdown-menu.tsx
import * as DropdownMenu from 'zeego/dropdown-menu'
import { styled } from 'dripsy'

export const DropdownMenuRoot = DropdownMenu.Root
export const DropdownMenuTrigger = DropdownMenu.Trigger
export const DropdownMenuContent = DropdownMenu.Content
export const DropdownMenuItem = DropdownMenu.create(
  styled(DropdownMenu.Item)({
    height: 34,
  }),
  'Item'
)
export const DropdownMenuItemTitle = Dropdown.create(
  styled(DropdownMenu.ItemTitle, {
    themeKey: 'text',
    defaultVariant: 'body',
  })(),
  'ItemTitle'
)

// ...other primitives
```

Notice that the `DropdownMenuItem` is wrapped with `create()`. This is a requirement for [custom components](/style#create-custom-components).

## 2. Build a menu

Build a menu using the primitives you created.

```tsx
import {
  DropdownMenuRoot,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuItemTitle,
} from 'design-system/dropdown-menu'

function Menu() {
  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger>...</DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem key="fernando rojo">
          <DropdownMenuItemTitle>Fernando Rojo</DropdownMenuItemTitle>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuRoot>
  )
}
```

## 3. Add styles

All Zeego primitives ship unstyled. See the [styling guide](/style) use your own styles & build custom components.
