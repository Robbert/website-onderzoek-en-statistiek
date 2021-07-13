import Head from 'next/head'

import { prependRootURL } from '../lib/utils'

const Seo = ({
  title = 'Onderzoek en Statistiek',
  description = 'Website Onderzoek en Statistiek',
  image,
  article,
  video,
}) => {
  const imagePath = image || prependRootURL('/default_image.png')
  const fullTitle = `${title} | Website Onderzoek en Statistiek`

  return (
    <Head>
      {title && (
        <>
          <title>{fullTitle}</title>
          <meta property="og:title" content={fullTitle} />
          <meta name="twitter:title" content={fullTitle} />
        </>
      )}
      {description && (
        <>
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
          <meta name="twitter:description" content={description} />
        </>
      )}
      {imagePath && (
        <>
          <meta property="og:image" content={imagePath} />
          <meta name="twitter:image" content={imagePath} />
          <meta name="image" content={imagePath} />
        </>
      )}
      {article && <meta property="og:type" content="article" />}
      {video && <meta property="og:type" content="video" />}
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  )
}

export default Seo
