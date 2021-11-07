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

const Trigger = ({ children }: MenuTriggerProps) => <>{children}</>

const Content = ({ children }: MenuContentProps) => {
  return <>{children}</>
}

const Item = ({ children }: MenuItemProps) => {
  return <>{children}</>
}

const TriggerItem = ({ children }: MenuTriggerItemProps) => {
  return <>{children}</>
}

const ItemTitle = ({ children }: MenuItemTitleProps) => {
  return <>{children}</>
}

const ItemSubtitle = ({ children }: MenuItemSubtitleProps) => {
  return <>{children}</>
}

const Group = ({ children }: MenuGroupProps) => {
  return <>{children}</>
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
}
