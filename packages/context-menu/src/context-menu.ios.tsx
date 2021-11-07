import type {
  ContextMenuContentProps,
  ContextMenuItemProps,
  ContextMenuItemSubtitleProps,
  ContextMenuItemTitleProps,
  ContextMenuRootProps,
  ContextMenuTriggerProps,
} from './types';
import React, { Children, ReactElement, ReactNode } from 'react';
// @ts-expect-error
import { ContextMenuView } from 'react-native-ios-context-menu';
import {
  flattenChildren,
  flattenChildrenKeyless,
  pickChildren,
} from './pick-children';

const Trigger = ({ children }: ContextMenuTriggerProps) => {
  const child = <>{children}</>;

  return <>{child}</>;
};

const Content = ({ children }: ContextMenuContentProps) => {
  return <>{children}</>;
};
const ItemTitle = ({ children }: ContextMenuItemTitleProps) => {
  if (typeof children != 'string') {
    throw new Error('[zeeg] <ContextMenu.ItemTitle /> child must be a string');
  }
  return <>{children}</>;
};
const ItemSubtitle = ({ children }: ContextMenuItemSubtitleProps) => {
  if (children && typeof children != 'string') {
    throw new Error(
      '[zeeg] <ContextMenu.ItemSubtitle /> child must be a string'
    );
  }
  return <>{children}</>;
};
const Item = ({ children }: ContextMenuItemProps) => {
  const titleChild = pickChildren(children, ItemTitle).targetChildren;
  if (typeof children != 'string' && !titleChild?.length) {
    console.error(
      `[zeeg] Invalid <ContextMenu.Item />. It either needs a string as the children, or a <ContextMenu.ItemTitle /> in the children. However, it got neither.

<ContextMenu.Item>
  Title here
</ContextMenu.Item>

  Or:

<ContextMenu.Item>
 <ContextMenu.ItemTitle>
  Title here
 </ContextMenu.ItemTitle>
</ContextMenu.Item>
  `
    );
  }
  return <>{children}</>;
};

type MenuItem = {
  actionKey: string;
  actionTitle: string;
  discoverabilityTitle?: string;
  menuItems?: MenuItem[];
};

const Root = (props: ContextMenuRootProps) => {
  const trigger = pickChildren(props.children, Trigger);
  const content = pickChildren(props.children, Content);

  const itemz: MenuItem[] = [];

  const mapItemsChildren = (children: React.ReactNode) => {
    Children.forEach(flattenChildrenKeyless(children), (_child, index) => {
      if ((_child as ReactElement<ContextMenuItemProps>).type === Item) {
        const child = _child as ReactElement<ContextMenuItemProps>;
        let title: string | undefined;
        const key: string = child.key ? `${child.key}` : `item-${index}`;
        let subtitle: string | undefined;

        if (typeof child.props.children == 'string') {
          title = child.props.children;
        } else {
          const titleChild = pickChildren<ContextMenuItemTitleProps>(
            child.props.children,
            ItemTitle
          ).targetChildren;
          const subtitleChild = pickChildren<ContextMenuItemSubtitleProps>(
            child.props.children,
            ItemSubtitle
          ).targetChildren;

          title = titleChild?.[0].props.children;
          if (typeof subtitleChild?.[0].props.children == 'string') {
            subtitle = subtitleChild[0].props.children;
          }
        }
        if (title) {
          if (
            // if the key doesn't exist as a string
            typeof child.key != 'string' ||
            // or if flattenChildren assigned the key as `.${key}${index}`
            (child.key.startsWith('.') && !isNaN(Number(child.key[1])))
          ) {
            console.warn(
              `[zeeg] <ContextMenu.Item /> is missing a unique key. Pass a unique key string for each item, such as: <ContextMenu.Item key="${
                title.toLowerCase().replace(/ /g, '-') || `action-${index}`
              }" />. Falling back to index instead, but this may have negative consequences.`
            );
          }
          itemz.push({
            actionKey: key,
            actionTitle: title,
            discoverabilityTitle: subtitle,
          });
        }
      }
    });
  };

  Children.forEach(flattenChildren(props.children), (_child, index) => {
    const child = _child as ReactElement;
    if (child.type === Content) {
      mapItemsChildren(
        (child as ReactElement<ContextMenuContentProps>).props.children
      );
    }
  });

  // const pickMenuItems = (children: ReactNode) => {
  //   const content = pickChildren(children, Content);

  //   const items = pickChildren(
  //     content.targetChildren?.[0]?.props?.children,
  //     Item
  //   );

  //   const menuItems: { actionKey: string; actionTitle: string }[] | undefined =
  //     Children.map(items.targetChildren, (_child, index) => {
  //       const child = _child as ReactElement<ContextMenuItemProps>;
  //       const actionTitle = child.props?.children;
  //       if (actionTitle && typeof actionTitle !== 'string') {
  //         throw new Error('[zeeg] <ContextMenu.Item /> child must be a string');
  //       }
  //       if (!child.key) {
  //         console.warn(
  //           `[zeeg] <ContextMenu.Item /> is missing a unique key. Pass a unique key string for each item, such as: <ContextMenu.Item key="${
  //             actionTitle.toLowerCase().replace(/ /g, '-') || 'action-1'
  //           }" />`
  //         );
  //       }
  //       return {
  //         actionKey: child.key ? child.key + '' : `key-${index}`,
  //         actionTitle,
  //       };
  //     });

  //   return {
  //     menuItems,
  //   };
  // };

  // // const menuItems = pickMenuItems(props.children);

  // const items = pickChildren(
  //   content.targetChildren?.[0]?.props?.children,
  //   Item
  // );

  // const menuItems: { actionKey: string; actionTitle: string }[] | undefined =
  //   Children.map(items.targetChildren, (_child, index) => {
  //     const child = _child as ReactElement<ContextMenuItemProps>;
  //     const actionTitle = child.props?.children;
  //     if (actionTitle && typeof actionTitle !== 'string') {
  //       throw new Error('[zeeg] <ContextMenu.Item /> child must be a string');
  //     }
  //     if (!child.key) {
  //       console.warn(
  //         `[zeeg] <ContextMenu.Item /> is missing a unique key. Pass a unique key string for each item, such as: <ContextMenu.Item key="${
  //           actionTitle.toLowerCase().replace(/ /g, '-') || 'action-1'
  //         }" />`
  //       );
  //     }
  //     return {
  //       actionKey: child.key ? child.key + '' : `key-${index}`,
  //       actionTitle,
  //     };
  //   });

  console.log(itemz);

  return (
    <ContextMenuView
      // `ContextMenuView` Props
      onPressMenuItem={({ nativeEvent }) =>
        alert(`onPressMenuItem nativeEvent: ${JSON.stringify(nativeEvent)}`)
      }
      onPressMenuPreview={() => alert('onPressMenuPreview')}
      menuConfig={{
        menuTitle: '',
        menuItems: itemz || [],
      }}
    >
      <>{trigger.targetChildren?.[0]}</>
    </ContextMenuView>
  );
};

export { Root, Trigger, Content, Item, ItemTitle, ItemSubtitle };
