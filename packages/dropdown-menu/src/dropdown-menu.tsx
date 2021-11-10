import {
  MenuContentProps,
  MenuDisplayName,
  MenuGroupProps,
  MenuItemIconProps,
  MenuItemProps,
  MenuItemSubtitleProps,
  MenuItemTitleProps,
  MenuRootProps,
  MenuSeparatorProps,
  MenuTriggerItemProps,
  MenuTriggerProps,
} from '@zeego/menu'
import type { FC } from 'react'

import React from 'react'

const Root: FC<MenuRootProps> = ({ children }) => <>{children}</>
Root.displayName = MenuDisplayName.Root

const Trigger: FC<MenuTriggerProps> = ({ children }) => <>{children}</>
Trigger.displayName = MenuDisplayName.Trigger

const Content: FC<MenuContentProps> = ({ children }) => {
  return <>{children}</>
}
Content.displayName = MenuDisplayName.Content

const Item: FC<MenuItemProps> = ({ children }: MenuItemProps) => {
  return <>{children}</>
}
Item.displayName = MenuDisplayName.Item

const ItemIcon: FC<MenuItemIconProps> = () => {
  return <></>
}
ItemIcon.displayName = MenuDisplayName.ItemIcon

const TriggerItem: FC<MenuTriggerItemProps> = ({ children }) => {
  return <>{children}</>
}
TriggerItem.displayName = MenuDisplayName.TriggerItem

const ItemTitle: FC<MenuItemTitleProps> = ({ children }) => {
  return <>{children}</>
}
ItemTitle.displayName = MenuDisplayName.ItemTitle

const ItemSubtitle: FC<MenuItemSubtitleProps> = ({ children }) => {
  return <>{children}</>
}
ItemSubtitle.displayName = MenuDisplayName.ItemSubtitle

const Group: FC<MenuGroupProps> = ({ children }) => {
  return <>{children}</>
}
Group.displayName = MenuDisplayName.Group

const Separator: FC<MenuSeparatorProps> = () => {
  return <></>
}
Separator.displayName = MenuDisplayName.Separator

export {
  Root,
  Trigger,
  Content,
  Item,
  ItemTitle,
  ItemSubtitle,
  TriggerItem,
  Group,
  ItemIcon,
  Separator,
}
