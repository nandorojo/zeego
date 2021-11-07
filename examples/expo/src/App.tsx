import * as React from 'react'

import { StyleSheet, View, Text } from 'react-native'

import * as ContextMenu from '@zeeg/context-menu'

export default function App() {
  const [result, setResult] = React.useState<number | undefined>()

  React.useEffect(() => {}, [])

  return (
    <View style={styles.container}>
      <ContextMenu.Root>
        <ContextMenu.Trigger>
          <View style={styles.box} />
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Item>Action #1</ContextMenu.Item>
          <ContextMenu.Item>Action #2</ContextMenu.Item>
          <ContextMenu.Item>Action #3</ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Root>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#222',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
    backgroundColor: 'green',
  },
  text: {
    color: '#fff9',
  },
})
