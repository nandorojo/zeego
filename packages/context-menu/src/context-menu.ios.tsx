import type {
  ContextMenuContentProps,
  ContextMenuItemProps,
  ContextMenuRootProps,
  ContextMenuTriggerProps,
} from './types';
import { Children, ReactChild } from 'react';
// @ts-expect-error
import { ContextMenuView } from 'react-native-ios-context-menu';
import { pickChildren } from './pick-children';

const Trigger = ({ children }: ContextMenuTriggerProps) => {
  const child = <>{children}</>;

  return <>{child}</>;
};

const Content = ({ children }: ContextMenuContentProps) => {
  return <>{children}</>;
};
const Item = ({ children }: ContextMenuItemProps) => {
  return <>{children}</>;
};

const Root = ({ children }: ContextMenuRootProps) => {
  const trigger = pickChildren(children, Trigger);
  const content = pickChildren(trigger.withoutTargetChildren, Content);

  const items = pickChildren(
    content.targetChildren?.[0]?.props?.children,
    Item
  );

  const menuItems: { actionKey: string; actionTitle: string }[] = Children.map(
    items.targetChildren,
    (child, index) => {
      return {
        actionKey: `key-${index}`,
        actionTitle: child.props.children,
      };
    }
  );

  console.log(items);

  return (
    <ContextMenuView
      // `ContextMenuView` Props
      onPressMenuItem={({ nativeEvent }) =>
        alert(`onPressMenuItem nativeEvent: ${JSON.stringify(nativeEvent)}`)
      }
      onPressMenuPreview={() => alert('onPressMenuPreview')}
      menuConfig={{
        menuTitle: '',
        menuItems,
      }}
    >
      <>{trigger.targetChildren?.[0]}</>
    </ContextMenuView>
  );
};

export { Root, Trigger, Content, Item };
