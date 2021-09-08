import { Heading } from '@amsterdam/asc-ui'

import Seo from '../../components/Seo/Seo'
import ContentContainer from '../../components/ContentContainer/ContentContainer'
import CardList from '../../components/CardList/CardList'
import { apolloClient } from '../../lib/utils'
import QUERY from './videoList.query.gql'

const Videos = ({ videos }) => (
  <ContentContainer>
    <Seo />
    <Heading forwardedAs="h2">Video</Heading>
    <CardList
      items={videos}
      hasIcon={false}
      imageSize={144}
      horizontal
    />
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

export default Videos
