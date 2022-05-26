import { renderBlocks } from '@lib/renderBlocks'
import { getPageData } from '@lib/notion'
import Layout from '@layouts/__layout'
import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { Fragment } from 'react'

export const pageId = process.env.COLOPHON_PAGE_ID

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

const Colophon = ({ content }) => {
  return (
    <>
      <NextSeo
        title={`Colophon - Bachitter Chahal`}
        canonical={`https://bachitter.dev/colophon`}
      />
      <Layout>
        <h1>Colophon</h1>
        <p className='text-tiny text-white-600 mb-6 md:text-base'>
          Complete list of tools, resources and people that have made this site.
          Any changes related to this website will be posted here.
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

export default Colophon
