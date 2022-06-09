import type {
  MenuContentProps,
  MenuGroupProps,
  MenuItemProps,
  MenuItemSubtitleProps,
  MenuItemTitleProps,
  MenuRootProps,
  MenuTriggerItemProps,
  MenuTriggerProps,
  MenuItemIconProps,
  MenuCheckboxItemProps,
  MenuSeparatorProps,
  MenuItemImageProps,
  MenuItemIndicatorProps,
  MenuLabelProps,
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
import { menuify } from '../display-names'
import { View } from 'react-native'

const createIosMenu = (Menu: 'ContextMenu' | 'DropdownMenu') => {
  const Trigger = menuify(({ children, style }: MenuTriggerProps) => {
    const child = <>{children}</>

    return <View style={style}>{Children.only(child)}</View>
  }, 'Trigger')

  const Group = menuify(({ children }: MenuGroupProps) => {
    return <>{children}</>
  }, 'Group')

  const Content = menuify(({ children }: MenuContentProps) => {
    if (!children) {
      console.error(`[zeego] <Content /> children must be written directly inline.

You cannot wrap this component into its own component. It should look like this:

<Root>
  <Content>
    <Item />
    <Item />
  </Content>
</Root>

Notice that the <Item /> are all children of the <Content /> component. That's important.

If you want to use a custom component as your <Content />, you can use the menuify() method. But you still need to pass all items as children of <Content />.`)
    }
    return <>{children}</>
  }, 'Content')

  const ItemTitle = menuify(({ children }: MenuItemTitleProps) => {
    if (typeof children != 'string') {
      throw new Error('[zeego] <ItemTitle /> child must be a string')
    }
    return <>{children}</>
  }, 'ItemTitle')

  const ItemIcon = menuify((props: MenuItemIconProps) => {
    if (!props.iosIconName) {
      console.warn(
        '[zeego] <ItemIcon /> missing iosIconName prop. Will do nothing on iOS. Consider passing an iosIconImage or switching to <ItemImage />.'
      )
    }
    return <>{}</>
  }, 'ItemIcon')

  const ItemImage = menuify((props: MenuItemImageProps) => {
    // if (!props.source) {
    //   console.error('[zeego] <ItemImage /> missing source prop.')
    // }
    if (!props.iosIconName) {
      console.warn(
        '[zeego] <ItemImage /> will not use your custom image on iOS. You should use the iosIconName prop to render an icon on iOS too.'
      )
    }
    return <>{}</>
  }, 'ItemImage')

  const ItemSubtitle = menuify(({ children }: MenuItemSubtitleProps) => {
    if (children && typeof children != 'string') {
      throw new Error('[zeego] <ItemSubtitle /> child must be a string')
    }
    return <>{children}</>
  }, 'ItemSubtitle')

  const Item = menuify(({ children }: MenuItemProps) => {
    const titleChild = pickChildren(children, ItemTitle).targetChildren
    if (typeof children != 'string' && !titleChild?.length) {
      console.error(
        `[zeego] Invalid <Item />. It either needs <ItemTitle /> in the children.

<Item>
  <ItemTitle>
    Title here
  </ItemTitle>
</Item>
  `
      )
    }
    return <>{children}</>
  }, 'Item')

  const TriggerItem = menuify(({ children }: MenuTriggerItemProps) => {
    const titleChild = pickChildren(children, ItemTitle).targetChildren
    if (typeof children != 'string' && !titleChild?.length) {
      console.error(
        `[zeego] Invalid <TriggerItem />. It either needs a string as the children, or a <ItemTitle /> in the children. However, it got neither.


<TriggerItem>
  <ItemTitle>
    Title here
  </ItemTitle>
</TriggerItem>
  `
      )
    }
    return <>{children}</>
  }, 'TriggerItem')

  const CheckboxItem = menuify(({}: MenuCheckboxItemProps) => {
    return <></>
  }, 'CheckboxItem')

  const Label = menuify(({ children }: MenuLabelProps) => {
    if (typeof children != 'string') {
      console.error('[zeego] <Label /> children must be a string.')
    }
    return <></>
  }, 'Label')

  type MenuOption = 'destructive' | 'displayInline'
  type MenuAttribute = 'disabled' | 'destructive' | 'hidden'

  type MenuAttributes = MenuAttribute[]
  type MenuOptions = MenuOption[]

  type MenuConfig = {
    menuTitle: string
    menuItems: (MenuItem | MenuConfig)[]
    menuAttributes?: MenuAttributes
    menuOptions?: MenuOptions
    icon?: MenuItemIcon
  }

  type MenuItemIcon =
    | {
        iconType: 'SYSTEM'
        iconValue: string
      }
    | {
        iconType: 'REQUIRE'
        iconValue: unknown
      }

  type MenuItem = {
    actionKey: string
    actionTitle: string
    discoverabilityTitle?: string
    menuAttributes?: MenuAttributes
    menuOptions?: MenuOptions
    icon?: MenuItemIcon
    menuState?: 'on' | 'off' | 'mixed'
  }

  const Root = menuify((props: MenuRootProps) => {
    const trigger = pickChildren<MenuTriggerProps>(props.children, Trigger)
    const content = pickChildren<MenuContentProps>(props.children, Content)
      .targetChildren?.[0]

    const callbacks: Record<string, () => void> = {}

    const getItemFromChild = (
      child: ReactElement<
        MenuItemProps | MenuTriggerItemProps | MenuCheckboxItemProps
      >,
      index: number
    ) => {
      let title: string | undefined
      const key: string = child.key ? `${child.key}` : `item-${index}`
      let subtitle: string | undefined
      const menuAttributes: MenuAttributes = []

      if (child.props.disabled) {
        menuAttributes.push('disabled')
      }
      if (child.props.destructive) {
        menuAttributes.push('destructive')
      }
      if (child.props.hidden) {
        menuAttributes.push('hidden')
      }

      let icon: MenuItem['icon']

      if (typeof child.props.children == 'string') {
        title = child.props.children
      } else {
        const titleChild = pickChildren<MenuItemTitleProps>(
          child.props.children,
          ItemTitle
        ).targetChildren

        title = titleChild?.[0]?.props.children

        const subtitleChild = pickChildren<MenuItemSubtitleProps>(
          child.props.children,
          ItemSubtitle
        ).targetChildren
        if (typeof subtitleChild?.[0]?.props.children == 'string') {
          subtitle = subtitleChild[0].props.children
        }

        const iconChildren = pickChildren<MenuItemIconProps>(
          child.props.children,
          ItemIcon
        ).targetChildren

        if (iconChildren?.[0]?.props.iosIconName) {
          icon = {
            iconType: 'SYSTEM',
            iconValue: iconChildren[0].props.iosIconName,
          }
        } else {
          const imageChild = pickChildren<MenuItemImageProps>(
            child.props.children,
            ItemImage
          ).targetChildren?.[0]

          if (imageChild) {
            const { iosIconName } = imageChild.props
            if (iosIconName) {
              icon = {
                iconType: 'SYSTEM',
                iconValue: iosIconName,
              }
            } else {
              // require('react-native/Libraries/Network/RCTNetworking')
              // const { Image } =
              //   require('react-native') as typeof import('react-native')
              // const iconValue = Image.resolveAssetSource(source)
              // icon = {
              //   iconType: 'REQUIRE',
              //   iconValue,
              // }
            }
          }
        }
      }
      if (title) {
        const maybeIndexKey =
          typeof child.key == 'string' && child.key.startsWith('.')
            ? child.key.substring(1)
            : undefined

        if (
          // if the key doesn't exist as a string
          typeof child.key != 'string' ||
          // or if flattenChildren assigned the key as `.${key}${index}`
          (child.key.startsWith('.') && !isNaN(Number(maybeIndexKey)))
        ) {
          console.warn(
            `[zeego] <Item /> is missing a unique key. Pass a unique key string for each item, such as: <Item key="${
              title.toLowerCase().replace(/ /g, '-') || `action-${index}`
            }" />. Falling back to index (${key}) instead, but this may have negative consequences.`
          )
        }
        if ('onSelect' in child.props && child.props.onSelect) {
          callbacks[key] = child.props.onSelect
        } else if ('onValueChange' in child.props) {
          const menuState = child.props.value
          const nextState =
            menuState === 'mixed' || menuState === 'on' ? 'off' : 'on'
          const { onValueChange } = child.props
          callbacks[key] = () => {
            onValueChange?.(nextState, menuState)
          }
        }

        return {
          key,
          title,
          subtitle,
          menuAttributes,
          icon,
        }
      }
      return
    }

    const mapItemsChildren = (
      children: React.ReactNode
    ): ((MenuItem | MenuConfig) | null)[] => {
      return Children.map(flattenChildren(children), (_child, index) => {
        if (isInstanceOfComponent(_child, Item)) {
          const child = _child as ReactElement<MenuItemProps>

          const item = getItemFromChild(child, index)
          if (item) {
            const { icon, title, key, menuAttributes, subtitle } = item
            const finalItem: MenuItem = {
              actionKey: key,
              actionTitle: title,
              icon,
              menuAttributes,
              discoverabilityTitle: subtitle,
            }
            return finalItem
          }
        } else if (isInstanceOfComponent(_child, CheckboxItem)) {
          const child = _child as ReactElement<MenuCheckboxItemProps>

          const item = getItemFromChild(child, index)
          if (item) {
            const { icon, title, key, menuAttributes, subtitle } = item
            const menuState = child.props.value

            const finalItem: MenuItem = {
              actionKey: key,
              actionTitle: title,
              icon,
              menuAttributes,
              discoverabilityTitle: subtitle,
              menuState,
            }
            return finalItem
          }
        } else if (isInstanceOfComponent(_child, Root)) {
          const child = _child as ReactElement<MenuRootProps>
          const triggerItemChild = pickChildren<MenuTriggerItemProps>(
            child.props.children,
            TriggerItem
          ).targetChildren?.[0]

          const triggerItem =
            triggerItemChild && getItemFromChild(triggerItemChild, index)
          if (triggerItem) {
            const nestedContent = pickChildren<MenuContentProps>(
              child.props.children,
              Content
            ).targetChildren?.[0]

            if (nestedContent) {
              const nestedItems = mapItemsChildren(
                nestedContent.props.children
              ).filter(filterNull)

              if (nestedItems.length) {
                const menuOptions: MenuOptions = []
                const menuConfig: MenuConfig = {
                  menuTitle: triggerItem?.title,
                  icon: triggerItem?.icon,
                  menuItems: nestedItems,
                  menuOptions,
                  menuAttributes: triggerItem.menuAttributes,
                }
                return menuConfig
              }
            }
          }
        } else if (isInstanceOfComponent(_child, Group)) {
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

    // let menuItems: (MenuItem | MenuConfig)[] = []

    // Children.forEach(flattenChildren(props.children), (_child) => {
    //   const child = _child as ReactElement
    //   if (isInstanceOfComponent(child, Content)) {
    //     menuItems.push(
    //       ...mapItemsChildren(
    //         (child as ReactElement<MenuContentProps>).props.children
    //       ).filter(filterNull)
    //     )
    //   }
    // })

    const menuItems = mapItemsChildren(content?.props.children).filter(
      filterNull
    )

    const label = pickChildren<MenuLabelProps>(content?.props.children, Label)
      .targetChildren?.[0]?.props.children
    let menuTitle = ''
    if (typeof label == 'string') {
      menuTitle = label
    }

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
        menuConfig={{
          menuTitle,
          menuItems: menuItems,
        }}
      >
        {trigger.targetChildren?.[0]}
      </Component>
    )
  }, 'Root')

  const Separator = menuify((_: MenuSeparatorProps) => {
    return <></>
  }, 'Separator')

  const ItemIndicator = menuify(
    (_: MenuItemIndicatorProps) => <></>,
    'ItemIndicator'
  )

  return {
    Root,
    Trigger,
    Content,
    Item,
    ItemTitle,
    ItemSubtitle,
    TriggerItem,
    Group,
    Separator,
    ItemIcon,
    ItemIndicator,
    CheckboxItem,
    ItemImage,
    Label,
  }
}

export { createIosMenu }
