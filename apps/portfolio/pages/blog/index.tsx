import { getItemList, convertItemsToList } from '@lib/notion'
import { generateRSS } from 'scripts/generate-rss'
import Container from '@layouts/__layout'
import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import Link from 'next/link'

export const databaseId = process.env.BLOG_DATABASE_ID

export const getStaticProps: GetStaticProps = async () => {
  const response = await getItemList(databaseId)
  const { items } = convertItemsToList(response)

  await generateRSS()

  return {
    props: {
      posts: items
    },
    revalidate: 600
  }
}

const Blog = ({ posts }) => {
  return (
    <>
      <NextSeo
        title={`Blog - Bachitter Chahal`}
        canonical={`https://bachitter.dev/blog`}
      />
      <Container>
        <h1>Blog</h1>
        <p className='mb-6 text-tiny text-white-600 md:text-base'>
          Here I share my knowledge about development, CSS, Javascript and
          experience in my life.
        </p>
        <div className='post_list space-y-6'>
          {(!posts.length && (
            <p className='text-center text-base text-white-600'>
              No Article Found!
            </p>
          )) ||
            posts.map(post => {
              return (
                <div key={post.id}>
                  <Link href={`/blog/${post.slug}`}>
                    <a className='block hover:no-underline'>
                      <Image
                        src={post.thumbnail}
                        alt={post.title}
                        objectFit='cover'
                        width={1200}
                        height={684}
                        placeholder='blur'
                        blurDataURL={post.thumbnail}
                        className='postImage rounded-xl'
                      ></Image>
                      <h2 className='mb-2 mt-4 text-white-800'>{post.title}</h2>
                      <p className='text-base'>{post.summary}</p>
                    </a>
                  </Link>
                </div>
              )
            })}
        </div>
      </Container>
    </>
  )
}

export default Blog
