import React from 'react'
import Link from 'next/link'
import { Heading } from '@amsterdam/asc-ui'

import Seo from '../../components/Seo'
import ContentContainer from '../../components/ContentContainer'
import { apolloClient } from '../../lib/utils'
import QUERY from './themeList.query.gql'

const Themes = ({ themes }) => {
  const items = themes.map((item) => <li key={item.slug}><Link href={`/thema/${item.slug}`}>{item.title}</Link></li>)

  return (
    <ContentContainer>
      <Seo />
      <Heading forwardedAs="h2">Thema‘s</Heading>
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

export default Themes
