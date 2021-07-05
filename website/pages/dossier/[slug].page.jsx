import Link from 'next/link'
import { useRouter } from 'next/router'
import ReactMarkdown from 'react-markdown'
import { Heading, Spinner } from '@amsterdam/asc-ui'

import Seo from '../../components/Seo'
import { fetchAPI, flattenFeatureList } from '../../lib/utils'

const Collection = ({ collection }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div><Spinner /></div>
  }

  const seo = {
    metaTitle: collection.title,
    metaDescription: collection.teaser,
  }

  const featurelist = flattenFeatureList(collection.features).map((item) => (
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
    <>
      <Seo seo={seo} />
      <Heading>
        Dossier
        {' '}
        {collection.title}
      </Heading>
      <ReactMarkdown source={collection.intro} escapeHtml={false} />
      <Heading forwardedAs="h3">Uitgelicht</Heading>
      <ul>{featurelist}</ul>
    </>
  )
}

export async function getStaticPaths() {
  const collections = await fetchAPI('/collections')

  return {
    paths: collections.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const collections = await fetchAPI(
    `/collections?slug=${params.slug}`,
  )

  return {
    props: { collection: collections[0] },
    revalidate: 1,
  }
}

export default Collection
