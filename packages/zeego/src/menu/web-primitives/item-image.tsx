import React from 'react'
import type { MenuItemImageProps } from '../types'

import { create } from '../display-names'

const ItemImage = create(
  ({
    source,
    accessibilityLabel,
    alt = accessibilityLabel,
    ...props
  }: MenuItemImageProps) => {
    console.log(source)
    return (
      <img
        src={
          typeof source === 'string'
            ? source
            : typeof source === 'object' && 'uri' in source
            ? source
            : (source as any)
        }
        alt={accessibilityLabel}
        {...props}
      />
    )
  },
  'ItemImage'
)

export { ItemImage }
