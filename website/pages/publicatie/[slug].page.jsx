/* eslint-disable react/no-array-index-key */
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Spinner } from '@amsterdam/asc-ui'

import Seo from '../../components/Seo/Seo'
import MarkdownToHtml from '../../components/MarkdownToHtml/MarkdownToHtml'
import DownloadButton from '../../components/DownloadButton/DownloadButton'
import Link from '../../components/Link/Link'
import Heading from '../../components/Heading/Heading'
import {
  fetchAPI,
  getStrapiMedia,
  apolloClient,
  PLACEHOLDER_IMAGE,
  formatDate,
  normalizeBody,
  prependStrapiURL,
} from '../../lib/utils'
import * as Styled from './publication.style'
import QUERY from './publication.query.gql'

const Publication = ({
  title,
  shortTitle,
  publicationDate,
  author,
  intro,
  body,
  file,
  coverImage,
  squareImage,
  rectangularImage,
}) => {
  const router = useRouter()
  if (router.isFallback) {
    return <div><Spinner /></div>
  }

  return (
    <>
      <Seo
        title={shortTitle || title}
        image={getStrapiMedia(rectangularImage || squareImage || coverImage)}
        article
      />
      <Styled.Container>
        <div>
          <Heading styleAs="h3" gutterBottom={16}>{title}</Heading>
          <Styled.MetaList>
            <Styled.MetaListItem>Publicatie</Styled.MetaListItem>
            {author && <Styled.MetaListItem>{author}</Styled.MetaListItem>}
            {publicationDate && (
              <Styled.MetaListItem>
                {formatDate(publicationDate)}
              </Styled.MetaListItem>
            )}
          </Styled.MetaList>
          <Styled.Intro>{intro}</Styled.Intro>
          <Styled.Main>
            {body && normalizeBody(body).map((item, i) => {
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
          </Styled.Main>
        </div>
        <Styled.SideBar>
          <Styled.CoverImage>
            <img
              src={
                coverImage
                  ? getStrapiMedia(coverImage)
                  : PLACEHOLDER_IMAGE
              }
              alt=""
            />
          </Styled.CoverImage>
          <DownloadButton file={file} image={coverImage} />
        </Styled.SideBar>
      </Styled.Container>
    </>
  )
}

export async function getStaticPaths() {
  const publications = await fetchAPI('/publications?_limit=-1')

  return {
    paths: publications.map(({ slug }) => ({
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
    props: data.publications[0],
    revalidate: 1,
  }
}

export default Publication
