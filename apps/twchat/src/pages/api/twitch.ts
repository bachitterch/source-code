import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

const twitch = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })

  const token = session?.accessToken

  const clientId = process.env.TWITCH_CLIENT_ID as string

  const url = 'https://api.twitch.tv/helix/chat/emotes?broadcaster_id=62470768'
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Client-Id': clientId,
      Authorization: `Bearer ${token}`
    }
  })

  const data = await response.json()

  return res.status(200).json(data)
}

export default twitch
