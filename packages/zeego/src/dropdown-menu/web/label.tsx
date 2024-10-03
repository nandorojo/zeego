import React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { create, MenuLabelProps } from '../../menu'

const Label = create(
  (props: MenuLabelProps) => <DropdownMenu.Label {...props} />,
  'Label'
)

export { Label }
