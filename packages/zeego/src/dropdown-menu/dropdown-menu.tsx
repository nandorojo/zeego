import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import * as React from 'react'

import type {
  MenuCheckboxItemProps,
  MenuItemIconProps,
  MenuItemProps,
  MenuSubTriggerProps,
  MenuGroupProps,
  MenuSubContentProps,
  MenuContentProps,
} from '../menu'
import { create } from '../menu/display-names'

const Root = create(DropdownMenu.Root, 'Root')

const Trigger = create(DropdownMenu.Trigger, 'Trigger')

const Content = create<MenuContentProps>((props) => {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content {...props} />
    </DropdownMenu.Portal>
  )
}, 'Content')

const Item = create<MenuItemProps>((props) => {
  return (
    <DropdownMenu.Item
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
  (props) => <DropdownMenu.SubTrigger {...props} />,
  'SubTrigger'
)

const Group = create<MenuGroupProps>(DropdownMenu.Group, 'Group')

const Separator = create(DropdownMenu.Separator, 'Separator')

const CheckboxItem = create<MenuCheckboxItemProps>(
  ({ shouldDismissMenuOnSelect, onValueChange, value, ...props }) => {
    return (
      <DropdownMenu.CheckboxItem
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

const ItemIndicator = create(DropdownMenu.ItemIndicator, 'ItemIndicator')

const ItemIcon = create(
  ({ children, style, className }: MenuItemIconProps) => (
    <div style={style} className={className}>
      {children}
    </div>
  ),
  'ItemIcon'
)

const Arrow = create(DropdownMenu.Arrow, 'Arrow')

const Sub = create(DropdownMenu.Sub, 'Sub')

const SubContent = create<MenuSubContentProps>(
  (props) => (
    <DropdownMenu.Portal>
      <DropdownMenu.SubContent {...props} />
    </DropdownMenu.Portal>
  ),
  'SubContent'
)

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
  Arrow,
  Sub,
  SubContent,
}

export { ItemImage } from '../menu/web-primitives/item-image'
export { Label } from './web/label'

export { ItemTitle, ItemSubtitle } from '../menu'
