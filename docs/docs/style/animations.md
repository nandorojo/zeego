---
title: Animations
---

Animations are only configurable on Web, since iOS and Android use native elements with built-in animations.

There are two types of animations you'll be concerned with: the animation of the menu itself, and the animation of the menu items.

## Animate Menu Content

The simplest way to animate the entrance and exit of a menu is with CSS keyframes. Thanks to Radix UI's exposed CSS variables, this is all it takes:

```tsx twoslash {12-25, 31-36}
import * as DropdownMenu from 'zeego/dropdown-menu'
import { StyleSheet, Platform } from 'react-native'

const style = StyleSheet.create({
  content: {
    minWidth: 220,
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 5,
    borderWidth: 1,
    borderColor: '#fff8',
    ...Platform.select({
      web: {
        animationDuration: '400ms',
        animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform, opacity',
        animationKeyframes: {
          '0%': { opacity: 0, transform: [{ scale: 0.5 }] },
          '100%': { opacity: 1, transform: [{ scale: 1 }] },
        },
        boxShadow:
          '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
        transformOrigin: 'var(--radix-dropdown-menu-content-transform-origin)',
      },
    }),
  },
})

type ContentProps = React.ComponentProps<typeof DropdownMenu['Content']>

export const DropdownMenuContent = DropdownMenu.create(
  (props: ContentProps) => {
    return <DropdownMenu.Content {...props} style={style.content} />
  },
  'Content'
)
```

## Animate Menu Items

If you want to animate `focus` states of menu items on Web, you can do so with Moti without triggering any re-renders. Or, you can do the same with React state and CSS transitions directly. Let's look at an example for each.

### Using Moti

Here we'll have a `MotiView` as an absolute-positioned background view. It will animate its opacity based on focus state on Web, which includes hover states.

```tsx twoslash
import * as DropdownMenu from 'zeego/dropdown-menu'
import { MotiView, useAnimationState } from 'moti'
import { StyleSheet, Platform } from 'react-native'

const itemHeight = 25

const styles = StyleSheet.create({
  item: {
    borderRadius: 3,
    justifyContent: 'center',
    paddingRight: 5,
    paddingLeft: itemHeight,
    height: itemHeight,
    ...Platform.select({
      web: {
        transformOrigin: 'var(--radix-dropdown-menu-item-transform-origin)',
      },
    }),
  },
  focusedItem: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#99999910',
    zIndex: -1,
  },
})

type ItemProps = React.ComponentProps<typeof DropdownMenu['Item']>

const DropdownMenuItem = DropdownMenu.create((props: ItemProps) => {
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
```
