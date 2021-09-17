import ReactMarkdown from 'react-markdown'
import { useRouter } from 'next/router'
import { Heading, Spinner } from '@amsterdam/asc-ui'

import Seo from '../../components/Seo/Seo'
import Container from '../../components/Container/Container'
import {
  fetchAPI, getStrapiMedia, apolloClient, formatDate,
} from '../../lib/utils'
import QUERY from './dataset.query.gql'
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

  const resourceLinks = resources.map(({ id, title: resourceTitle, file }) => (
    <Styled.Value key={id}>
      <a href={getStrapiMedia(file)}>
        {`${file.ext.substring(1)}: ${resourceTitle}`}
      </a>
    </Styled.Value>
  ))

  return (
    <Container>
      <Seo
        title={`Dataset: ${title}`}
        description={description}
        article
      />
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
            {formatDate(published)}
          </Styled.Value>
        </Styled.Row>
        <Styled.Row>
          <Styled.Key>Wijzigingsdatum</Styled.Key>
          <Styled.Value>
            {formatDate(updated)}
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
    </Container>
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
  const { data } = await apolloClient.query(
    {
      query: QUERY,
      variables: { slug: params.slug },
    },
  )
    .catch() // TODO: log this error in sentry

  return {
    props: data.datasets[0],
    revalidate: 1,
  }
}

export default Dataset
