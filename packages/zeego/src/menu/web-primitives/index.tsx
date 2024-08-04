import React from 'react'
import type { MenuItemSubtitleProps, MenuItemTitleProps } from '../types'

import { create } from '../display-names'

const ItemTitle = create(({ children, style }: MenuItemTitleProps) => {
  return <span style={{ userSelect: 'none', ...style }}>{children}</span>
}, 'ItemTitle')

const ItemSubtitle = create(({ children, style }: MenuItemSubtitleProps) => {
  return <span style={{ userSelect: 'none', ...style }}>{children}</span>
}, 'ItemSubtitle')

export { ItemSubtitle, ItemTitle }
