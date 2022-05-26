import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {
  return (
    <Html lang='en'>
      <Head>
        <link rel='manifest' href='/manifest.json' />
        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
        <meta name='theme-color' content='#ececec' />
        <link
          rel='preload'
          href='/fonts/Inter.var.woff2'
          as='font'
          type='font/woff2'
          crossOrigin='anonymous'
        />
        <meta
          name='p:domain_verify'
          content='c7d4bbeb097f6c60016e4d0e1828fc38'
        />
      </Head>
      <body className='bg-white-50 text-white-800'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
