---
title: Custom Components
---

Unlike a typical React component, you can't simply wrap your Zeego elements in other components.

```tsx
// 🚫 this will not work
const Content = () => {
  return (
    <DropdownMenu.Content>
      <DropdownMenu.Item />
      <DropdownMenu.Item />
    </DropdownMenu.Content>
  )
}

export default function Menu() {
  return (
    <DropdownMenu.Root>
      <Content />
    </DropdownMenu.Root>
  )
}
```

Instead, you need to render your components inline:

```tsx
export default function Menu() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Content>
        <DropdownMenu.Item />
        <DropdownMenu.Item />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
```

However, you'll likely want to create your own custom components to wrap each Zeego primitive. For these cases, you can use the `create()` function to wrap primitives.

## Create custom components

Each Zeego primitive set has a `create` function that lets you wrap the built-in components.

```jsx twoslash
import * as DropdownMenu from 'zeego/dropdown-menu'

const DropdownMenuItem = DropdownMenu.create((props) => {
  // you can add your own components in here
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

const DropdownMenuItem = DropdownMenu.create((props: ItemProps) => {
  return <DropdownMenu.Item {...props} />
}, 'Item')
```

### `create` Example

```tsx twoslash {5-7, 17,19}
import * as DropdownMenu from 'zeego/dropdown-menu'

type ItemProps = React.ComponentProps<typeof DropdownMenu['Item']>

const DropdownMenuItem = DropdownMenu.create((props: ItemProps) => {
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
