import {
  apolloClient,
  getStrapiMedia,
} from '../lib/utils'
import Seo from '../components/Seo'
import HeroSection from '../components/HomePage/HeroSection'
import FeatureSection from '../components/HomePage/FeatureSection'
import ThemeSection from '../components/HomePage/ThemeSection'
import CollectionSection from '../components/HomePage/CollectionSection'
import QUERY from './homepageQuery.gql'

const Home = ({ themes, homepage }) => {
  const { metaTitle, metaDescription, shareImage } = homepage.seo

  return (
    <>
      <Seo
        title={metaTitle}
        description={metaDescription}
        image={getStrapiMedia(shareImage)}
      />
      <HeroSection
        image={homepage.heroImage}
        features={homepage.firstFeatures}
      />
      <FeatureSection
        features={homepage.secondFeatures}
      />
      <ThemeSection
        themes={themes}
      />
      <CollectionSection
        collections={homepage.collections}
      />
    </>
  )
}

export async function getStaticProps() {
  const { data } = await apolloClient.query({ query: QUERY })
    .catch() // TODO: log this error in sentry

  return {
    props: { homepage: data.homepage, themes: data.themes },
    revalidate: 1,
  }
}

export default Home
