import { requireNativeView } from 'expo'
import { MenuRootProps, MenuTriggerProps } from '../../menu'
import { _MenuRoot } from '../native/elements'

const Trigger = requireNativeView<MenuTriggerProps>(
  'Zeego',
  'ContextMenuTriggerView'
)

function DropdownMenu(props: MenuRootProps) {
  return (
    <_MenuRoot
      isDropdown={true}
      {...props}
      onOpenChange={
        props.onOpenChange &&
        (({ nativeEvent: { open } }) => {
          props.onOpenChange?.(open)
        })
      }
    />
  )
}

export {
  // Trigger
  Trigger as DropdownMenuTrigger,
  Trigger,
  // DropdownMenu
  DropdownMenu as Root,
  DropdownMenu,
}

export {
  // deprecated
  create,
  // Content
  MenuContent as DropdownMenuContent,
  MenuContent as Content,
  // Item
  MenuItem as DropdownMenuItem,
  MenuItem as Item,
  // ItemTitle
  MenuItemTitle as DropdownMenuItemTitle,
  MenuItemTitle as ItemTitle,
  // ItemSubtitle
  MenuItemSubtitle as DropdownMenuItemSubtitle,
  MenuItemSubtitle as ItemSubtitle,
  // ItemIndicator
  MenuItemIndicator as DropdownMenuItemIndicator,
  MenuItemIndicator as ItemIndicator,
  // ItemImage
  MenuItemIcon as DropdownMenuItemIcon,
  MenuItemIcon as ItemIcon,
  // ItemCheckbox
  MenuCheckboxItem as DropdownMenuCheckboxItem,
  MenuCheckboxItem as CheckboxItem,
  // SubTrigger
  MenuSubTrigger as DropdownMenuSubTrigger,
  MenuSubTrigger as SubTrigger,
  // SubContent
  MenuSubContent as DropdownMenuSubContent,
  MenuSubContent as SubContent,
  // Group
  MenuGroup as DropdownMenuGroup,
  MenuGroup as Group,
  // Separator
  MenuSeparator as DropdownMenuSeparator,
  MenuSeparator as Separator,
  MenuLabel as DropdownMenuLabel,
  MenuLabel as Label,
  // Sub
  MenuSub as DropdownMenuSub,
  MenuSub as Sub,
  // ItemImage
  MenuItemImage as DropdownMenuItemImage,
  MenuItemImage as ItemImage,
} from '../native/elements'
