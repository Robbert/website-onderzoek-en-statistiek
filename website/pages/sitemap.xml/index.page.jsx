import { getSearchContent } from '../../lib/searchUtils'
import { prependRootURL } from '../../lib/utils'
import CONTENT_TYPES from '../../constants/contentTypes'
import HEADER_LINKS from '../../constants/contentLinks'

export const getServerSideProps = async ({ res }) => {
  const content = await getSearchContent()
  const today = new Date(Date.now())

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${prependRootURL()}</loc>
        <lastmod>${today.toISOString()}</lastmod>
        <changefreq>hourly</changefreq>
        <priority>1</priority>     
      </url>
    ${HEADER_LINKS.themes
      .map(
        ({ slug }) =>
          `<url>
        <loc>${prependRootURL(slug)}</loc>
        <lastmod>${today.toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>
      `,
      )
      .join('')}
    ${content
      .map(
        ({ slug, publicationDate, type }) =>
          `<url>
        <loc>${prependRootURL(`/${CONTENT_TYPES[type].name}/${slug}`)}</loc>
        <lastmod>${publicationDate || undefined}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.5</priority>
      </url>
      `,
      )
      .join('')}
    </urlset>
  `

  res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate')
  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)

  res.end()

  // Empty since we don't render anything
  return {
    props: {},
  }
}

// Default export to prevent next.js errors
const SitemapXML = () => {}

export default SitemapXML
