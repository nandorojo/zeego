import { useLink } from 'expo-router'
import { Image, Pressable, StatusBar } from 'react-native'

const tweet = require('../assets/tweet-detail.jpeg')

export default function Tweet() {
  const { back } = useLink()
  return (
    <Pressable onPress={back} style={{ flex: 1 }}>
      <Image
        source={tweet}
        style={{ height: '100%', width: '100%', backgroundColor: 'black' }}
      />

      <StatusBar hidden />
    </Pressable>
  )
}
