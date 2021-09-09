import { useRouter } from 'next/router'
import { Paragraph, Spinner } from '@amsterdam/asc-ui'

import Seo from '../../components/Seo/Seo'
import {
  apolloClient, fetchAPI, getStrapiMedia, flattenFeatureList,
} from '../../lib/utils'
import HeroSection from '../../components/HeroSection/HeroSection'
import PageSection from '../../components/PageSection/PageSection'
import CardList from '../../components/CardList/CardList'
import ListSection from '../../components/ListSection/ListSection'
import QUERY from './collection.query.gql'

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
      <HeroSection image={coverImage} title={`Dossier ${title}`}>
        <Paragraph>{intro}</Paragraph>
      </HeroSection>
      <PageSection title="Uitgelicht">
        <CardList
          columns={3}
          items={flattenFeatureList(features)}
          hasTeaser={false}
          ratio={16 / 9}
          backgroundColor="level2"
          shadow
        />
      </PageSection>
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
