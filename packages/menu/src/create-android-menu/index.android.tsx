import React, {
  Children,
  cloneElement,
  createContext,
  forwardRef,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'
import { View, Pressable, Image, Text } from 'react-native'

import type { createIosMenu } from '../create-ios-menu'
import type {
  MenuCheckboxItemProps,
  MenuContentProps,
  MenuGroupProps,
  MenuItemIconProps,
  MenuItemImageProps,
  MenuItemIndicatorProps,
  MenuItemProps,
  MenuItemSubtitleProps,
  MenuItemTitleProps,
  MenuLabelProps,
  MenuRootProps,
  MenuSeparatorProps,
  MenuTriggerItemProps,
  MenuTriggerProps,
} from '../types'
import type { FC } from 'react'

import { menuify } from '../display-names'

import { Popover } from 'react-native-popper'
import { pickChildren } from '../children'

type MenuVisibleContext = {
  isOpen: boolean
  onClose: () => void
  onShow: () => void
  onOpenChange: (next: boolean) => void
  closeRootMenu: () => void
}

const VirtualizedMenuContext = createContext(false)
const useIsNestedMenu = () => useContext(VirtualizedMenuContext)

const MenuVisibleContext = createContext<MenuVisibleContext>(null as any)

const useMenuVisibleContext = () => useContext(MenuVisibleContext)

const TriggerItem = menuify(
  ({
    style,
    onFocus,
    onBlur,
    textValue,
    disabled,
    children,
  }: MenuTriggerItemProps) => {
    const { isOpen, onOpenChange } = useMenuVisibleContext()
    console.log('[trigger item]', { isOpen })
    return (
      <Pressable
        onPress={() => onOpenChange(!isOpen)}
        style={style}
        onFocus={onFocus}
        onBlur={onBlur}
        accessibilityLabel={textValue}
        disabled={disabled}
      >
        {children}
      </Pressable>
    )
    // return (
    //   <Item
    //     {...props}
    //     onSelect={}
    //     // onSelect={useCallback(() => {
    //     //   onOpenChange(!isOpen)
    //     // }, [onOpenChange, isOpen])}
    //   />
    // )
  },
  'TriggerItem'
)

function MenuProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false)

  const parentContext = useMenuVisibleContext()

  const isNestedMenu = !!parentContext

  const closeRootMenu = parentContext?.closeRootMenu

  return (
    <MenuVisibleContext.Provider
      value={useMemo(
        () => ({
          isOpen,
          onShow: () => setOpen(true),
          onClose: () => setOpen(false),
          onOpenChange: setOpen,
          closeRootMenu: closeRootMenu ?? (() => setOpen(false)),
        }),
        [isOpen]
      )}
    >
      <VirtualizedMenuContext.Provider value={isNestedMenu}>
        {children}
      </VirtualizedMenuContext.Provider>
    </MenuVisibleContext.Provider>
  )
}

const TriggerElementContext = createContext<ReactElement>(null as any)
const useTriggerElement = () => useContext(TriggerElementContext)

const Root = menuify(({ children }: MenuRootProps) => {
  const rootTrigger = pickChildren(children, Trigger)

  const trigger = rootTrigger.targetChildren?.[0]

  const isNested = useIsNestedMenu()

  if (isNested) {
    return <MenuProvider>{children}</MenuProvider>
  }
  if (!trigger) {
    // console.warn('[root] missing trigger?')
    // console.warn(
    //   `[zeeg] Missing <Trigger /> component. Are you sure you used this directly as the child of <Root />?
    // If you're using a custom component, you need to utilize the menuify(Trigger, 'Trigger') function.`
    // )
  }

  return (
    <MenuProvider>
      <TriggerElementContext.Provider value={trigger}>
        <TriggerRefContext.Provider value={useRef(null)}>
          {rootTrigger.withoutTargetChildren}
        </TriggerRefContext.Provider>
      </TriggerElementContext.Provider>
    </MenuProvider>
  )
}, 'Root')

const TriggerRefContext = createContext<React.RefObject<View>>({
  current: null,
})
const useTriggerRef = () => useContext(TriggerRefContext)

const Trigger = menuify(
  ({
    children,
    style,
    // @ts-expect-error these are internally passed from Popover
    onPress,
    // @ts-expect-error these are internally passed from Popover
    onLongPress,
  }: MenuTriggerProps) => {
    if (Children.count(children) > 1) {
      console.error('[zeego] <Trigger /> must have one child.')
    }
    const child = cloneElement(Children.only(children), {
      onPress: undefined, // remove press handler if it exists 😬
    })
    const triggerRef = useTriggerRef()

    const { onShow } = useMenuVisibleContext()

    return (
      <Pressable
        onPress={onShow}
        onLongPress={onLongPress}
        style={style}
        ref={triggerRef}
      >
        {child}
      </Pressable>
    )
  },
  'Trigger'
)

