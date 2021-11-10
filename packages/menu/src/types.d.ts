/// <reference types="react" />
import type { TextStyle, ViewStyle } from 'react-native';
export declare type MenuRootProps = {
    children: React.ReactNode;
    style?: ViewStyle;
};
export declare type MenuTriggerProps = {
    children: React.ReactNode;
    style?: ViewStyle;
};
export declare type MenuContentProps = {
    children: React.ReactNode;
    style?: ViewStyle;
};
export declare type MenuGroupProps = {
    children: React.ReactNode;
    style?: ViewStyle;
};
export declare type MenuItemProps = ({
    children: string;
    style?: TextStyle;
} | {
    children: React.ReactNode;
    style?: ViewStyle;
}) & {
    onSelect?: () => void;
    textValue?: string;
    disabled?: boolean;
};
export declare type MenuItemIconProps = {
    /**
     * `source={require('path/to/image')}`
     */
    source?: any;
    /**
     * The name of an iOS-only SF Symbol. For a full list, see https://developer.apple.com/sf-symbols/.
     *
     * @platform ios
     */
    iosIconName?: string;
    /**
     * You can also pass the icon as a React Native component child. This will only work on Web, not iOS.
     */
    children?: React.ReactNode;
};
export declare type MenuTriggerItemProps = MenuItemProps;
export declare type MenuItemTitleProps = {
    children: string;
    style?: TextStyle;
};
export declare type MenuItemSubtitleProps = {
    children: string;
    style?: TextStyle;
};
export declare type MenuSeparatorProps = {
    style?: ViewStyle;
};
