import { requireNativeView } from 'expo'
import { MenuItemIconProps } from '../../menu'

const _ContextMenuItemIcon = requireNativeView<{
  name: string
}>('Zeego', 'ContextMenuItemIconView')

export default function MenuItemIcon(props: MenuItemIconProps) {
  const { ios } = props
  if (!ios) return null
  return <_ContextMenuItemIcon name={ios.name} />
}
