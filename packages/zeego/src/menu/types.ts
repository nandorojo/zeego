import type {
  Text,
  View,
  ImageRequireSource,
  ImageProps,
  ViewProps,
} from 'react-native'
import type { MenuContentProps as RadixContentProps } from '@radix-ui/react-dropdown-menu'
import type { ContextMenuView } from 'react-native-ios-context-menu'
import type { ImageSystemSymbolConfiguration } from 'react-native-ios-context-menu/lib/typescript/types/ImageItemConfig'

import type { SFSymbol } from 'sf-symbols-typescript'

type ViewStyle = React.ComponentProps<typeof View>['style']
type TextStyle = React.ComponentProps<typeof Text>['style']

export type MenuRootProps = {
  children: React.ReactNode
  style?: ViewStyle
  onOpenChange?: (isOpen: boolean) => void
  /**
   * Callback function indicating that the menu intends to open or close. Passes a `willOpen` boolean argument indicating whether it is opening or closing.
   * Unlike `onOpenChange`, thi
   * @platform `ios`
   */
  onOpenWillChange?: (willOpen: boolean) => void
}
export type MenuTriggerProps = {
  children: React.ReactElement
  style?: ViewStyle
}

export type MenuContentProps = {
  children: React.ReactNode
  style?: ViewStyle
} & Pick<
  RadixContentProps,
  | 'loop'
  | 'side'
  | 'align'
  | 'alignOffset'
  | 'avoidCollisions'
  | 'collisionPadding'
  | 'sideOffset'
>

export type ContextMenuContentProps = Not<
  MenuContentProps,
  'side' | 'align' | 'sideOffset'
>

export type MenuGroupProps = {
  children: React.ReactNode
  style?: ViewStyle
}

export type MenuItemProps = {
  children: React.ReactNode
  style?: ViewStyle
  /**
   * If you want to pass a React text node to `<ItemTitle />`, then you need to use this prop. This gets used on iOS and Android.
   */
  textValue?: string
} & {
  onSelect?: () => void
  disabled?: boolean
  hidden?: boolean
  destructive?: boolean
  onFocus?: () => void
  onBlur?: () => void
  key: string
}

export interface MenuItemCommonProps {
  /**
   * The name of an iOS-only SF Symbol. For a full list, see https://developer.apple.com/sf-symbols/.
   * @deprecated Please use the `name` inside of the `ios` prop instead.
   * @platform ios
   */
  iosIconName?: string
  /**
   * Icon configuration to be used on iOS. You can pass a SF Symbol icon using the `name` prop.
   * Additionally, you can configure the SF Symbol's features like weight, scale, color etc. by passing
   * the corresponding props. Note that some of those features require iOS 15+. For the full list of options,
   * refer to the ImageSystemSymbolConfiguration type in react-native-ios-context-menu
   *
   * @platform ios
   */
  ios?: ImageSystemSymbolConfiguration & {
    name: SFSymbol
  }
  /**
   * The name of an android-only resource drawable. For a full list, see https://developer.android.com/reference/android/R.drawable.html.
   *
   * @platform android
   */
  androidIconName?: string
}

export type MenuItemIconProps = MenuItemCommonProps & {
  /**
   * You can also pass the icon as a React Native component child. This will only work on Web, not iOS or android.
   */
  children?: React.ReactNode
  style?: ViewStyle
}

export type MenuItemImageProps = MenuItemCommonProps & {
  /**
   * `source={require('path/to/image')}`
   */
  source: ImageRequireSource
  style?: ImageProps['style']
  width?: number
  height?: number
  resizeMode?: ImageProps['resizeMode']
  fadeDuration?: ImageProps['fadeDuration']
} & Pick<ImageProps, 'accessibilityLabel'>

export type MenuArrowProps = {
  height?: number
  width?: number
  style?: ViewProps['style']
  children?: React.ReactNode
}

export type MenuSubTriggerProps = Omit<
  MenuItemProps,
  keyof Pick<MenuItemProps, 'onSelect'>
> & {
  key: string
}

export type MenuSubProps = {
  children?: React.ReactNode
}

export type MenuSubContentProps = Not<MenuContentProps, 'side' | 'align'>
export type ContextMenuSubContentProps = ContextMenuContentProps &
  Pick<MenuContentProps, 'sideOffset'>

export type MenuItemTitleProps = {
  children: string | React.ReactChild
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
  value: 'mixed' | 'on' | 'off' | boolean
  onValueChange?: (
    state: 'mixed' | 'on' | 'off',
    prevState: 'mixed' | 'on' | 'off'
  ) => void
  key: string
}

export type MenuItemIndicatorProps = {
  style?: ViewStyle
  children?: React.ReactNode
}

export type MenuLabelProps = {
  children: string
  style?: TextStyle
}

type Not<T extends object, O extends keyof NonNullable<T>> = Omit<T, O>

export type ContextMenuPreviewProps = {
  children: React.ReactNode | (() => React.ReactNode)
  size?: NonNullable<
    React.ComponentProps<typeof ContextMenuView>['previewConfig']
  >['previewSize']
  onPress?: React.ComponentProps<typeof ContextMenuView>['onPressMenuPreview']
} & Not<
  NonNullable<React.ComponentProps<typeof ContextMenuView>['previewConfig']>,
  'targetViewNode' | 'previewSize' | 'previewType'
>
