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

## Example

See the [Example app](https://github.com/nandorojo/zeego/blob/master/examples/expo/src/App.tsx).

```tsx
const DropdownMenuExample = () => {
  const [bookmarked, setBookmarked] = useState<'on' | 'off' | 'mixed'>('on')
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <View>
          <Text style={styles.button}>{`<DropdownMenu />`}</Text>
        </View>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content style={dropdownStyles.content}>
        <DropdownMenuLabel>Help</DropdownMenuLabel>
        <DropdownMenuItem
          style={dropdownStyles.item}
          onSelect={select(1)}
          key="first"
        >
          <DropdownMenuItemTitle style={dropdownStyles.itemTitle}>
            See more
          </DropdownMenuItemTitle>
          {Platform.OS === 'ios' && (
            <DropdownMenu.ItemSubtitle style={dropdownStyles.itemSubtitle}>
              12 artists fit your search
            </DropdownMenu.ItemSubtitle>
          )}
          <DropdownMenuItemIcon iosIconName="list.star">
            <Ionicons name="list" size={15} />
          </DropdownMenuItemIcon>
        </DropdownMenuItem>
        <DropdownMenuItem
          style={dropdownStyles.item}
          onSelect={select(2)}
          key="second"
        >
          <DropdownMenuItemTitle>Favorite</DropdownMenuItemTitle>
          <DropdownMenuItemIcon iosIconName="star.fill">
            <Ionicons name="star" size={15} />
          </DropdownMenuItemIcon>
        </DropdownMenuItem>
        <DropdownMenuCheckboxItem
          style={dropdownStyles.item}
          value={bookmarked}
          onValueChange={setBookmarked}
          key="third"
        >
          <DropdownMenuItemIndicator>
            <Ionicons name="checkmark" size={19} />
          </DropdownMenuItemIndicator>
          <DropdownMenuItemTitle>
            {bookmarked === 'on' ? 'Bookmarked' : 'Bookmark'}
          </DropdownMenuItemTitle>
          <DropdownMenuItemImage
            iosIconName="book"
            source={require('./camera-outline.png')}
            width={20}
            resizeMode="contain"
          />
        </DropdownMenuCheckboxItem>

        <DropdownMenu.Root>
          <DropdownMenuTriggerItem style={dropdownStyles.item} key="nested">
            <DropdownMenuItemTitle>Submenu</DropdownMenuItemTitle>
          </DropdownMenuTriggerItem>
          <DropdownMenu.Content style={dropdownStyles.content}>
            <DropdownMenuItem style={dropdownStyles.item} key="nested-1">
              <DropdownMenuItemTitle>Submenu Option 1</DropdownMenuItemTitle>
            </DropdownMenuItem>
          </DropdownMenu.Content>
        </DropdownMenu.Root>

        <DropdownMenuSeparator />
        <DropdownMenu.Group>
          <DropdownMenuItem style={dropdownStyles.item} key="group-1">
            <DropdownMenuItemTitle>Group Item 1</DropdownMenuItemTitle>
          </DropdownMenuItem>
          <DropdownMenuItem style={dropdownStyles.item} key="group-2">
            <DropdownMenuItemTitle>Group Item 2</DropdownMenuItemTitle>
          </DropdownMenuItem>
        </DropdownMenu.Group>
        <DropdownMenuSeparator />

        <DropdownMenu.Group>
          <DropdownMenu.Root>
            <DropdownMenuTriggerItem
              style={dropdownStyles.item}
              key="nested-group-trigger"
            >
              <DropdownMenuItemTitle>Group Submenu</DropdownMenuItemTitle>
            </DropdownMenuTriggerItem>
            <DropdownMenu.Content style={dropdownStyles.content}>
              <DropdownMenuItem
                style={dropdownStyles.item}
                key="nested-group-1"
              >
                <DropdownMenuItemTitle>
                  Group Submenu Option 1
                </DropdownMenuItemTitle>
              </DropdownMenuItem>
              <DropdownMenuItem
                style={dropdownStyles.item}
                key="nested-group-2"
              >
                <DropdownMenuItemTitle>
                  Group Submenu Option 2
                </DropdownMenuItemTitle>
              </DropdownMenuItem>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
```
 
## TODO

- [ ] `@zeego/context-menu` (in-progress)
- [ ] `@zeego/popover`
- [ ] `@zeego/tooltip` (probably)
- [ ] Android Support
- [ ] Docs
