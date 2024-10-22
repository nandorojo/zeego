---
title: Usage
---

Here we'll look at a quick overview of what it looks like to use Zeego.

For a full overview of using custom styles and components, see the [styling guide](/style).

## 1. Create your primitives

Create a file for your primitives, and create each component.

Here, you can add custom styles and interactions.

> If you've used [Radix UI](https://www.radix-ui.com/docs/primitives/overview/getting-started#2-style-each-part) before, this will look familiar.

It's useful to have all of your primitives created once in a single file.

```tsx
// design-system/dropdown-menu.tsx
import * as DropdownMenu from 'zeego/dropdown-menu'

export const DropdownMenuRoot = DropdownMenu.Root
export const DropdownMenuTrigger = DropdownMenu.Trigger
export const DropdownMenuContent = DropdownMenu.Content

// notice that we're using the `create()` function
export const DropdownMenuItem = DropdownMenu.create(
  (props: React.ComponentProps<typeof DropdownMenu.Item>) => (
    <DropdownMenu.Item {...props} style={{ height: 34 }} />
  ),
  'Item'
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
