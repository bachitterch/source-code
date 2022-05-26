import useSWR from 'swr'
import fetcher from '@lib/fetcher'
import { OpenWeatherData } from '@lib/types'

const renderImage = (weather: string) => {
  switch (weather) {
    case 'Clear':
      return 'https://images.unsplash.com/photo-1560813962-ff3d8fcf59ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&q=75&w=400'
    case 'Clouds':
      return 'https://images.unsplash.com/photo-1591680413000-b657ae252a31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&q=75&w=400'
    case 'Drizzle':
      return 'https://images.unsplash.com/photo-1640164731485-62a8afb399b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&q=75&w=400'
    case 'Rain':
      return 'https://images.unsplash.com/photo-1574635495641-61387ff841a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&q=75&w=400'
    case 'Snow':
      return 'https://images.unsplash.com/photo-1579379569225-72b69f026824?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&q=75&w=400'
    case 'Thunderstorm':
      return 'https://images.unsplash.com/photo-1532756886146-a25de8fb4aea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&q=75&w=400'
    case 'Mist':
      return 'https://images.unsplash.com/photo-1517144986814-c3179e77141e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&q=75&w=400'
    default:
      return 'https://images.unsplash.com/photo-1610356194230-b46385bcfd84?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&q=75&w=400'
  }
}

const ImageLink = (weather: string) => {
  switch (weather) {
    case 'Clear':
      return 'https://unsplash.com/photos/Yc9h5SJdEzI'
    case 'Clouds':
      return 'https://unsplash.com/photos/EIIDEbM-HEU'
    case 'Drizzle':
      return 'https://unsplash.com/photos/4OH194H9uBM'
    case 'Rain':
      return 'https://unsplash.com/photos/12uvM3tKuXo'
    case 'Snow':
      return 'https://unsplash.com/photos/taymyX1YhiI'
    case 'Thunderstorm':
      return 'https://unsplash.com/photos/V4CDzJBLb9E'
    case 'Mist':
      return 'https://unsplash.com/photos/_tVElBkuSOg'
    default:
      return 'https://unsplash.com/photos/bacJkcBs5LE'
  }
}

const WeatherWidget = () => {
  const { data } = useSWR<OpenWeatherData>('/api/open-weather', fetcher)

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0,0,0,.9) 25%, rgba(255,255,255,0) 100%), url('${renderImage(
          data?.weather
        )}')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }}
      className='relative flex h-56 w-full flex-col justify-end rounded-xl p-6'
      id='weather-widget'
    >
      <a
        href={ImageLink(data?.weather)}
        className='absolute right-6 bottom-6'
        target='_blank'
        rel='noopener noreferrer'
      >
        View Image
      </a>
      <div className='space-y-4'>
        <p className='text-[3rem] font-bold'>{Math.round(data?.temp)}°</p>
        <p className='text-sm leading-none'>{data?.description}</p>
        <div>
          <p className='mb-0.5 text-sm font-semibold leading-none'>
            {data?.city}
          </p>
          <div className='text-white-500 flex gap-2 text-xs'>
            <span>{Math.round(data?.max)}°</span>
            <span>{Math.round(data?.min)}°</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherWidget
