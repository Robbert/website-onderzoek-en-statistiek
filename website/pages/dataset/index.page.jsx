import Link from 'next/link'
import { Heading, List, ListItem } from '@amsterdam/asc-ui'

import Seo from '../../components/Seo/Seo'
import ContentContainer from '../../components/ContentContainer/ContentContainer'
import { apolloClient } from '../../lib/utils'
import QUERY from './datasetList.query.gql'
import * as Styled from './dataset.style'

const Datasets = ({ themes }) => (
  <ContentContainer>
    <Seo />
    <Heading forwardedAs="h2">Datasets per thema</Heading>
    {themes.map((theme) => (
      <Styled.Harmonica title={theme.title} key={theme.slug}>
        <List variant="bullet">
          {theme.datasets.map(({ slug, title, contactName }) => (
            <ListItem key={slug}>
              <Link href={`/dataset/${slug}`}>{`${title} (${contactName})`}</Link>
            </ListItem>
          ))}
        </List>
      </Styled.Harmonica>
    ))}
  </ContentContainer>
)

export async function getStaticProps() {
  const { data } = await apolloClient.query({ query: QUERY })
    .catch() // TODO: log this error in sentry

  return {
    props: data,
    revalidate: 1,
  }
}

export default Datasets
