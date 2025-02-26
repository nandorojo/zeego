import { requireNativeView } from 'expo'
import { cloneElement, createContext, useContext, useState } from 'react'
import { NativeSyntheticEvent } from 'react-native'
import {
  MenuItemIndicatorProps,
  MenuRootProps,
  MenuTriggerProps,
} from 'zeego/menu'
import { ContextMenuItemIcon } from 'zeego/new/context-menu/ContextMenuItemIcon'

const OpenContext = createContext({
  open: false,
  setOpen: (open: boolean) => {},
  hasCallbackListeners: false,
})

const name = 'Zeego'

const _ContextMenuTrigger = requireNativeView<{
  // preview: React.ReactNode
  children: React.ReactNode
}>(name, 'ContextMenuTriggerView')
const _ContextMenu = requireNativeView<{
  children: React.ReactNode
  open: boolean
  onOpenChange: (event: { nativeEvent: { open: boolean } }) => void
}>(name, 'ContextMenuView')
const _ContextMenuPreview = requireNativeView(name, 'ContextMenuPreviewView')
const _ContextMenuItem = requireNativeView(name, 'ContextMenuItemView')
const ContextMenuAccessory = requireNativeView(name, 'ContextMenuAccessoryView')
const ContextMenuSeparator = requireNativeView(name, 'ContextMenuSeparatorView')

const _ContextMenuCheckboxItem = requireNativeView(
  name,
  'ContextMenuCheckboxItemView'
)
const _ContextMenuItemTitle = requireNativeView(
  name,
  'ContextMenuItemTitleView'
)
const _ContextMenuItemSubtitle = requireNativeView(
  name,
  'ContextMenuItemSubtitleView'
)
const ContextMenuSub = requireNativeView(name, 'ContextMenuSubView')
const _ContextMenuSubTrigger = requireNativeView(
  name,
  'ContextMenuSubTriggerView'
)
const _ContextMenuLabel = requireNativeView(name, 'ContextMenuLabelView')
const ContextMenuGroup = requireNativeView(name, 'ContextMenuGroupView')
const ContextMenuContent = requireNativeView(name, 'ContextMenuContentView')
const ContextMenuSubContent = requireNativeView(
  name,
  'ContextMenuSubContentView'
)

function ContextMenuTrigger(props: MenuTriggerProps) {
  const { hasCallbackListeners } = useContext(OpenContext)
  return (
    <_ContextMenuTrigger
      {...props}
      children={
        <>
          {props.children}
          {hasCallbackListeners && (
            <ContextMenuPreview>
              {cloneElement(props.children)}
            </ContextMenuPreview>
          )}
        </>
      }
    />
  )
}

function ContextMenu(props: MenuRootProps) {
  const [open, setOpen] = useState(false)

  return (
    <OpenContext.Provider
      value={{
        open,
        setOpen,
        hasCallbackListeners: props.onOpenChange != null,
      }}
    >
      <_ContextMenu
        {...props}
        open={open}
        onOpenChange={({ nativeEvent: { open } }) => {
          setOpen(open)
          props.onOpenChange?.(open)
        }}
      />
    </OpenContext.Provider>
  )
}

function ContextMenuSubTrigger(props: { children: React.ReactNode }) {
  if (typeof props.children === 'string') {
    console.error(
      `[zeego][ContextMenuSubTrigger] You passed a string to the children prop.

This is not allowed:

<ContextMenu.SubTrigger>
  ${props.children}
</ContextMenu.SubTrigger>

Please pass <ContextMenu.ItemTitle> as a child instead:

<ContextMenu.SubTrigger>
  <ContextMenu.ItemTitle>Submenu</ContextMenu.ItemTitle>
</ContextMenu.SubTrigger>
`
    )

    return <ContextMenuItem textValue={props.children} />
  }

  return <_ContextMenuSubTrigger>{props.children}</_ContextMenuSubTrigger>
}

