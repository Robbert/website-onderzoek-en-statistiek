import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heading, Paragraph } from '@amsterdam/asc-ui'

import Seo from '../../components/Seo'
import ContentContainer from '../../components/ContentContainer'
import {
  getStrapiMedia, PLACEHOLDER_IMAGE, apolloClient,
} from '../../lib/utils'
import QUERY from './articleList.query.gql'
import * as Styled from './article.style'

const Articles = ({ articles }) => {
  const cards = articles.map(({
    slug, title, teaser, teaserImage,
  }) => (
    <Link key={slug} href={`/artikel/${slug}`} passHref>
      <Styled.Anchor>
        <Styled.ArticleCard horizontal>
          <Styled.Media maxWidth={144}>
            <Image
              src={teaserImage ? getStrapiMedia(teaserImage) : PLACEHOLDER_IMAGE}
              alt=""
              width={144}
              height={144}
              placeholder="blur"
              blurDataURL={PLACEHOLDER_IMAGE}
            />
          </Styled.Media>
          <Styled.Content>
            <Heading as="h4">{title}</Heading>
            <Paragraph>{teaser}</Paragraph>
          </Styled.Content>
        </Styled.ArticleCard>
      </Styled.Anchor>
    </Link>
  ))

  return (
    <ContentContainer>
      <Seo />
      <Heading forwardedAs="h2">Artikelen</Heading>
      {cards}
    </ContentContainer>
  )
}

export async function getStaticProps() {
  const { data } = await apolloClient.query(
    { query: QUERY },
  ).catch() // TODO: log this error in sentry

  return {
    props: data,
    revalidate: 1,
  }
}

export default Articles
