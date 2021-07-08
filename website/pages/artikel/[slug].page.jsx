import ReactMarkdown from 'react-markdown'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Moment from 'react-moment'
import { Spinner } from '@amsterdam/asc-ui'

import Seo from '../../components/Seo'
import Related from '../../components/Related'
import InlineImage from '../../components/InlineImage'
import { fetchAPI, getStrapiMedia } from '../../lib/utils'
import * as Styled from './article.style'

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

  const renderers = {
    image: (props) => <InlineImage {...props} />,
    paragraph: ({ children }) => {
      if (children[0]?.type?.name === 'image'
        || (children[0]?.type === 'a' && children[0]?.props?.children[0]?.type?.name === 'image')) {
        return children[0]
      }
      return <p>{children}</p>
    },
  }

  return (
    <>
      <Seo seo={seo} />
      <Image
        src={getStrapiMedia(coverImage)}
        width="1280"
        height="590"
        layout="responsive"
        placeholder="blur"
      />
      <Styled.Title>{title}</Styled.Title>
      <Moment locale="nl" format="D MMMM YYYY">{publicationDate}</Moment>
      <Styled.Body>
        <ReactMarkdown
          source={body}
          escapeHtml={false}
          renderers={renderers}
        />
        <Related data={related} />
      </Styled.Body>
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
