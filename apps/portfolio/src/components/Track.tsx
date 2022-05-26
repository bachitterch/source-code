import { Song } from '@lib/types'
import Image from 'next/image'

const Track = (track: Song) => {
  return (
    <div className='mt-6 flex flex-row items-start border-b border-white-200'>
      <p className='-mt-[3px] text-sm font-semibold text-white-600'>
        {track.ranking}
      </p>
      <div className='mb-4 flex items-center pl-3'>
        <Image
          src={track?.albumArt}
          layout='raw'
          width={50}
          height={50}
          className='rounded-md'
          alt='NowPlaying Cove Image'
        />

        <div className='flex flex-col pl-3'>
          <a
            href={track?.songUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='w-60 truncate font-medium text-white-800 sm:w-96 md:w-full'
          >
            {track?.title}
          </a>
          <p className='w-60  truncate text-white-600 sm:w-96 md:w-full'>
            {track?.artist}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Track
