import { useRouter } from 'next/router'
import { Spinner } from '@amsterdam/asc-ui'

import Seo from '../../components/Seo'
import { apolloClient, fetchAPI, getStrapiMedia } from '../../lib/utils'
import HeroSection from '../../components/CollectionPage/HeroSection'
import FeatureSection from '../../components/CollectionPage/FeatureSection'
import ListSection from '../../components/CollectionPage/ListSection'
import QUERY from './collectionQuery.gql'

const Collection = ({
  title,
  shortTitle,
  teaser,
  teaserImage,
  coverImage,
  intro,
  lists,
  features,
}) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div><Spinner /></div>
  }

  return (
    <>
      <Seo
        title={`Dossier: ${shortTitle || title}`}
        description={teaser}
        image={getStrapiMedia(teaserImage)}
      />
      <HeroSection
        image={coverImage}
        title={`Dossier ${title}`}
        intro={intro}
      />
      <FeatureSection features={features} />
      <ListSection lists={lists} />
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
  const { data } = await apolloClient.query(
    {
      query: QUERY,
      variables: { slug: params.slug },
    },
  )
    .catch() // TODO: log this error in sentry

  return {
    props: data.collections[0],
    revalidate: 1,
  }
}

export default Collection
