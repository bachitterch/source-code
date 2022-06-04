import Twitch from '@lib/embed'
import { useEffect } from 'react'

const TwitchEmbed = ({ channel }: any) => {
  const targetID = 'twitch-embed'

  useEffect(() => {
    const player = new Twitch.Player(targetID, {
      channel: channel
    })
    player.setVolume(0.5)
  }, [])

  return (
    <>
      <div id={targetID}></div>
    </>
  )
}

export default TwitchEmbed
