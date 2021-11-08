import type {
  MenuItemProps,
  MenuItemSubtitleProps,
  MenuItemTitleProps,
} from '../types'
import { Text, View } from 'react-native'
import { pickChildren } from '../children'

const ItemPrimitive = ({ children, style }: MenuItemProps) => {
  const titleChildren = pickChildren(children, ItemTitle)

  let title = <></>
  if (typeof children == 'string') {
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

const ItemTitle = ({ children, style }: MenuItemTitleProps) => {
  return (
    <Text style={style} selectable={false}>
      {children}
    </Text>
  )
}
ItemTitle.displayName = 'ItemTitle'

const ItemSubtitle = ({ children, style }: MenuItemSubtitleProps) => {
  return (
    <Text style={style} selectable={false}>
      {children}
    </Text>
  )
}
ItemSubtitle.displayName = 'ItemSubtitle'

export { ItemPrimitive, ItemSubtitle, ItemTitle }
