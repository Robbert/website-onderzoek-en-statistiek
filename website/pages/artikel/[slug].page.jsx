import { useRouter } from 'next/router'
import Image from 'next/image'
import { Spinner } from '@amsterdam/asc-ui'

import Seo from '../../components/Seo/Seo'
import MarkdownToHtml from '../../components/MarkdownToHtml/MarkdownToHtml'
import Related from '../../components/Related/Related'
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
  linkList,
  related,
  theme,
}) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div><Spinner /></div>
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
            <MarkdownToHtml>{body}</MarkdownToHtml>
          </Styled.Body>
        </Styled.MainContent>
        <Styled.SideBar>
          {related
          && (
            <Related
              linkList={flattenFeatureList(linkList)}
              related={flattenFeatureList(related)}
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
