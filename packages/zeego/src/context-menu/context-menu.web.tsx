import {
  ItemPrimitive,
  ContextMenuContentProps,
  MenuGroupProps,
  MenuItemProps,
  MenuRootProps,
  MenuSeparatorProps,
  MenuTriggerItemProps,
  MenuTriggerProps,
  MenuCheckboxItemProps,
  MenuItemIndicatorProps,
  MenuItemIconProps,
  menuify,
  create,
  MenuArrowProps,
} from '../menu'
import { View } from 'react-native'
import React, { forwardRef } from 'react'

import * as ContextMenu from '@radix-ui/react-context-menu'

const Root = menuify(({ children }: MenuRootProps) => {
  return <ContextMenu.Root>{children}</ContextMenu.Root>
}, 'Root')

const TriggerView = forwardRef<unknown, any>((props, ref) => {
  return (
    <View ref={ref} {...props} onClickCapture={props.onPointerDown}>
      {props.children}
    </View>
  )
})

const Trigger = menuify(({ children, style }: MenuTriggerProps) => {
  return (
    <ContextMenu.Trigger asChild>
      <TriggerView style={style}>{children}</TriggerView>
    </ContextMenu.Trigger>
  )
}, 'Trigger')

const ContentView = forwardRef<unknown, any>((props, ref) => {
  return (
    <View ref={ref} {...props} onClickCapture={props.onPointerDown}>
      {props.children}
    </View>
  )
})

const Content = menuify(
  ({
    children,
    style,
    loop,
    alignOffset,
    avoidCollisions,
    collisionTolerance,
    sideOffset,
  }: ContextMenuContentProps) => {
    return (
      <ContextMenu.Content
        loop={loop}
        alignOffset={alignOffset}
        avoidCollisions={avoidCollisions}
        collisionTolerance={collisionTolerance}
        sideOffset={sideOffset}
      >
        <ContentView style={style}>{children}</ContentView>
      </ContextMenu.Content>
    )
  },
  'Content'
)

const itemStyleReset = {
  outlineWidth: 0,
}

const Item = menuify(
  ({
    children,
    disabled,
    onSelect,
    style,
    onBlur,
    onFocus,
    textValue,
  }: MenuItemProps) => {
    return (
      <ContextMenu.Item
        onFocus={onFocus}
        textValue={textValue}
        onBlur={onBlur}
        disabled={disabled}
        onSelect={onSelect}
        style={itemStyleReset}
      >
        <ItemPrimitive
          // @ts-expect-error we require a key in the types
          // this is for consumers
          // however, it isn't relevant locally here, since the key will be passed to the parent component
          // so that is sufficient
          key={undefined}
          style={style}
        >
          {children}
        </ItemPrimitive>
      </ContextMenu.Item>
    )
  },
  'Item'
)

const TriggerItem = menuify(
  ({
    children,
    style,
    textValue,
    disabled,
    onBlur,
    onFocus,
  }: MenuTriggerItemProps) => {
    return (
      <ContextMenu.TriggerItem
        disabled={disabled}
        textValue={textValue}
        onBlur={onBlur}
        onFocus={onFocus}
        style={itemStyleReset}
      >
        <ItemPrimitive
          // @ts-expect-error we require a key in the types
          // this is for consumers
          // however, it isn't relevant locally here, since the key will be passed to the parent component
          // so that is sufficient
          key={undefined}
          style={style}
        >
          {children}
        </ItemPrimitive>
      </ContextMenu.TriggerItem>
    )
  },
  'TriggerItem'
)

const Group = menuify(({ children }: MenuGroupProps) => {
  return <ContextMenu.Group>{children}</ContextMenu.Group>
}, 'Group')

const Separator = menuify(({ style }: MenuSeparatorProps) => {
  return (
    <ContextMenu.Separator>
      <View style={style} />
    </ContextMenu.Separator>
  )
}, 'Separator')

const CheckboxItem = menuify(
  ({
    onValueChange,
    value,
    disabled,
    textValue,
    onBlur,
    onFocus,
    style,
    children,
  }: MenuCheckboxItemProps) => {
    return (
      <ContextMenu.CheckboxItem
        onFocus={onFocus}
        textValue={textValue}
        onBlur={onBlur}
        disabled={disabled}
        checked={value !== 'off'}
        onCheckedChange={(next) => onValueChange?.(next ? 'on' : 'off', value)}
        style={itemStyleReset}
      >
        <ItemPrimitive
          // @ts-expect-error we require a key in the types
          // this is for consumers
          // however, it isn't relevant locally here, since the key will be passed to the parent component
          // so that is sufficient
          key={undefined}
          style={style}
        >
          {children}
        </ItemPrimitive>
      </ContextMenu.CheckboxItem>
    )
  },
  'CheckboxItem'
)

const ItemIndicator = menuify(
  ({ style, children }: MenuItemIndicatorProps) => (
    <ContextMenu.ItemIndicator>
      <View style={style}>{children}</View>
    </ContextMenu.ItemIndicator>
  ),
  'ItemIndicator'
)

const ItemIcon = menuify(({ children, style }: MenuItemIconProps) => {
  return <View style={style}>{children}</View>
}, 'ItemIcon')

const Preview = menuify(() => <></>, 'Preview')

const Arrow = create(({ style, children, width, height }: MenuArrowProps) => {
  return (
    <ContextMenu.Arrow width={width} height={height}>
      <View style={[{ height, width }, style]}>{children}</View>
    </ContextMenu.Arrow>
  )
}, 'Arrow')

export {
  Root,
  Trigger,
  Content,
  Item,
  TriggerItem,
  Group,
  Separator,
  CheckboxItem,
  ItemIndicator,
  ItemIcon,
  Preview,
  Arrow,
}

export { ItemImage } from '../menu/web-primitives/item-image'
export { Label } from './web/label'

export { ItemTitle, ItemSubtitle } from '../menu'
