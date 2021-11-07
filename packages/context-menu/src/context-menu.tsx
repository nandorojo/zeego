import type {
  ContextMenuContentProps,
  ContextMenuItemProps,
  ContextMenuRootProps,
  ContextMenuTriggerProps,
} from './types';

const Root = ({ children }: ContextMenuRootProps) => <>{children}</>;
const Trigger = ({ children }: ContextMenuTriggerProps) => <>{children}</>;
const Content = ({ children }: ContextMenuContentProps) => {
  return <>{children}</>;
};
const Item = ({ children }: ContextMenuItemProps) => {
  return <>{children}</>;
};

export { Root, Trigger, Content, Item };
