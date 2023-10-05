---
title: Dark Mode
---

## Expo

If your using Expo you need to install this package:

```sh
yarn add expo-system-ui
```

You can configure it to automatically change by adding this to your expo app config.
```json
{
  "expo": {
    "userInterfaceStyle": "automatic"
  }
}
```



To use a specific theme you can change `automatic` to a specific theme such as `dark`.

## Manually overriding

To manually change the theme while the app is running you can install [react-native-override-color-scheme](https://github.com/plumvillage/react-native-override-color-scheme)
```sh
yarn add react-native-override-color-scheme
```
If you’re using Expo, you’ll need to rebuild your development client, note this won't work if your using Expo Go
```sh
expo run:ios -d
```

Then you can do:
```typescript
import overrideColorScheme from 'react-native-override-color-scheme';

// ...

overrideColorScheme.setScheme('dark'); // or `light` or `undefined` for system default
```
