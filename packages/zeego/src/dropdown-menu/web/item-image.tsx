import { MenuDisplayName, MenuItemImageProps } from '@zeego/menu'
import { Image } from 'react-native'

import React from 'react'

const ItemImage = ({
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
}

ItemImage.displayName = MenuDisplayName.ItemImage

export { ItemImage }
