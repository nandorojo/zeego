'use client'
import * as ContextMenu from '@radix-ui/react-context-menu'

import type {
  ContextMenuContentProps,
  MenuCheckboxItemProps,
  MenuItemIconProps,
  ContextMenuSubContentProps,
  ContextMenuAuxliliaryProps,
  MenuItemProps,
  MenuSubProps,
  MenuSubTriggerProps,
  ContextMenuPreviewProps,
} from '../menu'

const Root = ContextMenu.Root

const Trigger = ContextMenu.Trigger

const Content = (props: ContextMenuContentProps) => (
  <ContextMenu.Portal>
    <ContextMenu.Content {...props} />
  </ContextMenu.Portal>
)

const Item = (props: MenuItemProps) => {
  return (
    <ContextMenu.Item
      {...props}
      onSelect={(e) => {
        if (props.shouldDismissMenuOnSelect === false) {
          e.preventDefault()
        }
        props.onSelect?.()
      }}
    />
  )
}

const SubTrigger = (props: MenuSubTriggerProps) => (
  <ContextMenu.SubTrigger {...props} />
)

const Group = ContextMenu.Group

const Separator = ContextMenu.Separator

const CheckboxItem = ({
  shouldDismissMenuOnSelect,
  onValueChange,
  value,
  ...props
}: MenuCheckboxItemProps) => {
  return (
    <ContextMenu.CheckboxItem
      {...props}
      checked={typeof value === 'boolean' ? value : value !== 'off'}
      onSelect={(e) => {
        const current = value === true ? 'on' : value === false ? 'off' : value
        const next = current === 'on' ? 'off' : 'on'

        onValueChange?.(next, current)

        if (shouldDismissMenuOnSelect === false) {
          e.preventDefault()
        }
      }}
    />
  )
}

const ItemIndicator = ContextMenu.ItemIndicator

const ItemIcon = ({ style, className, children }: MenuItemIconProps) => (
  <div style={style} className={className}>
    {children}
  </div>
)

const Preview = (_: ContextMenuPreviewProps) => null

const Arrow = ContextMenu.Arrow

const Sub = (props: MenuSubProps) => <ContextMenu.Sub {...props} />

const SubContent = (props: ContextMenuSubContentProps) => (
  <ContextMenu.Portal>
    <ContextMenu.SubContent {...props} />
  </ContextMenu.Portal>
)

const Auxiliary = (_: ContextMenuAuxliliaryProps) => null

export {
  Root,
  Trigger,
  Content,
  Item,
  SubTrigger,
  Group,
  Separator,
  CheckboxItem,
  ItemIndicator,
  ItemIcon,
  Preview,
  Arrow,
  Sub,
  SubContent,
  Auxiliary,
}

export { ItemImage } from '../menu/web-primitives/item-image'
export { Label } from './web/label'

export { ItemTitle, ItemSubtitle } from '../menu'
