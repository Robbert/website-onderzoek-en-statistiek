import { useRouter } from 'next/router'
import { Spinner, List } from '@amsterdam/asc-ui'
import { ChevronRight } from '@amsterdam/asc-assets'

import Seo from '../../components/Seo/Seo'
import {
  apolloClient, fetchAPI, getStrapiMedia, flattenFeatureList,
} from '../../lib/utils'
import { Grid, GridItem } from '../../components/Grid/Grid.style'
import Heading from '../../components/Heading/Heading'
import Paragraph from '../../components/Paragraph/Paragraph'
import CardList from '../../components/CardList/CardList'
import Card from '../../components/Card/Card'
import SearchCard from '../../components/SearchCard/SearchCard'
import Disclosure from '../../components/Disclosure/Disclosure'
import Link from '../../components/Link/Link'
import QUERY from './collection.query.gql'
import * as Styled from './dossier.style'

const Collection = ({
  title,
  shortTitle,
  teaser,
  teaserImage,
  intro,
  featured,
  collectionItems: collectionItemsCms,
  linkList,
  email,
  phoneNumber,
}) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div><Spinner /></div>
  }

  const collectionItems = flattenFeatureList(collectionItemsCms).map(
    ({
      path,
      title: featureTitle,
      shortTitle: featureShortTitle,
      teaser: featureTeaser,
      __typename,
    }) => (
      <li key={path}>
        <SearchCard
          href={path}
          type={__typename}
          title={featureShortTitle || featureTitle}
          teaser={featureTeaser}
        />
      </li>
    ),
  )

  return (
    <>
      <Seo
        title={`Dossier: ${shortTitle || title}`}
        description={teaser}
        image={getStrapiMedia(teaserImage)}
      />
      <Grid>
        <GridItem colStart={{ small: 1, large: 3 }} colRange={{ small: 4, large: 9 }}>
          <Heading gutterBottom={{ small: 24, large: 16 }}>{title}</Heading>
          <Paragraph intro gutterBottom={{ small: 48, large: 112 }}>{intro}</Paragraph>
        </GridItem>

        {featured.length > 0 && (
          <CardList>
            {flattenFeatureList(featured).map(
              ({
                path,
                title: featureTitle,
                shortTitle: featureShortTitle,
                teaser: featureTeaser,
                teaserImage: featureTeaserImage,
                __typename,
              }, index) => (
                <Styled.FeatureListItem key={path}>
                  <Styled.FeatureGridItem colRange={{ small: 4, large: 6 }} index={index}>
                    <Card
                      href={path}
                      image={featureTeaserImage}
                      type={__typename}
                      title={featureShortTitle || featureTitle}
                      teaser={featureTeaser}
                      clickableImage
                    />
                  </Styled.FeatureGridItem>
                </Styled.FeatureListItem>
              ),
            )}
          </CardList>
        )}

        {collectionItems.length > 0
        && (
          <>
            <Styled.CollectionGridItem
              colStart={{ small: 1, large: 5 }}
              colRange={{ small: 4, large: 8 }}
              rowStart={{ small: 4, large: 3 }}
            >
              <Heading as="h2" gutterBottom={{ small: 32, large: 60 }}>{`Alles in ${title}`}</Heading>
            </Styled.CollectionGridItem>
            <GridItem
              colStart={{ small: 1, large: 5 }}
              colRange={{ small: 4, large: 8 }}
              rowStart={{ small: 5, large: 4 }}
              gutterBottom={{ small: 72, large: 116 }}
            >
              <CardList>
                {collectionItems.slice(0, 5)}
              </CardList>
              {collectionItems.length > 5
              && (
                <Disclosure id="other_collection_items">
                  <CardList>
                    {collectionItems.slice(5)}
                  </CardList>
                </Disclosure>
              )}
            </GridItem>
          </>
        )}

        {linkList.length > 0
        && (
          <GridItem
            colStart={{ small: 1, large: 1 }}
            colRange={{ small: 4, large: 4 }}
            rowStart={{ small: 6, large: 4 }}
            gutterBottom={{ small: 24, large: 116 }}
          >
            <Heading as="h2" styleAs="h5" gutterBottom={16}>Zie ook</Heading>
            <List>
              {flattenFeatureList(linkList).map(({ path, title: linkTitle }) => (
                <li key={path}>
                  <Link href={path} variant="inList">
                    <Styled.Icon size={14}>
                      <ChevronRight />
                    </Styled.Icon>
                    {linkTitle}
                  </Link>
                </li>
              ))}
            </List>
          </GridItem>
        )}

        {(email || phoneNumber)
        && (
          <GridItem
            colRange={4}
            rowStart={{ small: 7, large: 5 }}
            gutterBottom={{ small: 4, large: 56 }}
          >
            <Heading gutterBottom={{ small: 12, large: 32 }} as="h2" styleAs="h3">Heeft u een vraag over dit dossier?</Heading>
            <Paragraph small>
              Neem contact met ons op.
              U kunt ons bereiken via
              {' '}
              {email && <Link href={`mailto:${email}`} variant="inline">e-mail</Link>}
              {email && phoneNumber && ' of '}
              {phoneNumber && <Link href={`tel:${phoneNumber}`} variant="inline">{phoneNumber}</Link>}
              .
            </Paragraph>
          </GridItem>
        )}
      </Grid>
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
