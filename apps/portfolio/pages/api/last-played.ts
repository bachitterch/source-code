import type { NextApiRequest, NextApiResponse } from 'next'
import { getLastPlayed } from '@lib/spotify'

const lastPlayed = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await getLastPlayed()

  const list = await response.json()

  const song = {
    title: list.items[0].track.name,
    artist: list.items[0].track.artists[0].name,
    songUrl: list.items[0].track.external_urls.spotify
  }

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1, stale-while-revalidate=0.5'
  )

  return res.status(200).json(song)
}

export default lastPlayed
