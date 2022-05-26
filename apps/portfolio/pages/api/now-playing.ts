import type { NextApiRequest, NextApiResponse } from 'next'
import { getNowPlaying } from '@lib/spotify'

const nowPlaying = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await getNowPlaying()

  if (response.status === 204 || response.status > 400) {
    return res.status(200).json({ isPlaying: false })
  }

  const song = await response.json()

  if (song.item === null) {
    return res.status(200).json({ isPlaying: false })
  }

  const Song = {
    isPlaying: song.is_playing,
    title: song.item.name,
    artist: song.item.artists.map(artist => artist.name).join(', '),
    album: song.item.album.name,
    albumArt: song.item.album.images[0].url,
    songUrl: song.item.external_urls.spotify
  }

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=30'
  )

  return res.status(200).json(Song)
}

export default nowPlaying
