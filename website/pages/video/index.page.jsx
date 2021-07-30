import React from 'react'
import Link from 'next/link'
import { Heading } from '@amsterdam/asc-ui'

import Seo from '../../components/Seo'
import ContentContainer from '../../components/ContentContainer'
import { apolloClient } from '../../lib/utils'
import QUERY from './videoList.query.gql'

const Videos = ({ videos }) => {
  const items = videos.map((item) => (
    <li key={item.slug}>
      <Link href={`/video/${item.slug}`}>
        {item.title}
      </Link>
    </li>
  ))

  return (
    <ContentContainer>
      <Seo />
      <Heading forwardedAs="h2">Video</Heading>
      {items}
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

export default Videos
