import RSS from 'rss'
import { mkdirSync, writeFileSync } from 'fs'
import { convertItemsToList, getItemList } from '../src/lib/notion'

export const generateRSS = async () => {
  const resp = await getItemList(process.env.BLOG_DATABASE_ID)
  const posts = await convertItemsToList(resp)

  const feed = new RSS({
    title: 'Bachitter Chahal',
    site_url: 'https://bachitter.dev',
    feed_url: 'https://bachitter.dev/feed.xml'
  })

  posts.items.map(post => {
    feed.item({
      title: post.title,
      url: `https://bachitter.dev/blog/${post.slug}`,
      date: post.date,
      description: post.summary
    })
  })
  mkdirSync('./public/rss', { recursive: true })
  writeFileSync('./public/rss/feed.xml', feed.xml({ indent: true }))
}
