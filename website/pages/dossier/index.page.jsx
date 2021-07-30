import React from 'react'
import Link from 'next/link'
import { Heading } from '@amsterdam/asc-ui'

import Seo from '../../components/Seo'
import ContentContainer from '../../components/ContentContainer'
import { apolloClient } from '../../lib/utils'
import QUERY from './collectionList.query.gql'

const Collections = ({ collections }) => {
  const items = collections.map((item) => <li key={item.slug}><Link href={`/dossier/${item.slug}`}>{item.title}</Link></li>)

  return (
    <ContentContainer>
      <Seo />
      <Heading forwardedAs="h2">Dossiers</Heading>
      <ul>
        {items}
      </ul>
    </ContentContainer>
  )
}

export async function getStaticProps() {
  const { data } = await apolloClient.query({ query: QUERY })
    .catch() // TODO: log this error in sentry

  return {
    props: data,
    revalidate: 1,
  }
}

export default Collections
