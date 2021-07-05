import ReactMarkdown from 'react-markdown'
import { useRouter } from 'next/router'
import Moment from 'react-moment'
import { Heading, Spinner } from '@amsterdam/asc-ui'

import Seo from '../../components/Seo'
import Related from '../../components/Related'
import { fetchAPI, getStrapiURL, getStrapiMedia } from '../../lib/utils'
import styles from './article.module.css'

const Article = ({
  title,
  teaser,
  teaserImage,
  coverImage,
  publicationDate,
  body,
  related,
}) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div><Spinner /></div>
  }

  const seo = {
    metaTitle: title,
    metaDescription: teaser,
    shareImage: teaserImage,
    article: true,
  }

  const coverImageStyle = {
    backgroundImage: `url(${getStrapiMedia(coverImage)})`,
  }

  return (
    <>
      <Seo seo={seo} />
      <div className={styles.coverImage} style={coverImageStyle} />
      <Heading>{title}</Heading>
      <Moment locale="nl" format="D MMMM YYYY">{publicationDate}</Moment>
      <ReactMarkdown
        source={body}
        escapeHtml={false}
        transformImageUri={(src) => getStrapiURL() + src}
      />
      <Related data={related} />
    </>
  )
}

export async function getStaticPaths() {
  const articles = await fetchAPI('/articles?_limit=-1')

  return {
    paths: articles.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const articles = await fetchAPI(
    `/articles?slug=${params.slug}`,
  )

  return {
    props: { ...articles[0] },
    revalidate: 1,
  }
}

export default Article
