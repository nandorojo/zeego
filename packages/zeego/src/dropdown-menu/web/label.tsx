import React from 'react'
import { Text } from 'react-native'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { create, MenuLabelProps } from '../../menu'

const Label = create(
  ({ children, style }: MenuLabelProps) => (
    <DropdownMenu.Label>
      <Text style={style}>{children}</Text>
    </DropdownMenu.Label>
  ),
  'Label'
)

export { Label }
