---
title: Getting Started
---

<!-- <img src="/img/install.svg" alt="yarn add zeego" style={{ borderRadius: '16px' }} /> -->

## Install in existing apps

Start by installing Zeego:

```sh
yarn add zeego
```

### Install peer dependencies

> A note for monorepo users: install these in the directory of your native app, not in the root of the monorepo.

#### iOS

```sh
yarn add react-native-ios-context-menu react-native-ios-utilities
```

#### Android

```sh
yarn add @react-native-menu/menu
```

If you're using an Expo Development Client, there are some additional steps:

```yarn
expo install expo-build-properites
```

Next, add this to your app config's plugins array:

```js
export default {
  plugins: [
    "expo-build-properties",
      {
       android: {
        // these values were tested with Expo SDK 48
        compileSdkVersion: 33,
        targetSdkVersion: 33,
        minSdkVersion: 23,
        buildToolsVersion: '33.0.0',
        kotlinVersion: '1.6.20',
      },
    }
  ]
}

```

If you know your way around these, you may be able to adjust them. But if you get an error related to `react-native-menu` when building, please reference these properties.

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
expo start --dev-client
```

If your app is on the App Store, you'll need to deploy a new build too:

```
eas build --platform ios --autosubmit
```

Zeego will not work with Expo Go.

If you aren't familiar with how Expo works / what custom development clients are, I recommend using [EAS](https://expo.dev/eas) (Expo's hosted build service.) As long as you `eas build`, it will work.

### Solito

#### Starter app

I recommend checking out the [Solito + Zeego starter](/start).

#### Existing Solito apps

1. Install the native peer dependencies in your Expo folder (likely `apps/expo`):

```sh
cd apps/expo
yarn add react-native-ios-context-menu @react-native-menu/menu
cd ../..
yarn
```

2. Follow the [Next.js setup](#nextjs).
3. Follow the [Expo steps](#expo).

### Next.js

You need to add `zeego` to your `next-transpile-modules` in `next.config.js`.

### Vanilla React Native

Run `pod install` in your `ios` folder.
