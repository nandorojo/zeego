import { requireNativeView } from 'expo'
import { MenuItemIconProps } from 'zeego/menu'

const _ContextMenuItemIcon = requireNativeView<{
  name: string
}>('Zeego', 'ContextMenuItemIconView')

/**
 * TODO android file separately
 */
export function ContextMenuItemIcon(props: MenuItemIconProps) {
  const { ios } = props
  if (!ios) return null
  return <_ContextMenuItemIcon name={ios.name} />
}
