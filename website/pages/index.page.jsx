import { apolloClient, flattenFeatureList } from '../lib/utils'
import Seo from '../components/Seo/Seo'
import Heading from '../components/Heading/Heading'
import { Grid, GridItem } from '../components/Grid/Grid.style'
import LinkList from '../components/LinkList/LinkList'
import CardList from '../components/CardList/CardList'
import QUERY from './homepage.query.gql'

const Home = ({ themes, homepage }) => {
  if (!themes) return <div>Refresh page</div>

  const {
    featured, featuredCollections, agenda, shortcuts, relatedSites,
  } = homepage

  return (
    <>
      <Seo />
      <Grid>
        <GridItem colRange={{ small: 4, large: 12 }}>
          <Heading gutterBottom={40}>Onderzoek en Statistiek</Heading>
        </GridItem>
        <GridItem colRange={{ small: 2, large: 4 }}>
          <Heading as="h6">Thema&apos;s</Heading>
          <LinkList
            gutterBottom={40}
            links={
              themes
                .slice() // strict mode freezes arrays, so we need to make a copy to be able to sort
                .sort((a, b) => a.title.localeCompare(b.title))
                .map(({ title, slug }) => ({ title, path: `/thema/${slug}` }))
            }
          />

          <Heading as="h6">Agenda</Heading>
          <LinkList
            gutterBottom={40}
            links={flattenFeatureList(agenda)}
          />

          <Heading as="h6">Snel naar</Heading>
          <LinkList
            gutterBottom={40}
            links={flattenFeatureList(shortcuts)}
          />

          <Heading as="h6">Meer feiten en cijfers</Heading>
          <LinkList
            gutterBottom={40}
            links={relatedSites}
          />
        </GridItem>

        <GridItem colStart={{ small: 1, large: 5 }} colRange={{ small: 4, large: 8 }}>

          <CardList
            columns={2}
            items={flattenFeatureList(featured)}
          />

        </GridItem>

        <GridItem colStart={1} colRange={{ small: 4, large: 12 }}>
          <CardList
            columns={3}
            items={flattenFeatureList(featuredCollections)}
            imageSize={80}
            hasBorder
            hasTeaser={false}
            horizontal
          />
        </GridItem>

      </Grid>

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
