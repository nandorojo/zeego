import React from 'react'
import type {
  MenuItemProps,
  MenuItemSubtitleProps,
  MenuItemTitleProps,
} from '../types'
import { Text, View } from 'react-native'
import { pickChildren } from '../children'

import { create } from '../display-names'

const ItemPrimitive = ({ children, style }: MenuItemProps) => {
  return <View style={style}>{children}</View>
}

const ItemTitle = create(({ children, style }: MenuItemTitleProps) => {
  return (
    <Text style={style} selectable={false}>
      {children}
    </Text>
  )
}, 'ItemTitle')

const ItemSubtitle = create(({ children, style }: MenuItemSubtitleProps) => {
  return (
    <Text style={style} selectable={false}>
      {children}
    </Text>
  )
}, 'ItemSubtitle')

export { ItemPrimitive, ItemSubtitle, ItemTitle }
