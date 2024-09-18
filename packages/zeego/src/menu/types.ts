import type { ImageProps } from 'react-native'
import type { MenuContentProps as RadixContentProps } from '@radix-ui/react-dropdown-menu'
import type * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'
import type {
  ContextMenuView,
  MenuAuxiliaryPreviewConfig,
  ContextMenuButton,
  ImageOptions,
  ImageSystemConfig,
} from 'react-native-ios-context-menu'
import type { ComponentProps, SVGAttributes } from 'react'

import type { SFSymbol } from 'sf-symbols-typescript'

type ViewStyle = React.CSSProperties

export type MenuRootProps = RadixDropdownMenu.DropdownMenuProps & {
  children: React.ReactNode
  style?: ViewStyle
  onOpenChange?: (isOpen: boolean) => void
  /**
   * Callback function indicating that the menu intends to open or close. Passes a `willOpen` boolean argument indicating whether it is opening or closing.
   * Unlike `onOpenChange`, thi
   * @platform `ios`
   */
  onOpenWillChange?: (willOpen: boolean) => void

  __unsafeIosProps?:
    | ComponentProps<typeof ContextMenuView>
    | ComponentProps<typeof ContextMenuButton>
}

/**
 * See the docs on `react-native-ios-context-menu` for usage: https://github.com/dominicstop/react-native-ios-context-menu#ContextMenuView-Auxiliary-Preview---Example-01
 */
export type ContextMenuAuxliliaryProps = Omit<
  MenuAuxiliaryPreviewConfig,
  'marginAuxiliaryPreview'
> & {
  children:
    | React.ReactNode
    | ((options: { dismissMenu: () => void }) => React.ReactNode)
  onDidShow?: () => void
  marginWithScreenEdge?: number
  onWillShow?: () => void
}

export type MenuTriggerProps = RadixDropdownMenu.DropdownMenuTriggerProps & {
  children: React.ReactElement
  style?: ViewStyle
  asChild?: boolean
  /**
   * Determine whether the menu should open on `press` or `longPress`. Defaults to `press` for `DropdownMenu` and `longPress` for `ContextMenu`.
   *
   * Only applies for `ios` and `android`.
   */
  action?: 'press' | 'longPress'
}

export type MenuContentProps = RadixDropdownMenu.MenuContentProps & {
  children: React.ReactNode
  style?: ViewStyle
} & RadixContentProps

export type ContextMenuContentProps = Not<
  MenuContentProps,
  'side' | 'align' | 'sideOffset'
>

export type MenuGroupProps = RadixDropdownMenu.MenuGroupProps & {
  children: React.ReactNode
  style?: ViewStyle
  /**
   * iOS-only
   *
   * Makes the menu items be in a row. Defaults to `false`.
   */
  horizontal?: boolean
}

export type MenuItemProps = RadixDropdownMenu.MenuItemProps & {
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
  shouldDismissMenuOnSelect?: boolean
}

export type MenuItemIconProps = {
  /**
   * You can also pass the icon as a React Native component child. This will only work on Web, not iOS or android.
   */
  children?: React.ReactNode
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
  ios?: ImageSystemConfig & {
    name: SFSymbol
  }
  /**
   * The name of an android-only resource drawable. For a full list, see https://developer.android.com/reference/android/R.drawable.html.
   *
   * @platform android
   */
  androidIconName?: string
  style?: ViewStyle
  className?: string
}

type NotArray<T> = T extends Array<infer U> ? never : T

export type MenuItemImageProps = Omit<
  ComponentProps<'img'>,
  'src' | 'height' | 'width'
> & {
  /**
   * `source={require('path/to/image')}`
   */
  source: NotArray<ImageProps['source']>
  width?: number
  height?: number
  ios?: {
    style?: ImageOptions
    lazy?: boolean
  }
  accessibilityLabel?: string
}

type SVGProps = SVGAttributes<SVGSVGElement>

export type MenuArrowProps = {
  height?: number
  width?: number
  children?: React.ReactNode
  asChild?: boolean
} & Pick<SVGProps, 'fill' | 'style' | 'className'>

export type MenuSubTriggerProps = RadixDropdownMenu.MenuSubTriggerProps &
  Omit<MenuItemProps, keyof Pick<MenuItemProps, 'onSelect'>> & {
    key: string
  }

export type MenuSubProps = RadixDropdownMenu.MenuSubTriggerProps

export type MenuSubContentProps = RadixDropdownMenu.MenuSubContentProps &
  Not<MenuContentProps, 'side' | 'align'>
export type ContextMenuSubContentProps = RadixDropdownMenu.MenuSubContentProps &
  ContextMenuContentProps &
  Pick<MenuContentProps, 'sideOffset'>

export type MenuItemTitleProps = Omit<ComponentProps<'span'>, 'children'> & {
  children: string | React.ReactNode
}
export type MenuItemSubtitleProps = Omit<ComponentProps<'span'>, 'children'> & {
  children: string
}
export type MenuSeparatorProps = RadixDropdownMenu.MenuSeparatorProps

export type MenuCheckboxItemProps = RadixDropdownMenu.MenuCheckboxItemProps &
  Omit<MenuItemProps, 'onSelect'> & {
    value: 'mixed' | 'on' | 'off' | boolean
    onValueChange?: (
      state: 'mixed' | 'on' | 'off',
      prevState: 'mixed' | 'on' | 'off'
    ) => void
    key: string
    shouldDismissMenuOnSelect?: boolean
  }

export type MenuItemIndicatorProps =
  RadixDropdownMenu.MenuItemIndicatorProps & {
    children?: React.ReactNode
  }

export type MenuLabelProps = RadixDropdownMenu.MenuLabelProps & {
  children: string | React.ReactNode
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
