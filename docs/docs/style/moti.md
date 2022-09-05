---
title: Moti
---

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
