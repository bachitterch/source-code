import linkifyHtml from 'linkify-html'
const GET_FOLLOWED_STREAMS_ENDPOINT = `https://api.twitch.tv/helix/streams/followed?`

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

export const parseMessage = (message: string, emotes: any) => {
  let newMessage = message.split('')

  for (let emoteIndex in emotes) {
    let emote = emotes[emoteIndex]

    for (let charIndexes in emote) {
      let emoteIndexes = emote[charIndexes]

      if (typeof emoteIndexes == 'string') {
        emoteIndexes = emoteIndexes.split('-')
        emoteIndexes = [parseInt(emoteIndexes[0]), parseInt(emoteIndexes[1])]

        for (let i = emoteIndexes[0]; i <= emoteIndexes[1]; ++i) {
          newMessage[i] = ''
        }

        newMessage[emoteIndexes[0]] =
          '<img class="emoticon w-7 inline-block" src="http://static-cdn.jtvnw.net/emoticons/v1/' +
          emoteIndex +
          '/3.0">'
      }
    }
  }

  let newMessageString = newMessage.join('')

  return linkifyHtml(newMessageString, {
    target: '_blank',
    nofollow: true
  })
}
