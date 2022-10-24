import { Platform } from 'react-native'
import App from './src/App'
import { registerRootComponent } from 'expo'

// let e

if (Platform.OS != 'web') {
  require('expo-router/entry')
} else {
  registerRootComponent(App)
}

// export default App
