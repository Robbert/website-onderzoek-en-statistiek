import React from 'react'
import Link from 'next/link'
import { Heading } from '@amsterdam/asc-ui'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import { fetchAPI, flattenFeatureList } from '../lib/utils'

const Home = ({ themes, homepage }) => {
  const featurelist = flattenFeatureList(homepage.features).map((item) => (
    <li key={`feature-${item.slug}`}>
      <Link key={item.slug} href={item.path}>
        <a>
          {item.name}
          :
          {' '}
          {item.title}
        </a>
      </Link>
    </li>
  ))

  const themelist = themes.map((item) => (
    <li key={`theme-${item.slug}`}>
      <Link href={`/thema/${item.slug}`}>
        <a>{item.title}</a>
      </Link>
    </li>
  ))

  return (
    <Layout>
      <Seo seo={homepage.seo} />
      <Heading forwardedAs="h2">Voorpagina</Heading>
      <Heading forwardedAs="h3">Uitgelicht</Heading>
      <ul>{featurelist}</ul>
      <Heading forwardedAs="h3">Thema‘s</Heading>
      <ul>{themelist}</ul>
    </Layout>
  )
}

export async function getStaticProps() {
  const [themes, homepage] = await Promise.all([
    fetchAPI('/themes'),
    fetchAPI('/homepage'),
  ])

  return {
    props: { themes, homepage },
    revalidate: 1,
  }
}

export default Home
