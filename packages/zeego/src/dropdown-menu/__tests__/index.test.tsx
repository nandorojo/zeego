// import * as ios from '../dropdown-menu.ios'
// import * as android from '../dropdown-menu.android'
// import * as web from '../dropdown-menu.web'

jest.mock('react-native-ios-context-menu', () => {
  const RN = jest.requireActual('react-native')

  return {
    RCTContextMenuView: () => RN.View,
    ContextMenuButton: 'TouchableOpacity',
  }
})

describe('imports', () => {
  it('should have same imports across platforms', () => {
    jest.resetModules()
    jest.doMock('react-native', () => ({
      Platform: {
        OS: 'ios',
        select(arg) {
          return arg.ios || arg.native || arg.default
        },
      },
    }))

    // TODO how do we mock platform file extensions like index.android.ts here?
    // https://github.com/facebook/jest/issues/1370
    const ios = require('../dropdown-menu.ios')

    const iosKeys = Object.keys(ios).sort().join(',')

    jest.resetModules()
    jest.doMock('react-native', () => ({
      Platform: {
        OS: 'android',
        select(arg) {
          return arg.android || arg.native || arg.default
        },
      },
    }))

    const android = require('../dropdown-menu.android')

    const androidKeys = Object.keys(android).sort().join(',')

    expect(iosKeys).toEqual(androidKeys)
  })
})
