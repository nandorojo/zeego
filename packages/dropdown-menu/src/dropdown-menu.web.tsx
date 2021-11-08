import type {
  MenuContentProps,
  MenuGroupProps,
  MenuItemProps,
  MenuItemSubtitleProps,
  MenuItemTitleProps,
  MenuRootProps,
  MenuTriggerItemProps,
  MenuTriggerProps,
} from '@zeeg/menu'
import { Text, View } from 'react-native'
import { createElement, forwardRef } from 'react'

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
  const Component = typeof children == 'string' ? Text : View
  return (
    <DropdownMenu.Item disabled={disabled} onSelect={onSelect}>
      <View>
        {createElement(
          Component,
          {
            style,
            // @ts-expect-error
            selectable: false,
          },
          children
        )}
      </View>
    </DropdownMenu.Item>
  )
}
Item.displayName = 'Item'

const TriggerItem = ({ children, style }: MenuTriggerItemProps) => {
  return (
    <DropdownMenu.TriggerItem>
      <View>
        <Text style={style} selectable={false}>
          {children}
        </Text>
      </View>
    </DropdownMenu.TriggerItem>
  )
}
TriggerItem.displayName = 'TriggerItem'

const ItemTitle = ({ children, style }: MenuItemTitleProps) => {
  return (
    <Text style={style} selectable={false}>
      {children}
    </Text>
  )
}
ItemTitle.displayName = 'ItemTitle'

const ItemSubtitle = ({ children, style }: MenuItemSubtitleProps) => {
  return (
    <Text style={style} selectable={false}>
      {children}
    </Text>
  )
}
ItemSubtitle.displayName = 'ItemSubtitle'

const Group = ({ children }: MenuGroupProps) => {
  return <DropdownMenu.Group>{children}</DropdownMenu.Group>
}
Group.displayName = 'Group'

export {
  Root,
  Trigger,
  Content,
  Item,
  ItemTitle,
  ItemSubtitle,
  TriggerItem,
  Group,
}
