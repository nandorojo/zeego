import { ReactElement, ReactNode, cloneElement, isValidElement } from 'react'

import {
  PressHandler,
  createPressSuppressionHandler,
} from './trigger-press-suppression'

type PressSuppressionRef = {
  current: boolean
}

export function cloneTriggerWithPressSuppression(
  trigger: ReactElement<{ children?: ReactNode }> | undefined,
  suppressNextPress: PressSuppressionRef
) {
  if (!trigger || !isValidElement(trigger)) {
    return trigger
  }

  const child = trigger.props.children

  if (!isValidElement(child)) {
    return trigger
  }

  const pressableChild = child as ReactElement<{ onPress?: PressHandler }>

  const nextChild = cloneElement(child, {
    onPress: createPressSuppressionHandler(
      suppressNextPress,
      pressableChild.props.onPress
    ),
  } as Partial<{ onPress?: PressHandler }>)

  return cloneElement(trigger, {
    children: nextChild,
  })
}
