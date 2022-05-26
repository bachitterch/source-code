import { getTopTracks } from '@lib/spotify'
import type { NextApiRequest, NextApiResponse } from 'next'

const topTracks = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await getTopTracks()

  const { items } = await response.json()

  const tracks = items.slice(0, 10).map(track => ({
    artist: track.artists.map(_artist => _artist.name).join(', '),
    albumArt: track.album.images[0].url,
    songUrl: track.external_urls.spotify,
    title: track.name
  }))

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=43200'
  )

  return res.status(200).json(tracks)
}

export default topTracks
