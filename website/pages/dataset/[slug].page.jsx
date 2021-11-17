import { ExternalLink } from '@amsterdam/asc-assets'

import Seo from '../../components/Seo/Seo'
import { Grid, GridItem } from '../../components/Grid/Grid.style'
import Heading from '../../components/Heading/Heading'
import Link from '../../components/Link/Link'
import BodyContent from '../../components/BodyContent/BodyContent'
import ThemeList from '../../components/ThemeList/ThemeList'
import {
  fetchAPI,
  getStrapiMedia,
  apolloClient,
  formatDate,
  formatBytes,
} from '../../lib/utils'
import QUERY from './dataset.query.gql'
import * as Styled from './dataset.style'

const Dataset = ({
  title,
  teaser,
  body,
  contactName,
  contactMail,
  purpose,
  published_at: published,
  updated_at: updated,
  frequency,
  resources,
  squareImage,
  rectangularImage,
  theme,
}) => (
  <>
    <Seo
      title={`Dataset: ${title}`}
      description={teaser}
      image={getStrapiMedia(rectangularImage || squareImage)}
      article
    />

    <Grid>
      <GridItem
        colStart={{ small: 1, large: 2 }}
        colRange={{ small: 4, large: 10 }}
      >
        <Heading gutterBottom={24}>{`Dataset ${title}`}</Heading>
      </GridItem>

      <BodyContent
        content={body}
        colStartText={{ small: 1, large: 2 }}
        colRangeText={{ small: 4, large: 10 }}
        colStartTextWithLink={{ small: 1, large: 2 }}
        colRangeTextWithLink={{ small: 4, large: 7 }}
      />

      <GridItem
        colStart={{ small: 1, large: 2 }}
        colRange={{ small: 4, large: 10 }}
      >
        <Styled.DefinitionList as="dl">
          <Styled.Row underline>
            <Styled.Term>Publicatiedatum</Styled.Term>
            <Styled.Details>{formatDate(published)}</Styled.Details>
          </Styled.Row>
          <Styled.Row underline>
            <Styled.Term>Wijzigingsdatum</Styled.Term>
            <Styled.Details>{formatDate(updated)}</Styled.Details>
          </Styled.Row>
          <Styled.Row underline>
            <Styled.Term>Wijzigingsfrequentie</Styled.Term>
            <Styled.Details>{frequency}</Styled.Details>
          </Styled.Row>
          <Styled.Row underline>
            <Styled.Term>Doel</Styled.Term>
            <Styled.Details>{purpose}</Styled.Details>
          </Styled.Row>
          <Styled.Row underline>
            <Styled.Term>Contactpersoon</Styled.Term>
            <Styled.Details>
              <Link href={`mailto:${contactMail}`} variant="inline">{contactName}</Link>
            </Styled.Details>
          </Styled.Row>
          <Styled.Row>
            <Styled.Term>Tabellen</Styled.Term>
            <Styled.Details>
              {resources.map(({
                id, title: resourceTitle, file, url, type,
              }) => (
                <Styled.Resource key={id}>
                  <Styled.ResourceTitle>{resourceTitle}</Styled.ResourceTitle>
                  { file
                    ? (
                      <Styled.DownloadButton
                        url={getStrapiMedia(file)}
                        variant="textButton"
                        small
                      >
                        {`Download ${file && file.ext.slice(1).toUpperCase()} ${file?.size && `(${formatBytes(file.size * 1000)})`}`}
                      </Styled.DownloadButton>
                    )
                    : (
                      <Styled.Link href={url} variant="inList" external>
                        <Styled.Icon size={20}><ExternalLink /></Styled.Icon>
                        {`Naar de ${type}`}
                      </Styled.Link>
                    )}
                </Styled.Resource>
              ))}
            </Styled.Details>
          </Styled.Row>
        </Styled.DefinitionList>
      </GridItem>

      <GridItem
        colStart={{ small: 1, large: 2 }}
        colRange={{ small: 4, large: 10 }}
        gutterBottom={{ small: 2, large: 120 }}
      >
        <ThemeList type="dataset" themes={theme} />
      </GridItem>
    </Grid>

  </>
)

export async function getStaticPaths() {
  const datasets = await fetchAPI('/datasets?_limit=-1')

  return {
    paths: datasets.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
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
