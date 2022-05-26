import fetcher from '@lib/fetcher'
import Image from 'next/image'
import { NowPlayingSong, LastPlayedSong } from '@lib/types'
import useSWR from 'swr'

const NowPlaying = () => {
  const { data } = useSWR<NowPlayingSong>('/api/now-playing', fetcher)
  const { data: lastPlayed } = useSWR<LastPlayedSong>(
    '/api/last-played',
    fetcher
  )

  return (
    <div className='flex bg-white-10 p-6 rounded-xl flex-col w-full h-56 justify-end truncate'>
      <div className='flex flex-col justify-end relative'>
        <div>
          {data?.songUrl ? (
            <div className='spotify-image rounded-full w-[80px]'>
              <Image
                src={data?.albumArt}
                layout='raw'
                width={70}
                height={70}
                className='rounded-full w-[80px]'
                alt='NowPlaying Cove Image'
              ></Image>
            </div>
          ) : (
            <svg className='w-[65px] h-[65px]' viewBox='0 0 168 168'>
              <path
                fill='#1DB954'
                d='M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l.001-.004zm38.404 120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 014.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.001zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 015.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 012.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z'
              />
            </svg>
          )}
        </div>
        <p className='text-xs -mb-2 mt-3 text-spotify_green'>
          {data?.songUrl ? (
            <span>Now Playing</span>
          ) : (
            <span>Offline - Last Played</span>
          )}
        </p>
        <div className='w-full truncate'>
          {data?.songUrl ? (
            <a
              className='text-xl font-bold text-white-900 truncate'
              href={data.songUrl}
              target='_blank'
              rel='noopener noreferrer'
            >
              {data.title}
            </a>
          ) : (
            <a
              className='text-3xl font-bold text-white-900 truncate hover:no-underline block'
              href={lastPlayed?.songUrl}
              target='_blank'
              rel='noopener noreferrer'
            >
              {lastPlayed?.title}
            </a>
          )}
          <p className='-mt-2 text-base w-[22ch] text-white-900 truncate'>
            {data?.artist ?? lastPlayed?.artist}
          </p>
        </div>
      </div>
    </div>
  )
}

export default NowPlaying
