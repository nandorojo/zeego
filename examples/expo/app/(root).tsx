import { NativeStack } from 'expo-router'

export default function Root() {
  return (
    <NativeStack initialRouteName="twitter">
      <NativeStack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <NativeStack.Screen
        name="tweet"
        options={{
          headerShown: false,
        }}
      />
    </NativeStack>
  )
}
