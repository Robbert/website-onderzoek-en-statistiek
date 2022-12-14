import NextImage from 'next/image'
import { ChevronRight } from '@amsterdam/asc-assets'
import { useRouter } from 'next/router'
import qs from 'qs'
import dynamic from 'next/dynamic'

import FallbackPage from '~/components/FallbackPage/FallbackPage'
import Seo from '~/components/Seo/Seo'
import { Grid, GridItem } from '~/components/Grid/Grid.style'
import Heading from '~/components/Heading/Heading'
import Paragraph from '~/components/Paragraph/Paragraph'
import Link from '~/components/Link/Link'
import Card from '~/components/Card/Card'
import ThemeSearch from '~/components/ThemeSearch/ThemeSearch'
import {
  fetchAPI,
  getStrapiMedia,
  translateColor,
  PLACEHOLDER_IMAGE,
} from '~/lib/utils'
import { normalizeItemList } from '~/lib/normalizeUtils'
import themeQuery from './thema.query'
import * as Styled from './theme.style'

const VegaVisualisation = dynamic(() =>
  import('~/components/VegaVisualisation/VegaVisualisation'),
)

const Theme = ({
  title,
  slug,
  shortTitle,
  teaser,
  squareImage,
  rectangularImage,
  intro,
  visualisation,
  topStory,
  featured,
  collections,
  combiPicture,
  email,
  phoneNumber,
}) => {
  const router = useRouter()
  if (router.isFallback) {
    return <FallbackPage />
  }

  return (
    <>
      <Seo
        title={`Thema ${shortTitle || title}`}
        description={teaser || intro}
        image={getStrapiMedia(rectangularImage || squareImage)}
      />

      <Grid verticalPadding={0}>
        <GridItem colRange={{ small: 4, large: 10 }}>
          <Heading gutterBottom={{ small: 24, large: 40 }}>{title}</Heading>
        </GridItem>
        <Styled.IntroGridItem colRange={{ small: 4, large: 5 }}>
          <Paragraph gutterBottom={24} small>
            {intro}
          </Paragraph>
          {normalizeItemList(topStory).map(({ path }) => (
            <Styled.Link
              key={path}
              href={path}
              variant="standalone"
              gutterBottom={{ small: 24, large: 40 }}
            >
              Lees meer
            </Styled.Link>
          ))}
        </Styled.IntroGridItem>
      </Grid>

      {visualisation && (
        <Styled.HeroGrid
          verticalPadding={0}
          $color={translateColor(visualisation.color || 'lichtblauw')}
        >
          <GridItem
            colStart={{ small: 1, large: 6 }}
            colRange={{ small: 4, large: 7 }}
          >
            <Styled.ChartSection>
              <Styled.ChartContainer>
                <Heading forwardedAs="h2" styleAs="h5" gutterBottom={24}>
                  {visualisation.title}
                </Heading>
                {visualisation.image && (
                  <NextImage
                    src={getStrapiMedia(visualisation.image)}
                    alt={visualisation.altText}
                    width={visualisation.image.width}
                    height={visualisation.image.height}
                    priority
                    sizes="840px"
                    style={{
                      width: '100%',
                      height: 'auto',
                    }}
                  />
                )}
                {!visualisation.image && visualisation.specification && (
                  <VegaVisualisation
                    specification={visualisation.specification}
                  />
                )}
              </Styled.ChartContainer>
              {visualisation.source && (
                <Styled.ChartCaption
                  small
                  backgroundColor={visualisation.color}
                >
                  {`Bron: ${visualisation.source}`}
                </Styled.ChartCaption>
              )}
            </Styled.ChartSection>
          </GridItem>
        </Styled.HeroGrid>
      )}

      {featured.length > 0 && (
        <Grid>
          <GridItem colRange={{ small: 4, large: 12 }}>
            <Heading
              as="h2"
              styleAs="h3"
              gutterBottom={{ small: 40, large: 24 }}
            >
              Uitgelicht in dit thema
            </Heading>
          </GridItem>
          <Styled.CardList colRange={{ small: 4, large: 12 }}>
            {normalizeItemList(featured).map(
              ({
                path,
                title: featureTitle,
                shortTitle: featureShortTitle,
                teaser: featureTeaser,
                rectangularImage: featureRectangularImage,
                type,
              }) => (
                <Styled.FeatureListItem
                  key={path}
                  colRange={{ small: 4, large: 4 }}
                >
                  <Card
                    href={path}
                    image={featureRectangularImage}
                    type={type}
                    title={featureShortTitle || featureTitle}
                    teaser={featureTeaser}
                    headingLevel="h3"
                    clickableImage
                    sizes="(max-width: 840px) 840px, 450px"
                  />
                </Styled.FeatureListItem>
              ),
            )}
          </Styled.CardList>
        </Grid>
      )}

      {collections.length > 0 && (
        <Styled.CollectionGrid verticalPadding={0}>
          <GridItem colRange={{ small: 4, large: 5 }}>
            <Heading as="h2" gutterBottom={{ small: 40, large: 80 }}>
              Dossiers binnen dit thema
            </Heading>
          </GridItem>

          <GridItem
            colRange={{ small: 4, large: 6 }}
            colStart={{ small: 1, large: 7 }}
            rowRange={{ small: 1, large: 3 }}
          >
            <Styled.LargeImageWrapper>
              <NextImage
                src={
                  combiPicture?.biggerImage
                    ? getStrapiMedia(combiPicture.biggerImage)
                    : PLACEHOLDER_IMAGE
                }
                alt=""
                fill
                sizes="(max-width: 840px) 840px, 680px"
                style={{
                  objectFit: 'cover',
                }}
              />
              <Styled.SmallImageWrapper>
                <NextImage
                  src={
                    combiPicture?.smallerImage
                      ? getStrapiMedia(combiPicture.smallerImage)
                      : PLACEHOLDER_IMAGE
                  }
                  alt=""
                  fill
                  sizes="280px"
                  style={{
                    objectFit: 'cover',
                  }}
                />
              </Styled.SmallImageWrapper>
            </Styled.LargeImageWrapper>
          </GridItem>

          <GridItem colRange={{ small: 4, large: 5 }}>
            <Styled.CollectionList
              twoColumns={collections.length > 5}
              gutterBottom={40}
            >
              {collections
                .sort(
                  (a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at),
                )
                .slice(0, 10)
                .map(({ title: linkTitle, slug: linkSlug }) => (
                  <li key={linkSlug}>
                    <Link href={`/dossier/${linkSlug}`} variant="inList">
                      <Styled.Icon size={14}>
                        <ChevronRight />
                      </Styled.Icon>
                      {linkTitle}
                    </Link>
                  </li>
                ))}
            </Styled.CollectionList>
            {collections.length > 10 && (
              <Link
                href={`/zoek?thema=${slug}&categorie=dossier`}
                variant="standalone"
              >
                Alle dossiers met dit thema
              </Link>
            )}
          </GridItem>
        </Styled.CollectionGrid>
      )}

      <Grid verticalPadding={0}>
        <GridItem
          colStart={{ small: 1, large: 3 }}
          colRange={{ small: 4, large: 8 }}
        >
          <ThemeSearch themeTitle={title} slug={slug} />
        </GridItem>

        {(email || phoneNumber) && (
          <GridItem colRange={4} gutterBottom={{ small: 32, large: 80 }}>
            <Heading
              gutterBottom={{ small: 8, large: 40 }}
              as="h2"
              styleAs="h3"
            >
              Heeft u een vraag over dit thema?
            </Heading>
            <Paragraph small>
              Neem contact met ons op. U kunt ons bereiken via{' '}
              {email && (
                <Link href={`mailto:${email}`} variant="inline" external>
                  e-mail
                </Link>
              )}
              {email && phoneNumber && ' of '}
              {phoneNumber && (
                <Link href={`tel:${phoneNumber}`} variant="inline" external>
                  {phoneNumber}
                </Link>
              )}
              .
            </Paragraph>
          </GridItem>
        )}
      </Grid>
    </>
  )
}

export async function getStaticPaths() {
  const themes = await fetchAPI('/api/themes')

  return {
    paths: themes.data.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: true,
  }
}

export async function getStaticProps({ params, preview }) {
  const data = await fetchAPI(
    `/api/themes?${qs.stringify(
      {
        filters: { slug: { $eq: params.slug } },
        ...themeQuery,
      },
      {
        encodeValuesOnly: true,
      },
    )}${preview ? '&publicationState=preview' : ''}`,
  )

  if (!data.data[0]) {
    return {
      notFound: true,
      revalidate: 1,
    }
  }

  return {
    props: data.data[0],
    revalidate: 1,
  }
}

export default Theme
