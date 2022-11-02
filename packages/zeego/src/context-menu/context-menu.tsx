import {
  ContextMenuContentProps,
  ContextMenuPreviewProps,
  create,
  MenuCheckboxItemProps,
  MenuDisplayName,
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
  MenuSubContentProps,
  MenuSubProps,
  MenuSubTriggerProps,
  MenuTriggerProps,
} from '../menu'
import type { FC } from 'react'

import type { MenuArrowProps } from '@radix-ui/react-dropdown-menu'

const Root: FC<MenuRootProps> = ({ children }) => <>{children}</>
Root.displayName = MenuDisplayName.Root

const Trigger: FC<MenuTriggerProps> = ({ children }) => <>{children}</>
Trigger.displayName = MenuDisplayName.Trigger

const Content: FC<ContextMenuContentProps> = ({ children }) => {
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

const ItemImage: FC<MenuItemImageProps> = () => {
  return <></>
}
ItemImage.displayName = MenuDisplayName.ItemImage

const SubTrigger: FC<MenuSubTriggerProps> = ({ children }) => {
  return <>{children}</>
}
SubTrigger.displayName = MenuDisplayName.SubTrigger

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

const CheckboxItem: FC<MenuCheckboxItemProps> = () => <></>
CheckboxItem.displayName = MenuDisplayName.CheckboxItem

const ItemIndicator: FC<MenuItemIndicatorProps> = () => <></>
ItemIndicator.displayName = MenuDisplayName.ItemIndicator

const Label: FC<MenuLabelProps> = () => <></>
Label.displayName = MenuDisplayName.Label

const Preview: FC<ContextMenuPreviewProps> = () => <></>
Preview.displayName = MenuDisplayName.Preview

const Arrow = create((_: MenuArrowProps) => <></>, 'Arrow')

const Sub = create((_: MenuSubProps) => <></>, 'Sub')

const SubContent = create((_: MenuSubContentProps) => <></>, 'SubContent')
export {
  Root,
  Trigger,
  Content,
  Item,
  ItemTitle,
  ItemSubtitle,
  SubTrigger,
  Group,
  ItemIcon,
  Separator,
  CheckboxItem,
  ItemIndicator,
  ItemImage,
  Label,
  Preview,
  Arrow,
  Sub,
  SubContent,
}
