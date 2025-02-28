'use client'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import type {
  MenuCheckboxItemProps,
  MenuItemIconProps,
  MenuItemProps,
  MenuSubTriggerProps,
  MenuGroupProps,
  MenuSubContentProps,
  MenuContentProps,
  MenuRootProps,
} from '../menu'

const Root = (props: MenuRootProps) => <DropdownMenu.Root {...props} />

const Trigger = DropdownMenu.Trigger

const Content = (props: MenuContentProps) => {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content {...props} />
    </DropdownMenu.Portal>
  )
}

const Item = (props: MenuItemProps) => {
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
}

const SubTrigger = (props: MenuSubTriggerProps) => (
  <DropdownMenu.SubTrigger {...props} />
)

const Group = (props: MenuGroupProps) => <DropdownMenu.Group {...props} />

const Separator = DropdownMenu.Separator

const CheckboxItem = ({
  shouldDismissMenuOnSelect,
  onValueChange,
  value,
  ...props
}: MenuCheckboxItemProps) => {
  return (
    <DropdownMenu.CheckboxItem
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

const ItemIndicator = DropdownMenu.ItemIndicator

const ItemIcon = ({ children, style, className }: MenuItemIconProps) => (
  <div style={style} className={className}>
    {children}
  </div>
)

const Arrow = DropdownMenu.Arrow

const Sub = DropdownMenu.Sub

const SubContent = (props: MenuSubContentProps) => (
  <DropdownMenu.Portal>
    <DropdownMenu.SubContent {...props} />
  </DropdownMenu.Portal>
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
