import React from 'react'

export const MenuDisplayName = {
  Root: 'Root',
  Item: 'Item',
  Content: 'Content',
  Separator: 'Separator',
  Group: 'Group',
  ItemTitle: 'ItemTitle',
  ItemSubtitle: 'ItemSubtitle',
  ItemIcon: 'ItemIcon',
  Trigger: 'Trigger',
  TriggerItem: 'TriggerItem',
}

type DisplayNames = typeof MenuDisplayName

export const menuify = <Props extends any>(
  Component: React.ComponentType<Props>,
  displayName: DisplayNames[keyof DisplayNames]
) => {
  const MenuComponent: React.FC<Props> = (props: Props) => {
    return <Component {...(props as any)} />
  }
  MenuComponent.displayName = displayName

  return MenuComponent
}
