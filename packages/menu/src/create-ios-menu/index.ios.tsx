import type {
  MenuContentProps,
  MenuGroupProps,
  MenuItemProps,
  MenuItemSubtitleProps,
  MenuItemTitleProps,
  MenuRootProps,
  MenuTriggerItemProps,
  MenuTriggerProps,
} from '../types'
import React, { Children, ReactElement } from 'react'
import {
  flattenChildren,
  pickChildren,
  isInstanceOfComponent,
} from '../children'
import { filterNull } from '../filter-null'
import {
  ContextMenuButton,
  ContextMenuView,
  // @ts-expect-error
} from 'react-native-ios-context-menu'

const createIosMenu = (Menu: 'ContextMenu' | 'DropdownMenu') => {
  const Trigger = ({ children }: MenuTriggerProps) => {
    const child = <>{children}</>

    return <>{Children.only(child)}</>
  }
  Trigger.displayName = 'Trigger'

  const Group = ({ children }: MenuGroupProps) => {
    return <>{children}</>
  }
  Group.displayName = 'Group'

  const Content = ({ children }: MenuContentProps) => {
    return <>{children}</>
  }
  Content.displayName = 'Content'
  const ItemTitle = ({ children }: MenuItemTitleProps) => {
    if (typeof children != 'string') {
      throw new Error('[zeeg] <ItemTitle /> child must be a string')
    }
    return <>{children}</>
  }
  ItemTitle.displayName = 'ItemTitle'
  const ItemSubtitle = ({ children }: MenuItemSubtitleProps) => {
    if (children && typeof children != 'string') {
      throw new Error('[zeeg] <ItemSubtitle /> child must be a string')
    }
    return <>{children}</>
  }
  ItemSubtitle.displayName = 'ItemSubtitle'
  const Item = ({ children }: MenuItemProps) => {
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
  Item.displayName = 'Item'

  const TriggerItem = ({ children }: MenuTriggerItemProps) => {
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
  TriggerItem.displayName = 'TriggerItem'

  type MenuOption = 'destructive' | 'displayInline'
  type MenuAttribute = 'disabled' | 'destructive' | 'hidden'

  type MenuAttributes = MenuAttribute[]
  type MenuOptions = MenuOption[]

  type MenuConfig = {
    menuTitle: string
    menuItems: (MenuItem | MenuConfig)[]
    menuAttributes?: MenuAttributes
    menuOptions?: MenuOptions
  }

  type MenuItem = {
    actionKey: string
    actionTitle: string
    discoverabilityTitle?: string
    menuAttributes?: MenuAttributes
    menuOptions?: MenuOptions
  }

  const Root = (props: MenuRootProps) => {
    const trigger = pickChildren(props.children, Trigger)

    const callbacks: Record<string, () => void> = {}

    const mapItemsChildren = (
      children: React.ReactNode
    ): (typeof menuItems[number] | null)[] => {
      return Children.map(flattenChildren(children), (_child, index) => {
        if (isInstanceOfComponent(_child, Item)) {
          const child = _child as ReactElement<MenuItemProps>

          let title: string | undefined
          const key: string = child.key ? `${child.key}` : `item-${index}`
          let subtitle: string | undefined
          const menuAttributes: MenuAttributes = []

          if (child.props.disabled) {
            menuAttributes.push('disabled')
          }

          if (typeof child.props.children == 'string') {
            title = child.props.children
          } else {
            const titleChild = pickChildren<MenuItemTitleProps>(
              child.props.children,
              ItemTitle
            ).targetChildren
            const subtitleChild = pickChildren<MenuItemSubtitleProps>(
              child.props.children,
              ItemSubtitle
            ).targetChildren

            title = titleChild?.[0]?.props.children
            if (typeof subtitleChild?.[0]?.props.children == 'string') {
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
          // } else if ((_child as ReactElement<MenuRootProps>).type === Root) {
        } else if (isInstanceOfComponent(_child, Root)) {
          const child = _child as ReactElement<MenuRootProps>
          const triggerItemChildren = pickChildren<MenuTriggerItemProps>(
            child.props.children,
            TriggerItem
          ).targetChildren
          let menuTitle: string | undefined

          if (typeof triggerItemChildren?.[0].props.children == 'string') {
            menuTitle = triggerItemChildren[0].props.children
          } else if (triggerItemChildren?.[0]) {
            const titleChild = pickChildren<MenuItemTitleProps>(
              triggerItemChildren?.[0].props.children,
              ItemTitle
            ).targetChildren
            menuTitle = titleChild?.[0]?.props.children
          }

          const nestedContent = pickChildren<MenuContentProps>(
            child.props.children,
            Content
          ).targetChildren?.[0]

          if (nestedContent) {
            const nestedItems = mapItemsChildren(
              nestedContent.props.children
            ).filter(filterNull)

            if (menuTitle) {
              if (nestedItems.length) {
                const menuOptions: MenuOptions = []
                const menuConfig: MenuConfig = {
                  menuTitle,
                  menuItems: nestedItems,
                  menuOptions,
                }
                return menuConfig
              }
            }
          }
        } else if (isInstanceOfComponent(_child, Group)) {
          // } else if ((_child as ReactElement<MenuGroupProps>).type === Group) {
          const child = _child as ReactElement<MenuGroupProps>

          const groupItems = mapItemsChildren(child.props.children).filter(
            filterNull
          )

          return {
            menuTitle: '',
            menuItems: groupItems,
            menuOptions: ['displayInline'],
          }
        }
        return null
      })
    }

    let menuItems: (MenuItem | MenuConfig)[] = []

    Children.forEach(flattenChildren(props.children), (_child) => {
      const child = _child as ReactElement
      if (isInstanceOfComponent(child, Content)) {
        menuItems.push(
          ...mapItemsChildren(
            (child as ReactElement<MenuContentProps>).props.children
          ).filter(filterNull)
        )
      }
    })

    const Component =
      Menu === 'ContextMenu' ? ContextMenuView : ContextMenuButton

    return (
      <Component
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
        isMenuPrimaryAction={Menu === 'DropdownMenu'}
        style={[{ flexGrow: 0 }, props.style]}
        wrapNativeComponent={false}
        // onPressMenuPreview={() => alert('onPressMenuPreview')}
        menuConfig={{
          menuTitle: '',
          menuItems: menuItems,
        }}
      >
        {trigger.targetChildren?.[0]}
      </Component>
    )
  }
  Root.displayName = 'Root'

  return {
    Root,
    Trigger,
    Content,
    Item,
    ItemTitle,
    ItemSubtitle,
    TriggerItem,
    Group,
  }
}

export { createIosMenu }
