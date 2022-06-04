import Twitch from '@lib/embed'
import { useEffect } from 'react'

const TwitchEmbed = ({ channel }: any) => {
  const targetID = 'twitch-embed'

  const options = {
    width: '980px',
    height: '480px',
    channel: channel
  }

  useEffect(() => {
    const player = new Twitch.Player(targetID, options)
    player.setVolume(0.5)
  }, [])

  return (
    <>
      <div id={targetID}></div>
    </>
  )
}

export default TwitchEmbed
