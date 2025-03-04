import type * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'
import type { ComponentProps, SVGAttributes } from 'react'
import type { ImageProps } from 'react-native'
import type {
  ContextMenuView,
  MenuAuxiliaryPreviewConfig,
  ContextMenuButton,
  ImageOptions,
} from 'react-native-ios-context-menu'
import { ImageSystemSymbolConfiguration } from 'react-native-ios-utilities'
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

export type MenuContentProps = React.ComponentPropsWithoutRef<
  typeof RadixDropdownMenu.Content
> & {
  children: React.ReactNode
}

export type ContextMenuContentProps = Not<
  MenuContentProps,
  'side' | 'align' | 'sideOffset'
>

export type MenuGroupProps = React.ComponentPropsWithoutRef<
  typeof RadixDropdownMenu.Group
> & {
  children: React.ReactNode
  style?: ViewStyle
  /**
   * iOS-only
   *
   * Makes the menu items be in a row. Defaults to `false`.
   */
  horizontal?: boolean
}

type ItemBaseProps = {
  onSelect?: () => void
  disabled?: boolean
  hidden?: boolean
  destructive?: boolean
  key: string
  shouldDismissMenuOnSelect?: boolean
}

export type MenuItemProps = Omit<
  React.ComponentPropsWithoutRef<typeof RadixDropdownMenu.Item>,
  keyof ItemBaseProps
> & {
  children: React.ReactNode
  style?: ViewStyle
  /**
   * If you want to pass a React text node to `<ItemTitle />`, then you need to use this prop. This gets used on iOS and Android.
   */
  textValue?: string
} & ItemBaseProps

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
  ios?: ImageSystemSymbolConfiguration & {
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

type NotArray<T> = T extends (infer _)[] ? never : T

export type MenuItemImageProps = Omit<
  ComponentProps<'img'>,
  'src' | 'height' | 'width' | 'ref'
> & {
  /**
   * `source={require('path/to/image')}`
   */
  source:
    | NotArray<ImageProps['source']>
    | {
        // next.js support
        src: string
      }
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

export type MenuSubTriggerProps = Omit<
  React.ComponentPropsWithoutRef<typeof RadixDropdownMenu.SubTrigger>,
  keyof ItemBaseProps
> &
  ItemBaseProps

export type MenuSubProps = React.ComponentPropsWithoutRef<
  typeof RadixDropdownMenu.Sub
> & {
  children: React.ReactNode
}

export type MenuSubContentProps = RadixDropdownMenu.MenuSubContentProps &
  Not<MenuContentProps, 'side' | 'align'>
export type ContextMenuSubContentProps = React.ComponentPropsWithoutRef<
  typeof RadixDropdownMenu.SubContent
> &
  ContextMenuContentProps &
  Pick<MenuContentProps, 'sideOffset'>

export type MenuItemTitleProps = Omit<ComponentProps<'span'>, 'children'> & {
  children: string | React.ReactNode
}
export type MenuItemSubtitleProps = Omit<ComponentProps<'span'>, 'children'> & {
  children: string
}
export type MenuSeparatorProps = React.ComponentPropsWithoutRef<
  typeof RadixDropdownMenu.Separator
>

export type MenuCheckboxItemProps = Omit<
  React.ComponentPropsWithoutRef<typeof RadixDropdownMenu.CheckboxItem>,
  keyof ItemBaseProps | 'onCheckedChange'
> &
  ItemBaseProps & {
    value: 'mixed' | 'on' | 'off' | boolean
    onValueChange?: (
      state: 'mixed' | 'on' | 'off',
      prevState: 'mixed' | 'on' | 'off'
    ) => void
    key: string
    shouldDismissMenuOnSelect?: boolean
  }

export type MenuItemIndicatorProps = React.ComponentPropsWithoutRef<
  typeof RadixDropdownMenu.ItemIndicator
> & {
  children?: React.ReactNode
}

export type MenuLabelProps = React.ComponentPropsWithoutRef<
  typeof RadixDropdownMenu.Label
> & {
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
