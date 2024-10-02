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
    if (typeof source === 'number') {
      console.warn(`[zeego] <ItemImage /> received an invalid source. This likely means you are using Expo Web/Metro Web.

To fix this, please see the docs: https://zeego.dev/components/context-menu#itemimage`)
    }
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
