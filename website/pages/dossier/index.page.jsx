import React from 'react'
import { Heading } from '@amsterdam/asc-ui'

import Seo from '../../components/Seo/Seo'
import Container from '../../components/Container/Container'
import CardList from '../../components/CardList/CardList'
import { apolloClient } from '../../lib/utils'
import QUERY from './collectionList.query.gql'

const Collections = ({ collections }) => (
  <Container>
    <Seo />
    <Heading forwardedAs="h2">Dossiers</Heading>
    <CardList
      items={collections}
      hasIcon={false}
      imageSize={144}
      horizontal
    />
  </Container>
)

export async function getStaticProps() {
  const { data } = await apolloClient.query({ query: QUERY })
    .catch() // TODO: log this error in sentry

  return {
    props: data,
    revalidate: 1,
  }
}

export default Collections
