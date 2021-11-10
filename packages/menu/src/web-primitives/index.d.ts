import type { MenuItemProps, MenuItemSubtitleProps, MenuItemTitleProps } from '../types';
declare const ItemPrimitive: ({ children, style }: MenuItemProps) => JSX.Element;
declare const ItemTitle: {
    ({ children, style }: MenuItemTitleProps): JSX.Element;
    displayName: string;
};
declare const ItemSubtitle: {
    ({ children, style }: MenuItemSubtitleProps): JSX.Element;
    displayName: string;
};
export { ItemPrimitive, ItemSubtitle, ItemTitle };
