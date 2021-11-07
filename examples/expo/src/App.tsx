import { StyleSheet, View, Text, Button } from 'react-native'

import * as ContextMenu from '@zeeg/context-menu'
import * as DropdownMenu from '@zeeg/dropdown-menu'

const select = (val: unknown) => () => console.log(val)

const DropdownMenuExample = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <View>
          <Text style={styles.button}>{`<DropdownMenu />`}</Text>
        </View>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onSelect={select(1)} key="first">
          <DropdownMenu.ItemTitle>Action #1</DropdownMenu.ItemTitle>
          <DropdownMenu.ItemSubtitle>Description!</DropdownMenu.ItemSubtitle>
        </DropdownMenu.Item>
        <DropdownMenu.Item onSelect={select(2)} key="second">
          Action #2
        </DropdownMenu.Item>
        <DropdownMenu.Item onSelect={select(3)} key="third">
          Action #3
        </DropdownMenu.Item>

        <DropdownMenu.Root>
          <DropdownMenu.TriggerItem key="nested">
            Submenu
          </DropdownMenu.TriggerItem>
          <DropdownMenu.Content>
            <DropdownMenu.Item key="nested-1">
              Submenu Option 1
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>

        <DropdownMenu.Group>
          <DropdownMenu.Item key="group-1">Group Item 1</DropdownMenu.Item>
          <DropdownMenu.Item key="group-2">Group Item 2</DropdownMenu.Item>
        </DropdownMenu.Group>

        <DropdownMenu.Group>
          <DropdownMenu.Root>
            <DropdownMenu.TriggerItem key="nested-group-trigger">
              Group Submenu
            </DropdownMenu.TriggerItem>
            <DropdownMenu.Content>
              <DropdownMenu.Item key="nested-group-1">
                Group Submenu Option 1
              </DropdownMenu.Item>
              <DropdownMenu.Item key="nested-group-2">
                Group Submenu Option 2
              </DropdownMenu.Item>
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
          <ContextMenu.Content>
            <ContextMenu.Item key="nested-1">Submenu Option 1</ContextMenu.Item>
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
  )
}

export default function App() {
  return (
    <View style={styles.container}>
      <DropdownMenuExample />
      <View style={{ height: 30 }} />
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
  },
})
