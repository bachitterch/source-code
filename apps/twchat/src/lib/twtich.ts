const GET_FOLLOWED_STREAMS_ENDPOINT = `https://api.twitch.tv/helix/streams/followed?`
const GET_STREAMS_ENDPOINT = `https://api.twitch.tv/helix/streams?`

export const getFollowedStreams = async (
  id: string,
  token: string,
  limit = 100
) => {
  const clientId = process.env.TWITCH_CLIENT_ID as string

  const url =
    GET_FOLLOWED_STREAMS_ENDPOINT +
    new URLSearchParams({
      user_id: id,
      first: limit.toString()
    })

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Client-Id': clientId,
      Authorization: `Bearer ${token}`
    }
  })

  const { data } = await response.json()

  return data
}

export const getStreams = async (token: string) => {
  const clientId = process.env.TWITCH_CLIENT_ID as string

  const response = await fetch(GET_STREAMS_ENDPOINT, {
    method: 'GET',
    headers: {
      'Client-Id': clientId,
      Authorization: `Bearer ${token}`
    }
  })

  const { data } = await response.json()

  return data
}
