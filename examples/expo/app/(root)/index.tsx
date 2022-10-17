import { Link, useLink } from 'expo-router'
import {
  Image,
  StatusBar,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native'
const feed = require('../../assets/feed.png')
const listItem = require('../../assets/list-item.png')
const preview = require('../../assets/tweet.png')

import * as ContextMenu from 'zeego/context-menu'

const Feed = ({
  renderTweet,
}: {
  renderTweet: ({ id }: { id: string }) => JSX.Element
}) => {
  const { width, height } = useWindowDimensions()
  return (
    <>
      <Image
        source={feed}
        style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
          zIndex: -1,
        }}
        resizeMode="cover"
      />
      <View style={{ flex: 1, marginTop: height * 0.146 }}>
        {renderTweet({ id: '' })}
      </View>
    </>
  )
}

function Tweet({ id }: { id: string }) {
  const { width, height } = useWindowDimensions()
  return (
    <Link href="/tweet">
      <Image
        source={listItem}
        style={{ width, height: width * 1.23 }}
        resizeMode="contain"
      />
    </Link>
  )
}

function TweetPreview({ id }: { id: string }) {
  const { width } = useWindowDimensions()
  return (
    <Image
      source={preview}
      style={{
        width: width * 0.9,
        height: (width * 0.9) / 0.69,
      }}
      resizeMode="contain"
    />
  )
}

export default function TwitterExample() {
  const link = useLink()
  return (
    <>
      <Feed
        renderTweet={({ id }) => {
          return (
            <ContextMenu.Root>
              <ContextMenu.Trigger>
                <Tweet id={id} />
              </ContextMenu.Trigger>

              <ContextMenu.Content>
                <ContextMenu.Preview onPress={() => link.push('/tweet')}>
                  <TweetPreview id={id} />
                </ContextMenu.Preview>
                <ContextMenu.Item key="delete" destructive>
                  <ContextMenu.ItemTitle>Delete Tweet</ContextMenu.ItemTitle>
                  <ContextMenu.ItemIcon iosIconName="trash" />
                </ContextMenu.Item>

                <ContextMenu.Item key="unpin">
                  <ContextMenu.ItemTitle>
                    Unpin from profile
                  </ContextMenu.ItemTitle>
                  <ContextMenu.ItemIcon iosIconName="pin" />
                </ContextMenu.Item>

                <ContextMenu.Item key="change">
                  <ContextMenu.ItemTitle>
                    Change who can reply
                  </ContextMenu.ItemTitle>
                  <ContextMenu.ItemIcon iosIconName="bubble.right" />
                </ContextMenu.Item>

                <ContextMenu.Item key="list">
                  <ContextMenu.ItemTitle>
                    Add/remove from Lists
                  </ContextMenu.ItemTitle>
                  <ContextMenu.ItemIcon iosIconName="list.bullet.rectangle" />
                </ContextMenu.Item>
              </ContextMenu.Content>
            </ContextMenu.Root>
          )
        }}
      />

      <StatusBar hidden />
    </>
  )
}
