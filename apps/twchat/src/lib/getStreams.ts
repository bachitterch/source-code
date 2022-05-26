const GET_FOLLOWED_STREAMS_ENDPOINT = `https://api.twitch.tv/helix/streams/followed?`

const getFollows = async (id: string, token: string, limit = 100) => {
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

  const { data, pagination } = await response.json()

  return data
}

export default getFollows
