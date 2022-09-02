---
title: Styling
---

By default, all Zeego components are unstyled.

To apply styles, you can use the `style` prop where available:

```tsx
<DropdownMenu.Item style={{ height: 40 }} />
```

However, for most cases, this will be insufficient.

You'll likely want to wrap the built-in components to build your own.

To make your own components, you'll first need to `create` them.

## Create custom components

Each Zeego element has a `create` function that lets you wrap the built-in components.

```tsx
import * as DropdownMenu from 'zeego/dropdown-menu'

const DropdownMenuItem = DropdownMenu.menuify((props) => {
  return <DropdownMenu.Item {...props} />
}, 'Item')
```

You can now use your custom `DropdownMenuItem` component:

### `create` usage

`create` takes two arguments: first, the component to wrap, and second, the name of the component.

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

### Dripsy Example

Say we want to create a custom component styled with Dripsy.

```tsx twoslash
import * as DropdownMenu from 'zeego/dropdown-menu'
import { styled } from 'dripsy'

const DripsyItem = styled(DropdownMenu.Item)({
  height: 40,
})

const DropdownMenuItem = DropdownMenu.menuify(DripsyItem, 'Item')

// ...your other components
```

### Moti Example

If you want to animate `focus` states of menu items on Web, you can do so with Moti.

Here we'll have a `MotiView` as an absolute-positioned background view. It will animate its opacity based on focus state on Web, which includes hover states.

```tsx twoslash
import * as DropdownMenu from 'zeego/dropdown-menu'
import { MotiView, useAnimationState } from 'moti'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  item: {
    height: 34,
    borderRadius: 6,
    paddingLeft: 16,
  },
  focusedItem: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#99999930',
    zIndex: -1,
  },
})

type ItemProps = React.ComponentProps<typeof DropdownMenu['Item']>

const DropdownMenuItem = DropdownMenu.menuify((props: ItemProps) => {
  const focusState = useAnimationState({
    from: {
      opacity: 0,
    },
    focused: {
      opacity: 1,
    },
  })

  const focusBackground = (
    <MotiView
      state={focusState}
      style={styles.focusedItem}
      pointerEvents="none"
    />
  )

  return (
    <DropdownMenu.Item
      {...props}
      onFocus={() => {
        focusState.transitionTo('focused')
        props.onFocus?.()
      }}
      onBlur={() => {
        focusState.transitionTo('from')
        props.onBlur?.()
      }}
      style={styles.item}
    >
      {focusBackground}
      {props.children}
    </DropdownMenu.Item>
  )
}, 'Item')

// ...your other components
```
