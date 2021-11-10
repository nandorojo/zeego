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

const Content = ({ children, style }: MenuContentProps) => {
  return (
    <DropdownMenu.Content>
      <ContentView style={style}>{children}</ContentView>
    </DropdownMenu.Content>
  )
}
Content.displayName = MenuDisplayName.Content

const Item = ({
  children,
  disabled,
  onSelect,
  style,
  onBlur,
  onFocus,
}: MenuItemProps) => {
  return (
    <DropdownMenu.Item
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={disabled}
      onSelect={onSelect}
    >
      <ItemPrimitive style={style}>{children}</ItemPrimitive>
    </DropdownMenu.Item>
  )
}
Item.displayName = MenuDisplayName.Item

const TriggerItem = ({ children, style }: MenuTriggerItemProps) => {
  return (
    <DropdownMenu.TriggerItem>
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

const CheckboxItem = ({}: MenuCheckboxItemProps) => {
  return <></>
}
CheckboxItem.displayName = MenuDisplayName.CheckboxItem

export {
  Root,
  Trigger,
  Content,
  Item,
  TriggerItem,
  Group,
  Separator,
  CheckboxItem,
}

export { ItemIcon } from './web/item-icon'

export { ItemTitle, ItemSubtitle } from '@zeego/menu'
