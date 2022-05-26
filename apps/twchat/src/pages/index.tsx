import React, { useState, useEffect, FormEvent } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import type { NextPage } from 'next'
import Image from 'next/image'
import tmi, { Client } from 'tmi.js'

const Home: NextPage = () => {
  const [userData, setUserData] = useState<any>([])
  const [msg, setMsg] = useState('')

  const { data: session } = useSession()

  const imagesrc = session?.user?.image || ''
  const username = session?.user?.name
  const token = session?.accessToken
  const email = session?.user?.email

  const channel: string = 'ishn4ke'

  const clientOptions = {
    options: {
      skipUpdatingEmotesets: true
    },
    connection: {
      reconnect: true,
      secure: true
    },
    identity: {
      username: username,
      password: 'oauth:' + token
    },
    channels: [channel]
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
    client.say(channel, msg)
    setMsg('')
  }

  const updateUserData = (message: string, tags: any) => {
    return setUserData((prevstate: any) => [...prevstate, { message, tags }])
  }

  const timeoutUser = (username: string) => {
    client.timeout(channel, username, 300)
  }

  const deleteMessage = (id: string) => {
    client.deletemessage(channel, id)
  }

  const banUser = (username: string) => {
    client.ban(channel, username)
  }

  return (
    <div>
      <h1>Hello Next.js</h1>
      {session ? (
        <button onClick={() => signOut()}>Signout</button>
      ) : (
        <button onClick={() => signIn()}>SignIn</button>
      )}
      {session && (
        <div>
          <div>
            <small>Signed in as</small>
            <br />
            <p>{username}</p>
            <p>{email}</p>

            <Image src={imagesrc} width={100} height={100} alt='twitch' />
          </div>
          <div>
            {userData.map((user: any) => (
              <div key={user.tags.id}>
                {user.tags.mod ? (
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
                <span>{user.tags['display-name']}</span>:{' '}
                <span
                  className='cb-user-message'
                  dangerouslySetInnerHTML={{
                    __html: user.message
                  }}
                />
              </div>
            ))}
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <input
                type='text'
                value={msg}
                onChange={e => setMsg(e.target.value)}
              />
              <button type='submit'>Send</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home

function parseMessage(message: string, emotes: any) {
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
