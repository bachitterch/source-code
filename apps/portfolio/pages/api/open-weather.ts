import type { NextApiRequest, NextApiResponse } from 'next'

const apiKey: string = process.env.OPEN_WEATHER_API_KEY
const apiUrl: string = `https://api.openweathermap.org/data/2.5/weather`
const city: string = 'Surrey,CA'

const openWeather = async (req: NextApiRequest, res: NextApiResponse) => {
  const ENDPOINT: string = `${apiUrl}?q=${city}&appid=${apiKey}&units=imperial`

  const response: Response = await fetch(ENDPOINT)
  const results = await response.json()

  const weatherData = {
    city: results.name,
    temp: results.main.temp,
    min: results.main.temp_min,
    max: results.main.temp_max,
    description:
      results.weather[0].description.charAt(0).toUpperCase() +
      results.weather[0].description.slice(1),
    weather: results.weather[0].main
  }

  return res.status(200).json(weatherData)
}

export default openWeather
