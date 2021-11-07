import type {
  ContextMenuContentProps,
  ContextMenuItemProps,
  ContextMenuItemSubtitleProps,
  ContextMenuItemTitleProps,
  ContextMenuRootProps,
  ContextMenuTriggerItemProps,
  ContextMenuTriggerProps,
} from './types'
import React, { Children, ReactElement } from 'react'
// @ts-expect-error
import { ContextMenuView } from 'react-native-ios-context-menu'
import { flattenChildren, pickChildren } from './pick-children'
import { filterNull } from './filter-null'

const Trigger = ({ children }: ContextMenuTriggerProps) => {
  const child = <>{children}</>

  return <>{child}</>
}

const Content = ({ children }: ContextMenuContentProps) => {
  return <>{children}</>
}
const ItemTitle = ({ children }: ContextMenuItemTitleProps) => {
  if (typeof children != 'string') {
    throw new Error('[zeeg] <ItemTitle /> child must be a string')
  }
  return <>{children}</>
}
const ItemSubtitle = ({ children }: ContextMenuItemSubtitleProps) => {
  if (children && typeof children != 'string') {
    throw new Error('[zeeg] <ItemSubtitle /> child must be a string')
  }
  return <>{children}</>
}
const Item = ({ children }: ContextMenuItemProps) => {
  const titleChild = pickChildren(children, ItemTitle).targetChildren
  if (typeof children != 'string' && !titleChild?.length) {
    console.error(
      `[zeeg] Invalid <Item />. It either needs a string as the children, or a <ItemTitle /> in the children. However, it got neither.

<Item>
  Title here
</Item>

  Or:

<Item>
 <ItemTitle>
  Title here
 </ItemTitle>
</Item>
  `
    )
  }
  return <>{children}</>
}

const TriggerItem = ({ children }: ContextMenuTriggerItemProps) => {
  const titleChild = pickChildren(children, ItemTitle).targetChildren
  if (typeof children != 'string' && !titleChild?.length) {
    console.error(
      `[zeeg] Invalid <TriggerItem />. It either needs a string as the children, or a <ItemTitle /> in the children. However, it got neither.

<TriggerItem>
  Title here
</TriggerItem>

  Or:

<TriggerItem>
 <ItemTitle>
  Title here
 </ItemTitle>
</TriggerItem>
  `
    )
  }
  return <>{children}</>
}

type MenuAttribute = 'disabled' | 'destructive' | 'displayinline'

type MenuAttributes = MenuAttribute[]

type MenuConfig = {
  menuTitle: string
  menuItems: (MenuItem | MenuConfig)[]
}

type MenuItem = {
  actionKey: string
  actionTitle: string
  discoverabilityTitle?: string
  menuAttributes?: MenuAttributes
}

function isMenuConfig(
  configOrItem: MenuItem | MenuConfig
): configOrItem is MenuConfig {
  return (configOrItem as MenuConfig).menuItems !== undefined
}

const Root = (props: ContextMenuRootProps) => {
  const trigger = pickChildren(props.children, Trigger)

  const callbacks: Record<string, () => void> = {}

  const mapItemsChildren = (
    children: React.ReactNode
  ): (typeof menuItems[number] | null)[] => {
    return Children.map(flattenChildren(children), (_child, index) => {
      if ((_child as ReactElement<ContextMenuItemProps>).type === Item) {
        const child = _child as ReactElement<ContextMenuItemProps>
        let title: string | undefined
        const key: string = child.key ? `${child.key}` : `item-${index}`
        let subtitle: string | undefined
        const menuAttributes: MenuAttributes = []

        if (typeof child.props.children == 'string') {
          title = child.props.children
        } else {
          const titleChild = pickChildren<ContextMenuItemTitleProps>(
            child.props.children,
            ItemTitle
          ).targetChildren
          const subtitleChild = pickChildren<ContextMenuItemSubtitleProps>(
            child.props.children,
            ItemSubtitle
          ).targetChildren

          title = titleChild?.[0].props.children
          if (typeof subtitleChild?.[0].props.children == 'string') {
            subtitle = subtitleChild[0].props.children
          }
        }
        if (title) {
          if (
            // if the key doesn't exist as a string
            typeof child.key != 'string' ||
            // or if flattenChildren assigned the key as `.${key}${index}`
            (child.key.startsWith('.') && !isNaN(Number(child.key[1])))
          ) {
            console.warn(
              `[zeeg] <Item /> is missing a unique key. Pass a unique key string for each item, such as: <Item key="${
                title.toLowerCase().replace(/ /g, '-') || `action-${index}`
              }" />. Falling back to index instead, but this may have negative consequences.`
            )
          }
          if (child.props.onSelect) {
            callbacks[key] = child.props.onSelect
          }
          return {
            actionKey: key,
            actionTitle: title,
            discoverabilityTitle: subtitle,
            menuAttributes,
          }
        }
      } else if ((_child as ReactElement<ContextMenuRootProps>).type === Root) {
        const child = _child as ReactElement<ContextMenuRootProps>
        const triggerItemChildren = pickChildren<ContextMenuTriggerItemProps>(
          child.props.children,
          TriggerItem
        ).targetChildren
        let menuTitle: string | undefined

        if (typeof triggerItemChildren?.[0].props.children == 'string') {
          menuTitle = triggerItemChildren[0].props.children
        } else {
          const titleChild = pickChildren<ContextMenuItemTitleProps>(
            triggerItemChildren?.[0].props.children,
            ItemTitle
          ).targetChildren
          menuTitle = titleChild?.[0].props.children
        }

        const nestedContent = pickChildren(
          child.props.children,
          Content
        ).targetChildren

        if (menuTitle) {
          if (nestedContent?.[0]) {
            const nestedItems = mapItemsChildren(
              nestedContent?.[0].props.children
            ).filter(filterNull)

            if (nestedItems.length) {
              const menuConfig: MenuConfig = {
                menuTitle,
                menuItems: nestedItems,
              }
              return menuConfig
            }
          }
        }
      }
      return null
    })
  }

  let menuItems: (MenuItem | MenuConfig)[] = []

  Children.forEach(flattenChildren(props.children), (_child, index) => {
    const child = _child as ReactElement
    if (child.type === Content) {
      menuItems.push(
        ...mapItemsChildren(
          (child as ReactElement<ContextMenuContentProps>).props.children
        ).filter(filterNull)
      )
    }
  })

  return (
    <ContextMenuView
      // `ContextMenuView` Props
      onPressMenuItem={({
        nativeEvent,
      }: {
        nativeEvent: {
          target?: number
          actionKey: string
          actionTitle: string
          menuAttributes?: []
          icon: {
            iconType: string
            iconValue: string
          } | null
        }
      }) => {
        if (callbacks[nativeEvent.actionKey]) {
          callbacks[nativeEvent.actionKey]()
        }
      }}
      onPressMenuPreview={() => alert('onPressMenuPreview')}
      menuConfig={{
        menuTitle: '',
        menuItems: menuItems,
      }}
    >
      <>{trigger.targetChildren}</>
    </ContextMenuView>
  )
}

export { Root, Trigger, Content, Item, ItemTitle, ItemSubtitle, TriggerItem }
