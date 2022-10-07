import { Image, StatusBar } from 'react-native'

const tweet = require('../../assets/tweet-detail.jpeg')

export default function Tweet() {
  return (
    <>
      <Image
        source={tweet}
        style={{ height: '100%', width: '100%', backgroundColor: 'black' }}
      />

      <StatusBar hidden />
    </>
  )
}
