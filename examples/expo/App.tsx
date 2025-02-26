import { StyleSheet, View, Text, Platform, Image } from 'react-native'

// import * as ContextMenu from 'zeego/context-menu'
import * as ContextMenuNew from 'zeego/new/context-menu'
const ContextMenu = ContextMenuNew
const DropdownMenu = ContextMenuNew
// console.log('ContextMenuNew', ContextMenuNew)
// import * as DropdownMenu from 'zeego/dropdown-menu'
import React, { ComponentProps, useState } from 'react'
// import { Ionicons } from '@expo/vector-icons'
import camera from './src/camera-outline.png'
import fernando from './src/fernando.jpg'
const select = (val: unknown) => () => alert(val)

const itemHeight = 25

const contentStyle: React.CSSProperties = {
  minWidth: 220,
  backgroundColor: 'white',
  borderRadius: 6,
  padding: 5,
  borderWidth: 1,
  borderColor: '#fff8',
  animationDuration: '400ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  willChange: 'transform, opacity',
  // animationKeyframes: {
  //   '0%': { opacity: 0, transform: [{ scale: 0.5 }] },
  //   '100%': { opacity: 1, transform: [{ scale: 1 }] },
  // },
  boxShadow:
    '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'System',
}

const resetStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  font: '14px system-ui',
}

