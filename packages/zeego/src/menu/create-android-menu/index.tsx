import { Platform } from 'react-native'
import type { createAndroidMenu as android } from './index.android'

export const createAndroidMenu: typeof android = () => {
  throw new Error('Tried to create android menu on ' + Platform.OS)
}