function ContextMenuItem(props: React.ComponentProps<typeof _ContextMenuItem>) {
  if (typeof props.children === 'string') {
    console.error(
      `[zeego][ContextMenuItem] You passed a string to the children prop.

This is not allowed:

<ContextMenu.Item>
  ${props.children}
</ContextMenu.Item>
      
Please pass <ContextMenu.ItemTitle> as a child instead:

<ContextMenu.Item>
  <ContextMenu.ItemTitle>Item</ContextMenu.ItemTitle>
</ContextMenu.Item>
`
    )

    return <ContextMenuItem textValue={props.children} />
  }
  return <_ContextMenuItem>{props.children}</_ContextMenuItem>
}

function ContextMenuLabel(props: { children: React.ReactNode }) {
  return (
    <_ContextMenuLabel
      text={typeof props.children === 'string' ? props.children : undefined}
    />
  )
}

function ContextMenuCheckboxItem(props: {
  value: 'on' | 'off' | 'mixed' | boolean
  textValue?: string
  onValueChange: (value: 'on' | 'off') => void
  children: React.ReactNode
}) {
  return (
    <_ContextMenuCheckboxItem
      value={
        typeof props.value === 'boolean'
          ? props.value
            ? 'on'
            : 'off'
          : props.value
      }
      onValueChange={(e: NativeSyntheticEvent<{ value: 'on' | 'off' }>) => {
        props.onValueChange(e.nativeEvent.value)
      }}
      textValue={props.textValue}
    >
      {props.children}
    </_ContextMenuCheckboxItem>
  )
}

function ContextMenuItemTitle(props: { children: string | React.ReactNode }) {
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

function ContextMenuItemSubtitle(props: {
  children: string | React.ReactNode
}) {
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

function ContextMenuPreview(props: { children: React.ReactNode }) {
  const { open } = useContext(OpenContext)

  return (
    <_ContextMenuPreview
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        height: 0,
        width: 0,
        pointerEvents: open ? 'auto' : 'none',
        opacity: open ? 1 : 0,
      }}
    >
      {typeof props.children === 'function'
        ? open && props.children()
        : props.children}
    </_ContextMenuPreview>
  )
}

/**
 * @deprecated If you want to use <ContextMenu.Auxiliary>, please import from `zeego/legacy/context-menu` instead.
 */
function ContextMenuAuxiliary(props: { children: React.ReactNode }) {
  console.error(
    '[zeego][ContextMenu.Auxiliary] This component is deprecated. Please import from `zeego/legacy/context-menu` if you still want to use it.'
  )
  return null
}

/**
 * @deprecated Import from `zeego/legacy/context-menu` instead. Or, if you're not using that import, you can remove this component altogether.
 *
 * TODO Android needs to use native elements.
 */
export function create<T>(t: T, _: string) {
  return t
}

function ContextMenuItemIndicator(props: MenuItemIndicatorProps) {
  return null
}

export {
  ContextMenuTrigger,
  ContextMenu,
  ContextMenuPreview,
  ContextMenuItem,
  ContextMenuAccessory,
  ContextMenuSeparator,
  ContextMenuItemIcon,
  ContextMenuCheckboxItem,
  ContextMenuItemTitle,
  ContextMenuItemSubtitle,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuContent,
  ContextMenuSubContent,
  ContextMenuLabel,
  ContextMenuGroup,
  ContextMenuAuxiliary,
  ContextMenuItemIndicator,
  // alias
  ContextMenu as Root,
  ContextMenuTrigger as Trigger,
  ContextMenuPreview as Preview,
  ContextMenuItem as Item,
  ContextMenuAccessory as Accessory,
  ContextMenuSeparator as Separator,
  ContextMenuItemIcon as ItemIcon,
  ContextMenuCheckboxItem as CheckboxItem,
  ContextMenuItemTitle as ItemTitle,
  ContextMenuItemSubtitle as ItemSubtitle,
  ContextMenuSub as Sub,
  ContextMenuSubTrigger as SubTrigger,
  ContextMenuContent as Content,
  ContextMenuSubContent as SubContent,
  ContextMenuLabel as Label,
  ContextMenuGroup as Group,
  ContextMenuAuxiliary as Auxiliary,
  ContextMenuItemIndicator as ItemIndicator,
}
