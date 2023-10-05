---
title: Dark Mode
---

## Expo

If your using expo you need to install this package:

```sh
yarn add expo-system-ui
```

You can configure it to automatically change by adding `userInterfaceStyle: ‘automatic’` to your expo app config.

To use a specific theme you can change `automatic` to a specific theme such as `dark`.

## Manually overriding

To manually change the theme while the app is running you can install [react-native-override-color-scheme](https://github.com/plumvillage/react-native-override-color-scheme)
```sh
yarn add react-native-override-color-scheme
```

and do:
```typescript
import overrideColorScheme from 'react-native-override-color-scheme';

// ...

overrideColorScheme.setScheme('dark'); // or `light` or `undefined` for system default
```
