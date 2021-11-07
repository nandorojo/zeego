import type {
  ContextMenuContentProps,
  ContextMenuItemProps,
  ContextMenuRootProps,
  ContextMenuTriggerProps,
} from './types';
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
  const content = pickChildren(children, Content);

  const contentChildren = content.targetChildren;

  console.log(trigger.withoutTargetChildren);

  return (
    <ContextMenuView
      // `ContextMenuView` Props
      onPressMenuItem={({ nativeEvent }) =>
        alert(`onPressMenuItem nativeEvent: ${JSON.stringify(nativeEvent)}`)
      }
      onPressMenuPreview={() => alert('onPressMenuPreview')}
      menuConfig={{
        menuTitle: '',
        menuItems: [
          {
            actionKey: 'key-01',
            actionTitle: 'Action #1',
          },
          {
            actionKey: 'key-02',
            actionTitle: 'Action #2',
          },
          {
            actionKey: 'key-03',
            actionTitle: 'Action #3',
          },
        ],
      }}
    >
      <>{trigger.targetChildren?.[0]}</>
    </ContextMenuView>
  );
};

export { Root, Trigger, Content, Item };
