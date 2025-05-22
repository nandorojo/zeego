---
title: Dropdown Menu
sidebar_label: <DropdownMenu />
---

```tsx twoslash
import * as DropdownMenu from 'zeego/dropdown-menu'
```

A menu component anchored to a button pressed by a user.

## Platform behavior

- **Web:** Uses Radix UI's unstyled Dropdown Menu component
- **iOS & Android:** Uses each platform's built-in native menu component

## Features

Zeego's menu includes Radix UI's features:

- Can be controlled or uncontrolled.
- Supports submenus with configurable reading direction.
- Supports items, labels, & groups of items.
- Supports checkable items (single or multiple) with an optional indeterminate state.
- Supports modal and non-modal modes.
- Customize the side, alignment, offsets, collision handling.
- Optionally render a pointing arrow.
- Focus is fully managed.
- Full keyboard navigation.
- Typeahead support.
- Dismissing and layering behavior is highly customizable.

Plus other unique ones:

- SF Symbols on iOS with color customization
- Android system icons
- Images on menu items (remote images coming soon)

## Installation

Make sure you've followed the [getting started](/start) guide.

## Usage

```tsx
import * as DropdownMenu from 'zeego/dropdown-menu'

export function MyMenu() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button />
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Label />
        <DropdownMenu.Item>
          <DropdownMenu.ItemTitle />
        </DropdownMenu.Item>

        <DropdownMenu.Group>
          <DropdownMenu.Item />
        </DropdownMenu.Group>

        <DropdownMenu.CheckboxItem>
          <DropdownMenu.ItemIndicator />
        </DropdownMenu.CheckboxItem>

        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger />
          <DropdownMenu.SubContent />
        </DropdownMenu.Sub>

        <DropdownMenu.Separator />
        <DropdownMenu.Arrow />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
```

### Web Usage

As of Zeego v2, any component available on Radix UI's [DropdownMenu](https://www.radix-ui.com/docs/primitives/components/dropdown-menu) is also available on Zeego's DropdownMenu, and accepts the same props, when rendered on web.

Since Zeego is directly built on top of Radix UI for Web, you can not use `StyleSheet.create` objects on Zeego's `style` props.

Instead, to style items, you can do one of the following:

1. Use inline `style` prop
2. Use `className`, common for Tailwind users
   a. You can optionally use CSS file imports or CSS modules
