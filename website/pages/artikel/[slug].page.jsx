import ReactMarkdown from 'react-markdown'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Spinner } from '@amsterdam/asc-ui'

import Seo from '../../components/Seo'
import Related from '../../components/Related'
import InlineImage from '../../components/InlineImage'
import {
  fetchAPI, getStrapiMedia, PLACEHOLDER_IMAGE, apolloClient, flattenFeatureList, formatDate,
} from '../../lib/utils'
import QUERY from './article.query.gql'
import * as Styled from './article.style'

const Article = ({
  title,
  shortTitle,
  teaser,
  teaserImage,
  coverImage,
  publicationDate,
  intro,
  body,
  related,
  theme,
}) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div><Spinner /></div>
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
      <Seo
        title={shortTitle || title}
        description={teaser}
        image={getStrapiMedia(teaserImage)}
        article
      />
      {coverImage && (
      <Styled.ImageWrapper>
        <Image
          src={
                coverImage
                  ? getStrapiMedia(coverImage)
                  : PLACEHOLDER_IMAGE
              }
          alt=""
          layout="fill"
          placeholder="blur"
          objectFit="cover"
          blurDataURL={PLACEHOLDER_IMAGE}
          priority
        />
      </Styled.ImageWrapper>
      )}
      <Styled.Container>
        <Styled.MainContent>
          <Styled.Title>{title}</Styled.Title>
          <span>{formatDate(publicationDate)}</span>
          <Styled.Intro>{intro}</Styled.Intro>
          <Styled.Body>
            <ReactMarkdown
              source={body}
              escapeHtml={false}
              renderers={renderers}
            />
          </Styled.Body>
        </Styled.MainContent>
        <Styled.SideBar>
          { related
          && (
          <Related
            related={flattenFeatureList([related])}
            links={related.links}
            themes={theme}
          />
          )}
        </Styled.SideBar>
      </Styled.Container>
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
  const { data } = await apolloClient.query(
    {
      query: QUERY,
      variables: { slug: params.slug },
    },
  )
    .catch() // TODO: log this error in sentry

  return {
    props: data.articles[0],
    revalidate: 1,
  }
}

export default Article
