import {
  ItemPrimitive,
  MenuContentProps,
  MenuGroupProps,
  MenuItemProps,
  MenuRootProps,
  MenuSeparatorProps,
  MenuTriggerItemProps,
  MenuTriggerProps,
  MenuDisplayName,
  MenuCheckboxItemProps,
  MenuItemIndicatorProps,
  MenuItemIconProps,
} from '@zeego/menu'
import { View } from 'react-native'
import React, { forwardRef } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

const Root = ({ children }: MenuRootProps) => {
  return <DropdownMenu.Root>{children}</DropdownMenu.Root>
}
Root.displayName = MenuDisplayName.Root

const TriggerView = forwardRef<unknown, any>((props, ref) => {
  return (
    <View ref={ref} {...props} onClickCapture={props.onPointerDown}>
      {props.children}
    </View>
  )
})

const Trigger = ({ children, style }: MenuTriggerProps) => {
  return (
    <DropdownMenu.Trigger asChild>
      <TriggerView style={style}>{children}</TriggerView>
    </DropdownMenu.Trigger>
  )
}
Trigger.displayName = MenuDisplayName.Trigger

const ContentView = forwardRef<unknown, any>((props, ref) => {
  return (
    <View ref={ref} {...props} onClickCapture={props.onPointerDown}>
      {props.children}
    </View>
  )
})

const Content = ({
  children,
  style,
  loop,
  side,
  align,
  alignOffset,
  avoidCollisions,
  collisionTolerance,
  sideOffset,
}: MenuContentProps) => {
  return (
    <DropdownMenu.Content
      loop={loop}
      side={side}
      align={align}
      alignOffset={alignOffset}
      avoidCollisions={avoidCollisions}
      collisionTolerance={collisionTolerance}
      sideOffset={sideOffset}
    >
      <ContentView style={style}>{children}</ContentView>
    </DropdownMenu.Content>
  )
}
Content.displayName = MenuDisplayName.Content

const itemStyleReset = {
  outlineWidth: 0,
}

const Item = ({
  children,
  disabled,
  onSelect,
  style,
  onBlur,
  onFocus,
  textValue,
}: MenuItemProps) => {
  return (
    <DropdownMenu.Item
      onFocus={onFocus}
      textValue={textValue}
      onBlur={onBlur}
      disabled={disabled}
      onSelect={onSelect}
      style={itemStyleReset}
    >
      <ItemPrimitive style={style}>{children}</ItemPrimitive>
    </DropdownMenu.Item>
  )
}
Item.displayName = MenuDisplayName.Item

const TriggerItem = ({
  children,
  style,
  textValue,
  disabled,
  onBlur,
  onFocus,
}: MenuTriggerItemProps) => {
  return (
    <DropdownMenu.TriggerItem
      disabled={disabled}
      textValue={textValue}
      onBlur={onBlur}
      onFocus={onFocus}
      style={itemStyleReset}
    >
      <ItemPrimitive style={style}>{children}</ItemPrimitive>
    </DropdownMenu.TriggerItem>
  )
}
TriggerItem.displayName = MenuDisplayName.TriggerItem

const Group = ({ children }: MenuGroupProps) => {
  return <DropdownMenu.Group>{children}</DropdownMenu.Group>
}
Group.displayName = MenuDisplayName.Group

const Separator = ({ style }: MenuSeparatorProps) => {
  return (
    <DropdownMenu.Separator>
      <View style={style} />
    </DropdownMenu.Separator>
  )
}
Separator.displayName = MenuDisplayName.Separator

const CheckboxItem = ({
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
    <DropdownMenu.CheckboxItem
      onFocus={onFocus}
      textValue={textValue}
      onBlur={onBlur}
      disabled={disabled}
      checked={value !== 'off'}
      onCheckedChange={(next) => onValueChange?.(next ? 'on' : 'off', value)}
      style={itemStyleReset}
    >
      <ItemPrimitive style={style}>{children}</ItemPrimitive>
    </DropdownMenu.CheckboxItem>
  )
}
CheckboxItem.displayName = MenuDisplayName.CheckboxItem

const ItemIndicator = ({ style, children }: MenuItemIndicatorProps) => (
  <DropdownMenu.ItemIndicator>
    <View style={style}>{children}</View>
  </DropdownMenu.ItemIndicator>
)
ItemIndicator.displayName = MenuDisplayName.ItemIndicator

const ItemIcon = ({ children, style }: MenuItemIconProps) => {
  return <View style={style}>{children}</View>
}

ItemIcon.displayName = MenuDisplayName.ItemIcon

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
}

export { ItemImage } from './web/item-image'
export { Label } from './web/label'

export { ItemTitle, ItemSubtitle } from '@zeego/menu'
