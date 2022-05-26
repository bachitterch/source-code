import fetcher from '@lib/fetcher'
import { TopTracks } from '@lib/types'
import Track from './Track'
import useSWR from 'swr'

const Tracks = () => {
  const { data } = useSWR<TopTracks>('/api/top-tracks', fetcher)

  if (!data) {
    return null
  }
  return (
    <>
      {data?.map((track, index) => (
        <Track ranking={index + 1} key={track.songUrl} {...track} />
      ))}
    </>
  )
}

export default Tracks
