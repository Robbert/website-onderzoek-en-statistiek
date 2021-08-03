import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { useRouter } from 'next/router'
import Moment from 'react-moment'
import { PDFDownloadLink } from '@react-pdf/renderer'
import {
  Spinner, AccordionWrapper,
} from '@amsterdam/asc-ui'

import Seo from '../../components/Seo'
import InlineImage from '../../components/InlineImage'
import PdfDocument from '../../components/PdfDocument'
import Sidebar from '../../components/PublicationPage/Sidebar'
import { fetchAPI, getStrapiMedia, apolloClient } from '../../lib/utils'
import * as Styled from './publication.style'
import QUERY from './publication.query.gql'

const Publication = ({
  slug,
  author,
  title,
  shortTitle,
  intro,
  body,
  introduction,
  results,
  conclusion,
  publicationDate,
  publicationSource,
  file,
  related,
  teaserImage,
  coverImage,
  theme,
}) => {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

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

  const pdfContent = {
    title, publicationSource, intro, body,
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
              <Moment locale="nl" format="D MMMM YYYY">{publicationDate}</Moment>
            </Styled.MetaListItem>
            )}
          </Styled.MetaList>
          <Styled.Intro>{intro}</Styled.Intro>
          { isClient && body && (
          <PDFDownloadLink document={<PdfDocument {...pdfContent} />} fileName={`toegankelijke-samenvatting-${slug}.pdf`}>
            {({ loading }) => (loading ? <Spinner /> : 'Download toegankelijke samenvatting')}
          </PDFDownloadLink>
          )}
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
        <Sidebar image={coverImage} file={file} related={related} theme={theme} />
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
