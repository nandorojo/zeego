import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import * as React from 'react'

import type {
  ContextMenuContentProps,
  MenuCheckboxItemProps,
  MenuItemIconProps,
  ContextMenuSubContentProps,
} from '../menu'
import { create } from '../menu/display-names'

const Root = create(DropdownMenu.Root, 'Root')

const Trigger = create(DropdownMenu.Trigger, 'Trigger')

const Content = create(
  ({
    children,
    style,
    loop,
    alignOffset,
    avoidCollisions,
    collisionPadding,
    ...props
  }: ContextMenuContentProps) => (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        loop={loop}
        alignOffset={alignOffset}
        avoidCollisions={avoidCollisions}
        collisionPadding={collisionPadding}
        {...props}
      >
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  ),
  'Content'
)

const Item = create(DropdownMenu.Item, 'Item')

const SubTrigger = create(DropdownMenu.SubTrigger, 'SubTrigger')

const Group = create(DropdownMenu.Group, 'Group')

const Separator = create(DropdownMenu.Separator, 'Separator')

const CheckboxItem = create(
  ({ onValueChange, value, ...props }: MenuCheckboxItemProps) => {
    return (
      <DropdownMenu.CheckboxItem
        {...props}
        checked={typeof value === 'boolean' ? value : value !== 'off'}
        onCheckedChange={(next) =>
          onValueChange?.(
            next ? 'on' : 'off',
            value === true ? 'on' : value === false ? 'off' : value
          )
        }
      />
    )
  },
  'CheckboxItem'
)

const ItemIndicator = create(DropdownMenu.ItemIndicator, 'ItemIndicator')

const ItemIcon = create(
  ({ children }: MenuItemIconProps) => <>{children}</>,
  'ItemIcon'
)

const Arrow = create(DropdownMenu.Arrow, 'Arrow')

const Sub = create(DropdownMenu.Sub, 'Sub')

const SubContent = create(
  ({
    children,
    alignOffset,
    avoidCollisions,
    collisionPadding,
    loop,
    style,
    sideOffset,
    ...props
  }: ContextMenuSubContentProps) => (
    <DropdownMenu.Portal>
      <DropdownMenu.SubContent
        loop={loop}
        alignOffset={alignOffset}
        avoidCollisions={avoidCollisions}
        collisionPadding={collisionPadding}
        sideOffset={sideOffset}
        {...props}
      />
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
