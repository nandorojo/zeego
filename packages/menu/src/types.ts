export type MenuRootProps = {
  children: React.ReactNode;
};
export type MenuTriggerProps = {
  children: React.ReactNode;
};
export type MenuContentProps = {
  children: React.ReactNode;
};

export type MenuGroupProps = {
  children: React.ReactNode;
};

export type MenuItemProps = {
  children: string | React.ReactNode;
  onSelect?: () => void;
  textValue?: string;
  disabled?: boolean;
};
export type MenuTriggerItemProps = MenuItemProps;
export type MenuItemTitleProps = {
  children: string;
};
export type MenuItemSubtitleProps = {
  children: string;
};
