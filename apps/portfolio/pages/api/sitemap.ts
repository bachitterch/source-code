import { convertItemsToList, getItemList } from '@lib/notion'

const sitemap = async (req, res) => {
  const resp = await getItemList(process.env.BLOG_DATABASE_ID)
  const posts = await convertItemsToList(resp)

  const routes = posts.items.map(post => {
    return `/blog/${post.slug}`
  })

  const localRoutes = [
    '/index',
    '/blog',
    '/about',
    '/colophon',
    '/now',
    '/play',
    '/projects'
  ]

  const pages = [...routes, ...localRoutes]

  const urlSet = pages
    .map(page => {
      const route = page === '/index' ? '' : page

      return `<url><loc>https://bachitter.dev${route}</loc><changefreq>daily</changefreq>
<priority>0.7</priority></url>`
    })
    .join('')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">${urlSet}</urlset>`

  res.setHeader('Content-Type', 'text/xml')

  res.write(sitemap)
  res.end()
}

export default sitemap