3. Use the [create function](/custom#create-custom-components) to create your own component and style it however you want

## Component API

### Root

Required component at the root of your menu.

| Prop               | Required | Default | Platforms    |
| ------------------ | -------- | ------- | ------------ |
| `onOpenChange`     |          |         | `web`, `ios` |
| `onOpenWillChange` |          |         | `ios`        |

For more web props, see the Radix UI [docs for `DropdownMenu.Root`](https://www.radix-ui.com/docs/primitives/components/dropdown-menu#root).

### Content

Holds all of the content for your menu.

See the Radix UI [docs for `DropdownMenu.Content`](https://www.radix-ui.com/docs/primitives/components/dropdown-menu#content) to see usage for each prop.

| Prop               | Required | Default  | Platforms |
| ------------------ | -------- | -------- | --------- |
| `side`             |          | `bottom` | `web`     |
| `sideOffset`       |          | 0        | `web`     |
| `align`            |          | `center` | `web`     |
| `alignOffset`      |          | 0        | `web`     |
| `collisionPadding` |          | 0        | `web`     |
| `avoidCollisions`  |          | `true`   | `web`     |

For more web props, see the Radix UI [docs for `DropdownMenu.Content`](https://www.radix-ui.com/docs/primitives/components/dropdown-menu#content).

### Trigger

Wraps the trigger for your menu. The content will be anchored to the trigger.

| Prop      | Required | Default | Platforms               |
| --------- | -------- | ------- | ----------------------- |
| `style`   |          |         | `web`, `ios`, `android` |
| `action`  |          | `press` | `ios`, `android`        |
| `asChild` |          | `false` | `web`, `ios`, `android` |

The `action` can be `longPress` or `press`.

For more web props, see the Radix UI [docs for `DropdownMenu.Trigger`](https://www.radix-ui.com/docs/primitives/components/dropdown-menu#trigger).

### Item

Dropdown menu item. Typically a row with text inside of it.

The `key` prop is **required**. The same `key` must not be used more than once in the same menu.

| Prop          | Required | Default | Platforms               |
| ------------- | -------- | ------- | ----------------------- |
| `key`         | Yes      |         | `web`, `ios`, `android` |
| `disabled`    |          |         | `web`, `ios`, `android` |
| `destructive` |          |         | `web`, `ios`, `android` |
| `hidden`      |          |         | `ios`, `android`        |
| `style`       |          |         | `web`                   |
| `onSelect`    |          |         | `web`, `android`, `ios` |
| `textValue`   |          |         | `web`                   |
| `onFocus`     |          |         | `web`                   |
| `onBlur`      |          |         | `web`                   |

On web, it will render its children and apply styles. On other platforms, it simply maps to a native menu item.

To render text, use the `ItemTitle`.

```tsx
<DropdownMenu.Item key="item-1" onSelect={() => console.log('item-1 selected')}>
  <DropdownMenu.ItemTitle>Item Title</DropdownMenu.ItemTitle>
</DropdownMenu.Item>
```

For more web props, see the Radix UI [docs for `DropdownMenu.Item`](https://www.radix-ui.com/docs/primitives/components/dropdown-menu#item).

### ItemTitle

The `style` prop will optionally style text on web.

| Prop       | Required | Default | Platforms                |
| ---------- | -------- | ------- | ------------------------ |
| `style`    |          |         | `web`,                   |
| `children` | Yes      |         | `web` , `ios`, `android` |

`ItemTitle` accepts either a string or React element as the child. A string is the most common usage.

```tsx
<DropdownMenu.Item key="cars">
  <DropdownMenu.ItemTitle>Cars</DropdownMenu.ItemTitle>
</DropdownMenu.Item>
```

#### React element child

`ItemTitle` supports passing a text node as the child. However, you **must** pass a `textValue` prop to the parent `Item` for this to work. It will error otherwise.

```tsx
<DropdownMenu.Item
  // this is required when ItemTitle has a React element child
  textValue="Cars"
  key="cars"
>
  <DropdownMenu.ItemTitle>
    <Text>
      Cars
    </Text>
   <DropdownMenu.ItemTitle>
</DropdownMenu.Item>
```

This is useful for rendering custom text components on Web. The `textValue` prop supplied to `Item` will get used on iOS and Android as the title. On Web, `textValue` will be used for typeahead purposes, but it will not affect rendering.

### ItemIcon

To render an icon on web, pass the icon component as a child.

For iOS and Android, use the respective platform's name as the prop.

On iOS, it renders an [SF Symbol](https://developer.apple.com/sf-symbols/) if you provide one.

| Prop              | Required | Default | Platforms |
| ----------------- | -------- | ------- | --------- |
| `ios`             |          |         | `ios`     |
| `androidIconName` |          |         | `android` |
| `children`        |          |         | `web`     |
| `style`           |          |         | `web`     |
| `className`       |          |         | `web`     |

```tsx
<DropdownMenu.ItemIcon
  ios={{
    name: '0.circle.fill', // required
    pointSize: 5,
    weight: 'semibold',
    scale: 'medium',

    // can also be a color string. Requires iOS 15+
    hierarchicalColor: {
      dark: 'blue',
      light: 'green',
    },

    // alternative to hierarchical color. Requires iOS 15+
    paletteColors: [
      {
        dark: 'blue',
        light: 'green',
      },
    ],
  }}
>
  <MySvgIconForWeb />
</DropdownMenu.ItemIcon>
```

### ItemImage

Renders an image inside of the item. Works on Web and iOS. On Android, it will be ignored.

| Prop                 | Required | Default | Platforms    |
| -------------------- | -------- | ------- | ------------ |
| `source`             |          |         | `web`, `ios` |
| `style`              |          |         | `web`        |
| `resizeMode`         |          |         | `web`        |
| `height`             |          |         | `web`        |
| `width`              |          |         | `web`        |
| `fadeDuration`       |          | `0`     | `web`        |
| `accessibilityLabel` |          |         | `web`        |

For local images with `require` or `import`:

```tsx
<DropdownMenu.ItemImage
  source={require('./image.png')}
  height={300}
  width={300}
/>
```

For remote images, you can use the `source` prop with a URL.

```tsx
<DropdownMenu.ItemImage
  source={{
    uri: `https://my-image-url`,
  }}
  height={300}
  width={300}
/>
```

#### `ItemImage` with Expo Web / Metro Web

If you are using Solito, Vite, Next.js, or most web-only frameworks, then this does not apply to you.

However, as of Zeego v2, locally-imported images will not work as-is with Metro Web/Expo Web.

To fix this, you should [`create`](/custom#create-custom-components) a custom `ItemImage` component which wraps `Image` from `react-native`:

```tsx
import { Image } from 'react-native'
import * as DropdownMenu from 'zeego/dropdown-menu'

const ItemImage = DropdownMenu.create<
  React.ComponentProps<typeof DropdownMenu.ItemImage>
>((props) => {
  return <Image {...props} />
}, 'ItemImage')
```

### ItemSubtitle

Receives `children` as a string. The `style` prop will optionally style text on web.

| Prop        | Required | Default | Platforms     |
| ----------- | -------- | ------- | ------------- |
| `style`     |          |         | `web`,        |
| `className` |          |         | `web`         |
| `children`  |          |         | `web` , `ios` |

Android menu items do not currently support subtitles.

### Group

Used to group multiple items.

On iOS, items will visually group with a divider like `Group Item 1` and `Group Item 2` below:

<img src="/img/group.png" />

On iOS, you can use the `horizontal` prop render items like so:

<img width="400" alt="image" src="https://github.com/nandorojo/zeego/assets/13172299/6d927c98-c29d-4732-95ca-2bec725d487e" />

| Prop         | Required | Default | Platforms                |
| ------------ | -------- | ------- | ------------------------ |
| `children`   |          |         | `web` , `ios`, `android` |
| `horizontal` |          |         | `ios`                    |

To add a title to the group, pass a `Label` component inside of it:

```tsx
<DropdownMenu.Group>
  <DropdownMenu.Label>Fernando</DropdownMenu.Label>
</DropdownMenu.Group>
```

For more web props, see the Radix UI [docs for `DropdownMenu.Group`](https://www.radix-ui.com/docs/primitives/components/dropdown-menu#group).

### CheckboxItem

Usage is similar to [`Item`](#item) with added checkbox features.

| Prop            | Required | Default | Platforms                |
| --------------- | -------- | ------- | ------------------------ |
| `key`           | Yes      |         | `web`, `ios`, `android`  |
| `value`         | Yes      |         | `web`, `ios`, `android`  |
| `disabled`      |          |         | `web` , `ios`, `android` |
| `destructive`   |          |         | `web` , `ios`, `android` |
| `onValueChange` |          |         | `web` , `ios`, `android` |
| `hidden`        |          |         | `web` , `ios`, `android` |
| `textValue`     |          |         | `web`                    |
| `style`         |          |         | `web`                    |
| `onFocus`       |          |         | `web`                    |
| `onBlur`        |          |         | `web`                    |

```tsx
<DropdownMenu.CheckboxItem
  value="on" // or "off" or "mixed"
  onValueChange={(next, previous) => {
    // update state here
  }}
  key="fernando"
>
  <DropdownMenu.ItemIndicator />
</DropdownMenu.CheckboxItem>
```

You can also use a boolean for `value`, as of `1.3.0`:

```tsx
<DropdownMenu.CheckboxItem
  value={true}
  onValueChange={(next, previous) => {
    // next and previous will still use "on" and "off"
  }}
  key="fernando"
>
  <DropdownMenu.ItemIndicator />
</DropdownMenu.CheckboxItem>
```

For more web props, see the Radix UI [docs for `DropdownMenu.CheckboxItem`](https://www.radix-ui.com/docs/primitives/components/dropdown-menu#checkboxitem).

There are a few subtle differences, such as `onValueChange` vs `onCheckedChange`, and the Zeego's result being `"on"` or `"off"` instead of `true` or `false` in the change callback.

### ItemIndicator

Used inside of `CheckboxItem`, the `ItemIndicator` only renders when the item is checked. This lets you conditionally render a checkmark.

You should pass a checkmark icon as a child for web. On iOS and Android, the built-in checkmark will be used instead.

| Prop        | Required | Default | Platforms |
| ----------- | -------- | ------- | --------- |
| `style`     |          |         | `web`     |
| `className` |          |         | `web`     |
| `children`  |          |         | `web`     |

```tsx
<DropdownMenu.ItemIndicator>
  <CheckmarkIcon /> {/* Renders on Web only */}
</DropdownMenu.ItemIndicator>
```

For more web props, see the Radix UI [docs for `DropdownMenu.ItemIndicator`](https://www.radix-ui.com/docs/primitives/components/dropdown-menu#itemindicator).

### Label

Renders a label. It won't be focusable using arrow keys.

On iOS & Android, only one label is supported (unless it is inside a submenu). It will be displayed at the top of the menu.

| Prop        | Required | Default | Platforms               |
| ----------- | -------- | ------- | ----------------------- |
| `style`     |          |         | `web`                   |
| `className` |          |         | `web`                   |
| `children`  | Yes      |         | `web`, `ios`, `android` |

```tsx
<DropdownMenu.Label>My Label</DropdownMenu.Label>
```

Best used within a `Group`.

For more web props, see the Radix UI [docs for `DropdownMenu.Label`](https://www.radix-ui.com/docs/primitives/components/dropdown-menu#label).

### Arrow

Renders an arrow on web only. This helps point the content to the trigger. The `Arrow` must be rendered inside of `Content`.

By default, Radix renders the arrow as an `<svg>` element. You can customize the SVG arrow color by passing a `fill` prop, `className`, or `style` object with a `fill` property.

:::caution

Because the arrow is an `<svg>` element, its `style` prop is not React Native compatible. Styling it with React Native libraries may not work as expected. If you would like to render a custom styled `<View>`, use the `asChild` prop instead of wrapping this component.

:::

| Prop        | Required | Default | Platforms |
| ----------- | -------- | ------- | --------- |
| `width`     |          | 10      | `web`     |
| `height`    |          | 5       | `web`     |
| `fill`      |          |         | `web`     |
| `style`     |          |         | `web`     |
| `className` |          |         | `web`     |
| `asChild`   |          | `false` | `web`     |

See the Radix UI [docs for `DropdownMenu.Arrow`](https://www.radix-ui.com/docs/primitives/components/dropdown-menu#arrow).

### Separator

Renders a content separator on web only.

| Prop        | Required | Default | Platforms |
| ----------- | -------- | ------- | --------- |
| `style`     |          |         | `web`     |
| `className` |          |         | `web`     |

See the Radix UI [docs for `DropdownMenu.Separator`](https://www.radix-ui.com/docs/primitives/components/dropdown-menu#separator).

### Sub

```tsx
<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    <Button />
  </DropdownMenu.Trigger>

  <DropdownMenu.Content>
    <DropdownMenu.Sub>
      <DropdownMenu.SubTrigger key="sub-menu-trigger">
        <DropdownMenu.ItemTitle>Sub Menu</DropdownMenu.ItemTitle>
      </DropdownMenu.SubTrigger>

      <DropdownMenu.SubContent>
        <DropdownMenu.Item key="sub-menu-item">
          <DropdownMenu.ItemTitle>Sub Menu Item</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>
      </DropdownMenu.SubContent>
    </DropdownMenu.Sub>
  </DropdownMenu.Content>
</DropdownMenu.Root>
```

Renders the parts of a submenu.

| Prop           | Required | Default | Platforms |
| -------------- | -------- | ------- | --------- |
| `onOpenChange` |          |         | `web`     |

### SubContent

See the Radix UI [docs for `DropdownMenu.SubContent`](https://www.radix-ui.com/docs/primitives/components/dropdown-menu#subcontent) to see usage for each prop.

| Prop               | Required | Default  | Platforms |
| ------------------ | -------- | -------- | --------- |
| `side`             |          | `bottom` | `web`     |
| `sideOffset`       |          | `0`      | `web`     |
| `align`            |          | `center` | `web`     |
| `alignOffset`      |          | `0`      | `web`     |
| `collisionPadding` |          | `0`      | `web`     |
| `avoidCollisions`  |          | `true`   | `web`     |

### SubTrigger

An item that opens a submenu. Must be rendered inside `DropdownMenu.Sub`.

| Prop          | Required | Default | Platforms                |
| ------------- | -------- | ------- | ------------------------ |
| `key`         | Yes      |         | `web`, `ios`, `android`  |
| `disabled`    |          |         | `web` , `ios`, `android` |
| `destructive` |          |         | `web` , `ios`, `android` |
| `hidden`      |          |         | `ios`, `android`         |
| `style`       |          |         | `web`                    |
| `onSelect`    |          |         | `web`, `android`, `ios` |
| `textValue`   |          |         | `web`                    |
| `onFocus`     |          |         | `web`                    |
| `onBlur`      |          |         | `web`                    |

For more web props, see the Radix UI [docs for `DropdownMenu.SubTrigger`](https://www.radix-ui.com/docs/primitives/components/dropdown-menu#subtrigger).
