import { requireNativeView } from 'expo'

import { Image, NativeSyntheticEvent } from 'react-native'
import type {
  MenuCheckboxItemProps,
  MenuItemImageProps,
  MenuItemIndicatorProps,
  MenuItemSubtitleProps,
  MenuItemTitleProps,
} from '../../menu'
import MenuItemIcon from './ContextMenuItemIcon'

const name = 'Zeego'
const _MenuRoot = requireNativeView<{
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (event: { nativeEvent: { open: boolean } }) => void
  isDropdown: boolean
}>(name, 'ContextMenuView')

const _ContextMenuItem = requireNativeView(name, 'ContextMenuItemView')
const MenuSeparator = requireNativeView(name, 'ContextMenuSeparatorView')

const _ContextMenuCheckboxItem = requireNativeView<{
  value: 'on' | 'off' | 'mixed'
  onValueChange?: (e: NativeSyntheticEvent<{ value: 'on' | 'off' }>) => void
  textValue?: string
}>(name, 'ContextMenuCheckboxItemView')
const _ContextMenuItemTitle = requireNativeView(
  name,
  'ContextMenuItemTitleView'
)
const _ContextMenuItemSubtitle = requireNativeView(
  name,
  'ContextMenuItemSubtitleView'
)
const MenuSub = requireNativeView(name, 'ContextMenuSubView')
const _ContextMenuSubTrigger = requireNativeView(
  name,
  'ContextMenuSubTriggerView'
)
const _ContextMenuLabel = requireNativeView(name, 'ContextMenuLabelView')
const MenuGroup = requireNativeView(name, 'ContextMenuGroupView')
const MenuContent = requireNativeView(name, 'ContextMenuContentView')
const MenuSubContent = requireNativeView(name, 'ContextMenuSubContentView')

const _ContextMenuItemImage = requireNativeView(
  name,
  'ContextMenuItemImageView'
)

function MenuSubTrigger(props: { children: React.ReactNode }) {
  if (typeof props.children === 'string') {
    console.error(
      `[zeego][MenuSubTrigger] You passed a string to the children prop.

This is not allowed:

<SubTrigger>
  ${props.children}
</SubTrigger>

Please pass <ItemTitle> as a child instead:

<SubTrigger>
  <ItemTitle>Submenu</ItemTitle>
</SubTrigger>
`
    )

    return <ContextMenuItem textValue={props.children} />
  }

  return <_ContextMenuSubTrigger>{props.children}</_ContextMenuSubTrigger>
}

function MenuItem(props: React.ComponentProps<typeof _ContextMenuItem>) {
  if (typeof props.children === 'string') {
    console.error(
      `[zeego][MenuItem] You passed a string to the children prop.

This is not allowed:

<Item>
  ${props.children}
</Item>
      
Please pass <ItemTitle> as a child instead:

<Item>
  <ItemTitle>Item</ItemTitle>
</Item>
`
    )

    return <ContextMenuItem textValue={props.children} />
  }
  return <_ContextMenuItem>{props.children}</_ContextMenuItem>
}

function MenuLabel(props: { children: React.ReactNode }) {
  return (
    <_ContextMenuLabel
      text={typeof props.children === 'string' ? props.children : undefined}
    />
  )
}

function MenuCheckboxItem(props: MenuCheckboxItemProps) {
  const value =
    typeof props.value === 'boolean'
      ? props.value
        ? 'on'
        : 'off'
      : props.value
  return (
    <_ContextMenuCheckboxItem
      value={value}
      onValueChange={
        props.onValueChange &&
        ((e: NativeSyntheticEvent<{ value: 'on' | 'off' }>) => {
          const prevValue = value
          props.onValueChange?.(e.nativeEvent.value, prevValue)
        })
      }
      textValue={props.textValue}
    >
      {props.children}
    </_ContextMenuCheckboxItem>
  )
}

function MenuItemTitle(props: MenuItemTitleProps) {
  let text = typeof props.children === 'string' ? props.children : ''

  if (Array.isArray(props.children)) {
    /**
     * Support: <ContextMenuItemTitle>Some text: {someVariable}</ContextMenuItemTitle>
     *
     * React turns the above into ["Some text: ", someVariable]
     */
    for (let i = 0; i < props.children.length; i++) {
      const child = props.children[i]
      if (typeof child === 'string' || typeof child === 'number') {
        text += child
      }
    }
  }

  if (!text) return null

  return <_ContextMenuItemTitle text={text || undefined} />
}

function MenuItemSubtitle(props: MenuItemSubtitleProps) {
  let text = typeof props.children === 'string' ? props.children : ''

  if (Array.isArray(props.children)) {
    /**
     * Support: <ContextMenuItemTitle>Some text: {someVariable}</ContextMenuItemTitle>
     *
     * React turns the above into ["Some text: ", someVariable]
     */
    for (let i = 0; i < props.children.length; i++) {
      const child = props.children[i]
      if (typeof child === 'string' || typeof child === 'number') {
        text += child
      }
    }
  }

  if (!text) {
    console.warn(
      '[zeego][ContextMenuItemSubtitle] You did not pass any text children to the subtitle component. Was this intentional? It will be hidden on iOS.'
    )
    return null
  }

  return <_ContextMenuItemSubtitle text={text} />
}

function MenuItemImage(props: MenuItemImageProps) {
  const imageValue = Image.resolveAssetSource(
    typeof props.source === 'object' && 'src' in props.source
      ? { uri: props.source.src }
      : props.source
  )
  return <_ContextMenuItemImage source={imageValue} />
}

/**
 * @deprecated Import from `zeego/legacy/context-menu` instead. Or, if you're not using that import, you can remove this component altogether.
 *
 * TODO Android needs to use native elements.
 */
export function create<T>(t: T, _: string) {
  return t
}

function MenuItemIndicator(props: MenuItemIndicatorProps) {
  return null
}

export {
  MenuItem,
  MenuLabel,
  MenuCheckboxItem,
  MenuItemTitle,
  MenuItemSubtitle,
  MenuItemIndicator,
  MenuSeparator,
  MenuItemIcon,
  MenuSub,
  MenuSubTrigger,
  _MenuRoot,
  MenuGroup,
  MenuContent,
  MenuSubContent,
  MenuItemImage,
}
