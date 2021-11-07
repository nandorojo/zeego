/**
 * Credit to geist-ui/react for this file, it's copied from there.
 */

import React, {
  ReactNode,
  Children,
  ReactChild,
  isValidElement,
  cloneElement,
} from 'react';

function flattenChildren(
  children: ReactNode,
  depth: number = 0,
  keys: (string | number)[] = []
): ReactChild[] {
  return Children.toArray(children).reduce(
    (acc: ReactChild[], node: any, nodeIndex) => {
      if (node.type === React.Fragment) {
        acc.push.apply(
          acc,
          flattenChildren(
            node.props.children,
            depth + 1,
            keys.concat(node.key || nodeIndex)
          )
        );
      } else {
        if (isValidElement(node)) {
          acc.push(
            cloneElement(node, {
              key: keys.concat(String(node.key)).join('.'),
            })
          );
        } else if (typeof node === 'string' || typeof node === 'number') {
          acc.push(node);
        }
      }
      return acc;
    },
    []
  );
}

export const pickChildren = (
  children: React.ReactNode | undefined,
  targetChild: React.ElementType
) => {
  // const children = flattenChildren(_children);
  const target: ReactNode[] = [];
  const withoutTargetChildren = React.Children.map(children, (item) => {
    if (!React.isValidElement(item)) return item;
    if (item.type === targetChild) {
      target.push(item);
      return null;
    }
    return item;
  });

  const targetChildren = target.length >= 0 ? target : undefined;

  return {
    targetChildren,
    withoutTargetChildren,
  };
};
