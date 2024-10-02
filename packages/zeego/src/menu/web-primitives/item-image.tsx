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
    return (
      <img
        src={
          typeof source === 'string'
            ? source
            : typeof source === 'object' &&
              'uri' in source &&
              typeof source.uri === 'string'
            ? source
            : typeof source === 'object' &&
              'src' in source &&
              typeof source.src === 'string' // Next.js bundler turns into { src: string }
            ? source.src
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
