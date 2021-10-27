/* eslint-disable react/no-array-index-key */
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Spinner } from '@amsterdam/asc-ui'

import Seo from '../../components/Seo/Seo'
import MarkdownToHtml from '../../components/MarkdownToHtml/MarkdownToHtml'
import Related from '../../components/Related/Related'
import Link from '../../components/Link/Link'
import {
  fetchAPI,
  getStrapiMedia,
  prependStrapiURL,
  PLACEHOLDER_IMAGE,
  apolloClient,
  normalizeItemList,
  normalizeBody,
  formatDate,
} from '../../lib/utils'
import QUERY from './article.query.gql'
import * as Styled from './article.style'

const Article = ({
  title,
  shortTitle,
  teaser,
  squareImage,
  rectangularImage,
  publicationDate,
  intro,
  body,
  related,
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
        image={getStrapiMedia(rectangularImage || squareImage)}
        article
      />
      {rectangularImage && (
        <Styled.ImageWrapper>
          <Image
            src={getStrapiMedia(rectangularImage)}
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
            {normalizeBody(body).map((item, i) => {
              if (item.type === 'text') {
                return (<MarkdownToHtml key={`bodyItem${i}`}>{item.text}</MarkdownToHtml>)
              }
              if (item.type === 'linklist') {
                return (
                  <ul key={`bodyItem${i}`}>
                    {item.links.map((link) => (
                      <li key={link.path}><Link href={link.path}>{link.title}</Link></li>
                    ))}
                  </ul>
                )
              }
              if (item.type === 'visualisation') {
                return (
                  <Image
                    key={`bodyItem${i}`}
                    src={prependStrapiURL(item.image.url)}
                    alt={item.description}
                    width={16}
                    height={9}
                    layout="responsive"
                  />
                )
              }
              return null
            })}
          </Styled.Body>
        </Styled.MainContent>
        <Styled.SideBar>
          {related
          && (
            <Related
              related={normalizeItemList(related)}
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
