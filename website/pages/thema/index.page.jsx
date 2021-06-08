import React from 'react'
import Link from 'next/link'
import { Heading } from '@amsterdam/asc-ui'

import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import { fetchAPI } from '../../lib/utils'

const Themes = ({ themes }) => {
  const items = themes.map((item) => <li key={item.slug}><Link href={`/thema/${item.slug}`}>{item.title}</Link></li>)

  return (
    <Layout>
      <Seo />
      <Heading forwardedAs="h2">Thema‘s</Heading>
      <ul>
        {items}
      </ul>
    </Layout>
  )
}

export async function getStaticProps() {
  const themes = await fetchAPI('/themes')

  return {
    props: { themes },
    revalidate: 1,
  }
}

export default Themes
