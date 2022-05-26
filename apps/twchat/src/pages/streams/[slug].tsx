import getStreams from '@lib/getStreams'
import { NextPage } from 'next'
import { getSession, useSession } from 'next-auth/react'

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
  console.log(streamdata)
  const { data: session } = useSession()

  return <div>Stream</div>
}
export default Stream

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
