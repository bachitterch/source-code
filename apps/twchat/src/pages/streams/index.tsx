import { getFollowedStreams } from '@lib/twtich'
import { getSession, useSession } from 'next-auth/react'
import type { NextPage, NextPageContext } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const getServerSideProps = async (context: NextPageContext) => {
  const session = await getSession(context)

  const token = session?.accessToken as string
  const id = session?.user?.id as string

  const data = await getFollowedStreams(id, token)

  return {
    props: {
      session,
      streams: data
    }
  }
}

const Streams: NextPage<Props> = ({ streams }) => {
  const { data: session } = useSession()
  return (
    <div>
      <h1>Streams</h1>
      <div>{session?.user?.name}</div>
      <div className='mt-12 grid space-y-8'>
        {streams.map((stream: StreamData) => {
          return (
            <Link href={`/streams/${stream.user_login}`} key={stream.id}>
              <a>
                <Image
                  src={`https://static-cdn.jtvnw.net/previews-ttv/live_user_${stream.user_login}.jpg`}
                  width={306.25}
                  alt={stream.user_name}
                  height={172.61}
                />
                <h2>{stream.user_name}</h2>
                <p>{stream.title}</p>
              </a>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
export default Streams

type Props = {
  streams: StreamData[]
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
