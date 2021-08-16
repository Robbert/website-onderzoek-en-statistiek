import { Heading } from '@amsterdam/asc-ui'

import Seo from '../../components/Seo'
import ContentContainer from '../../components/ContentContainer'
import ContentList from '../../components/ContentList'
import { apolloClient } from '../../lib/utils'
import QUERY from './publicationList.query.gql'

const Publications = ({ publications }) => (
  <ContentContainer>
    <Seo />
    <Heading forwardedAs="h2">Publicaties</Heading>
    <ContentList items={publications} />
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

export default Publications
