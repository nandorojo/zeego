import * as ContextMenu from '@radix-ui/react-context-menu'
import React from 'react'

import type {
  ContextMenuContentProps,
  MenuCheckboxItemProps,
  MenuItemIconProps,
  ContextMenuSubContentProps,
  ContextMenuAuxliliaryProps,
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

const Item = create(ContextMenu.Item, 'Item')

const SubTrigger = create(ContextMenu.SubTrigger, 'SubTrigger')

const Group = create(ContextMenu.Group, 'Group')

const Separator = create(ContextMenu.Separator, 'Separator')

const CheckboxItem = create(
  ({ onValueChange, value, ...props }: MenuCheckboxItemProps) => {
    return (
      <ContextMenu.CheckboxItem
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

const ItemIndicator = create(ContextMenu.ItemIndicator, 'ItemIndicator')

const ItemIcon = create(
  ({ children }: MenuItemIconProps) => <>{children}</>,
  'ItemIcon'
)

const Preview = create(() => null, 'Preview')

const Arrow = create(ContextMenu.Arrow, 'Arrow')

const Sub = create(ContextMenu.Sub, 'Sub')

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
    <ContextMenu.Portal>
      <ContextMenu.SubContent
        loop={loop}
        alignOffset={alignOffset}
        avoidCollisions={avoidCollisions}
        collisionPadding={collisionPadding}
        sideOffset={sideOffset}
        {...props}
      />
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
