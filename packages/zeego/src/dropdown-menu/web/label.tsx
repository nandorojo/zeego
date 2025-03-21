import * as ContextMenu from '@radix-ui/react-dropdown-menu'
import { MenuLabelProps } from 'zeego/menu'

import { create } from '../../menu/display-names'

const Label = create<MenuLabelProps>(ContextMenu.Label, 'Label')

export { Label }
