import { getFollowedStreams, parseMessage } from '@lib/twtich'
import { useState, useEffect, FormEvent, useRef } from 'react'
import { GetServerSideProps, NextPage, NextPageContext } from 'next'
import { getSession, useSession } from 'next-auth/react'
import tmi, { Client, Userstate } from 'tmi.js'
import cn from 'classnames'
import { Session } from 'next-auth'
import dynamic from 'next/dynamic'

const TwitchEmbed = dynamic(() => import('@components/TwitchEmbed'), {
  ssr: false
})

const Stream: NextPage<Props> = ({ streamdata }) => {
  const [userData, setUserData] = useState<any>([])
  const [msg, setMsg] = useState('')

  const [isMod, setisMod] = useState(false)

  const { data: session } = useSession()
  const username = session?.user?.name || ''
  const token = session?.accessToken || ''
  const streamer: string = streamdata?.user_name || ''

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
    client.on('chat', (channel, userstate, message, self) => {
      const emotes = userstate.emotes
      const parsedMessages = parseMessage(message, emotes)
      updateUserData(parsedMessages, userstate)

      if (self && userstate.mod) {
        setisMod(true)
      }
    })
  }, [])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    client.say(streamer, msg)
    setMsg('')
  }

  const updateUserData = (message: string, userstate: Userstate) => {
    return setUserData((prevstate: any) => [
      ...prevstate,
      { message, userstate }
    ])
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

  const messageId = userData.map((user: UserData) => user?.userstate.id)

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      })
    }
  }, [messageId])

  return (
    <div className='max-h-screen'>
      {session && (
        <div className='z-50 mx-auto max-w-3xl '>
          <div className='sticky top-0 bg-gray-50'>
            <p>Streamer: {streamdata?.user_name}</p>
            <p>{streamdata?.user_id}</p>
            <TwitchEmbed channel={streamdata?.user_name} />
          </div>
          <div className='z-0 mb-8 overflow-y-auto pb-4'>
            <div ref={ref} className=''>
              {userData.map((user: UserData) => (
                <div key={user.userstate.id}>
                  <span className={cn(isMod ? 'block' : 'hidden')}>
                    {user.userstate['user-type'] === null && (
                      <div>
                        <button
                          onClick={() => {
                            banUser(user.userstate.username)
                          }}
                        >
                          Ban
                        </button>
                        <button
                          onClick={() => {
                            timeoutUser(user.userstate.username)
                          }}
                        >
                          Timeout
                        </button>
                        <button
                          onClick={() => {
                            deleteMessage(user.userstate.id || '')
                          }}
                        >
                          Delete Message
                        </button>
                      </div>
                    )}
                  </span>
                  <span>{user.userstate['display-name']}</span>:{' '}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: user.message
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className='mt-4'>
            <form
              onSubmit={handleSubmit}
              className='fixed inset-x-0 bottom-0 mx-auto w-full max-w-3xl'
            >
              <input
                type='text'
                className='w-full border-2 border-black'
                value={msg}
                onChange={e => setMsg(e.target.value)}
              />
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
export default Stream

export const getPaths = async (context: NextPageContext) => {
  let paths: any[] = []

  const session = await getSession(context)

  const token = session?.accessToken || ''
  const id = session?.user?.id || ''
  const data = await getFollowedStreams(id, token)

  paths.push({
    params: {
      slug: data.map((stream: StreamData) => stream.user_login)
    }
  })

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context)
  const token = session?.accessToken || ''
  const id = session?.user?.id || ''

  const slug = context?.params?.slug

  const res = await getFollowedStreams(id, token)

  const streamdata: StreamData = res.find(
    (stream: StreamData) => stream.user_login === slug
  )

  return {
    props: {
      session,
      streamdata
    }
  }
}

type Props = {
  session: Session
  streamdata: StreamData
}

interface StreamData {
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

interface UserData {
  message: string
  userstate: Userstate
}