const Item = menuify(
  ({
    children,
    onSelect,
    onFocus,
    onBlur,
    style,
    textValue,
    disabled,
  }: MenuItemProps) => {
    const { closeRootMenu } = useMenuVisibleContext()
    const onPress = useCallback(() => {
      onSelect?.()
      closeRootMenu()
    }, [onSelect, closeRootMenu])
    return (
      <Pressable
        onPress={onPress}
        style={style}
        onFocus={onFocus}
        onBlur={onBlur}
        accessibilityLabel={textValue}
        disabled={disabled}
      >
        {children}
      </Pressable>
    )
  },
  'Item'
)

const ItemIcon = menuify(({ children, style }: MenuItemIconProps) => {
  return (
    <View style={style} pointerEvents="none">
      {children}
    </View>
  )
}, 'ItemIcon')

const ItemImage = menuify(
  ({
    style,
    source,
    fadeDuration,
    height,
    resizeMode,
    width,
  }: MenuItemImageProps) => {
    return (
      <Image
        style={style}
        source={source}
        fadeDuration={fadeDuration}
        height={height}
        resizeMode={resizeMode}
        width={width}
      />
    )
  },
  'ItemImage'
)

const ItemTitle: FC<MenuItemTitleProps> = menuify(({ children, style }) => {
  return <Text style={style}>{children}</Text>
}, 'ItemTitle')

const ItemSubtitle = menuify(({ children, style }: MenuItemSubtitleProps) => {
  return <Text style={style}>{children}</Text>
}, 'ItemSubtitle')

const Group: FC<MenuGroupProps> = menuify(({ children, style }) => {
  return <View style={style}>{children}</View>
}, 'Group')

const Separator = menuify(({ style }: MenuSeparatorProps) => {
  return <View style={style} />
}, 'Separator')

const CheckboxItemContext = createContext<MenuCheckboxItemProps['value']>(
  null as any
)
const useCheckboxItemValue = () => useContext(CheckboxItemContext)

const CheckboxItem = menuify(
  ({
    children,
    onValueChange,
    onBlur,
    onFocus,
    style,
    textValue,
    value,
  }: MenuCheckboxItemProps) => {
    return (
      <CheckboxItemContext.Provider value={value}>
        <Item
          style={style}
          onFocus={onFocus}
          onBlur={onBlur}
          textValue={textValue}
          onSelect={useCallback(() => {
            const next = value === 'off' ? 'on' : 'off'

            onValueChange?.(next, value)
          }, [value, onValueChange])}
        >
          {children}
        </Item>
      </CheckboxItemContext.Provider>
    )
  },
  'CheckboxItem'
)

const ItemIndicator: FC<MenuItemIndicatorProps> = menuify(
  ({ style, children }) => {
    const value = useCheckboxItemValue()
    if (value !== 'on' && value !== 'mixed') {
      return null
    }
    return <View style={style}>{children}</View>
  },
  'ItemIndicator'
)

const Label: FC<MenuLabelProps> = menuify(
  ({ style, children }) => <Text style={style}>{children}</Text>,
  'Label'
)

export const createAndroidMenu: typeof createIosMenu = (Menu) => {
  const Content = menuify(
    ({
      children,
      sideOffset,
      style,
      side,
      alignOffset,
      avoidCollisions,
    }: MenuContentProps) => {
      const { isOpen, onOpenChange, onClose } = useMenuVisibleContext()

      const isNestedMenu = useIsNestedMenu()

      const trigger = useTriggerElement()

      const triggerRef = useTriggerRef()

      if (isNestedMenu) {
        return <>{isOpen && children}</>
      }

      return (
        <>
          {trigger}
          <Popover
            mode="single"
            trigger={triggerRef}
            offset={sideOffset}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement={side}
            shouldFlip={avoidCollisions}
            onRequestClose={onClose}
            crossOffset={alignOffset}
            on={Menu === 'ContextMenu' ? 'longPress' : 'press'}
          >
            <Popover.Backdrop />
            <Popover.Content>
              <View style={style}>{children}</View>
            </Popover.Content>
          </Popover>
        </>
      )
    },
    'Content'
  )
  return {
    Root,
    Trigger,
    Content,
    Item,
    CheckboxItem,
    Group,
    ItemIcon,
    ItemImage,
    ItemIndicator,
    ItemSubtitle,
    ItemTitle,
    Label,
    Separator,
    TriggerItem,
  }
}
