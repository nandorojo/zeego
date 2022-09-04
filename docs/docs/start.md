---
title: Getting Started
---

<!-- <img src="/img/install.svg" alt="yarn add zeego" style={{ borderRadius: '16px' }} /> -->

## Starter App

The easiest way to use Zeego is to use the starter monorepo.

The starter is powered by [Solito](https://solito.dev) – a library for using React Native with Next.js.

```bash
npx create-solito-app@latest my-zeego-app -t with-zeego
```

The starter app's [source code](https://github.com/nandorojo/solito/tree/master/example-monorepos/with-zeego) a good reference if you're installing Zeego in an existing project, too.

## Install in existing apps

Start by installing Zeego:

```sh
yarn add zeego
```

### Install peer dependencies

If you're in a monorepo, you should install these in the directory of your native app.

#### iOS

```sh
yarn add react-native-ios-context-menu
```

#### Android

```sh
yarn add @react-native-menu/menu
```

## Frameworks

### Expo

Expo users need to use a [custom development client](https://blog.expo.dev/introducing-custom-development-clients-5a2c79a9ddf8), since Zeego uses native code.

After installing Zeego and its peer dependencies, you'll need to rebuild your custom development client. If your app is on the App Store, you'll need to deploy a new build.

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
