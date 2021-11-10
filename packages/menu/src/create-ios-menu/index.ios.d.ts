import type { MenuContentProps, MenuGroupProps, MenuItemProps, MenuItemSubtitleProps, MenuItemTitleProps, MenuRootProps, MenuTriggerItemProps, MenuTriggerProps, MenuItemIconProps } from '../types';
import type { MenuSeparatorProps } from '../types';
declare const createIosMenu: (Menu: 'ContextMenu' | 'DropdownMenu') => {
    Root: {
        (props: MenuRootProps): JSX.Element;
        displayName: string;
    };
    Trigger: {
        ({ children }: MenuTriggerProps): JSX.Element;
        displayName: string;
    };
    Content: {
        ({ children }: MenuContentProps): JSX.Element;
        displayName: string;
    };
    Item: {
        ({ children }: MenuItemProps): JSX.Element;
        displayName: string;
    };
    ItemTitle: {
        ({ children }: MenuItemTitleProps): JSX.Element;
        displayName: string;
    };
    ItemSubtitle: {
        ({ children }: MenuItemSubtitleProps): JSX.Element;
        displayName: string;
    };
    TriggerItem: {
        ({ children }: MenuTriggerItemProps): JSX.Element;
        displayName: string;
    };
    Group: {
        ({ children }: MenuGroupProps): JSX.Element;
        displayName: string;
    };
    Separator: (_: MenuSeparatorProps) => JSX.Element;
    ItemIcon: {
        (props: MenuItemIconProps): JSX.Element;
        displayName: string;
    };
};
export { createIosMenu };
