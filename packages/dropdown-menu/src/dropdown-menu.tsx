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

const Root = ({ children }: MenuRootProps) => <>{children}</>
Root.displayName = 'Root'

const Trigger = ({ children }: MenuTriggerProps) => <>{children}</>
Trigger.displayName = 'Trigger'

const Content = ({ children }: MenuContentProps) => {
  return <>{children}</>
}
Content.displayName = 'Content'

const Item = ({ children }: MenuItemProps) => {
  return <>{children}</>
}
Item.displayName = 'Item'

const ItemIcon = ({}: MenuItemIconProps) => {
  return <>{}</>
}
ItemIcon.displayName = 'ItemIcon'

const TriggerItem = ({ children }: MenuTriggerItemProps) => {
  return <>{children}</>
}
TriggerItem.displayName = 'TriggerItem'

const ItemTitle = ({ children }: MenuItemTitleProps) => {
  return <>{children}</>
}
ItemTitle.displayName = 'ItemTitle'

const ItemSubtitle = ({ children }: MenuItemSubtitleProps) => {
  return <>{children}</>
}
ItemSubtitle.displayName = 'ItemSubtitle'

const Group = ({ children }: MenuGroupProps) => {
  return <>{children}</>
}
Group.displayName = 'Group'

const Separator = (_: MenuSeparatorProps) => {
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
