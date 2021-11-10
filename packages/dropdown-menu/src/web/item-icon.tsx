import type { MenuItemIconProps } from '@zeego/menu'
import { Image, StyleSheet, View } from 'react-native'

import React from 'react'

const ItemIcon = ({ children, source }: MenuItemIconProps) => {
  if (!children && !source) {
    return null
  }
  if (source) {
    return (
      <View style={styles.container}>
        <Image source={source} style={styles.icon} resizeMode="contain" />
      </View>
    )
  }
  return <View style={styles.container}>{children}</View>
}

const styles = StyleSheet.create({
  icon: {
    height: 20,
    width: 20,
  },
  container: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
})

ItemIcon.displayName = 'ItemIcon'

export { ItemIcon }
