import { createApi } from 'unsplash-js'
import Layout from '@layouts/__layout'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import { NextSeo } from 'next-seo'

export const getStaticProps: GetStaticProps = async () => {
  const unsplash = createApi({ accessKey: process.env.UNSPLASH_ACCESS_KEY })
  const data = await (
    await unsplash.users.getPhotos({ username: 'bachitterch' })
  ).response.results

  let content = []
  const images = data.map(image => ({
    url: image.urls.full,
    link: image.links.html,
    id: image.id,
    width: image.width,
    height: image.height
  }))

  content = [...images]

  return {
    props: {
      content
    },
    revalidate: 600
  }
}

const Play = ({ content }) => {
  return (
    <>
      <NextSeo
        title={`Play - Bachitter Chahal`}
        canonical={`https://bachitter.dev/play`}
      />
      <Layout>
        <h1>Play</h1>
        <p className='mb-6 text-tiny text-white-600 md:text-base'>
          All the images you see here are shot by me using an Apple iPhone 11
          Pro.
        </p>
        <div className='play_content space-y-6'>
          {content.map(image => {
            return (
              <div key={image.id}>
                <a href={image.link}>
                  <Image
                    src={image.url}
                    width={image.width / 2}
                    height={image.height / 2}
                    alt='image'
                    placeholder='blur'
                    blurDataURL={image.url}
                    className='projectImage rounded-md md:rounded-xl'
                  />
                </a>
              </div>
            )
          })}
        </div>
      </Layout>
    </>
  )
}

export default Play
