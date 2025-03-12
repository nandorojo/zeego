import React, { Children, ReactElement, cloneElement } from 'react'

import { MenuView } from '@react-native-menu/menu'

import {
  flattenChildren,
  pickChildren,
  isInstanceOfComponent,
} from '../children'
import { create } from '../display-names'
import { filterNull } from '../filter-null'
import type {
  MenuContentProps,
  MenuGroupProps,
  MenuItemProps,
  MenuItemSubtitleProps,
  MenuItemTitleProps,
  MenuRootProps,
  MenuSubTriggerProps,
  MenuTriggerProps,
  MenuItemIconProps,
  MenuCheckboxItemProps,
  MenuSeparatorProps,
  MenuItemImageProps,
  MenuItemIndicatorProps,
  MenuLabelProps,
  ContextMenuPreviewProps,
  ContextMenuContentProps,
  MenuArrowProps,
  MenuSubProps,
  MenuSubContentProps,
  ContextMenuAuxliliaryProps,
} from '../types'
import { View } from 'react-native'

const createAndroidMenu = (Menu: 'ContextMenu' | 'DropdownMenu') => {
  const Trigger = create(
    ({ children, style, asChild, ...props }: MenuTriggerProps) => {
      if (asChild) {
        return cloneElement(children, {
          style,
          ...props,
        })
      }
      return <View style={style as any}>{children}</View>
    },
    'Trigger'
  )

  const Auxiliary = create(
    ({}: ContextMenuAuxliliaryProps) => null,
    'Auxiliary'
  )

  const Group = create(({ children }: MenuGroupProps) => {
    return <>{children}</>
  }, 'Group')

  const Content = create(
    ({ children }: MenuContentProps | ContextMenuContentProps) => {
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

If you want to use a custom component as your <Content />, you can use the create() method. But you still need to pass all items as children of <Content />.`)
      }
      return <>{children}</>
    },
    'Content'
  )

  const ItemTitle = create(({ children }: MenuItemTitleProps) => {
    if (typeof children != 'string') {
      throw new Error('[zeego] <ItemTitle /> child must be a string')
    }
    return <>{children}</>
  }, 'ItemTitle')

  const ItemIcon = create((props: MenuItemIconProps) => {
    if (!props.androidIconName) {
      console.warn(
        '[zeego] <ItemIcon /> missing androidIconName prop. Will do nothing on android. Consider passing an androidIconName or switching to <ItemImage />.'
      )
    }
    return <>{}</>
  }, 'ItemIcon')

  const ItemImage = create((_: MenuItemImageProps) => {
    return null
  }, 'ItemImage')

  const ItemSubtitle = create(({ children }: MenuItemSubtitleProps) => {
    if (children && typeof children != 'string') {
      throw new Error('[zeego] <ItemSubtitle /> child must be a string')
    }
    return <>{children}</>
  }, 'ItemSubtitle')

  const Item = create(({ children }: MenuItemProps) => {
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

  const SubTrigger = create(({ children }: MenuSubTriggerProps) => {
    const titleChild = pickChildren(children, ItemTitle).targetChildren
    if (typeof children != 'string' && !titleChild?.length) {
      console.error(
        `[zeego] Invalid <SubTrigger />. It either needs an <ItemTitle /> in the children.

<SubTrigger>
  <ItemTitle>
    Title here
  </ItemTitle>
</SubTrigger>
  `
      )
    }
    return <>{children}</>
  }, 'SubTrigger')
  const Sub = create((_: MenuSubProps) => <></>, 'Sub')
  const SubContent = create((_: MenuSubContentProps) => <></>, 'SubContent')

  const CheckboxItem = create(({}: MenuCheckboxItemProps) => {
    return <></>
  }, 'CheckboxItem')

  const Label = create(({ children }: MenuLabelProps) => {
    if (typeof children != 'string') {
      console.error('[zeego] <Label /> children must be a string.')
    }
    return <></>
  }, 'Label')

  type MenuAttributes = {
    disabled?: boolean
    destructive?: boolean
    hidden?: boolean
  }

  type MenuConfig = {
    id?: string
    title: string
    subactions: (MenuItem | MenuConfig)[]
    attributes?: MenuAttributes
    image?: MenuItemIcon
  }

  type MenuItemIcon = string

  type MenuItem = {
    id: string
    title: string
    titleColor?: string
    subtitle?: string
    image?: string
    imageColor?: string
    state?: 'on' | 'off' | 'mixed'
    attributes?: MenuAttributes
  }

  const Root = create((props: MenuRootProps) => {
    const trigger = pickChildren<MenuTriggerProps>(props.children, Trigger)
    const content = pickChildren<MenuContentProps | ContextMenuContentProps>(
      props.children,
      Content
    ).targetChildren?.[0]

    const callbacks: Record<string, () => void> = {}

    const getItemFromChild = (
      child: ReactElement<
        MenuItemProps | MenuSubTriggerProps | MenuCheckboxItemProps
      >,
      index: number
    ) => {
      let title: string | undefined
      const key: string = child.key ? `${child.key}` : `item-${index}`
      let subtitle: string | undefined
      const menuAttributes: MenuAttributes = {}

      if (child.props.disabled) {
        menuAttributes.disabled = true
      }
      if (child.props.destructive) {
        menuAttributes.destructive = true
      }
      if (child.props.hidden) {
        menuAttributes.hidden = true
      }

      let icon: MenuItem['image']

      if (typeof child.props.children == 'string') {
        title = child.props.children
      } else {
        const titleChild = pickChildren<MenuItemTitleProps>(
          child.props.children,
          ItemTitle
        ).targetChildren

        let maybeTitle =
          child.props.textValue ?? titleChild?.[0]?.props.children

        if (Array.isArray(maybeTitle)) {
          /**
           * Use case: <ItemTitle>Here is some {text}</ItemTitle>
           * React will turn that into ['Here is some ', text] as an array
           * So we need to 1) detect that it's all strings and 2) join them together
           */
          let stringTitle = ''
          let isString = false

          for (let i = 0; i < maybeTitle.length; i++) {
            const text = maybeTitle[i]
            if (text == null) {
              continue
            }
            if (typeof text == 'string' || typeof text == 'number') {
              stringTitle += text
              isString = true
            } else {
              isString = false
              break
            }
          }

          if (isString) {
            maybeTitle = stringTitle
          }
        }

        if (typeof maybeTitle === 'string') {
          title = maybeTitle
        } else {
          console.error(
            `[zeego] Invalid <${Menu}.Item key="${key}" /> Missing valid title. Make sure you do one of the following:
  
  1. pass a string as the child of <${Menu}.ItemTitle />, nested directly inside of <${Menu}.Item />.
  2. OR, use the textValue prop on <${Menu}.Item textValue="Some value" />`
          )
        }

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

        if (iconChildren?.[0]?.props.androidIconName) {
          icon = iconChildren[0].props.androidIconName
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
          const currentState =
            menuState === true ? 'on' : menuState === false ? 'off' : menuState
          const nextState =
            currentState === 'mixed' || currentState === 'on' ? 'off' : 'on'
          const { onValueChange } = child.props
          callbacks[key] = () => {
            onValueChange?.(nextState, currentState)
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
      return Children.map(
        flattenChildren(children)
          .map((item) => {
            // android menu doesn't support group feature like iOS `displayInline` option in menu
            if (
              isInstanceOfComponent(item, Group) &&
              typeof item === 'object'
            ) {
              return flattenChildren(item.props.children)
            }
            return item
          })
          .flat(),
        (_child, index) => {
          if (isInstanceOfComponent(_child, Item)) {
            const child = _child as ReactElement<MenuItemProps>

            const item = getItemFromChild(child, index)
            if (item) {
              const { icon, title, key, menuAttributes, subtitle } = item
              const finalItem: MenuItem = {
                id: key,
                title,
                image: icon,
                attributes: menuAttributes,
                subtitle,
              }
              return finalItem
            }
          } else if (isInstanceOfComponent(_child, CheckboxItem)) {
            const child = _child as ReactElement<MenuCheckboxItemProps>

            const item = getItemFromChild(child, index)
            if (item) {
              const { icon, title, key, menuAttributes, subtitle } = item
              const menuState = child.props.value
              const currentState =
                menuState === true
                  ? 'on'
                  : menuState === false
                  ? 'off'
                  : menuState

              const hasItemIndicator =
                pickChildren(child.props.children, ItemIndicator)
                  .targetChildren?.[0] !== undefined

              let image = icon

              if (hasItemIndicator && !icon) {
                image =
                  currentState === 'on'
                    ? 'checkbox_on_background'
                    : 'checkbox_off_background'
              }

              const finalItem: MenuItem = {
                id: key,
                title,
                image,
                attributes: menuAttributes,
                subtitle,
                state: currentState,
              }
              return finalItem
            }
          } else if (isInstanceOfComponent(_child, Sub)) {
            const child = _child as ReactElement<MenuRootProps>
            const key: string = child.key ? `${child.key}` : `sub-${index}`
            const triggerItemChild = pickChildren<MenuSubTriggerProps>(
              child.props.children,
              SubTrigger
            ).targetChildren?.[0]

            const triggerItem =
              triggerItemChild && getItemFromChild(triggerItemChild, index)
            if (triggerItem) {
              const nestedContent = pickChildren<MenuContentProps>(
                child.props.children,
                SubContent
              ).targetChildren?.[0]

              if (nestedContent) {
                const nestedItems = mapItemsChildren(
                  nestedContent.props.children
                ).filter(filterNull)

                if (nestedItems.length) {
                  const menuConfig: MenuConfig = {
                    id: key,
                    title: triggerItem?.title,
                    image: triggerItem?.icon,
                    subactions: nestedItems,
                    attributes: triggerItem.menuAttributes,
                  }
                  return menuConfig
                }
              }
            }
          }
          return null
        }
      )
    }

    const menuItems = mapItemsChildren(content?.props.children).filter(
      filterNull
    )

    const label = pickChildren<MenuLabelProps>(content?.props.children, Label)
      .targetChildren?.[0]?.props.children
    let menuTitle = ''
    if (typeof label == 'string') {
      menuTitle = label
    }

    const triggerItem = trigger.targetChildren?.[0]

    let shouldOpenOnLongPress = Menu === 'ContextMenu'

    if (triggerItem?.props.action) {
      shouldOpenOnLongPress = triggerItem.props.action === 'longPress'
    }

    return (
      <MenuView
        title={menuTitle}
        style={props.style as any}
        onPressAction={({ nativeEvent }) => {
          callbacks[nativeEvent.event]?.()
        }}
        shouldOpenOnLongPress={shouldOpenOnLongPress}
        actions={menuItems}
        // @ts-ignore
        onOpenMenu={() => {
          props.onOpenChange?.(true)
        }}
        // @ts-ignore
        onCloseMenu={() => {
          props.onOpenChange?.(false)
        }}
      >
        {triggerItem}
      </MenuView>
    )
  }, 'Root')

  const Separator = create((_: MenuSeparatorProps) => {
    return <></>
  }, 'Separator')

  const ItemIndicator = create(
    (_: MenuItemIndicatorProps) => <></>,
    'ItemIndicator'
  )

  const Preview = create((_: ContextMenuPreviewProps) => <></>, 'Preview')

  const Arrow = create((_: MenuArrowProps) => <></>, 'Arrow')

  return {
    Root,
    Trigger,
    Content,
    Item,
    ItemTitle,
    ItemSubtitle,
    SubTrigger,
    Group,
    Separator,
    ItemIcon,
    ItemIndicator,
    CheckboxItem,
    ItemImage,
    Label,
    Preview,
    Arrow,
    Sub,
    SubContent,
    Auxiliary,
  }
}

export { createAndroidMenu }
