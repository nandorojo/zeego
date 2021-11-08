import type { MenuItemIconProps } from '@zeeg/menu'
import { Image, StyleSheet, View } from 'react-native'

const ItemIcon = ({ children, source }: MenuItemIconProps) => {
  if (!children && !source) {
    return null
  }
  if (source) {
    return <Image source={source} style={styles.icon} resizeMode="contain" />
  }
  return <View style={styles.icon}>{children}</View>
}

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    alignSelf: 'center',
    height: 20,
    width: 20,
  },
})

ItemIcon.displayName = 'ItemIcon'

export { ItemIcon }
