import React from 'react'
import Link from 'next/link'
import { Heading } from '@amsterdam/asc-ui'

import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import { fetchAPI } from '../../lib/utils'

const Videos = ({ videos }) => {
  const items = videos.map((item) => (
    <li key={item.slug}>
      <Link href={`/video/${item.slug}`}>
        {item.title}
      </Link>
    </li>
  ))

  return (
    <Layout>
      <Seo />
      <Heading forwardedAs="h2">Video</Heading>
      {items}
    </Layout>
  )
}

export async function getStaticProps() {
  const videos = await fetchAPI('/videos')

  return {
    props: { videos },
    revalidate: 1,
  }
}

export default Videos
