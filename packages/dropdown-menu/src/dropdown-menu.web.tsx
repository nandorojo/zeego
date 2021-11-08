import {
  ItemPrimitive,
  MenuContentProps,
  MenuGroupProps,
  MenuItemProps,
  MenuRootProps,
  MenuSeparatorProps,
  MenuTriggerItemProps,
  MenuTriggerProps,
} from '@zeeg/menu'
import { View } from 'react-native'
import { forwardRef } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

const Root = ({ children }: MenuRootProps) => {
  return <DropdownMenu.Root>{children}</DropdownMenu.Root>
}
Root.displayName = 'Root'

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
Trigger.displayName = 'Trigger'

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
Content.displayName = 'Content'

const Item = ({ children, disabled, onSelect, style }: MenuItemProps) => {
  return (
    <DropdownMenu.Item disabled={disabled} onSelect={onSelect}>
      <ItemPrimitive style={style}>{children}</ItemPrimitive>
    </DropdownMenu.Item>
  )
}
Item.displayName = 'Item'

const TriggerItem = ({ children, style }: MenuTriggerItemProps) => {
  return (
    <DropdownMenu.TriggerItem>
      <ItemPrimitive style={style}>{children}</ItemPrimitive>
    </DropdownMenu.TriggerItem>
  )
}
TriggerItem.displayName = 'TriggerItem'

const Group = ({ children }: MenuGroupProps) => {
  return <DropdownMenu.Group>{children}</DropdownMenu.Group>
}
Group.displayName = 'Group'

const Separator = ({ style }: MenuSeparatorProps) => {
  return (
    <DropdownMenu.Separator>
      <View style={style} />
    </DropdownMenu.Separator>
  )
}

export { Root, Trigger, Content, Item, TriggerItem, Group, Separator }

export { ItemIcon } from './web/item-icon'

export { ItemTitle, ItemSubtitle } from '@zeeg/menu'
