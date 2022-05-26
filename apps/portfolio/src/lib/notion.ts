import { Client } from '@notionhq/client'

const client = new Client({ auth: process.env.NOTION_ACCESS_TOKEN })

export const getItemList = async databaseId => {
  const response = await client.databases.query({
    database_id: databaseId
  })
  return response.results
}

export const getItem = async (data, slug) => {
  const response = data.find(result => {
    if (result.properties.status.select.name === 'published') {
      const resultSlug = result.properties.slug.rich_text[0].plain_text
      return resultSlug === slug
    }
    return false
  })
  return response
}

export const getBlocks = async blockId => {
  const response = await client.blocks.children.list({
    block_id: blockId
  })
  return response.results
}

export const getPageData = async pageId => {
  const response = await client.blocks.children.list({
    block_id: pageId
  })
  return response.results
}

export const convertItemsToList = (tableData: any) => {
  const items = tableData
    .map((item: any) => {
      if (
        item.object != 'undefined' &&
        item.properties.status.select.name === 'published'
      ) {
        return {
          id: item.id,
          title: item.properties.name.title[0].plain_text,
          published: item.properties.status.select.name === 'published',
          summary: item.properties?.summary?.rich_text[0]?.plain_text,
          date: new Date(item.properties.published.date.start).toLocaleString(
            'en-US',
            {
              month: 'short',
              day: '2-digit',
              year: 'numeric'
            }
          ),
          thumbnail:
            item.properties?.thumbnail?.files[0]?.file?.url ||
            item.properties.thumbnail?.files[0]?.external?.url,
          slug: item.properties?.slug?.rich_text[0]?.plain_text,
          featured: item.properties?.featured?.checkbox
        }
      }
    })
    .filter(post => {
      return post !== undefined
    })
  return { items }
}

export const convertProjectsToList = (tableData: any) => {
  const items = tableData
    .map((item: any) => {
      if (
        item.object != 'undefined' &&
        item.properties.status.select.name === 'published'
      ) {
        return {
          id: item.id,
          title: item.properties.name.title[0].plain_text,
          summary: item.properties?.description?.rich_text[0]?.plain_text,
          thumbnail:
            item.properties?.thumbnail?.files[0]?.file?.url ||
            item.properties.thumbnail?.files[0]?.external?.url,
          link: item.properties?.link?.url,
          github: item.properties?.github?.url
        }
      }
    })
    .filter(post => {
      return post !== undefined
    })
  return { items }
}
