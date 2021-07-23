import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { useRouter } from 'next/router'
import Moment from 'react-moment'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { Spinner } from '@amsterdam/asc-ui'

import Seo from '../../components/Seo'
import ContentContainer from '../../components/ContentContainer'
import Related from '../../components/Related'
import InlineImage from '../../components/InlineImage'
import PdfDocument from '../../components/PdfDocument'
import { fetchAPI, getStrapiMedia } from '../../lib/utils'
import * as Styled from './publication.style'

const Publication = ({
  slug,
  title,
  shortTitle,
  description,
  intro,
  body,
  publicationDate,
  publicationSource,
  file,
  related,
  teaserImage,
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

  const downloadUrl = getStrapiMedia(file)
  const pdfContent = {
    title, publicationSource, description, intro, body,
  }

  return (
    <ContentContainer>
      <Seo
        title={shortTitle || title}
        description={description}
        image={getStrapiMedia(teaserImage)}
        article
      />
      <Styled.Title>{title}</Styled.Title>
      <Moment locale="nl" format="D MMMM YYYY">{publicationDate}</Moment>
      <ReactMarkdown
        source={intro}
        renderers={{ paragraph: ({ children }) => <Styled.Intro>{children}</Styled.Intro> }}
      />

      <p><a href={downloadUrl} download={file.name}>Download opgemaakte publicatie</a></p>
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
        { related.length > 0 && <Related data={related} /> }
      </Styled.Main>
    </ContentContainer>
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
  const publications = await fetchAPI(
    `/publications?slug=${params.slug}`,
  )

  return {
    props: { ...publications[0] },
    revalidate: 1,
  }
}

export default Publication
