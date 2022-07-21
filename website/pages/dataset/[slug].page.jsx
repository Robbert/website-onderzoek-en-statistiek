import { useRouter } from 'next/router'
import qs from 'qs'

import FallbackPage from '~/components/FallbackPage/FallbackPage'
import Seo from '~/components/Seo/Seo'
import { Grid, GridItem } from '~/components/Grid/Grid.style'
import Heading from '~/components/Heading/Heading'
import Link from '~/components/Link/Link'
import BodyContent from '~/components/BodyContent/BodyContent'
import ContentFooter from '~/components/ContentFooter/ContentFooter'
import {
  fetchAPI,
  getStrapiMedia,
  formatDate,
  formatBytes,
  mapOrder,
} from '~/lib/utils'
import datasetQuery from './dataset.query'
import * as Styled from './dataset.style'

const Dataset = ({
  title,
  teaser,
  body,
  contactName,
  contactMail,
  purpose,
  publishedAt: published,
  updatedAt: updated,
  frequency,
  resources,
  squareImage,
  rectangularImage,
  themes,
}) => {
  const router = useRouter()
  if (router.isFallback) {
    return <FallbackPage />
  }

  const order = ['documentatie', 'databestand', 'api', 'visualisatie']
  const orderedResources = mapOrder(resources, order, 'type')

  return (
    <>
      <Seo
        title={`Dataset: ${title}`}
        description={
          teaser ||
          body.reduce((allText, bodyItem) => allText + bodyItem.text, '')
        }
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
          gutterBottom={{ small: 40, large: 80 }}
        >
          <Styled.Heading
            forwardedAs="h2"
            gutterBottom={{ small: 20, large: 40 }}
          >
            Bronnen
          </Styled.Heading>
          <Styled.Table as="table">
            <thead>
              <tr>
                <th>Omschrijving</th>
                <th>Categorie</th>
                <td />
              </tr>
            </thead>
            <tbody>
              {orderedResources.map(
                ({ id, title: resourceTitle, file, url, type }) => (
                  <tr key={id}>
                    <td>
                      {file ? (
                        resourceTitle
                      ) : (
                        <Link href={url} variant="inline">
                          {resourceTitle}
                        </Link>
                      )}
                    </td>
                    <td>{type}</td>
                    {file ? (
                      <td>
                        <Styled.DownloadButton
                          url={getStrapiMedia(file)}
                          variant="textButton"
                          type={type}
                          small
                        >
                          {`Download ${
                            file && file.ext.slice(1).toUpperCase()
                          } ${
                            file?.size && `(${formatBytes(file.size * 1000)})`
                          }`}
                        </Styled.DownloadButton>
                      </td>
                    ) : (
                      <td />
                    )}
                  </tr>
                ),
              )}
            </tbody>
          </Styled.Table>
        </GridItem>

        <GridItem
          colStart={{ small: 1, large: 2 }}
          colRange={{ small: 4, large: 10 }}
          gutterBottom={{ small: 40, large: 80 }}
        >
          <Heading as="h2" gutterBottom={{ small: 20, large: 40 }}>
            Beschrijving
          </Heading>
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
                <Link href={`mailto:${contactMail}`} variant="inline">
                  {contactName}
                </Link>
              </Styled.Details>
            </Styled.Row>
          </Styled.DefinitionList>
        </GridItem>

        <GridItem
          colStart={{ small: 1, large: 2 }}
          colRange={{ small: 4, large: 10 }}
        >
          <ContentFooter type="dataset" themes={themes} />
        </GridItem>
      </Grid>
    </>
  )
}

export async function getStaticPaths() {
  const datasets = await fetchAPI('/api/datasets?fields=id').then(
    (metaResult) =>
      fetchAPI(
        `/api/datasets?fields=slug&pagination[pageSize]=${metaResult.meta.pagination.total}`,
      ),
  )

  return {
    paths: datasets.data.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const data = await fetchAPI(
    `/api/datasets?${qs.stringify(
      {
        filters: { slug: { $eq: params.slug } },
        ...datasetQuery,
      },
      {
        encodeValuesOnly: true,
      },
    )}`,
  )

  if (!data.data[0]) {
    return {
      notFound: true,
      revalidate: 1,
    }
  }

  return {
    props: data.data[0],
    revalidate: 1,
  }
}

export default Dataset
