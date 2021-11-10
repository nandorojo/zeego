import type { Text, View, ImageRequireSource, ImageProps } from 'react-native'

type ViewStyle = React.ComponentProps<typeof View>['style']
type TextStyle = React.ComponentProps<typeof Text>['style']

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
  onFocus?: () => void
  onBlur?: () => void
}

export type MenuItemIconProps = {
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
  style?: ViewStyle
}

export type MenuItemImageProps = {
  /**
   * The name of an iOS-only SF Symbol. For a full list, see https://developer.apple.com/sf-symbols/.
   *
   * @platform ios
   */
  iosIconName?: string
  /**
   * `source={require('path/to/image')}`
   */
  source: ImageRequireSource
  style?: ImageProps['style']
  width?: number
  height?: number
  resizeMode?: ImageProps['resizeMode']
  fadeDuration?: ImageProps['fadeDuration']
}

export type MenuTriggerItemProps = Omit<
  MenuItemProps,
  keyof Pick<MenuItemProps, 'onSelect'>
>
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
export type MenuCheckboxItemProps = Omit<MenuItemProps, 'onSelect'> & {
  value: 'mixed' | 'on' | 'off'
  onValueChange?: (
    state: 'mixed' | 'on' | 'off',
    prevState: 'mixed' | 'on' | 'off'
  ) => void
}

export type MenuItemIndicatorProps = {
  style?: ViewStyle
  children?: React.ReactNode
}

export type MenuLabelProps = {
  children: string
  style?: TextStyle
}
