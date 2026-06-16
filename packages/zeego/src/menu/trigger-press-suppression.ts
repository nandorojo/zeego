type PressSuppressionRef = {
  current: boolean
}

export type PressHandler = (...args: any[]) => void

export function createPressSuppressionHandler(
  suppressNextPress: PressSuppressionRef,
  onPress?: PressHandler
) {
  return (...args: any[]) => {
    if (suppressNextPress.current) {
      suppressNextPress.current = false
      return
    }

    onPress?.(...args)
  }
}
