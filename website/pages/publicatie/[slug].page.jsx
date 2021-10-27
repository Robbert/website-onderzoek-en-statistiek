import { useRouter } from 'next/router'
import {
  Spinner, ListItem, List,
} from '@amsterdam/asc-ui'

import Seo from '../../components/Seo/Seo'
import MarkdownToHtml from '../../components/MarkdownToHtml/MarkdownToHtml'
import DownloadButton from '../../components/DownloadButton/DownloadButton'
import Link from '../../components/Link/Link'
import Heading from '../../components/Heading/Heading'
import {
  fetchAPI, getStrapiMedia, apolloClient, PLACEHOLDER_IMAGE, formatDate, flattenFeatureList,
} from '../../lib/utils'
import * as Styled from './publication.style'
import QUERY from './publication.query.gql'

const Publication = ({
  title,
  shortTitle,
  teaserImage,
  publicationDate,
  author,
  intro,
  body,
  file,
  coverImage,
  linkList,
}) => {
  const router = useRouter()
  if (router.isFallback) {
    return <div><Spinner /></div>
  }

  const flatLinkList = flattenFeatureList(linkList)

  return (
    <>
      <Seo
        title={shortTitle || title}
        image={getStrapiMedia(teaserImage)}
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
            { body && <MarkdownToHtml>{body}</MarkdownToHtml>}
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
          {flatLinkList && flatLinkList.length > 0 && (
            <>
              <Heading styleAs="h5" gutterBottom={20}>Zie ook</Heading>
              <List>
                { flatLinkList.map(({ path, title: linkTitle }) => (
                  <ListItem key={path}>
                    <Link href={path} inList strong>
                      {linkTitle}
                    </Link>
                  </ListItem>
                )) }
              </List>
            </>
          )}
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
