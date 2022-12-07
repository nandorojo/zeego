import { Image } from 'react-native'
import type { MenuItemImageProps } from '../types'

import { create } from '../display-names'

const ItemImage = create(
  ({
    source,
    style,
    height,
    width,
    fadeDuration = 0,
    resizeMode,
    accessibilityLabel,
  }: MenuItemImageProps) => {
    return (
      <Image
        resizeMode={resizeMode}
        fadeDuration={fadeDuration}
        style={style}
        source={source}
        width={width}
        height={height}
        accessibilityLabel={accessibilityLabel}
      />
    )
  },
  'ItemImage'
)

export { ItemImage }
