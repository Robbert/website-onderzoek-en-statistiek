import ReactMarkdown from 'react-markdown'
import { useRouter } from 'next/router'
import Moment from 'react-moment'
import { Heading, Spinner } from '@amsterdam/asc-ui'

import Seo from '../../components/Seo'
import { fetchAPI, getStrapiMedia } from '../../lib/utils'
import * as Styled from './dataset.style'

const Dataset = ({
  title,
  description,
  contactName,
  contactMail,
  purpose,
  published_at: published,
  updated_at: updated,
  frequency,
  resources,
}) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div><Spinner /></div>
  }

  const seo = {
    metaTitle: title,
    metaDescription: description,
  }

  const resourceLinks = resources.map(({ id, title: resourceTitle, file }) => (
    <Styled.Value key={id}>
      <a href={getStrapiMedia(file)}>
        {`${file.ext.substring(1)}: ${resourceTitle}`}
      </a>
    </Styled.Value>
  ))

  return (
    <>
      <Seo seo={seo} />
      <Heading>
        {`Dataset ${title}`}
      </Heading>
      <Styled.Intro>
        <ReactMarkdown source={description} escapeHtml={false} />
      </Styled.Intro>
      <Styled.MetaData>
        <Styled.Row>
          <Styled.Key>Publicatiedatum</Styled.Key>
          <Styled.Value>
            <Moment locale="nl" format="D MMMM YYYY">{published}</Moment>
          </Styled.Value>
        </Styled.Row>
        <Styled.Row>
          <Styled.Key>Wijzigingsdatum</Styled.Key>
          <Styled.Value>
            <Moment locale="nl" format="D MMMM YYYY">{updated}</Moment>
          </Styled.Value>
        </Styled.Row>
        <Styled.Row>
          <Styled.Key>Wijzigingsfrequentie</Styled.Key>
          <Styled.Value>{frequency}</Styled.Value>
        </Styled.Row>
        <Styled.Row>
          <Styled.Key>Doel</Styled.Key>
          <Styled.Value>{purpose}</Styled.Value>
        </Styled.Row>
        <Styled.Row>
          <Styled.Key>Contactpersoon</Styled.Key>
          <Styled.Value><a href={`mailto:${contactMail}`}>{contactName}</a></Styled.Value>
        </Styled.Row>
        <Styled.Row>
          <Styled.Key>Tabellen</Styled.Key>
          {resourceLinks}
        </Styled.Row>
      </Styled.MetaData>
    </>
  )
}

export async function getStaticPaths() {
  const datasets = await fetchAPI('/datasets?_limit=-1')

  return {
    paths: datasets.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const datasets = await fetchAPI(
    `/datasets?slug=${params.slug}`,
  )

  return {
    props: { ...datasets[0] },
    revalidate: 1,
  }
}

export default Dataset
