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

export type MenuItemIconProps = {
  /**
   * `source={require('path/to/image')}`
   */
  source?: any
  /**
   * The name of an iOS-only SF Symbol. For a full list, see https://developer.apple.com/sf-symbols/.
   *
   * @platform ios
   */
  iosIconName?: string
  /**
   * You can also pass the icon as a React Native component child. This will only work on Web, not iOS.
   */
  children?: React.ReactNode
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
export type MenuSeparatorProps = {
  style?: ViewStyle
}
