import React from 'react'
import { Text } from 'react-native'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { MenuDisplayName, MenuLabelProps } from '../../menu'

const Label = ({ children, style }: MenuLabelProps) => (
  <DropdownMenu.Label>
    <Text style={style}>{children}</Text>
  </DropdownMenu.Label>
)
Label.displayName = MenuDisplayName.Label

export { Label }
