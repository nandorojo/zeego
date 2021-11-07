import type {
  ContextMenuContentProps,
  ContextMenuItemProps,
  ContextMenuItemSubtitleProps,
  ContextMenuItemTitleProps,
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
const ItemTitle = ({ children }: ContextMenuItemTitleProps) => {
  return <>{children}</>;
};
const ItemSubtitle = ({ children }: ContextMenuItemSubtitleProps) => {
  return <>{children}</>;
};

export { Root, Trigger, Content, Item, ItemTitle, ItemSubtitle };
