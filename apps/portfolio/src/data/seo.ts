const title = `Bachitter Chahal`
const description = `Front-end developer, and Blogger based in Vancouver,CA.`
const domain = `bachitter.dev`
const twitter = `@bachitterch`
const image = 'banner.jpg'

export const seo = {
  title,
  description,
  domain,
  openGraph: {
    title,
    description,
    type: 'website',
    site_name: title,
    locale: 'en_US',
    images: [
      {
        url: `https://${domain}/images/${image}`,
        width: 1600,
        height: 836,
        alt: title
      }
    ]
  },
  twitter: {
    handle: twitter,
    cardType: 'summary_large_image'
  }
}
