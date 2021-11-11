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

## Usage

See radix-ui's dropdown menu. It's really similar.

### Custom components

To use a custom component, you'll first need to `menuify` it.

```tsx
import * as DropdownMenu from '@zeego/dropdown-menu'
import { styled } from 'dripsy'

const StyledMenuItem = styled(DropdownMenu.Item)({
  height: 32
})

const DropdownMenuItem = DropdownMenu.menuify(StyledMenuItem, 'Item')

export { DropdownMenuItem }

// then, in your component:
<DropdownMenuItem />
```
 
## TODO

- [ ] `@zeego/context-menu` (in-progress)
- [ ] `@zeego/popover`
- [ ] `@zeego/tooltip` (probably)
- [ ] Android Support
- [ ] Docs
