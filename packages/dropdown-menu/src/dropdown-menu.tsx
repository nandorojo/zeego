import type {
  MenuContentProps,
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

const Root: FC<MenuRootProps> = ({ children }) => <>{children}</>
Root.displayName = 'Root'

const Trigger: FC<MenuTriggerProps> = ({ children }) => <>{children}</>
Trigger.displayName = 'Trigger'

const Content: FC<MenuContentProps> = ({ children }) => {
  return <>{children}</>
}
Content.displayName = 'Content'

const Item: FC<MenuItemProps> = ({ children }: MenuItemProps) => {
  return <>{children}</>
}
Item.displayName = 'Item'

const ItemIcon: FC<MenuItemIconProps> = () => {
  return <></>
}
ItemIcon.displayName = 'ItemIcon'

const TriggerItem: FC<MenuTriggerItemProps> = ({ children }) => {
  return <>{children}</>
}
TriggerItem.displayName = 'TriggerItem'

const ItemTitle: FC<MenuItemTitleProps> = ({ children }) => {
  return <>{children}</>
}
ItemTitle.displayName = 'ItemTitle'

const ItemSubtitle: FC<MenuItemSubtitleProps> = ({ children }) => {
  return <>{children}</>
}
ItemSubtitle.displayName = 'ItemSubtitle'

const Group: FC<MenuGroupProps> = ({ children }) => {
  return <>{children}</>
}
Group.displayName = 'Group'

const Separator: FC<MenuSeparatorProps> = () => {
  return <></>
}

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
