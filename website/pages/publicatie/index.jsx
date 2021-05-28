import React from 'react'
import Link from 'next/link'
import { Heading } from '@amsterdam/asc-ui'

import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import { fetchAPI } from '../../lib/utils'

const Publications = ({ publications }) => {
  const items = publications.map((item) => <li key={item.slug}><Link href={`/publicatie/${item.slug}`}>{item.title}</Link></li>)

  return (
    <Layout>
      <Seo />
      <Heading forwardedAs="h2">Publicaties</Heading>
      <ul>
        {items}
      </ul>
    </Layout>
  )
}

export async function getStaticProps() {
  const publications = await fetchAPI('/publications')

  return {
    props: { publications },
    revalidate: 1,
  }
}

export default Publications
