import { Song } from '@lib/types'
import Image from 'next/image'

const Track = (track: Song) => {
  return (
    <div className='border-white-200 mt-6 flex flex-row items-start border-b'>
      <p className='text-white-600 -mt-[3px] text-sm font-semibold'>
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
            className='text-white-800 w-60 truncate font-medium sm:w-96 md:w-full'
          >
            {track?.title}
          </a>
          <p className='text-white-600  w-60 truncate sm:w-96 md:w-full'>
            {track?.artist}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Track
