import type { createIosMenu as ios } from './index.ios'
import { Platform } from 'react-native'

export const createIosMenu: typeof ios = () => {
  throw new Error('createIosMenu is not implemented on ' + Platform.OS)
}
