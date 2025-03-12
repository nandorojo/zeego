import React, { Children, ReactElement, cloneElement, useRef } from 'react'
import { Image, View } from 'react-native'
import {
  ContextMenuButton,
  ContextMenuView,
  MenuActionConfig,
  MenuConfig,
  MenuElementSize,
  ImageSystemConfig,
} from 'react-native-ios-context-menu'

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
  ContextMenuSubContentProps,
  MenuSubContentProps,
  ContextMenuAuxliliaryProps,
} from '../types'

const createIosMenu = (Menu: 'ContextMenu' | 'DropdownMenu') => {
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

  const Auxiliary = create(({}: ContextMenuAuxliliaryProps) => {
    return <></>
  }, 'Auxiliary')

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

  const ItemIcon = create((_: MenuItemIconProps) => {
    return <>{}</>
  }, 'ItemIcon')

  const ItemImage = create((_: MenuItemImageProps) => {
    return <>{}</>
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
        `[zeego] Invalid <SubTrigger />. It either needs a string as the children, or a <ItemTitle /> in the children. However, it got neither.


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

  const Preview = create((_: ContextMenuPreviewProps) => {
    return <></>
  }, 'Preview')

  Preview.defaultProps = {
    isResizeAnimated: true,
  }

  const CheckboxItem = create(({}: MenuCheckboxItemProps) => {
    return <></>
  }, 'CheckboxItem')

  const Label = create(({ children }: MenuLabelProps) => {
    if (typeof children != 'string') {
      console.error('[zeego] <Label /> children must be a string.')
    }
    return <></>
  }, 'Label')

  type MenuOption = 'destructive' | 'displayInline'

  type MenuAttributes = MenuActionConfig['menuAttributes']
  type MenuOptions = MenuOption[]

  type MenuItem = MenuActionConfig

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

      if (child.props.shouldDismissMenuOnSelect === false) {
        menuAttributes.push('keepsMenuPresented')
      }

      let icon: MenuItem['icon']

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
2. OR, use the textValue prop on <${Menu}.Item textValue="Some value" />
3. OR, if you are using a horizontal Group with icons only, pass an empty string: <${Menu}.ItemTitle textValue="" />`
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

        if (
          iconChildren?.[0]?.props.iosIconName ||
          iconChildren?.[0]?.props.ios
        ) {
          const iconConfiguration = iconChildren?.[0]?.props.ios

          icon = {
            type: 'IMAGE_SYSTEM',
            imageValue: {
              ...iconConfiguration,
              systemName:
                iconConfiguration?.name ?? iconChildren[0].props.iosIconName,
            } as ImageSystemConfig,
          }
        } else {
          const imageChild = pickChildren<MenuItemImageProps>(
            child.props.children,
            ItemImage
          ).targetChildren?.[0]

          if (imageChild) {
            if (imageChild.props.source) {
              const { source, ios: { lazy = true, style } = {} } =
                imageChild.props
              if (typeof source === 'object' && 'uri' in source && source.uri) {
                icon = {
                  type: 'IMAGE_REMOTE_URL',
                  imageValue: {
                    url: source.uri,
                  },
                  imageLoadingConfig: {
                    shouldLazyLoad: lazy ?? true,
                  },
                  imageOptions: style,
                }
              } else {
                const imageValue = Image.resolveAssetSource(
                  typeof imageChild.props.source === 'object' &&
                    'src' in imageChild.props.source
                    ? { uri: imageChild.props.source.src }
                    : imageChild.props.source
                )
                icon = {
                  type: 'IMAGE_REQUIRE',
                  imageValue,
                }
              }
            }
          }
        }
      }
      if (typeof title == 'string') {
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
          callbacks[key] = () => child.props.onSelect?.()
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
      return undefined
    }

    const mapItemsChildren = (
      children: React.ReactNode
    ): ((MenuItem | MenuConfig) | null)[] => {
      return Children.map(flattenChildren(children), (child, index) => {
        if (isInstanceOfComponent(child, Item)) {
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
        } else if (isInstanceOfComponent(child, CheckboxItem)) {
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

            const finalItem: MenuItem = {
              actionKey: key,
              actionTitle: title,
              icon,
              menuAttributes,
              discoverabilityTitle: subtitle,
              menuState: currentState,
            }
            return finalItem
          }
        } else if (isInstanceOfComponent(child, Sub)) {
          const triggerItemChild = pickChildren<MenuSubTriggerProps>(
            child.props.children,
            SubTrigger
          ).targetChildren?.[0]

          const triggerItem =
            triggerItemChild && getItemFromChild(triggerItemChild, index)
          if (triggerItem) {
            const nestedContent = pickChildren<
              MenuSubContentProps | ContextMenuSubContentProps
            >(child.props.children, SubContent).targetChildren?.[0]

            if (nestedContent) {
              const nestedItems = mapItemsChildren(
                nestedContent.props.children
              ).filter(filterNull)

              if (nestedItems.length) {
                const menuOptions: MenuOptions = []
                if (
                  new Set(triggerItem.menuAttributes || []).has('destructive')
                ) {
                  menuOptions.push('destructive')
                }
                const menuConfig: MenuConfig = {
                  menuTitle: triggerItem?.title,
                  icon: triggerItem?.icon,
                  menuItems: nestedItems,
                  menuOptions,
                  // @ts-expect-error
                  menuAttributes: triggerItem.menuAttributes,
                }
                return menuConfig
              }
            }
          }
        } else if (isInstanceOfComponent(child, Group)) {
          const groupItems = mapItemsChildren(child.props.children).filter(
            filterNull
          )

          const groupTitle = pickChildren<MenuLabelProps>(
            child.props.children,
            Label
          ).targetChildren?.[0]?.props.children

          let menuPreferredElementSize: MenuElementSize | undefined

          if (child.props.horizontal) {
            const hasGroupItemWithText = groupItems.some((item) => {
              return item.type === 'action' && item.actionTitle
            })

            if (hasGroupItemWithText) {
              menuPreferredElementSize = 'medium'
            } else {
              menuPreferredElementSize = 'small'
            }
          }

          return {
            menuTitle: typeof groupTitle == 'string' ? groupTitle : '',
            menuItems: groupItems,
            menuOptions: ['displayInline'],
            menuPreferredElementSize,
          }
        }
        return null
      })
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

    const Component =
      Menu === 'ContextMenu' ? ContextMenuView : ContextMenuButton

    const preview = pickChildren(content?.props.children, Preview)
      .targetChildren?.[0]

    const previewProps = preview?.props as ContextMenuPreviewProps | undefined

    const onMenuDidHide =
      props.onOpenChange &&
      (() => {
        props.onOpenChange?.(false)
      })
    const onMenuDidShow =
      props.onOpenChange &&
      (() => {
        props.onOpenChange?.(true)
      })
    const onMenuWillShow =
      props.onOpenWillChange &&
      (() => {
        props.onOpenWillChange?.(true)
      })
    const onMenuWillHide =
      props.onOpenWillChange &&
      (() => {
        props.onOpenWillChange?.(false)
      })

    const triggerItem = trigger.targetChildren?.[0]

    let shouldOpenOnSingleTap = Menu === 'DropdownMenu'

    if (triggerItem?.props.action) {
      shouldOpenOnSingleTap = triggerItem.props.action === 'press'
    }

    const auxiliary =
      Menu === 'ContextMenu'
        ? pickChildren<ContextMenuAuxliliaryProps>(
            content?.props.children,
            Auxiliary
          )?.targetChildren
        : undefined

    const auxiliaryProps = auxiliary?.[0]?.props

    const menuRef = useRef<ContextMenuButton>()

    return (
      <Component
        ref={menuRef as any}
        onPressMenuItem={({ nativeEvent }) => {
          if (callbacks[nativeEvent.actionKey]) {
            callbacks[nativeEvent.actionKey]()
          }
        }}
        isMenuPrimaryAction={shouldOpenOnSingleTap}
        style={[{ flexGrow: 0 }, props.style as any]}
        menuConfig={{
          menuTitle,
          menuItems,
        }}
        renderPreview={
          Menu === 'ContextMenu' && preview && previewProps?.children
            ? () => {
                return (
                  <>
                    {typeof previewProps?.children == 'function'
                      ? previewProps.children()
                      : previewProps?.children}
                  </>
                )
              }
            : undefined
        }
        lazyPreview={
          Menu === 'ContextMenu'
            ? typeof previewProps?.children == 'function'
            : undefined
        }
        onPressMenuPreview={
          Menu === 'ContextMenu' ? previewProps?.onPress : undefined
        }
        shouldPreventLongPressGestureFromPropagating
        auxiliaryPreviewConfig={
          auxiliaryProps?.children
            ? {
                alignmentHorizontal: auxiliaryProps?.alignmentHorizontal,
                anchorPosition: auxiliaryProps?.anchorPosition,
                height: auxiliaryProps?.height,
                marginAuxiliaryPreview: auxiliaryProps?.marginWithScreenEdge,
                marginPreview: auxiliaryProps?.marginPreview,
                transitionConfigEntrance:
                  auxiliaryProps?.transitionConfigEntrance,
                transitionEntranceDelay:
                  auxiliaryProps?.transitionEntranceDelay,
                width: auxiliaryProps?.width,
              }
            : undefined
        }
        isAuxiliaryPreviewEnabled={!!auxiliaryProps?.children}
        onMenuAuxiliaryPreviewDidShow={auxiliaryProps?.onDidShow}
        onMenuAuxiliaryPreviewWillShow={auxiliaryProps?.onWillShow}
        renderAuxiliaryPreview={
          auxiliaryProps?.children
            ? () => {
                const child =
                  typeof auxiliaryProps?.children == 'function'
                    ? auxiliaryProps?.children({
                        dismissMenu() {
                          menuRef.current?.dismissMenu()
                        },
                      })
                    : auxiliaryProps?.children
                return <>{child}</>
              }
            : undefined
        }
        previewConfig={
          preview
            ? {
                // ...previewProps,
                previewType: 'CUSTOM',
                previewSize: previewProps?.size,
                backgroundColor: previewProps?.backgroundColor,
                borderRadius: previewProps?.borderRadius,
                isResizeAnimated: previewProps?.isResizeAnimated,
                preferredCommitStyle: previewProps?.preferredCommitStyle,
              }
            : undefined
        }
        onMenuDidHide={onMenuDidHide}
        onMenuDidShow={onMenuDidShow}
        onMenuWillHide={onMenuWillHide}
        onMenuWillShow={onMenuWillShow}
        {...props.__unsafeIosProps}
      >
        {triggerItem}
      </Component>
    )
  }, 'Root')

  const Separator = create((_: MenuSeparatorProps) => {
    return <></>
  }, 'Separator')

  const ItemIndicator = create(
    (_: MenuItemIndicatorProps) => <></>,
    'ItemIndicator'
  )

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

export { createIosMenu }
