import { createPressSuppressionHandler } from './trigger-press-suppression'

describe('createPressSuppressionHandler', () => {
  it('calls the original press handler when suppression is not armed', () => {
    const suppressNextPress = { current: false }
    const onPress = jest.fn()

    const handlePress = createPressSuppressionHandler(
      suppressNextPress,
      onPress
    )

    handlePress('event')

    expect(onPress).toHaveBeenCalledWith('event')
    expect(suppressNextPress.current).toBe(false)
  })

  it('swallows one trailing press after suppression is armed', () => {
    const suppressNextPress = { current: true }
    const onPress = jest.fn()

    const handlePress = createPressSuppressionHandler(
      suppressNextPress,
      onPress
    )

    handlePress('first')
    handlePress('second')

    expect(onPress).toHaveBeenCalledTimes(1)
    expect(onPress).toHaveBeenCalledWith('second')
    expect(suppressNextPress.current).toBe(false)
  })
})
