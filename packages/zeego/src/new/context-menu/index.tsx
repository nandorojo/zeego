import { requireNativeView } from 'expo'
import { cloneElement, createContext, useContext, useState } from 'react'
import { _MenuRoot } from '../native/elements'
import { MenuRootProps, MenuTriggerProps } from '../../menu'

const OpenContext = createContext({
  open: false,
  hasCallbackListeners: false,
})

const name = 'Zeego'

const _ContextMenuTrigger = requireNativeView<{
  // preview: React.ReactNode
  children: React.ReactNode
}>(name, 'ContextMenuTriggerView')

const _ContextMenuPreview = requireNativeView(name, 'ContextMenuPreviewView')

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
        hasCallbackListeners: props.onOpenChange != null,
      }}
    >
      <_MenuRoot
        {...props}
        open={open}
        onOpenChange={({ nativeEvent: { open } }) => {
          setOpen(open)
          props.onOpenChange?.(open)
        }}
        isDropdown={false}
      />
    </OpenContext.Provider>
  )
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
    '[zeego][ContextMenu.Auxiliary] This component is deprecated as of Zeego 3. Please import from `zeego/legacy/context-menu` if you still want to use it. Or, go back to Zeego 2.'
  )
  return null
}

/**
 * @deprecated Import from `zeego/legacy/context-menu` instead. Or, if you're not using that import, you can remove this component altogether.
 *
 * TODO Android needs to use native elements.
 */
function create<T>(t: T, _: string) {
  return t
}

export {
  // deprecated
  create,
  ContextMenuAuxiliary as Auxiliary,
  // rest
  ContextMenuTrigger,
  ContextMenu,
  ContextMenuPreview,
  ContextMenuAuxiliary,
  // alias
  ContextMenu as Root,
  ContextMenuTrigger as Trigger,
  ContextMenuPreview as Preview,
}

export {
  // ContextMenu
  MenuItemIcon as ContextMenuItemIcon,
  MenuItemTitle as ContextMenuItemTitle,
  MenuItemSubtitle as ContextMenuItemSubtitle,
  MenuItemIndicator as ContextMenuItemIndicator,
  MenuSeparator as ContextMenuSeparator,
  MenuSub as ContextMenuSub,
  MenuSubTrigger as ContextMenuSubTrigger,
  MenuSubContent as ContextMenuSubContent,
  MenuGroup as ContextMenuGroup,
  MenuContent as ContextMenuContent,
  MenuCheckboxItem as ContextMenuCheckboxItem,
  MenuItem as ContextMenuItem,
  MenuLabel as ContextMenuLabel,
  MenuItemImage as ContextMenuItemImage,
  // alias
  MenuItemIcon as ItemIcon,
  MenuItemTitle as ItemTitle,
  MenuItemSubtitle as ItemSubtitle,
  MenuItemIndicator as ItemIndicator,
  MenuSeparator as Separator,
  MenuSub as Sub,
  MenuSubTrigger as SubTrigger,
  MenuSubContent as SubContent,
  MenuGroup as Group,
  MenuContent as Content,
  MenuCheckboxItem as CheckboxItem,
  MenuItem as Item,
  MenuLabel as Label,
  MenuItemImage as ItemImage,
} from '../native/elements'
