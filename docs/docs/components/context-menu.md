---
title: Context Menu
sidebar_label: <ContextMenu />
---

```tsx twoslash
import * as ContextMenu from 'zeego/context-menu'
```

A menu component anchored to an element. On web, the menu is triggered by a right click. On iOS & Android, it is triggered by a long press.

## Platform behavior

- **Web:** Uses Radix UI's unstyled Context Menu component
- **iOS & Android:** Uses each platform's built-in native context menu component

## Features

Zeego's menu includes Radix UI's features:

- Can be controlled or uncontrolled.
- Supports submenus with configurable reading direction.
- Supports items, labels, & groups of items.
- Supports checkable items (single or multiple) with an optional indeterminate state.
- Supports modal and non-modal modes.
- Customize the side, alignment, offsets, & collision handling.
- Optionally render a pointing arrow.
- Focus is fully managed.
- Full keyboard navigation.
- Typeahead support.
- Dismissing and layering behavior is highly customizable.

Plus other unique ones:

- Custom element preview on iOS
- SF Symbols on iOS with color customization
- Android system icons
- Images on menu items (remote images coming soon)

## Installation

Make sure you've followed the [getting started](/start) guide.

## Usage

```tsx
import * as ContextMenu from 'zeego/context-menu'

export function MyMenu() {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <Button />
      </ContextMenu.Trigger>

      <ContextMenu.Content>
        <ContextMenu.Preview>{() => <Preview />}</ContextMenu.Preview>

        <ContextMenu.Label />
        <ContextMenu.Item>
          <ContextMenu.ItemTitle />
        </ContextMenu.Item>

        <ContextMenu.Group>
          <ContextMenu.Item />
        </ContextMenu.Group>

        <ContextMenu.CheckboxItem>
          <ContextMenu.ItemIndicator />
        </ContextMenu.CheckboxItem>

        <ContextMenu.Sub>
          <ContextMenu.SubTrigger />
          <ContextMenu.SubContent />
        </ContextMenu.Sub>

        <ContextMenu.Separator />
        <ContextMenu.Arrow />
      </ContextMenu.Content>
    </ContextMenu.Root>
  )
}
```

## Component API

### Root

Required component at the root of your menu.

| Prop           | Required | Default | Platforms    |
| -------------- | -------- | ------- | ------------ |
| `onOpenChange` |          |         | `web`, `ios` |

### Content

Holds all of the content for your menu.

