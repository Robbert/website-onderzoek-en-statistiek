import {
  apolloClient,
  getStrapiMedia,
} from '../lib/utils'
import Seo from '../components/Seo'
import HeroSection from '../components/HeroSection'
import FeatureSection from '../components/HomePage/FeatureSection'
import ThemeSection from '../components/HomePage/ThemeSection'
import CollectionSection from '../components/HomePage/CollectionSection'
import QUERY from './homepage.query.gql'

const Home = ({ themes, homepage }) => {
  if (!themes) return <div>Refresh page</div>

  const {
    seo, heroImage, incoming, features, collections,
  } = homepage
  const { metaTitle, metaDescription, shareImage } = seo

  return (
    <>
      <Seo
        title={metaTitle}
        description={metaDescription}
        image={getStrapiMedia(shareImage)}
      />
      <HeroSection
        image={heroImage}
        incoming={incoming}
      />
      <FeatureSection
        features={features}
      />
      <ThemeSection
        themes={themes}
      />
      <CollectionSection
        collections={collections}
      />
    </>
  )
}

export async function getStaticProps() {
  try {
    const { data } = await apolloClient.query({ query: QUERY })
    return {
      props: data,
      revalidate: 1,
    }
  } catch (error) {
    // TODO: log this error in sentry
    return {
      props: { },
      revalidate: 1,
    }
  }
}

export default Home
