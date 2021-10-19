import { apolloClient, flattenFeatureList } from '../lib/utils'
import Seo from '../components/Seo/Seo'
import Heading from '../components/Heading/Heading'
import { Grid, GridItem } from '../components/Grid/Grid.style'
import LinkList from '../components/LinkList/LinkList'
import QUERY from './homepage.query.gql'
import Card from '../components/Card/Card'
import CardList from '../components/CardList/CardList'
import * as Styled from './homepage.style'

const Home = ({ themes, homepage }) => {
  if (!themes) return <div>Refresh page</div>

  const {
    largeFirstFeature, featured, agenda, shortcuts, relatedSites,
  } = homepage

  const flatFeatures = flattenFeatureList(featured)

  return (
    <>
      <Seo />
      <Grid>
        <GridItem colRange={{ small: 4, large: 12 }}>
          <Heading gutterBottom={40}>Onderzoek en Statistiek</Heading>
        </GridItem>
        <GridItem colRange={{ small: 2, large: 4 }} rowRange={6}>
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

        {largeFirstFeature
        && (
          <GridItem colRange={{ small: 4, large: 8 }}>
            <Card
              href={flatFeatures[0].path}
              image={flatFeatures[0].coverImage}
              // eslint-disable-next-line no-underscore-dangle
              type={flatFeatures[0].__typename}
              title={flatFeatures[0].shortTitle || flatFeatures[0].title}
              teaser={flatFeatures[0].teaser}
              large
            />
          </GridItem>
        )}

        {largeFirstFeature
        && (
          <GridItem colRange={{ small: 4, large: 8 }}>
            <Heading styleAs="h3" gutterBottom={32}>Uitgelicht</Heading>
          </GridItem>
        )}
        <CardList>
          {flatFeatures.slice(largeFirstFeature ? 1 : 0).map(
            ({
              path, title, shortTitle, teaser, teaserImage, __typename,
            }, index) => (
              <li css="display: contents;" key={path}>
                <Styled.GridItem colRange={{ small: 4, large: 4 }} index={index}>
                  <Card
                    href={path}
                    image={teaserImage}
                    type={__typename}
                    title={shortTitle || title}
                    teaser={teaser}
                    clickableImage
                  />
                </Styled.GridItem>
              </li>
            ),
          )}
        </CardList>
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
