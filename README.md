# zeego

Logical UI primitives for screens.

## Installation

Each component is tree-shaken into its own package.

```sh
yarn add @zeego/dropdown-menu
```

Add peer deps:

```sh
yarn add react-native-ios-context-menu
```

### Expo

You need to use a custom development client, since `react-native-ios-context-menu` uses native code. 

After installing, you'll need to rebuild your custom development client and app.

### Vanilla

Run `pod install` in your `ios` folder.
 
## TODO

- [ ] `@zeego/context-menu` (in-progress)
- [ ] `@zeego/popover`
- [ ] `@zeego/tooltip` (probably)
- [ ] Android Support
- [ ] Docs