const dropdownStyles: Record<string, React.CSSProperties> = {
  content: {
    ...contentStyle,
    transformOrigin: 'var(--radix-dropdown-menu-content-transform-origin)',
  },
  item: {
    borderRadius: 3,
    justifyContent: 'center',
    paddingRight: 5,
    paddingLeft: itemHeight,
    height: itemHeight,
    transformOrigin: 'var(--radix-dropdown-menu-item-transform-origin)',
    ...resetStyle,
    // flexDirection: 'row',
    outline: 'none',
  },
  itemWithSubtitle: {
    height: itemHeight * 2,
  },
  itemFocused: {
    // a nice background gray
    // a little darker
    backgroundColor: '#000fff30',
    outline: 'none!important',
  },
  itemTitle: {
    fontSize: '13px',
    lineHeight: '13px',
  },
  itemSubtitle: {
    fontSize: '10px',
    lineHeight: '10px',
  },
  itemIcon: {
    marginRight: 5,
    position: 'absolute',
    left: 'auto',
    justifyContent: 'center',
    top: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    right: 0,
  },
  icon: {
    lineHeight: itemHeight + 'px',
  },
  separator: {
    backgroundColor: 'rgb(215, 207, 249)',
    height: 1,
    margin: 6,
  },
  itemIndicator: {
    position: 'absolute',
    left: 0,
    justifyContent: 'center',
    width: itemHeight,
    top: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  itemImage: {
    width: itemHeight,
    height: itemHeight,
    position: 'absolute',
    right: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  label: {
    paddingLeft: itemHeight - 4,
    lineHeight: itemHeight + 'px',
    fontSize: 12,
    color: '#555',
    fontFamily: 'system-ui',
  },
}

const contextStyles = {
  content: {
    ...contentStyle,
    transformOrigin: 'var(--radix-context-menu-content-transform-origin)',
    // no animations here yet, since I don't know how to style based on data-side attributes
  },
}

const DropdownMenuItem = DropdownMenu.create(
  (props: ComponentProps<typeof DropdownMenu.Item>) => {
    const [focused, setFocused] = useState(false)
    const toggleFocus = (next: boolean) => () => setFocused(next)
    return (
      <DropdownMenu.Item
        onFocus={toggleFocus(true)}
        onBlur={toggleFocus(false)}
        {...props}
        style={{
          ...dropdownStyles.item,
          ...(focused && dropdownStyles.itemFocused),
        }}
      />
    )
  },
  'Item'
)

const DropdownMenuCheckboxItem = DropdownMenu.create(
  (props: ComponentProps<typeof DropdownMenu.CheckboxItem>) => {
    const [focused, setFocused] = useState(false)
    const toggleFocus = (next: boolean) => () => setFocused(next)
    return (
      <DropdownMenu.CheckboxItem
        onFocus={toggleFocus(true)}
        onBlur={toggleFocus(false)}
        {...props}
        style={{
          ...dropdownStyles.item,
          ...(focused && dropdownStyles.itemFocused),
        }}
      />
    )
  },
  'CheckboxItem'
)

const DropdownMenuItemTitle = DropdownMenu.create(
  (props: ComponentProps<typeof DropdownMenu.ItemTitle>) => (
    <DropdownMenu.ItemTitle {...props} style={dropdownStyles.itemTitle} />
  ),
  'ItemTitle'
)

const DropdownMenuItemIndicator = DropdownMenu.create(
  (props: ComponentProps<typeof DropdownMenu.ItemIndicator>) => (
    <DropdownMenu.ItemIndicator
      {...props}
      style={dropdownStyles.itemIndicator}
    />
  ),
  'ItemIndicator'
)

const DropdownMenuSeparator = DropdownMenu.create(
  (props: ComponentProps<typeof DropdownMenu.Separator>) => (
    <DropdownMenu.Separator {...props} style={dropdownStyles.separator} />
  ),
  'Separator'
)

const DropdownMenuSubTrigger = DropdownMenu.create(
  (props: ComponentProps<typeof DropdownMenu.SubTrigger>) => {
    const [focused, setFocused] = useState(false)
    const toggleFocus = (next: boolean) => () => setFocused(next)
    return (
      <DropdownMenu.SubTrigger
        onFocus={toggleFocus(true)}
        onBlur={toggleFocus(false)}
        {...props}
        style={{
          ...dropdownStyles.item,
          ...(focused && dropdownStyles.itemFocused),
        }}
      />
    )
  },
  'SubTrigger'
)

const DropdownMenuItemIcon = DropdownMenu.create(
  (props: ComponentProps<typeof DropdownMenu.ItemIcon>) => (
    <DropdownMenu.ItemIcon {...props} style={dropdownStyles.itemIcon} />
  ),
  'ItemIcon'
)

const DropdownMenuItemImage = DropdownMenu.create(
  (props: ComponentProps<typeof DropdownMenu.ItemImage>) => (
    <Image {...(props as any)} resizeMode="cover" />
  ),
  'ItemImage'
)

const DropdownMenuLabel = DropdownMenu.create(
  (props: ComponentProps<typeof DropdownMenu.Label>) => (
    <DropdownMenu.Label {...props} style={dropdownStyles.label} />
  ),
  'Label'
)

const DropdownMenuArrow = DropdownMenu.create(
  (props: ComponentProps<typeof DropdownMenu.Arrow>) => (
    <DropdownMenu.Arrow {...props} style={{ fill: '#fff' }} />
  ),
  'Arrow'
)

const DropdownMenuExample = () => {
  const [arrowEnabled, setArrowEnabled] = useState<'on' | 'off' | 'mixed'>(
    'off'
  )
  const [bookmarked, setBookmarked] = useState<'on' | 'off' | 'mixed'>('on')
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <View>
          <Text style={styles.button}>{`<DropdownMenu />`}</Text>
        </View>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content style={dropdownStyles.content}>
        <DropdownMenu.Group horizontal>
          <DropdownMenuLabel>Favorites</DropdownMenuLabel>
          {[1, 2, 3].map((i) => (
            <DropdownMenuItem key={`list-${i}`}>
              <DropdownMenuItemTitle>{`Item ${i}`}</DropdownMenuItemTitle>
            </DropdownMenuItem>
          ))}
        </DropdownMenu.Group>

        <DropdownMenuItem onSelect={select(1)} key="first">
          <DropdownMenuItemTitle style={dropdownStyles.itemTitle}>
            See more
          </DropdownMenuItemTitle>
          {Platform.OS === 'ios' && (
            <DropdownMenu.ItemSubtitle style={dropdownStyles.itemSubtitle}>
              12 artists fit your search
            </DropdownMenu.ItemSubtitle>
          )}
          <DropdownMenuItemIcon
            androidIconName="star_on"
            ios={{ hierarchicalColor: '#00FF00', name: 'list.star' }}
          >
            {/* <Ionicons name="list" size={15} /> */}
          </DropdownMenuItemIcon>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={select(2)} key="second">
          <DropdownMenuItemIcon
            ios={{ name: 'star.fill' }}
            androidIconName="btn_star"
          >
            {/* <Ionicons name="star" size={15} /> */}
          </DropdownMenuItemIcon>
          <DropdownMenuItemTitle>Favorite</DropdownMenuItemTitle>
        </DropdownMenuItem>
        <DropdownMenuCheckboxItem
          value={bookmarked}
          onValueChange={setBookmarked}
          key="third"
        >
          <DropdownMenuItemIndicator>
            {/* <Ionicons name="checkmark" size={19} /> */}
          </DropdownMenuItemIndicator>
          <DropdownMenuItemTitle>
            {bookmarked === 'on' ? 'Bookmarked' : 'Bookmark'}
          </DropdownMenuItemTitle>
          <DropdownMenuItemImage
            style={dropdownStyles.itemImage}
            source={camera}
            width={20}
          />
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          style={dropdownStyles.item}
          value={arrowEnabled}
          onValueChange={setArrowEnabled}
          key="fourth"
        >
          <DropdownMenuItemIndicator>
            {/* <Ionicons name="checkmark" size={19} /> */}
          </DropdownMenuItemIndicator>
          <DropdownMenuItemTitle>
            {arrowEnabled === 'on' ? 'Arrow enabled' : 'Arrow disabled'}
          </DropdownMenuItemTitle>
        </DropdownMenuCheckboxItem>

        <DropdownMenu.Sub>
          <DropdownMenuSubTrigger style={dropdownStyles.item} key="nested">
            <DropdownMenuItemTitle>Submenu</DropdownMenuItemTitle>
          </DropdownMenuSubTrigger>
          <DropdownMenu.SubContent style={dropdownStyles.content}>
            <DropdownMenuItem style={dropdownStyles.item} key="nested-1">
              <DropdownMenuItemTitle>Submenu Option 1</DropdownMenuItemTitle>
            </DropdownMenuItem>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>

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
          <DropdownMenu.Sub>
            <DropdownMenuSubTrigger key="submenu">
              <DropdownMenuItemTitle>Group Submenu</DropdownMenuItemTitle>
            </DropdownMenuSubTrigger>
            <DropdownMenu.SubContent style={contentStyle}>
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
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>
        </DropdownMenu.Group>
        {arrowEnabled === 'on' ? <DropdownMenuArrow /> : null}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

const ItemImage = DropdownMenu.create(
  (props: ComponentProps<typeof DropdownMenu.ItemImage>) => (
    <Image {...(props as any)} />
  ),
  'ItemImage'
)

const ContextMenuExample = () => {
  const [open, setOpen] = useState(false)
  return (
    <ContextMenu.Root
      onOpenChange={(next) => {
        setOpen(next)
        setTimeout(() => {
          setOpen(false)
        }, 1000)
      }}
    >
      <ContextMenu.Trigger>
        <View style={styles.box}>
          <Text>
            {`<ContextMenu />`} {open ? 'OPEN' : 'CLOSED'}
          </Text>
        </View>
      </ContextMenu.Trigger>
      <ContextMenu.Content style={contextStyles.content}>
        <ContextMenu.Preview>
          <View
            style={{
              height: 300,
              width: 300,
              backgroundColor: 'white',
              padding: 16,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              Custom component when expanded. {open ? 'OPEN' : 'CLOSED'}
            </Text>
          </View>
        </ContextMenu.Preview>
        <ContextMenu.Item
          style={{
            ...dropdownStyles.item,
            ...dropdownStyles.itemWithSubtitle,
          }}
          onSelect={select(1)}
          key="fernando"
        >
          <ContextMenu.ItemTitle>@FernandoTheRojo</ContextMenu.ItemTitle>
          <ContextMenu.ItemSubtitle>Creator of Zeego</ContextMenu.ItemSubtitle>

          <ItemImage source={fernando} style={dropdownStyles.itemImage} />
        </ContextMenu.Item>

        <ContextMenu.Item
          style={{
            ...dropdownStyles.item,
            ...dropdownStyles.itemWithSubtitle,
          }}
          onSelect={select(1)}
          key="first"
        >
          <ContextMenu.ItemTitle>Action #1</ContextMenu.ItemTitle>
          <ContextMenu.ItemSubtitle>Hey!!</ContextMenu.ItemSubtitle>

          <ItemImage source={camera} style={dropdownStyles.itemImage} />
        </ContextMenu.Item>
        <ContextMenu.Item
          style={dropdownStyles.item}
          onSelect={select(2)}
          key="second"
        >
          <ContextMenu.ItemIcon iosIconName="star" />
          <ContextMenu.ItemTitle>Action #2</ContextMenu.ItemTitle>
        </ContextMenu.Item>
        <ContextMenu.Item
          style={dropdownStyles.item}
          onSelect={select(3)}
          key="third"
        >
          <ContextMenu.ItemTitle>Action #3</ContextMenu.ItemTitle>
        </ContextMenu.Item>

        <ContextMenu.Sub>
          <ContextMenu.SubTrigger style={dropdownStyles.item} key="nested">
            <ContextMenu.ItemTitle>Submenu</ContextMenu.ItemTitle>
          </ContextMenu.SubTrigger>
          <ContextMenu.SubContent style={contextStyles.content}>
            <ContextMenu.Item style={dropdownStyles.item} key="nested-1">
              <ContextMenu.ItemTitle>Submenu Option 1</ContextMenu.ItemTitle>
            </ContextMenu.Item>
          </ContextMenu.SubContent>
        </ContextMenu.Sub>

        <ContextMenu.Group>
          <ContextMenu.Item style={dropdownStyles.item} key="group-1">
            <ContextMenu.ItemTitle>Group Item 1</ContextMenu.ItemTitle>
          </ContextMenu.Item>
          <ContextMenu.Item style={dropdownStyles.item} key="group-2">
            <ContextMenu.ItemTitle>Group Item 2</ContextMenu.ItemTitle>
          </ContextMenu.Item>
        </ContextMenu.Group>

        <ContextMenu.Group>
          <ContextMenu.Item style={dropdownStyles.item} key="group-3">
            <ContextMenu.ItemTitle>Group Item 3</ContextMenu.ItemTitle>
          </ContextMenu.Item>
          <ContextMenu.Sub>
            <ContextMenu.SubTrigger
              style={dropdownStyles.item}
              key="nested-group-trigger"
            >
              <ContextMenu.ItemTitle>Group Submenu</ContextMenu.ItemTitle>
            </ContextMenu.SubTrigger>
            <ContextMenu.SubContent style={contextStyles.content}>
              <ContextMenu.Item
                style={dropdownStyles.item}
                key="nested-group-1"
              >
                <ContextMenu.ItemTitle>
                  Group Submenu Option 3
                </ContextMenu.ItemTitle>
              </ContextMenu.Item>
              <ContextMenu.Item
                style={dropdownStyles.item}
                key="nested-group-2"
              >
                <ContextMenu.ItemTitle>
                  Group Submenu Option 4
                </ContextMenu.ItemTitle>
              </ContextMenu.Item>
            </ContextMenu.SubContent>
          </ContextMenu.Sub>
        </ContextMenu.Group>
      </ContextMenu.Content>
    </ContextMenu.Root>
  )
}

export default function App() {
  return (
    <View style={styles.container}>
      {/* <DropdownMenuExample /> */}
      <ContextMenuExample />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#9c1aff',
    justifyContent: 'center',
    gap: 30,
  },
  box: {
    width: 200,
    height: 200,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  text: {
    color: '#fff',
  },
  button: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 8,
  },
})
