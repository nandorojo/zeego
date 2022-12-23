import React from 'react'
import {
  ItemPrimitive,
  MenuContentProps,
  MenuGroupProps,
  MenuItemProps,
  MenuRootProps,
  MenuSeparatorProps,
  MenuSubTriggerProps,
  MenuTriggerProps,
  MenuDisplayName,
  MenuCheckboxItemProps,
  MenuItemIndicatorProps,
  MenuItemIconProps,
  create,
  MenuArrowProps,
  MenuSubProps,
  MenuSubContentProps,
} from '../menu'
import { View } from 'react-native'
import { forwardRef } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

const Root = ({ children, onOpenChange }: MenuRootProps) => {
  return (
    <DropdownMenu.Root onOpenChange={onOpenChange}>
      {children}
    </DropdownMenu.Root>
  )
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
  collisionPadding,
  sideOffset,
}: MenuContentProps) => {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        loop={loop}
        side={side}
        align={align}
        alignOffset={alignOffset}
        avoidCollisions={avoidCollisions}
        collisionPadding={collisionPadding}
        sideOffset={sideOffset}
      >
        <ContentView style={style}>{children}</ContentView>
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
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
    </DropdownMenu.Item>
  )
}
Item.displayName = MenuDisplayName.Item

const SubTrigger = ({
  children,
  style,
  textValue,
  disabled,
  onBlur,
  onFocus,
}: MenuSubTriggerProps) => {
  return (
    <DropdownMenu.SubTrigger
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
    </DropdownMenu.SubTrigger>
  )
}
SubTrigger.displayName = MenuDisplayName.SubTrigger

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

const Arrow = create(({ style, children, width, height }: MenuArrowProps) => {
  return (
    <DropdownMenu.Arrow height={height} width={width}>
      <View style={[{ height, width }, style]}>{children}</View>
    </DropdownMenu.Arrow>
  )
}, 'Arrow')

const Sub = create(({ children }: MenuSubProps) => {
  return <DropdownMenu.Sub>{children}</DropdownMenu.Sub>
}, 'Sub')

const SubContent = create(
  ({
    children,
    alignOffset,
    avoidCollisions,
    collisionPadding,
    loop,
    sideOffset,
    style,
  }: MenuSubContentProps) => (
    <DropdownMenu.Portal>
      <DropdownMenu.SubContent
        loop={loop}
        alignOffset={alignOffset}
        avoidCollisions={avoidCollisions}
        collisionPadding={collisionPadding}
        sideOffset={sideOffset}
      >
        <ContentView style={style}>{children}</ContentView>
      </DropdownMenu.SubContent>
    </DropdownMenu.Portal>
  ),
  'SubContent'
)

export {
  Root,
  Trigger,
  Content,
  Item,
  SubTrigger,
  Group,
  Separator,
  CheckboxItem,
  ItemIndicator,
  ItemIcon,
  Arrow,
  Sub,
  SubContent,
}

export { ItemImage } from '../menu/web-primitives/item-image'
export { Label } from './web/label'

export { ItemTitle, ItemSubtitle } from '../menu'
