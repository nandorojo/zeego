import { Text } from 'react-native'
import * as ContextMenu from '@radix-ui/react-context-menu'
import { menuify } from '../../menu/display-names'
import type { MenuLabelProps } from '../../menu'

const Label = menuify(
  ({ children, style }: MenuLabelProps) => (
    <ContextMenu.Label>
      <Text style={style}>{children}</Text>
    </ContextMenu.Label>
  ),
  'Label'
)

export { Label }
