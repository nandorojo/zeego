import * as ContextMenu from '@radix-ui/react-context-menu'

import { create } from '../../menu/display-names'

const Label = create<React.ComponentProps<typeof ContextMenu.Label>>(
  ContextMenu.Label,
  'Label'
)

export { Label }
