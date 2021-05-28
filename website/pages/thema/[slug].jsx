import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { Heading } from '@amsterdam/asc-ui'

import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import { fetchAPI, flattenFeatureList } from '../../lib/utils'

const Theme = ({ theme }) => {
  const seo = {
    metaTitle: theme.name,
    metaDescription: theme.teaser,
  }

  const featurelist = flattenFeatureList(theme.features).map((item) => (
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

  return (
    <Layout>
      <Seo seo={seo} />

      <Heading>
        Thema
        {' '}
        {theme.title}
      </Heading>
      <ReactMarkdown source={theme.intro} escapeHtml={false} />

      <Heading forwardedAs="h3">Uitgelicht</Heading>
      <ul>{featurelist}</ul>

    </Layout>
  )
}

export async function getStaticPaths() {
  const themes = await fetchAPI('/themes')

  return {
    paths: themes.map((theme) => ({
      params: {
        slug: theme.slug,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const themes = await fetchAPI(
    `/themes?slug=${params.slug}`,
  )

  return {
    props: { theme: themes[0] },
    revalidate: 1,
  }
}

export default Theme
