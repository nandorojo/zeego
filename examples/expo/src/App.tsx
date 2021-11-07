import * as React from 'react'

import { StyleSheet, View, Text } from 'react-native'

import * as ContextMenu from '@zeeg/context-menu'

export default function App() {
  const select = (val: unknown) => () => console.log(val)

  return (
    <View style={styles.container}>
      <ContextMenu.Root>
        <ContextMenu.Trigger>
          <View style={styles.box} />
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Item onSelect={select(1)} key="first">
            Action #1
          </ContextMenu.Item>
          <ContextMenu.Item onSelect={select(2)} key="second">
            Action #2
          </ContextMenu.Item>
          <ContextMenu.Item onSelect={select(3)} key="third">
            Action #3
          </ContextMenu.Item>

          <ContextMenu.Root>
            <ContextMenu.TriggerItem key="nested">
              Nested
            </ContextMenu.TriggerItem>
            <ContextMenu.Content>
              <ContextMenu.Item key="nested-1">Nested Option</ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu.Root>
        </ContextMenu.Content>
      </ContextMenu.Root>
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
  },
  text: {
    color: '#fff',
  },
})
