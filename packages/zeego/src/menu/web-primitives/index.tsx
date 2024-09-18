import React from 'react'
import type { MenuItemSubtitleProps, MenuItemTitleProps } from '../types'

import { create } from '../display-names'

const ItemTitle = create((props: MenuItemTitleProps) => {
  return <span {...props} />
}, 'ItemTitle')

const ItemSubtitle = create((props: MenuItemSubtitleProps) => {
  return <span {...props} />
}, 'ItemSubtitle')

export { ItemSubtitle, ItemTitle }
