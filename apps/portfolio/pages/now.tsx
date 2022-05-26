import { renderBlocks } from '@lib/renderBlocks'
import TopTracks from '@components/TopTracks'
import { getPageData } from '@lib/notion'
import Layout from '@layouts/__layout'
import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { Fragment } from 'react'

export const pageId = process.env.NOW_PAGE_ID

export const getStaticProps: GetStaticProps = async () => {
  let data: any = await getPageData(pageId)
  let content = []
  content = [...data]

  while (data.has_more) {
    data = await getPageData({ pageId, start_cursor: data.next_cursor })

    content = [...content, ...data]
  }

  return {
    props: {
      content
    },
    revalidate: 60
  }
}

const Now = ({ content }) => {
  return (
    <>
      <NextSeo
        title={`Now - Bachitter Chahal`}
        canonical={`https://bachitter.dev/now`}
      />
      <Layout>
        <h1>Now</h1>
        <p className='mb-6 text-tiny text-white-600 md:text-base'>
          What I&#39;m working on, currently interested in or have plans to
          learn in near future. Mostly everything can be found here.
        </p>
        <div className='space-y-6 mb-6'>
          {content.map(block => (
            <Fragment key={block.id}>{renderBlocks(block)}</Fragment>
          ))}
        </div>
        <div>
          <h2 className='mt-2'>Top Tracks</h2>
          <p className='mb-6 text-tiny text-white-600 md:text-base'>
            Songs I&#39;ve been listening the most recently.
          </p>
          <TopTracks />
        </div>
      </Layout>
    </>
  )
}

export default Now
