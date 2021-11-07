import { StyleSheet, View } from 'react-native'

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
            <ContextMenu.Content>
              <ContextMenu.Item key="nested-1">
                Submenu Option 1
              </ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu.Root>

          <ContextMenu.Group>
            <ContextMenu.Item key="group-1">Group Item 1</ContextMenu.Item>
            <ContextMenu.Item key="group-2">Group Item 2</ContextMenu.Item>
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
