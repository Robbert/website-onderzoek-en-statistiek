import Head from 'next/head'

import { prependStaticContentUrl } from '~/lib/utils'

const Seo = ({
  title = 'Onderzoek en Statistiek',
  description = 'Onderzoek en Statistiek (O&S) verzamelt statistische informatie over Amsterdam en voert onderzoek uit, van korte opinieonderzoeken over actuele onderwerpen tot uitgebreide monitors.',
  image,
  article,
  video,
}) => {
  const imagePath = image || prependStaticContentUrl('/default_image.jpg')
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
