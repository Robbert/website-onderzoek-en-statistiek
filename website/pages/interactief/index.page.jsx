import React from 'react'
import Link from 'next/link'
import {
  Heading, Paragraph, Card, CardContent, CardMedia,
} from '@amsterdam/asc-ui'

import Seo from '../../components/Seo'
import ContentContainer from '../../components/ContentContainer'
import { fetchAPI } from '../../lib/utils'

const Interactives = ({ interactives }) => {
  const cards = interactives.map((item) => (
    <Link key={item.slug} href={`/interactief/${item.slug}`}>
      <a>
        <Card horizontal>
          <CardMedia maxWidth={144} />
          <CardContent>
            <Heading as="h4">{item.title}</Heading>
            <Paragraph>{item.teaser}</Paragraph>
          </CardContent>
        </Card>
      </a>
    </Link>
  ))

  return (
    <ContentContainer>
      <Seo />
      <Heading forwardedAs="h2">Interactief</Heading>
      {cards}
    </ContentContainer>
  )
}

export async function getStaticProps() {
  const interactives = await fetchAPI('/interactives')

  return {
    props: { interactives },
    revalidate: 1,
  }
}

export default Interactives
