import * as ContextMenu from '@radix-ui/react-context-menu'
import React from 'react'

import type {
  ContextMenuContentProps,
  MenuCheckboxItemProps,
  MenuItemIconProps,
  ContextMenuSubContentProps,
  ContextMenuAuxliliaryProps,
  MenuItemProps,
  MenuSubProps,
  MenuSubTriggerProps,
} from '../menu'
import { create } from '../menu/display-names'

const Root = create(ContextMenu.Root, 'Root')

const Trigger = create(ContextMenu.Trigger, 'Trigger')

const Content = create(
  (props: ContextMenuContentProps) => (
    <ContextMenu.Portal>
      <ContextMenu.Content {...props} />
    </ContextMenu.Portal>
  ),
  'Content'
)

const Item = create((props: MenuItemProps) => {
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
}, 'Item')

const SubTrigger = create<MenuSubTriggerProps>(
  (props: MenuSubTriggerProps) => <ContextMenu.SubTrigger {...props} />,
  'SubTrigger'
)

const Group = create(ContextMenu.Group, 'Group')

const Separator = create(ContextMenu.Separator, 'Separator')

const CheckboxItem = create(
  ({
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
          const current =
            value === true ? 'on' : value === false ? 'off' : value
          const next = current === 'on' ? 'off' : 'on'

          onValueChange?.(next, current)

          if (shouldDismissMenuOnSelect === false) {
            e.preventDefault()
          }
        }}
      />
    )
  },
  'CheckboxItem'
)

const ItemIndicator = create(ContextMenu.ItemIndicator, 'ItemIndicator')

const ItemIcon = create(
  ({ style, className, children }: MenuItemIconProps) => (
    <div style={style} className={className}>
      {children}
    </div>
  ),
  'ItemIcon'
)

const Preview = create(() => null, 'Preview')

const Arrow = create(ContextMenu.Arrow, 'Arrow')

const Sub = create(
  (props: MenuSubProps) => <ContextMenu.Sub {...props} />,
  'Sub'
)

const SubContent = create(
  ({ ...props }: ContextMenuSubContentProps) => (
    <ContextMenu.Portal>
      <ContextMenu.SubContent {...props} />
    </ContextMenu.Portal>
  ),
  'SubContent'
)

const Auxiliary = create((_: ContextMenuAuxliliaryProps) => null, 'Auxiliary')

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
