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
  const titleChildren = pickChildren(children, ItemTitle)

  let title = <></>
  if (typeof children == 'string') {
    // not encouraged usage. might remove later. don't document
    // ItemTitle should be used directly instead.
    title = <ItemTitle>{children}</ItemTitle>
  } else {
    title = titleChildren.targetChildren?.[0] ?? <></>
  }

  return (
    <View style={style}>
      {title}
      {titleChildren.withoutTargetChildren.filter(
        (child) => typeof child != 'string'
      )}
    </View>
  )
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
