import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Heading, Paragraph, Card, CardContent, CardMedia,
} from '@amsterdam/asc-ui'

import Seo from '../../components/Seo'
import { fetchAPI, getStrapiMedia } from '../../lib/utils'
import styles from './article.module.css'

const Articles = ({ articles }) => {
  const cards = articles.map(({
    slug, title, teaser, teaserImage,
  }) => (
    <Link key={slug} href={`/artikel/${slug}`}>
      <a className={styles.card}>
        <Card horizontal>
          <CardMedia maxWidth={144}>
            { teaserImage && <Image src={getStrapiMedia(teaserImage)} width={144} height={144} /> }
          </CardMedia>
          <CardContent>
            <Heading as="h4">{title}</Heading>
            <Paragraph>{teaser}</Paragraph>
          </CardContent>
        </Card>
      </a>
    </Link>
  ))

  return (
    <>
      <Seo />
      <Heading forwardedAs="h2">Artikelen</Heading>
      {cards}
    </>
  )
}

export async function getStaticProps() {
  const articles = await fetchAPI('/articles?_sort=publicationDate:DESC')

  return {
    props: { articles },
    revalidate: 1,
  }
}

export default Articles
