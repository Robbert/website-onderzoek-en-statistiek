import ReactMarkdown from 'react-markdown'
import { useRouter } from 'next/router'
import { Spinner, AccordionWrapper } from '@amsterdam/asc-ui'

import Seo from '../../components/Seo/Seo'
import InlineImage from '../../components/InlineImage/InlineImage'
import DownloadButton from '../../components/DownloadButton/DownloadButton'
import {
  fetchAPI, getStrapiMedia, apolloClient, PLACEHOLDER_IMAGE, formatDate,
} from '../../lib/utils'
import * as Styled from './publication.style'
import QUERY from './publication.query.gql'

const Publication = ({
  author,
  title,
  shortTitle,
  intro,
  body,
  introduction,
  results,
  conclusion,
  publicationDate,
  file,
  teaserImage,
  coverImage,
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
        image={getStrapiMedia(teaserImage)}
        article
      />
      <Styled.Container>
        <div>
          <Styled.Title gutterBottom={16}>{title}</Styled.Title>
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
            { body && (
              <ReactMarkdown
                source={body}
                escapeHtml={false}
                renderers={renderers}
              />
            )}
          </Styled.Main>
          {(introduction || results || conclusion) && (
            <Styled.AccordionWrapperWrapper>
              <AccordionWrapper>
                {introduction && (
                  <Styled.Accordion title="Inleiding" id="Inleiding">
                    <ReactMarkdown
                      source={introduction}
                      escapeHtml={false}
                      renderers={renderers}
                    />
                  </Styled.Accordion>
                )}
                {results && (
                  <Styled.Accordion title="Resultaten" id="Resultaten">
                    <ReactMarkdown
                      source={results}
                      escapeHtml={false}
                      renderers={renderers}
                    />
                  </Styled.Accordion>
                )}
                {conclusion && (
                  <Styled.Accordion title="Conclusie" id="Conclusie">
                    <ReactMarkdown
                      source={conclusion}
                      escapeHtml={false}
                      renderers={renderers}
                    />
                  </Styled.Accordion>
                )}
              </AccordionWrapper>
            </Styled.AccordionWrapperWrapper>
          )}
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
