---
title: Custom Styles
---

By default, all Zeego components are unstyled.

To apply styles, you can use the `style` prop where available.

These styles will typically only affect Web since the native components are often built-in iOS and Android elements.

```tsx
<DropdownMenu.Item style={{ height: 40 }} />
```

That said, the `style` prop alone will likely be insufficient.

To make your own components, you'll first need to `create()` them.

## Create custom components

Each Zeego primitive set has a `create` function that lets you wrap the built-in components.

```jsx twoslash
import * as DropdownMenu from 'zeego/dropdown-menu'

const DropdownMenuItem = DropdownMenu.menuify((props) => {
  return <DropdownMenu.Item {...props} />
}, 'Item')
```

You can now use your custom `DropdownMenuItem` component.

If you don't wrap custom components with `create()`, they won't work properly on iOS or Android.

### `create(Component, displayName)`

`create` takes two arguments: first, the component to wrap, and second, the name of the primitive it's wrapping.

#### TypeScript Support

You can extend the default props of the component you're wrapping:

```tsx
import * as DropdownMenu from 'zeego/dropdown-menu'

type ItemProps = React.ComponentProps<typeof DropdownMenu['Item']>

const DropdownMenuItem = DropdownMenu.menuify((props: ItemProps) => {
  return <DropdownMenu.Item {...props} />
}, 'Item')
```

### `create` Example

```tsx twoslash {5-7, 17,19}
import * as DropdownMenu from 'zeego/dropdown-menu'

type ItemProps = React.ComponentProps<typeof DropdownMenu['Item']>

const DropdownMenuItem = DropdownMenu.menuify((props: ItemProps) => {
  return <DropdownMenu.Item {...props} />
}, 'Item')

export function Menu() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <></>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenuItem key="first">
          <DropdownMenu.ItemTitle>My Menu Item</DropdownMenu.ItemTitle>
        </DropdownMenuItem>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
```
