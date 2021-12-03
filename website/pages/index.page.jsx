import { ChevronRight, ExternalLink } from '@amsterdam/asc-assets'

import { apolloClient, normalizeItemList } from '../lib/utils'
import Seo from '../components/Seo/Seo'
import { Grid, GridItem } from '../components/Grid/Grid.style'
import Heading from '../components/Heading/Heading'
import List from '../components/List/List'
import QUERY from './homepage.query.gql'
import CardList from '../components/CardList/CardList'
import Card from '../components/Card/Card'
import SearchCard from '../components/SearchCard/SearchCard'
import Link from '../components/Link/Link'
import * as Styled from './homepage.style'

const Home = ({ themes, homepage }) => {
  if (!themes) return <div>Refresh page</div>

  const {
    largeFirstFeature, featured, agenda, shortcuts, relatedSites, featuredCollections,
  } = homepage

  const flatFeatures = normalizeItemList(featured)

  const agendaList = agenda.length > 0 && (
    <>
      <Heading as="h2" styleAs="h5" gutterBottom={12}>Agenda</Heading>
      <List gutterBottom={56}>
        {normalizeItemList(agenda).map(({ path, title, shortTitle }) => (
          <Styled.ListItem key={path}>
            <Link href={path} variant="inList">
              <Styled.Icon size={14}>
                <ChevronRight />
              </Styled.Icon>
              {shortTitle || title}
            </Link>
          </Styled.ListItem>
        ))}
      </List>
    </>
  )

  const relatedSiteList = relatedSites.length > 0 && (
    <>
      <Heading as="h2" styleAs="h5" gutterBottom={12}>Meer feiten en cijfers</Heading>
      <List>
        {relatedSites.map(({ path, title }) => (
          <Styled.ListItem key={path}>
            <Link href={path} variant="inList" external>
              <Styled.Icon size={16}>
                <ExternalLink />
              </Styled.Icon>
              {title}
            </Link>
          </Styled.ListItem>
        ))}
      </List>
    </>
  )

  return (
    <>
      <Seo />
      <Grid>
        <Styled.TitleGridItem colRange={{ small: 4, large: 12 }}>
          <Heading
            id="homePageTitle"
            gutterBottom={{ small: 32, large: 64 }}
          >
            Onderzoek en Statistiek
          </Heading>
        </Styled.TitleGridItem>
        <Styled.SideBarGridItem
          colRange={{ small: 4, large: 3 }}
          rowRange={6}
        >
          <Heading as="h2" styleAs="h5" gutterBottom={12}>Thema‘s</Heading>
          <List gutterBottom={56}>
            {themes
              .slice() // strict mode freezes arrays, so we need to make a copy to be able to sort
              .sort((a, b) => a.title.localeCompare(b.title))
              .map(({ title, slug }) => (
                <Styled.ListItem key={slug}>
                  <Link
                    href={`/thema/${slug}`}
                    variant="inList"
                    className="analytics-homepage-theme-link"
                  >
                    <Styled.Icon size={14}>
                      <ChevronRight />
                    </Styled.Icon>
                    {title}
                  </Link>
                </Styled.ListItem>
              ))}
          </List>
          {agendaList}
          {shortcuts.length > 0 && (
            <>
              <Heading as="h2" styleAs="h5" gutterBottom={12}>Snel naar</Heading>
              <List gutterBottom={56}>
                {normalizeItemList(shortcuts).map(({ path, title, shortTitle }) => (
                  <Styled.ListItem key={path}>
                    <Link
                      href={path}
                      variant="inList"
                      className="analytics-homepage-shortcut-link"
                    >
                      <Styled.Icon size={14}>
                        <ChevronRight />
                      </Styled.Icon>
                      {shortTitle || title}
                    </Link>
                  </Styled.ListItem>
                ))}
              </List>
            </>
          )}
          {relatedSiteList}
        </Styled.SideBarGridItem>

        {flatFeatures.length > 0 && largeFirstFeature
          && (
            <GridItem colRange={{ small: 4, large: 8 }} colStart={{ small: 1, large: 5 }}>
              <Card
                href={flatFeatures[0].path}
                image={flatFeatures[0].rectangularImage}
                type={flatFeatures[0].type}
                title={flatFeatures[0].shortTitle || flatFeatures[0].title}
                teaser={flatFeatures[0].teaser}
                headingLevel="h2"
                large
              />
            </GridItem>
          )}

        {largeFirstFeature && (
          <GridItem colRange={{ small: 4, large: 8 }} colStart={{ small: 1, large: 5 }}>
            <Styled.HighlightHeading
              forwardedAs="h2"
              styleAs="h3"
              gutterBottom={{ small: 24, large: 32 }}
            >
              Uitgelicht
            </Styled.HighlightHeading>
          </GridItem>
        )}
        <GridItem
          colRange={{ small: 4, large: 8 }}
          colStart={{ small: 1, large: 5 }}
        >
          <Styled.FeatureList>
            {flatFeatures.slice(largeFirstFeature ? 1 : 0).map(
              ({
                path, title, shortTitle, teaser, squareImage, rectangularImage, type,
              }) => (
                <Styled.FeatureListItem
                  key={path}
                  listLength={flatFeatures.slice(largeFirstFeature ? 1 : 0).length}
                >
                  <Card
                    href={path}
                    image={squareImage}
                    mobileImage={rectangularImage}
                    type={type}
                    title={shortTitle || title}
                    teaser={teaser}
                    headingLevel="h3"
                    clickableImage
                  />
                </Styled.FeatureListItem>
              ),
            )}
          </Styled.FeatureList>
        </GridItem>
      </Grid>

      {featuredCollections.length > 0 && (
        <Grid>
          <GridItem colRange={{ small: 4, large: 12 }}>
            <Heading gutterBottom={40} as="h2">Dossiers</Heading>
          </GridItem>
          <CardList>
            {normalizeItemList(featuredCollections).map(
              ({
                path,
                title: featureTitle,
                shortTitle: featureShortTitle,
                teaser: featureTeaser,
              }) => (
                <Styled.CollectionListItem key={path}>
                  <GridItem colRange={{ small: 4, large: 4 }}>
                    <SearchCard
                      href={path}
                      title={featureShortTitle || featureTitle}
                      teaser={featureTeaser}
                      small
                    />
                  </GridItem>
                </Styled.CollectionListItem>
              ),
            )}
          </CardList>
          <GridItem colRange={{ small: 4, large: 12 }}>
            <Link variant="standalone" href="/zoek?categorie=dossier" gutterBottom={40}>Bekijk alle dossiers</Link>
          </GridItem>
        </Grid>
      )}

      <Styled.MobileOnlyGrid verticalPadding={0}>
        <GridItem colRange={4}>{agendaList}</GridItem>
        <GridItem colRange={4}>{relatedSiteList}</GridItem>
      </Styled.MobileOnlyGrid>
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
