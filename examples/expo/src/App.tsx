import { StyleSheet, View, Text, Platform } from 'react-native'

import * as ContextMenu from '@zeeg/context-menu'
import * as DropdownMenu from '@zeeg/dropdown-menu'
import type { ComponentProps } from 'react'

const select = (val: unknown) => () => console.log(val)

const dropdownStyles = StyleSheet.create({
  content: {
    minWidth: 220,
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 5,
    borderWidth: 1,
    borderColor: '#fff8',
    ...Platform.select({
      web: {
        animationDuration: '400ms',
        animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform, opacity',
        animationKeyframes: {
          '0%': { opacity: 0, transform: [{ scale: 0.5 }] },
          '100%': { opacity: 1, transform: [{ scale: 1 }] },
        },
        transformOrigin: 'var(--radix-dropdown-menu-content-transform-origin)',
        boxShadow:
          '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
      },
    }),
  },
  item: {
    borderRadius: 3,
    justifyContent: 'center',
    // minHeight: 25,
    paddingRight: 5,
    paddingLeft: 25,
    fontSize: 13,
    lineHeight: 13,
    paddingVertical: 8,
  },
  itemTitle: {
    fontSize: 13,
    lineHeight: 13,
  },
  itemSubtitle: {
    fontSize: 10,
    lineHeight: 10,
  },
})

const DropdownMenuItem = (props: ComponentProps<typeof DropdownMenu.Item>) => (
  <DropdownMenu.Item {...props} style={dropdownStyles.item} />
)

DropdownMenuItem.displayName = DropdownMenu.Item.displayName

const DropdownMenuExample = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <View>
          <Text style={styles.button}>{`<DropdownMenu />`}</Text>
        </View>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content style={dropdownStyles.content}>
        <DropdownMenuItem
          style={dropdownStyles.item}
          onSelect={select(1)}
          key="first"
        >
          <DropdownMenu.ItemTitle style={dropdownStyles.itemTitle}>
            See more
          </DropdownMenu.ItemTitle>
          <DropdownMenu.ItemSubtitle style={dropdownStyles.itemSubtitle}>
            12 artists fit your search
          </DropdownMenu.ItemSubtitle>
          <DropdownMenu.ItemIcon iosIconName="list.star" />
        </DropdownMenuItem>
        <DropdownMenuItem
          style={dropdownStyles.item}
          onSelect={select(2)}
          key="second"
        >
          <DropdownMenu.ItemTitle>Favorite</DropdownMenu.ItemTitle>
          <DropdownMenu.ItemIcon iosIconName="star.fill" />
        </DropdownMenuItem>
        <DropdownMenuItem
          style={dropdownStyles.item}
          onSelect={select(3)}
          key="third"
        >
          Action #3
        </DropdownMenuItem>

        <DropdownMenu.Root>
          <DropdownMenu.TriggerItem style={dropdownStyles.item} key="nested">
            Submenu
          </DropdownMenu.TriggerItem>
          <DropdownMenu.Content style={dropdownStyles.content}>
            <DropdownMenuItem style={dropdownStyles.item} key="nested-1">
              Submenu Option 1
            </DropdownMenuItem>
          </DropdownMenu.Content>
        </DropdownMenu.Root>

        <DropdownMenu.Group>
          <DropdownMenuItem style={dropdownStyles.item} key="group-1">
            Group Item 1
          </DropdownMenuItem>
          <DropdownMenuItem style={dropdownStyles.item} key="group-2">
            Group Item 2
          </DropdownMenuItem>
        </DropdownMenu.Group>

        <DropdownMenu.Group>
          <DropdownMenu.Root>
            <DropdownMenu.TriggerItem
              style={dropdownStyles.item}
              key="nested-group-trigger"
            >
              Group Submenu
            </DropdownMenu.TriggerItem>
            <DropdownMenu.Content style={dropdownStyles.content}>
              <DropdownMenuItem
                style={dropdownStyles.item}
                key="nested-group-1"
              >
                Group Submenu Option 1
              </DropdownMenuItem>
              <DropdownMenuItem
                style={dropdownStyles.item}
                key="nested-group-2"
              >
                Group Submenu Option 2
              </DropdownMenuItem>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

const ContextMenuExample = () => {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <View style={styles.box}>
          <Text>{`<ContextMenu />`}</Text>
        </View>
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Item onSelect={select(1)} key="first">
          <ContextMenu.ItemTitle>Action #1</ContextMenu.ItemTitle>
          <ContextMenu.ItemSubtitle>Description!</ContextMenu.ItemSubtitle>
        </ContextMenu.Item>
        <ContextMenu.Item onSelect={select(2)} key="second">
          Action #2
        </ContextMenu.Item>
        <ContextMenu.Item onSelect={select(3)} key="third">
          Action #3
        </ContextMenu.Item>

        <ContextMenu.Root>
          <ContextMenu.TriggerItem key="nested">
            Submenu
          </ContextMenu.TriggerItem>
          <ContextMenu.Content style={dropdownStyles.content}>
            <ContextMenu.Item style={dropdownStyles.item} key="nested-1">
              Submenu Option 1
            </ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Root>

        <ContextMenu.Group>
          <ContextMenu.Item style={dropdownStyles.item} key="group-1">
            Group Item 1
          </ContextMenu.Item>
          <ContextMenu.Item style={dropdownStyles.item} key="group-2">
            Group Item 2
          </ContextMenu.Item>
        </ContextMenu.Group>

        <ContextMenu.Group>
          <ContextMenu.Root>
            <ContextMenu.TriggerItem key="nested-group-trigger">
              Group Submenu
            </ContextMenu.TriggerItem>
            <ContextMenu.Content>
              <ContextMenu.Item key="nested-group-1">
                Group Submenu Option 1
              </ContextMenu.Item>
              <ContextMenu.Item key="nested-group-2">
                Group Submenu Option 2
              </ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu.Root>
        </ContextMenu.Group>
      </ContextMenu.Content>
    </ContextMenu.Root>
  )
}

export default function App() {
  return (
    <View style={styles.container}>
      <DropdownMenuExample />
      <View style={{ height: 30 }} />
      {/*
      <ContextMenuExample /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#9c1aff',
    justifyContent: 'center',
  },
  box: {
    width: 200,
    height: 200,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
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
