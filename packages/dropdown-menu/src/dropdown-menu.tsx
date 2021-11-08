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
