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
      data
    }
  }
}

const Streams: NextPage = ({ data }: any) => {
  const { data: session } = useSession()
  return (
    <div>
      <h1>Streams</h1>
      <div>{session?.user?.name}</div>
      <div className='mt-12 grid space-y-8'>
        {data.map((stream: any) => {
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
