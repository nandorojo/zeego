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

To manually change the theme while the app is running you can use the React Native Appearance API.
```typescript
import {Appearance} from 'react-native';

Appearance.setColorScheme('dark');
```
