import { renderBlocks } from '@lib/renderBlocks'
import { getPageData } from '@lib/notion'
import Layout from '@layouts/__layout'
import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { Fragment } from 'react'

export const pageId = process.env.ABOUT_PAGE_ID

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

const About = ({ content }) => {
  return (
    <>
      <NextSeo
        title={`About - Bachitter Chahal`}
        canonical={`https://bachitter.dev/about`}
      />
      <Layout>
        <h1>About</h1>
        <p className='text-tiny text-white-600 mb-6 md:text-base'>
          Who, what, where and everything else you wanna know about me is here.
        </p>
        <div className='space-y-6'>
          {content.map(block => (
            <Fragment key={block.id}>{renderBlocks(block)}</Fragment>
          ))}
        </div>
      </Layout>
    </>
  )
}

export default About
