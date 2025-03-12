---
title: Usage
---

Here we'll look at a quick overview of what it looks like to use Zeego.

For a full overview of using custom styles and components, see the [styling guide](/style).

## 1. Create your primitives

Create a file for your primitives, and create each component.

Here, you can add custom styles and interactions. To keep your styles and components consistent, add them all in this file and re-export them.

> If you've used [Radix UI](https://www.radix-ui.com/docs/primitives/overview/getting-started#2-style-each-part) before, this will look familiar.

```tsx
// design-system/dropdown-menu.tsx
import * as DropdownMenu from 'zeego/dropdown-menu'

export const DropdownMenuRoot = DropdownMenu.Root
export const DropdownMenuContent = DropdownMenu.Content

// notice that we're using the create() function
export const DropdownMenuItem = DropdownMenu.create(
  (props: React.ComponentProps<typeof DropdownMenu.Item>) => (
    <DropdownMenu.Item {...props} style={{ height: 34 }} />
  ),
  'Item'
)

// ...see "Full code samples" below to see the rest of the file
```

Notice that the `DropdownMenuItem` is wrapped with `create()`. This is a requirement for [custom components](/style#create-custom-components).

### Full code samples

<details>
  <summary>Full <code>dropdown-menu.tsx</code> file</summary>

Copy this code into your `dropdown-menu.tsx` file.

```tsx
// design-system/dropdown-menu.tsx
import * as DropdownMenu from 'zeego/dropdown-menu'

export const DropdownMenuRoot = DropdownMenu.Root
export const DropdownMenuTrigger = DropdownMenu.create(
  (props: React.ComponentProps<typeof DropdownMenu.Trigger>) => (
    <DropdownMenu.Trigger {...props} asChild>
      <View aria-role="button">{props.children}</View>
    </DropdownMenu.Trigger>
  ),
  'Trigger'
)
export const DropdownMenuContent = DropdownMenu.Content

export const DropdownMenuItem = DropdownMenu.create(
  (props: React.ComponentProps<typeof DropdownMenu.Item>) => (
    <DropdownMenu.Item {...props} style={{ height: 34 }} />
  ),
  'Item'
)

export const DropdownMenuItemTitle = DropdownMenu.create(
  (props: React.ComponentProps<typeof DropdownMenu.ItemTitle>) => (
    <DropdownMenu.ItemTitle {...props} />
  ),
  'ItemTitle'
)

export const DropdownMenuItemIcon = DropdownMenu.create(
  (props: React.ComponentProps<typeof DropdownMenu.ItemIcon>) => (
    <DropdownMenu.ItemIcon {...props} />
  ),
  'ItemIcon'
)

export const DropdownMenuItemImage = DropdownMenu.create(
  (props: React.ComponentProps<typeof DropdownMenu.ItemImage>) => (
    <DropdownMenu.ItemImage {...props} />
  ),
  'ItemImage'
)

export const DropdownMenuLabel = DropdownMenu.create(
  (props: React.ComponentProps<typeof DropdownMenu.Label>) => (
    <DropdownMenu.Label {...props} />
  ),
  'Label'
)

export const DropdownMenuSeparator = DropdownMenu.create(
  (props: React.ComponentProps<typeof DropdownMenu.Separator>) => (
    <DropdownMenu.Separator {...props} />
  ),
  'Separator'
)

export const DropdownMenuGroup = DropdownMenu.create(
  (props: React.ComponentProps<typeof DropdownMenu.Group>) => (
    <DropdownMenu.Group {...props} />
  ),
  'Group'
)

export const DropdownMenuCheckboxItem = DropdownMenu.create(
  (props: React.ComponentProps<typeof DropdownMenu.CheckboxItem>) => (
    <DropdownMenu.CheckboxItem
      {...props}
      style={{ ...props.style, display: 'flex', alignItems: 'center', gap: 8 }}
    >
      <DropdownMenu.ItemIndicator />
    </DropdownMenu.CheckboxItem>
  ),
  'CheckboxItem'
)

export const DropdownMenuSubTrigger = DropdownMenu.create(
  (props: React.ComponentProps<typeof DropdownMenu.SubTrigger>) => (
    <DropdownMenu.SubTrigger {...props} />
  ),
  'SubTrigger'
)

export const DropdownMenuSubContent = DropdownMenu.create(
  (props: React.ComponentProps<typeof DropdownMenu.SubContent>) => (
    <DropdownMenu.SubContent {...props} />
  ),
  'SubContent'
)

export const DropdownMenuSub = DropdownMenu.create(
  (props: React.ComponentProps<typeof DropdownMenu.Sub>) => (
    <DropdownMenu.Sub {...props} />
  ),
  'Sub'
)

export const DropdownMenuItemIndicator = DropdownMenu.create(
  (props: React.ComponentProps<typeof DropdownMenu.ItemIndicator>) => (
    <DropdownMenu.ItemIndicator {...props} />
  ),
  'ItemIndicator'
)

export const DropdownMenuPreview = DropdownMenu.create(
  (props: React.ComponentProps<typeof DropdownMenu.Preview>) => (
    <DropdownMenu.Preview {...props} />
  ),
  'Preview'
)

export const DropdownMenuArrow = DropdownMenu.create(
  (props: React.ComponentProps<typeof DropdownMenu.Arrow>) => (
    <DropdownMenu.Arrow {...props} />
  ),
  'Arrow'
)
```

</details>

<details>
<summary>Full <code>context-menu.tsx</code> file</summary>

Copy this code into your `context-menu.tsx` file.

```tsx
// design-system/context-menu.tsx
import * as ContextMenu from 'zeego/context-menu'

export const ContextMenuRoot = ContextMenu.Root

export const ContextMenuTrigger = ContextMenu.create(
  (props: React.ComponentProps<typeof ContextMenu.Trigger>) => (
    <ContextMenu.Trigger {...props} asChild>
      <View aria-role="button">{props.children}</View>
    </ContextMenu.Trigger>
  ),
  'Trigger'
)

export const ContextMenuContent = ContextMenu.create(
  (props: React.ComponentProps<typeof ContextMenu.Content>) => (
    <ContextMenu.Content {...props} />
  ),
  'Content'
)

export const ContextMenuItem = ContextMenu.create(
  (props: React.ComponentProps<typeof ContextMenu.Item>) => (
    <ContextMenu.Item {...props} />
  ),
  'Item'
)

export const ContextMenuItemTitle = ContextMenu.create(
  (props: React.ComponentProps<typeof ContextMenu.ItemTitle>) => (
    <ContextMenu.ItemTitle {...props} />
  ),
  'ItemTitle'
)

export const ContextMenuItemIcon = ContextMenu.create(
  (props: React.ComponentProps<typeof ContextMenu.ItemIcon>) => (
    <ContextMenu.ItemIcon {...props} />
  ),
  'ItemIcon'
)

export const ContextMenuItemImage = ContextMenu.create(
  (props: React.ComponentProps<typeof ContextMenu.ItemImage>) => (
    <ContextMenu.ItemImage {...props} />
  ),
  'ItemImage'
)

export const ContextMenuCheckboxItem = ContextMenu.create(
  (props: React.ComponentProps<typeof ContextMenu.CheckboxItem>) => (
    <ContextMenu.CheckboxItem {...props} />
  ),
  'CheckboxItem'
)

export const ContextMenuLabel = ContextMenu.create(
  (props: React.ComponentProps<typeof ContextMenu.Label>) => (
    <ContextMenu.Label {...props} />
  ),
  'Label'
)

export const ContextMenuSeparator = ContextMenu.create(
  (props: React.ComponentProps<typeof ContextMenu.Separator>) => (
    <ContextMenu.Separator {...props} />
  ),
  'Separator'
)

export const ContextMenuGroup = ContextMenu.create(
  (props: React.ComponentProps<typeof ContextMenu.Group>) => (
    <ContextMenu.Group {...props} />
  ),
  'Group'
)

export const ContextMenuSubTrigger = ContextMenu.create(
  (props: React.ComponentProps<typeof ContextMenu.SubTrigger>) => (
    <ContextMenu.SubTrigger {...props} />
  ),
  'SubTrigger'
)

export const ContextMenuSubContent = ContextMenu.create(
  (props: React.ComponentProps<typeof ContextMenu.SubContent>) => (
    <ContextMenu.SubContent {...props} />
  ),
  'SubContent'
)

export const ContextMenuSub = ContextMenu.create(
  (props: React.ComponentProps<typeof ContextMenu.Sub>) => (
    <ContextMenu.Sub {...props} />
  ),
  'Sub'
)

export const ContextMenuItemIndicator = ContextMenu.create(
  (props: React.ComponentProps<typeof ContextMenu.ItemIndicator>) => (
    <ContextMenu.ItemIndicator {...props} />
  ),
  'ItemIndicator'
)

export const ContextMenuPreview = ContextMenu.create(
  (props: React.ComponentProps<typeof ContextMenu.Preview>) => (
    <ContextMenu.Preview {...props} />
  ),
  'Preview'
)

export const ContextMenuArrow = ContextMenu.create(
  (props: React.ComponentProps<typeof ContextMenu.Arrow>) => (
    <ContextMenu.Arrow {...props} />
  ),
  'Arrow'
)
```

</details>

## 2. Build a menu

Build a menu using the primitives you created.

```tsx
import { Text } from 'react-native'
import {
  DropdownMenuRoot,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuItemTitle,
} from '@/design-system/dropdown-menu'

function Menu() {
  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger>
        <Text>Open Dropdown Menu</Text>
      </DropdownMenuTrigger>

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

The styles will apply on web, but other than the `Trigger` component, your iOS and Android apps will style using the native menu components.

You should make a habit of applying the styles in your primitive file we made above to keep your app's feel consistent.

## 4. Why the boilerplate?

You might look at step 1 and think, wait, why do I need to have such a big file to use this library?

The reality is, you don't _need_ to, but you should. By wrapping third-party dependencies in one place and styling them yourself, you own the code more closely. It will allow for consumption of those files to be elegant.

If it looks overwhelming, don't worry. You can just copy-paste and continue.