See the Radix UI [docs for `ContextMenu.Content`](https://www.radix-ui.com/docs/primitives/components/context-menu#content) to see usage for each prop.

| Prop               | Required | Default  | Platforms |
| ------------------ | -------- | -------- | --------- |
| `side`             |          | `bottom` | `web`     |
| `sideOffset`       |          | 0        | `web`     |
| `align`            |          | `center` | `web`     |
| `alignOffset`      |          | 0        | `web`     |
| `collisionPadding` |          | 0        | `web`     |
| `avoidCollisions`  |          | `true`   | `web`     |

### Trigger

Wraps the trigger for your menu. The content will be anchored to the trigger.

| Prop    | Required | Default | Platforms |
| ------- | -------- | ------- | --------- |
| `style` |          |         | `web`     |

### Preview

Render a custom component when the context menu is visible on iOS.

Requires passing a function as a child.

The element won't mount until the menu has been opened.

| Prop                   | Required | Default | Platforms |
| ---------------------- | -------- | ------- | --------- |
| `style`                |          |         | `ios`     |
| `size`                 |          |         | `ios`     |
| `onPress`              |          |         | `ios`     |
| `isResizeAnimated`     | `true`   |         | `ios`     |
| `borderRadius`         |          |         | `ios`     |
| `backgroundColor`      |          |         | `ios`     |
| `preferredCommitStyle` |          |         |           |

```tsx
<ContextMenu.Preview
  // optional props:
  preferredCommitStyle="pop" // or "dismiss"
  backgroundColor={{
    // or a color string directly
    dark: 'black',
    light: 'white',
  }}
>
  {() => <Preview />}
</ContextMenu.Preview>
```

### Item

Context menu item. Typically a row with text inside of it.

The `key` prop is **required**. The same `key` must not be used more than once in the same menu.

| Prop          | Required | Default | Platforms               |
| ------------- | -------- | ------- | ----------------------- |
| `key`         | Yes      |         | `web`, `ios`, `android` |
| `disabled`    |          |         | `web`, `ios`, `android` |
| `destructive` |          |         | `web`, `ios`, `android` |
| `hidden`      |          |         | `ios`, `android`        |
| `style`       |          |         | `web`                   |
| `onSelect`    |          |         | `web`                   |
| `textValue`   |          |         | `web`                   |
| `onFocus`     |          |         | `web`                   |
| `onBlur`      |          |         | `web`                   |

On web, it will render its children and apply styles. On other platforms, it simply maps to a native menu item.

To render text, use the `ItemTitle`.

### ItemTitle

Receives `children` as a string. The `style` prop will optionally style text on web.

| Prop       | Required | Default | Platforms                |
| ---------- | -------- | ------- | ------------------------ |
| `style`    |          |         | `web`,                   |
| `children` |          |         | `web` , `ios`, `android` |

### ItemIcon

To render an icon on web, pass the icon component as a child.

For iOS and Android, use the respective platform's name as the prop.

On iOS, it renders an [SF Symbol](https://developer.apple.com/sf-symbols/) if you provide one.

| Prop       | Required | Default | Platforms |
| ---------- | -------- | ------- | --------- |
| `ios`      |          |         | `ios`     |
| `android`  |          |         | `android` |
| `children` |          |         | `web`     |

```tsx
<ContextMenu.ItemIcon
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
</ContextMenu.ItemIcon>
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

```tsx
<ContextMenu.ItemImage
  source={require('./image.png')}
  height={300}
  width={300}
/>
```

Remote image support from a URL is currently not supported on iOS but is coming soon.

Once it works, usage will work like so:

```tsx
<ContextMenu.ItemImage
  source={{
    uri: `https://my-image-url`,
  }}
  height={300}
  width={300}
/>
```

### ItemSubtitle

Receives `children` as a string. The `style` prop will optionally style text on web.

| Prop       | Required | Default | Platforms     |
| ---------- | -------- | ------- | ------------- |
| `style`    |          |         | `web`,        |
| `children` |          |         | `web` , `ios` |

Android menu items do not currently support subtitles.

### Group

Used to group multiple items.

On iOS, items will visually group with a divider like `Group Item 1` and `Group Item 2` below:

<img src="/img/group.png" />

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
<Context.CheckboxItem
  value="on" // or "off" or "mixed"
  onValueChange={(next, previous) => {
    // update state here
  }}
  key="fernando"
>
  <ContextMenu.ItemIndicator />
</Context.CheckboxItem>
```

### ItemIndicator

Used inside of `CheckboxItem`, the `ItemIndicator` only renders when the item is checked. This lets you conditionally render a checkmark.

You should pass a checkmark icon as a child for web. On iOS and Android, the built-in checkmark will be used instead.

| Prop    | Required | Default | Platforms |
| ------- | -------- | ------- | --------- |
| `style` |          |         | `web`     |

```tsx
<ContextMenu.ItemIndicator>
  <CheckmarkIcon /> {/* Renders on Web only */}
</ContextMenu.ItemIndicator>
```

### Label

Renders a label. It won't be focusable using arrow keys.

On iOS & Android, only one label is supported (unless it is inside a submenu). It will be displayed at the top of the menu.

| Prop    | Required | Default | Platforms |
| ------- | -------- | ------- | --------- |
| `style` |          |         | `web`     |

```tsx
<ContextMenu.Label>My Label</ContextMenu.Label>
```

### Arrow

Renders an arrow on web only. This helps point the content to the trigger. The `Arrow` must be rendered inside of `Content`.

| Prop     | Required | Default | Platforms |
| -------- | -------- | ------- | --------- |
| `style`  |          |         | `web`     |
| `height` |          |         | `web`     |
| `width`  |          |         | `web`     |

### Separator

Renders a content separator on web only.

| Prop    | Required | Default | Platforms |
| ------- | -------- | ------- | --------- |
| `style` |          |         | `web`     |

### Sub

Renders the parts of a submenu.

| Prop           | Required | Default | Platforms |
| -------------- | -------- | ------- | --------- |
| `onOpenChange` |          |         | `web`     |

### SubContent

See the Radix UI [docs for `ContextMenu.SubContent`](https://www.radix-ui.com/docs/primitives/components/context-menu#subcontent) to see usage for each prop.

| Prop               | Required | Default  | Platforms |
| ------------------ | -------- | -------- | --------- |
| `side`             |          | `bottom` | `web`     |
| `sideOffset`       |          | `0`      | `web`     |
| `align`            |          | `center` | `web`     |
| `alignOffset`      |          | `0`      | `web`     |
| `collisionPadding` |          | `0`      | `web`     |
| `avoidCollisions`  |          | `true`   | `web`     |

### SubTrigger

An item that opens a submenu. Must be rendered inside `ContextMenu.Sub`.

| Prop          | Required | Default | Platforms                |
| ------------- | -------- | ------- | ------------------------ |
| `key`         | Yes      |         | `web`, `ios`, `android`  |
| `disabled`    |          |         | `web` , `ios`, `android` |
| `destructive` |          |         | `web` , `ios`, `android` |
| `hidden`      |          |         | `ios`, `android`         |
| `style`       |          |         | `web`                    |
| `onSelect`    |          |         | `web`                    |
| `textValue`   |          |         | `web`                    |
| `onFocus`     |          |         | `web`                    |
| `onBlur`      |          |         | `web`                    |
