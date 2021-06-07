import ReactMarkdown from 'react-markdown'
import Moment from 'react-moment'
import { Heading } from '@amsterdam/asc-ui'

import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import Related from '../../components/Related'
import { fetchAPI, getStrapiURL, getStrapiMedia } from '../../lib/utils'

import styles from './article.module.css'

const Article = ({ article }) => {
  const seo = {
    metaTitle: article.title,
    metaDescription: article.teaser,
    // shareImage: article.teaserImage,
    article: true,
  }

  const coverImageStyle = {
    backgroundImage: `url(${getStrapiMedia(article.coverImage)})`,
  }

  return (
    <Layout>
      <Seo seo={seo} />
      <div className={styles.coverImage} style={coverImageStyle} />
      <Heading>{article.title}</Heading>
      <Moment locale="nl" format="D MMMM YYYY">{article.published_at}</Moment>
      <ReactMarkdown
        source={article.body}
        escapeHtml={false}
        transformImageUri={(src) => getStrapiURL() + src}
      />
      <Related data={article.related} />
    </Layout>
  )
}

export async function getStaticPaths() {
  const articles = await fetchAPI('/articles?_limit=-1')

  return {
    paths: articles.map((article) => ({
      params: {
        slug: article.slug,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const articles = await fetchAPI(
    `/articles?slug=${params.slug}`,
  )

  return {
    props: { article: articles[0] },
    revalidate: 1,
  }
}

export default Article
