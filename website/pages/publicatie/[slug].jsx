import ReactMarkdown from 'react-markdown'
import Moment from 'react-moment'
import { Heading } from '@amsterdam/asc-ui'

import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import Related from '../../components/Related'
import { fetchAPI, getStrapiMedia } from '../../lib/utils'

const Publication = ({ publication }) => {
  const seo = {
    metaTitle: publication.title,
    metaDescription: publication.description,
  }

  const downloadUrl = getStrapiMedia(publication.file)

  return (
    <Layout>
      <Seo seo={seo} />
      <Heading>{publication.title}</Heading>
      <Moment locale="nl" format="D MMMM YYYY">{publication.published_at}</Moment>
      <ReactMarkdown source={publication.intro} escapeHtml={false} />
      <ReactMarkdown source={publication.body} escapeHtml={false} />
      <p><a href={downloadUrl} download={publication.file.name}>download pdf</a></p>
      <Related data={publication.related} />
    </Layout>
  )
}

export async function getStaticPaths() {
  const publications = await fetchAPI('/publications')

  return {
    paths: publications.map((publication) => ({
      params: {
        slug: publication.slug,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const publications = await fetchAPI(
    `/publications?slug=${params.slug}`,
  )

  return {
    props: { publication: publications[0] },
    revalidate: 1,
  }
}

export default Publication
