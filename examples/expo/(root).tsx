import { Tabs } from 'expo-router'

export default function Root() {
  return (
    <Tabs initialRouteName="index">
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="twitter"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="tweet"
        options={{
          headerShown: false,
        }}
      />
    </Tabs>
  )
}
