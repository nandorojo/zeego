import { Image } from 'react-native'
import type { MenuItemImageProps } from '../types'

import React from 'react'
import { menuify } from '../display-names'

const ItemImage = menuify(
  ({
    source,
    style,
    height,
    width,
    fadeDuration = 0,
    resizeMode,
  }: MenuItemImageProps) => {
    return (
      <Image
        resizeMode={resizeMode}
        fadeDuration={fadeDuration}
        style={style}
        source={source}
        width={width}
        height={height}
      />
    )
  },
  'ItemImage'
)

export { ItemImage }
