import { useState } from 'react'
import { List } from '@amsterdam/asc-ui'
import { ExternalLink } from '@amsterdam/asc-assets'

import { apolloClient, flattenFeatureList } from '../lib/utils'
import Seo from '../components/Seo/Seo'
import { Grid, GridItem } from '../components/Grid/Grid.style'
import Heading from '../components/Heading/Heading'
import Button from '../components/Button/Button'
import LinkList from '../components/LinkList/LinkList'
import QUERY from './homepage.query.gql'
import CardList from '../components/CardList/CardList'
import Card from '../components/Card/Card'
import SearchCard from '../components/SearchCard/SearchCard'
import Link from '../components/Link/Link'
import * as Styled from './homepage.style'

const Home = ({ themes, homepage }) => {
  const [selected, setSelected] = useState('highlights')

  if (!themes) return <div>Refresh page</div>

  const {
    largeFirstFeature, featured, agenda, shortcuts, relatedSites, featuredCollections,
  } = homepage

  const flatFeatures = flattenFeatureList(featured)

  return (
    <>
      <Seo />
      <Grid>
        <GridItem colRange={{ small: 4, large: 12 }}>
          <Heading gutterBottom={{ small: 32, large: 64 }}>Onderzoek en Statistiek</Heading>
        </GridItem>
        <GridItem colRange={{ small: 4, large: 12 }}>
          <Styled.ToggleContainer>
            <Button
              value="highlights"
              selected={selected}
              onClick={(e) => setSelected(e.target.value)}
              variant={selected === 'highlights' ? '' : 'secondary'}
              small
            >
              Uitgelicht
            </Button>
            <Button
              value="shortcuts"
              selected={selected}
              onClick={(e) => setSelected(e.target.value)}
              variant={selected === 'shortcuts' ? '' : 'secondary'}
              small
            >
              Snel naar
            </Button>
          </Styled.ToggleContainer>
        </GridItem>
        <Styled.SideBarGridItem
          colRange={{ small: 4, large: 4 }}
          rowRange={6}
          show={selected === 'shortcuts'}
        >
          <Heading as="h2" styleAs="h5" gutterBottom={{ small: 12, large: 20 }}>Thema&apos;s</Heading>
          <LinkList
            gutterBottom={36}
            links={
              themes
                .slice() // strict mode freezes arrays, so we need to make a copy to be able to sort
                .sort((a, b) => a.title.localeCompare(b.title))
                .map(({ title, slug }) => ({ title, path: `/thema/${slug}` }))
            }
          />
          {agenda.length > 0
          && (
            <>
              <Heading as="h2" styleAs="h5" gutterBottom={20}>Agenda</Heading>
              <LinkList
                gutterBottom={40}
                links={flattenFeatureList(agenda)}
              />
            </>
          )}
          {shortcuts.length > 0
          && (
            <>
              <Heading as="h2" styleAs="h5" gutterBottom={20}>Snel naar</Heading>
              <LinkList
                gutterBottom={40}
                links={flattenFeatureList(shortcuts)}
              />
            </>
          )}
          {relatedSites.length > 0
          && (
            <>
              <Heading as="h2" styleAs="h5" gutterBottom={20}>Meer feiten en cijfers</Heading>
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
          )}
        </Styled.SideBarGridItem>

        {largeFirstFeature
          && (
            <Styled.HighLightGridItem
              colRange={{ small: 4, large: 8 }}
              show={selected === 'highlights'}
            >
              <Card
                href={flatFeatures[0].path}
                image={flatFeatures[0].coverImage}
                // eslint-disable-next-line no-underscore-dangle
                type={flatFeatures[0].__typename}
                title={flatFeatures[0].shortTitle || flatFeatures[0].title}
                teaser={flatFeatures[0].teaser}
                headingLevel="h2"
                large
              />
            </Styled.HighLightGridItem>
          )}

        {largeFirstFeature
          && (
            <Styled.HighLightGridItem
              colRange={{ small: 4, large: 8 }}
              show={selected === 'highlights'}
            >
              <Heading
                as="h2"
                styleAs="h3"
                gutterBottom={32}
              >
                Uitgelicht
              </Heading>
            </Styled.HighLightGridItem>
          )}
        <Styled.HighLightCardList show={selected === 'highlights'}>
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
                    headingLevel="h3"
                    clickableImage
                  />
                </Styled.GridItem>
              </li>
            ),
          )}
        </Styled.HighLightCardList>
      </Grid>

      <Styled.CollectionGrid show={selected === 'highlights'}>
        <GridItem colRange={{ small: 4, large: 12 }}>
          <Heading gutterBottom={{ small: 24, large: 60 }} as="h2">Dossiers</Heading>
        </GridItem>
        <CardList>
          {flattenFeatureList(featuredCollections).map(
            ({
              path,
              title: featureTitle,
              shortTitle: featureShortTitle,
              teaser: featureTeaser,
            }) => (
              <li key={path} css="display: contents;">
                <GridItem colRange={{ small: 4, large: 4 }}>
                  <SearchCard
                    href={path}
                    title={featureShortTitle || featureTitle}
                    teaser={featureTeaser}
                    small
                  />
                </GridItem>
              </li>
            ),
          )}
        </CardList>
        <GridItem colRange={{ small: 4, large: 12 }}>
          <Link variant="standalone" href="/zoek?categorie=dossier" gutterBottom={40}>Bekijk alle dossiers</Link>
        </GridItem>
      </Styled.CollectionGrid>
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
