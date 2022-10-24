---
title: Dripsy
---

To use Dripsy with Zeego, you'll wrap primitives with `styled`, and then with `create`.

It's important that `create` is used at the outermost level.

```tsx twoslash
import * as DropdownMenu from 'zeego/dropdown-menu'
import { styled } from 'dripsy'

const DripsyItem = styled(DropdownMenu.Item)({
  height: 40,
})

const DropdownMenuItem = DropdownMenu.menuify(DripsyItem, 'Item')

// ...your other components
```

## Full Example

This example uses Dripsy for styles, Moti for animations, & Expo for icons.

You'll want to edit the `theme` colors to match your own design system.

The colors used here are `text`, `error`, `background`, `border`, and `muted3`.

```tsx
import * as Dropdown from 'zeego/dropdown-menu'
import { styled, useSx, Sx, Theme } from 'dripsy'
import { Platform, StyleSheet } from 'react-native'
import { MotiView } from 'moti'
import { ComponentProps, createContext, useContext } from 'react'
import { useCallback, useMemo } from 'react'
import Ionicons from '@expo/vector-icons/build/Ionicons'

const DropdownMenuRoot = Dropdown.Root

const DropdownMenuTrigger = Dropdown.Trigger

const activeSurfaceColor: keyof Theme['colors'] = 'muted3'

const DripsyContent = styled(Dropdown.Content)({
  minWidth: 220,
  bg: 'background',
  borderRadius: '3',
  p: '$2',
  borderColor: 'border',
  borderWidth: 1,
  ...Platform.select({
    web: {
      animationDuration: '275ms',
      animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      willChange: 'transform, opacity',
      animationKeyframes: {
        '0%': { opacity: 0, transform: [{ scale: 0.5 }] },
        '100%': { opacity: 1, transform: [{ scale: 1 }] },
      },
      transformOrigin: 'var(--radix-dropdown-menu-content-transform-origin)',
      boxShadow:
        '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
    },
  }),
})

const DropdownMenuContent = Dropdown.menuify(DripsyContent, 'Content')

const itemBorderWidth = 2

const DropdownItemFocusRing = ({
  motiState,
}: {
  motiState: ComponentProps<typeof MotiView>['state']
}) => {
  const sx = useSx()

  return (
    <MotiView
      style={sx({
        ...StyleSheet.absoluteFillObject,
        borderWidth: itemBorderWidth,
        borderColor: activeSurfaceColor,
        borderRadius: '2',
        bg: activeSurfaceColor,
        zIndex: 0,
      })}
      state={motiState}
      transition={useMemo(
        () => ({
          type: 'timing',
          duration: 150,
        }),
        []
      )}
      pointerEvents="none"
    />
  )
}

const height = 32
const x = 25

const useFocusedItem = ({
  onFocus,
  onBlur,
}: {
  onFocus?: () => void
  onBlur?: () => void
}) => {
  const motiState = useAnimationState({
    from: {
      opacity: 0,
    },
    focused: {
      opacity: 1,
    },
  })

  const handleFocus = useCallback(() => {
    motiState.transitionTo('focused')
    onFocus?.()
  }, [motiState, onFocus])

  const handleBlur = useCallback(() => {
    motiState.transitionTo('from')
    onBlur?.()
  }, [motiState, onBlur])

  return {
    motiState,
    handleFocus,
    handleBlur,
  }
}

const itemStyle: Sx = {
  borderRadius: '1',
  height,
  overflow: 'hidden',
  flex: 1,
  justifyContent: 'center',
  pr: '$2',
  pl: x,
  borderWidth: itemBorderWidth,
  borderColor: 'transparent',
  cursor: 'pointer',
}

const ItemPrimitive = styled(Dropdown.Item)(itemStyle)

type ItemContext = Pick<ComponentProps<typeof Dropdown.Item>, 'destructive'>
const ItemContext = createContext<ItemContext>({
  destructive: false,
})

const DropdownMenuItem = Dropdown.menuify(
  ({
    children,
    onBlur,
    onFocus,
    destructive = false,
    ...props
  }: ComponentProps<typeof Dropdown.Item>) => {
    const { motiState, handleBlur, handleFocus } = useFocusedItem({
      onFocus,
      onBlur,
    })

    return (
      <ItemContext.Provider value={{ destructive }}>
        <ItemPrimitive
          {...props}
          sx={
            props.disabled ? { cursor: 'not-allowed', opacity: 0.7 } : undefined
          }
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          <DropdownItemFocusRing motiState={motiState} />
          {children}
        </ItemPrimitive>
      </ItemContext.Provider>
    )
  },
  'Item'
)

const SubTriggerPrimitive = styled(Dropdown.SubTrigger)(itemStyle)
const DropdownMenuSubTrigger = Dropdown.menuify(
  ({
    children,
    onBlur,
    onFocus,
    destructive = false,
    ...props
  }: ComponentProps<typeof Dropdown.SubTrigger>) => {
    const { motiState, handleBlur, handleFocus } = useFocusedItem({
      onFocus,
      onBlur,
    })

    return (
      <ItemContext.Provider value={{ destructive }}>
        <SubTriggerPrimitive
          {...props}
          sx={props.disabled ? { cursor: 'not-allowed' } : undefined}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          <DropdownItemFocusRing motiState={motiState} />
          {children}
        </SubTriggerPrimitive>
      </ItemContext.Provider>
    )
  },
  'SubTrigger'
)

const DripsyTitle = styled(Dropdown.ItemTitle)({
  fontSize: '1',
  lineHeight: '1',
  fontFamily: 'root',
  zIndex: 1,
})

function useItemContentColor(): { color: keyof Theme['colors'] } {
  const { destructive } = useContext(ItemContext)

  return {
    color: destructive ? 'error' : 'text',
  }
}

const DropdownMenuItemTitle = Dropdown.menuify(
  (props: ComponentProps<typeof Dropdown.ItemTitle>) => {
    const { color } = useItemContentColor()

    return <DripsyTitle {...props} sx={{ color }} />
  },
  'ItemTitle'
)

const DropdownMenuSeparator = Dropdown.menuify(
  styled(Dropdown.Separator)({
    m: '$2',
    height: 1,
    bg: 'border',
  }),
  'Separator'
)

const DropdownMenuGroup = Dropdown.Group

const DripsyIcon = styled(Dropdown.ItemIcon)({
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: 0,
  width: x,
  justifyContent: 'center',
})

type IconProps = ComponentProps<typeof Ionicons>

const DropdownMenuItemIcon = Dropdown.menuify(
  ({
    name,
    size,
    ...props
  }: ComponentProps<typeof Dropdown.ItemIcon> &
    Partial<Pick<IconProps, 'name' | 'size'>>) => {
    const { color } = useItemContentColor()
    if (!props.name) return <></>

    return (
      <DripsyIcon {...props}>
        <Icon name={name} size={size} color={color} />
      </DripsyIcon>
    )
  },
  'ItemIcon'
)

const ItemCheckboxPrimitive = styled(Dropdown.CheckboxItem)(itemStyle)

const ItemIndicator = styled(Dropdown.ItemIndicator)({
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: 0,
  width: x,
  justifyContent: 'center',
})

const DropdownMenuCheckboxItem = Dropdown.menuify(
  ({
    children,
    onBlur,
    onFocus,
    ...props
  }: ComponentProps<typeof Dropdown.CheckboxItem>) => {
    const { motiState, handleBlur, handleFocus } = useFocusedItem({
      onFocus,
      onBlur,
    })

    return (
      <ItemCheckboxPrimitive
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
        sx={
          props.disabled ? { cursor: 'not-allowed', opacity: 0.7 } : undefined
        }
      >
        <DropdownItemFocusRing motiState={motiState} />
        <ItemIndicator>
          <Icon name="checkmark" color="text" />
        </ItemIndicator>
        {children}
      </ItemCheckboxPrimitive>
    )
  },
  'CheckboxItem'
)

const DropdownMenu = {
  Root: DropdownMenuRoot,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
  ItemTitle: DropdownMenuItemTitle,
  Separator: DropdownMenuSeparator,
  Group: DropdownMenuGroup,
  ItemIcon: DropdownMenuItemIcon,
  Trigger: DropdownMenuTrigger,
  CheckboxItem: DropdownMenuCheckboxItem,
  SubTrigger: DropdownMenuSubTrigger,
}

export { DropdownMenu }
```
