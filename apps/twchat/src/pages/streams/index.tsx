import getStreams from '@lib/getStreams'
import { getSession, useSession } from 'next-auth/react'
import type { NextPage, NextPageContext } from 'next'

export const getServerSideProps = async (context: NextPageContext) => {
  const session = await getSession(context)

  const token = session?.accessToken as string
  const id = session?.user?.id as string

  const data = await getStreams(id, token)

  return {
    props: {
      session,
      data
    }
  }
}

const Streams: NextPage = ({ data }: any) => {
  console.log(data)

  const { data: session } = useSession()
  return (
    <div>
      <h1>Streams</h1>
      <div>
        {data.map((stream: any) => {
          return (
            <div key={stream.id}>
              <h2>{stream.user_name}</h2>
              <img
                src={`https://static-cdn.jtvnw.net/previews-ttv/live_user_${stream.user_login}.jpg`}
                width='512px'
                height='340px'
              />
              <p>{stream.title}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default Streams
