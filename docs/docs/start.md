---
title: Getting Started
---

<!-- <img src="/img/install.svg" alt="yarn add zeego" style={{ borderRadius: '16px' }} /> -->

## Install Zeego

Start by installing Zeego:

```sh
yarn add zeego
```

For upgrading from Zeego 2 to Zeego 3, see the [upgrade guide](https://github.com/nandorojo/zeego/releases/tag/v3.0.0).

## Install peer dependencies

> A note for monorepo users: install these in the directory of your native app, not in the root of the monorepo.

The following **exact versions** must be installed. Please reference the [compatibility table](#compatibility-table) for the versions that work with your setup.

### iOS Dependencies

#### yarn

```sh
yarn add react-native-ios-context-menu@3.1.0 react-native-ios-utilities@5.1.2
```

#### npm

```sh
npm i \
  react-native-ios-context-menu@3.1.0 \
  react-native-ios-utilities@5.1.2 \
  --legacy-peer-deps
```

### Android Dependencies

#### yarn

```sh
yarn add @react-native-menu/menu@1.2.2
```

#### npm

```sh
npm i @react-native-menu/menu@1.2.2 --legacy-peer-deps
```

### Compatibility Table

Given a `Zeego` version (start there), see the dependencies to the right that it is compatible with.

| Zeego | React Native | New Arch      | Expo SDK     | `react-native-menu` | `react-native-ios-context-menu` | `react-native-ios-utilities` |
| ----- | ------------ | ------------- | ------------ | ------------------- | ------------------------------- | ---------------------------- |
| 3     | 0.76 or 0.77 | ✅ (optional) | 52+          | 1.2.2               | 3.1.0                           | 5.1.2                        |
| 2     | 0.74         | ❌            | 51, 50, 49\* | 1.0.2               | 2.5.1                           | 4.5.3                        |

<details>
<summary>*For Expo SDK 49 or lower, click here</summary>

If you're using an older version Expo Development Client, there are some additional steps:

```yarn
npx expo install expo-build-properties
```

Next, add this to your app config's plugins array:

```js
export default {
  plugins: [
    [
      'expo-build-properties',
      {
        android: {
          // these values were tested with Expo SDK 48
          compileSdkVersion: 33,
          targetSdkVersion: 33,
          minSdkVersion: 23,
          buildToolsVersion: '33.0.0',
          kotlinVersion: '1.6.20',
        },
      },
    ],
  ],
}
```

If you know your way around these, you may be able to adjust them. But if you get an error related to `react-native-menu` when building, please reference these properties.

</details>

## Frameworks

### Expo

Expo users need to use a [custom development client](https://blog.expo.dev/introducing-custom-development-clients-5a2c79a9ddf8), since Zeego uses native code.

After installing Zeego and its peer dependencies, you'll need to rebuild your custom development client:

```bash
expo run:ios -d
```

:::tip

To install your dev client on your iPhone, make sure it's plugged in to your Mac. If it doesn't show up, you may need to run `expo prebuild -p ios`, open `ios/YourApp.xcworspace` in XCode, and make sure your Apple team is properly set up.

:::

After the development client build is complete, you can run your app in dev mode:

```bash
npx expo start --dev-client
```

If your app is on the App Store, you'll need to deploy a new build too:

```
eas build --platform ios --autosubmit
```

Zeego will not work with Expo Go.

If you aren't familiar with how Expo works / what custom development clients are, I recommend using [EAS](https://expo.dev/eas) (Expo's hosted build service.) As long as you `eas build`, it will work.

### Solito/Next.js

You need to add `zeego` to your `transpilePackages` in `next.config.js`.

```js
// next.config.js
module.exports = {
  transpilePackages: ['zeego'],
}
```

### Vanilla React Native

Run `pod install` in your `ios` folder.
