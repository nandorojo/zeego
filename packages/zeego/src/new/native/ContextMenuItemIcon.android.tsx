import { requireNativeView } from 'expo'
import { MenuItemIconProps } from '../../menu'

const _ContextMenuItemIcon = requireNativeView<{
  name: string
}>('Zeego', 'ContextMenuItemIconView')

export default function _AndroidMenuItemIcon(props: MenuItemIconProps) {
  const { androidIconName } = props
  if (!androidIconName) return null
  return <_ContextMenuItemIcon name={androidIconName} />
}
