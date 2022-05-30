import getStreams from '@lib/getStreams'
import React, { useState, useEffect, FormEvent } from 'react'
import { NextPage } from 'next'
import { getSession, useSession } from 'next-auth/react'
import tmi, { Client } from 'tmi.js'

type stream = {
  game_id: string
  game_name: string
  id: string
  is_mature: boolean
  language: string
  started_at: string
  tag_ids: string[]
  thumbnail_url: string
  title: string
  type: string
  user_id: string
  user_login: string
  user_name: string
  view_count: number
}

const Stream: NextPage = ({ streamdata }: any) => {
  const [userData, setUserData] = useState<any>([])
  const [msg, setMsg] = useState('')

  const { data: session } = useSession()
  const username = session?.user?.name
  const token = session?.accessToken
  const streamer = streamdata?.user_login

  const clientOptions = {
    options: {
      skipUpdatingEmotesets: true,
      clientId: process.env.TWITCH_CLIENT_ID || ''
    },
    connection: {
      reconnect: true,
      secure: true
    },
    identity: {
      username: username,
      password: 'oauth:' + token
    },
    channels: [streamer]
  }

  const client: Client = new tmi.Client(clientOptions)
  client.connect()

  useEffect(() => {
    client.on('chat', (channel, tags, message, self) => {
      if (self) return
      const emotes = tags.emotes
      const parsedMessages = parseMessage(message, emotes)
      updateUserData(parsedMessages, tags)
    })
  }, [])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    client.say(streamer, msg)
    setMsg('')
  }

  const updateUserData = (message: string, tags: any) => {
    return setUserData((prevstate: any) => [...prevstate, { message, tags }])
  }

  const timeoutUser = (username: string) => {
    client.timeout(streamer, username, 300)
  }

  const deleteMessage = (id: string) => {
    client.deletemessage(streamer, id)
  }

  const banUser = (username: string) => {
    client.ban(streamer, username)
  }

  return (
    <div>
      <h1>Hello Next.js</h1>

      {session && (
        <div>
          <div>
            <p>Streamer: {streamdata.user_name}</p>
          </div>
          <div>
            {userData.map((user: any) => (
              <div className='flex' key={user.tags.id}>
                {user.tags.mod === true ? (
                  <div>
                    {user.tags.mod === false ? (
                      <div>
                        <button
                          onClick={() => {
                            banUser(user.tags.username)
                          }}
                        >
                          Ban
                        </button>
                        <button
                          onClick={() => {
                            timeoutUser(user.tags.username)
                          }}
                        >
                          Timeout
                        </button>
                        <button
                          onClick={() => {
                            deleteMessage(user.tags.id)
                          }}
                        >
                          Delete Message
                        </button>
                      </div>
                    ) : null}
                  </div>
                ) : null}
                <span>{user.tags['display-name']}</span>:{' '}
                <span
                  className='flex'
                  dangerouslySetInnerHTML={{
                    __html: user.message
                  }}
                />
              </div>
            ))}
          </div>
          <div>
            <form onSubmit={handleSubmit} className='fixed bottom-0 flex gap-1'>
              <input
                type='text'
                className='border'
                value={msg}
                onChange={e => setMsg(e.target.value)}
              />
              <button className='border' type='submit'>
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
export default Stream

const parseMessage = (message: string, emotes: any) => {
  let newMessage = message.split('')

  for (let emoteIndex in emotes) {
    let emote = emotes[emoteIndex]

    for (let charIndexes in emote) {
      let emoteIndexes = emote[charIndexes]

      if (typeof emoteIndexes == 'string') {
        emoteIndexes = emoteIndexes.split('-')
        emoteIndexes = [parseInt(emoteIndexes[0]), parseInt(emoteIndexes[1])]

        for (let i = emoteIndexes[0]; i <= emoteIndexes[1]; ++i) {
          newMessage[i] = ''
        }

        newMessage[emoteIndexes[0]] =
          '<img width="25" class="emoticon" src="http://static-cdn.jtvnw.net/emoticons/v1/' +
          emoteIndex +
          '/3.0">'
      }
    }
  }

  return newMessage.join('')
}

export const getPaths = async (context: any) => {
  let paths: any[] = []

  const session = await getSession(context)

  const token = session?.accessToken as string
  const id = session?.user?.id as string

  const data = await getStreams(id, token)

  paths.push({
    params: {
      slug: data.map((stream: stream) => stream.user_login)
    }
  })

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context)

  const token = session?.accessToken as string
  const id = session?.user?.id as string

  const data = await getStreams(id, token)
  const stream = data.find(
    (stream: stream) => stream.user_login === context.params.slug
  )

  return {
    props: {
      session,
      streamdata: stream
    }
  }
}
