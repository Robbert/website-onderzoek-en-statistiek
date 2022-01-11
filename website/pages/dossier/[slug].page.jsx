import { ChevronRight } from '@amsterdam/asc-assets'
import { useRouter } from 'next/router'

import FallbackPage from '~/components/FallbackPage/FallbackPage'
import Seo from '~/components/Seo/Seo'
import {
  apolloClient, fetchAPI, getStrapiMedia, normalizeItemList, formatDate,
} from '~/lib/utils'
import { Grid, GridItem } from '~/components/Grid/Grid.style'
import Heading from '~/components/Heading/Heading'
import Paragraph from '~/components/Paragraph/Paragraph'
import CardList from '~/components/CardList/CardList'
import Card from '~/components/Card/Card'
import List from '~/components/List/List'
import SearchCard from '~/components/SearchCard/SearchCard'
import Disclosure from '~/components/Disclosure/Disclosure'
import Link from '~/components/Link/Link'
import ContentFooter from '~/components/ContentFooter/ContentFooter'
import QUERY from './collection.query.gql'
import * as Styled from './dossier.style'

const Collection = ({
  title,
  shortTitle,
  teaser,
  squareImage,
  rectangularImage,
  intro,
  featured,
  collectionItems: collectionItemsCms,
  linkList,
  email,
  phoneNumber,
  theme,
}) => {
  const router = useRouter()
  if (router.isFallback) {
    return <FallbackPage />
  }

  const collectionItems = normalizeItemList(collectionItemsCms)
    .slice()
    .sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate))
    .map(
      ({
        path,
        title: featureTitle,
        shortTitle: featureShortTitle,
        teaser: featureTeaser,
        type,
        publicationDate,
      }) => (
        <li key={path}>
          <SearchCard
            href={path}
            type={type}
            title={featureShortTitle || featureTitle}
            teaser={featureTeaser}
            date={formatDate(publicationDate)}
          />
        </li>
      ),
    )

  const normalizedFeatures = normalizeItemList(featured.slice(0, 4))

  return (
    <>
      <Seo
        title={`Dossier: ${shortTitle || title}`}
        description={teaser || intro}
        image={getStrapiMedia(rectangularImage || squareImage)}
      />
      <Grid>
        <GridItem colStart={{ small: 1, large: 3 }} colRange={{ small: 4, large: 9 }}>
          <Heading gutterBottom={24}>{title}</Heading>
          <Paragraph intro gutterBottom={{ small: 72, large: 120 }}>{intro}</Paragraph>
        </GridItem>

        {featured.length > 0 && (
          <GridItem colRange={{ small: 4, large: 12 }}>
            <Styled.CardList>
              {normalizedFeatures.map(
                ({
                  path,
                  title: featureTitle,
                  shortTitle: featureShortTitle,
                  teaser: featureTeaser,
                  rectangularImage: featureTeaserImage,
                  type,
                }) => (
                  <Styled.FeatureListItem
                    key={path}
                    listLength={normalizedFeatures.length}
                  >
                    <Card
                      href={path}
                      image={featureTeaserImage}
                      aspectRatio={16 / 9}
                      type={type}
                      title={featureShortTitle || featureTitle}
                      teaser={featureTeaser}
                      headingLevel="h2"
                      clickableImage
                    />
                  </Styled.FeatureListItem>
                ),
              )}
            </Styled.CardList>
          </GridItem>
        )}

        {collectionItems.length > 0
        && (
          <>
            <Styled.CollectionGridItem
              colStart={{ small: 1, large: 5 }}
              colRange={{ small: 4, large: 8 }}
              rowStart={{ small: 4, large: 3 }}
            >
              <Heading as="h2" gutterBottom={40}>{`Alles in ${title}`}</Heading>
            </Styled.CollectionGridItem>
            <GridItem
              colStart={{ small: 1, large: 5 }}
              colRange={{ small: 4, large: 8 }}
              rowStart={{ small: 5, large: 4 }}
              gutterBottom={{ small: 32, large: 40 }}
            >
              <CardList>
                {collectionItems.slice(0, 5)}
              </CardList>
              {collectionItems.length > 5
              && (
                <Disclosure id="other_collection_items" url={router.asPath}>
                  <CardList>
                    {collectionItems.slice(5)}
                  </CardList>
                </Disclosure>
              )}
            </GridItem>
          </>
        )}

        {linkList.length > 0 && (
          <GridItem
            colStart={{ small: 1, large: 1 }}
            colRange={{ small: 4, large: 4 }}
            rowStart={{ small: 6, large: 4 }}
            gutterBottom={{ small: 32, large: 40 }}
          >
            <Heading as="h2" styleAs="h5" gutterBottom={12}>Zie ook</Heading>
            <List>
              {normalizeItemList(linkList).map(({ path, title: linkTitle }) => (
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

        <GridItem
          colStart={{ small: 1, large: 5 }}
          colRange={{ small: 4, large: 8 }}
          rowStart={{ small: 7, large: 5 }}
        >
          <ContentFooter type="dossier" themes={theme} />
        </GridItem>

        {(email || phoneNumber)
        && (
          <GridItem
            colRange={4}
            rowStart={{ small: 8, large: 6 }}
            gutterBottom={{ small: 32, large: 40 }}
          >
            <Heading gutterBottom={{ small: 12, large: 40 }} as="h2" styleAs="h3">Heeft u een vraag over dit dossier?</Heading>
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

  if (!data.collections[0]) {
    return {
      notFound: true,
      revalidate: 1,
    }
  }

  return {
    props: data.collections[0],
    revalidate: 1,
  }
}

export default Collection
