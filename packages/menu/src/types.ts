import type { TextStyle, ViewStyle } from 'react-native'

export type MenuRootProps = {
  children: React.ReactNode
  style?: ViewStyle
}
export type MenuTriggerProps = {
  children: React.ReactNode
  style?: ViewStyle
}
export type MenuContentProps = {
  children: React.ReactNode
  style?: ViewStyle
}

export type MenuGroupProps = {
  children: React.ReactNode
  style?: ViewStyle
}

export type MenuItemProps = (
  | {
      children: string
      style?: TextStyle
    }
  | {
      children: React.ReactNode
      style?: ViewStyle
    }
) & {
  onSelect?: () => void
  textValue?: string
  disabled?: boolean
}

export type MenuTriggerItemProps = MenuItemProps
export type MenuItemTitleProps = {
  children: string
  style?: TextStyle
}
export type MenuItemSubtitleProps = {
  children: string
  style?: TextStyle
}
