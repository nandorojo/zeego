import * as ContextMenu from '@radix-ui/react-context-menu'
import React, { forwardRef } from 'react'
import { View } from 'react-native'

import {
  ItemPrimitive,
  ContextMenuContentProps,
  MenuGroupProps,
  MenuItemProps,
  MenuRootProps,
  MenuSeparatorProps,
  MenuSubTriggerProps,
  MenuTriggerProps,
  MenuCheckboxItemProps,
  MenuItemIndicatorProps,
  MenuItemIconProps,
  create,
  MenuArrowProps,
  ContextMenuSubContentProps,
  MenuSubProps,
} from '../menu'

const Root = create(({ children }: MenuRootProps) => {
  return <ContextMenu.Root>{children}</ContextMenu.Root>
}, 'Root')

const TriggerView = forwardRef<unknown, any>((props, ref) => {
  return (
    <View ref={ref} {...props} onClickCapture={props.onPointerDown}>
      {props.children}
    </View>
  )
})

const Trigger = create(({ children, style }: MenuTriggerProps) => {
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

const Content = create(
  ({
    children,
    style,
    loop,
    alignOffset,
    avoidCollisions,
    collisionPadding,
  }: ContextMenuContentProps) => {
    return (
      <ContextMenu.Portal>
        <ContextMenu.Content
          loop={loop}
          alignOffset={alignOffset}
          avoidCollisions={avoidCollisions}
          collisionPadding={collisionPadding}
        >
          <ContentView style={style}>{children}</ContentView>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    )
  },
  'Content'
)

const itemStyleReset = {
  outlineWidth: 0,
}

const Item = create(
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

const SubTrigger = create(
  ({
    children,
    style,
    textValue,
    disabled,
    onBlur,
    onFocus,
  }: MenuSubTriggerProps) => {
    return (
      <ContextMenu.SubTrigger
        disabled={disabled}
        textValue={textValue}
        onBlur={onBlur}
        onFocus={onFocus}
        style={itemStyleReset}
      >
        <ItemPrimitive
          // this is for consumers
          // however, it isn't relevant locally here, since the key will be passed to the parent component
          // so that is sufficient
          key={undefined as any}
          style={style}
        >
          {children}
        </ItemPrimitive>
      </ContextMenu.SubTrigger>
    )
  },
  'SubTrigger'
)

const Group = create(({ children }: MenuGroupProps) => {
  return <ContextMenu.Group>{children}</ContextMenu.Group>
}, 'Group')

const Separator = create(({ style }: MenuSeparatorProps) => {
  return (
    <ContextMenu.Separator>
      <View style={style} />
    </ContextMenu.Separator>
  )
}, 'Separator')

const CheckboxItem = create(
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
        checked={typeof value === 'boolean' ? value : value !== 'off'}
        onCheckedChange={(next) =>
          onValueChange?.(
            next ? 'on' : 'off',
            value === true ? 'on' : value === false ? 'off' : value
          )
        }
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

const ItemIndicator = create(
  ({ style, children }: MenuItemIndicatorProps) => (
    <ContextMenu.ItemIndicator>
      <View style={style}>{children}</View>
    </ContextMenu.ItemIndicator>
  ),
  'ItemIndicator'
)

const ItemIcon = create(({ children, style }: MenuItemIconProps) => {
  return <View style={style}>{children}</View>
}, 'ItemIcon')

const Preview = create(() => <></>, 'Preview')

const Arrow = create(({ style, children, width, height }: MenuArrowProps) => {
  return (
    <ContextMenu.Arrow width={width} height={height}>
      <View style={[{ height, width }, style]}>{children}</View>
    </ContextMenu.Arrow>
  )
}, 'Arrow')

const Sub = create(({ children }: MenuSubProps) => {
  return <ContextMenu.Sub>{children}</ContextMenu.Sub>
}, 'Sub')

const SubContent = create(
  ({
    children,
    alignOffset,
    avoidCollisions,
    collisionPadding,
    loop,
    style,
    sideOffset,
  }: ContextMenuSubContentProps) => (
    <ContextMenu.Portal>
      <ContextMenu.SubContent
        loop={loop}
        alignOffset={alignOffset}
        avoidCollisions={avoidCollisions}
        collisionPadding={collisionPadding}
        sideOffset={sideOffset}
      >
        <ContentView style={style}>{children}</ContentView>
      </ContextMenu.SubContent>
    </ContextMenu.Portal>
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
  Preview,
  Arrow,
  Sub,
  SubContent,
}

export { ItemImage } from '../menu/web-primitives/item-image'
export { Label } from './web/label'

export { ItemTitle, ItemSubtitle } from '../menu'
