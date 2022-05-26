import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import { seo } from '@data/seo'
import '@fontsource/source-code-pro'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <script
        async
        defer
        data-domains='bachitter.dev'
        data-website-id='e845f1a6-544d-4ba6-b486-7974794891e8'
        src='https://analytics.bachitterch.com/umami.js'
      ></script>
      <DefaultSeo {...seo} />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
