import {
  apolloClient,
  getStrapiMedia,
  flattenFeatureObject,
} from '../lib/utils'
import Seo from '../components/Seo/Seo'
import HeroSection from '../components/HeroSection/HeroSection'
import PageSection from '../components/PageSection/PageSection'
import LinkList from '../components/LinkList/LinkList'
import CardList from '../components/CardList/CardList'
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

      <HeroSection image={heroImage} title="Actueel" offSet>
        <LinkList links={flattenFeatureObject(incoming)} darkBackground />
      </HeroSection>

      <PageSection title="Uitgelicht">
        <CardList
          columns={4}
          items={flattenFeatureObject(features)}
          hasTeaser={false}
          ratio={16 / 9}
          backgroundColor="level2"
          shadow
        />
      </PageSection>

      <PageSection title="Thema's">
        <LinkList
          columns={4}
          gutterBottom={40}
          links={
            themes
              .slice() // strict mode freezes arrays, so we need to make a copy to be able to sort
              .sort((a, b) => a.title.localeCompare(b.title))
              .map(({ title, slug }) => ({ title, path: `thema/${slug}` }))
          }
        />
      </PageSection>

      <PageSection title="Dossiers">
        <CardList
          columns={3}
          items={flattenFeatureObject(collections)}
          hasTeaser={false}
          imageSize={80}
          hasBorder
          horizontal
        />
      </PageSection>

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
