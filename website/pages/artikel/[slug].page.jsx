import Image from 'next/image'
import { useRouter } from 'next/router'

import Seo from '~/components/Seo/Seo'
import FallbackPage from '~/components/FallbackPage/FallbackPage'
import { Grid, GridItem } from '~/components/Grid/Grid.style'
import Heading from '~/components/Heading/Heading'
import Paragraph from '~/components/Paragraph/Paragraph'
import BodyContent from '~/components/BodyContent/BodyContent'
import CardList from '~/components/CardList/CardList'
import Card from '~/components/Card/Card'
import ContentFooter from '~/components/ContentFooter/ContentFooter'
import {
  fetchAPI,
  getStrapiMedia,
  PLACEHOLDER_IMAGE,
  apolloClient,
  normalizeItemList,
  formatDate,
} from '~/lib/utils'
import QUERY from './article.query.gql'
import * as Styled from './article.style'

const Article = ({
  title,
  shortTitle,
  teaser,
  squareImage,
  rectangularImage,
  publicationDate,
  intro,
  body,
  theme,
  related,
}) => {
  const router = useRouter()
  if (router.isFallback) {
    return <FallbackPage />
  }

  return (
    <>
      <Seo
        title={shortTitle || title}
        description={teaser || intro}
        image={getStrapiMedia(rectangularImage || squareImage)}
        article
      />

      <Grid>

        <GridItem
          colStart={{ small: 1, large: 2 }}
          colRange={{ small: 4, large: 10 }}
        >
          <Heading gutterBottom={16}>{title}</Heading>
          <Paragraph small gutterBottom={{ small: 24, large: 40 }}>
            {formatDate(publicationDate)}
          </Paragraph>
          <Paragraph intro gutterBottom={{ small: 56, large: 80 }}>{intro}</Paragraph>

          {rectangularImage && (
            <Styled.ImageWrapper>
              <Image
                src={getStrapiMedia(rectangularImage)}
                alt=""
                width={rectangularImage.width}
                height={rectangularImage.height}
                layout="responsive"
                placeholder="blur"
                blurDataURL={PLACEHOLDER_IMAGE}
                priority
              />

              {rectangularImage.caption && (
                <Paragraph small>
                  {rectangularImage.caption}
                </Paragraph>
              )}
            </Styled.ImageWrapper>
          )}
        </GridItem>

        <BodyContent content={body} />

        <GridItem
          colStart={{ small: 1, large: 3 }}
          colRange={{ small: 4, large: 8 }}
        >
          <ContentFooter type="artikel" themes={theme} />
        </GridItem>

        {related.length > 0 && (
          <>
            <GridItem colRange={{ small: 4, large: 12 }}>
              <Heading as="h2" styleAs="h4" gutterBottom={40}>Ook interessant</Heading>
            </GridItem>
            <CardList>
              {normalizeItemList(related).map(
                ({
                  path,
                  title: relatedTitle,
                  shortTitle: relatedShortTitle,
                  rectangularImage: relatedRectangularImage,
                  type,
                }) => (
                  <Styled.RelatedListItem key={path}>
                    <GridItem colRange={4}>
                      <Card
                        href={path}
                        image={relatedRectangularImage}
                        type={type}
                        title={relatedShortTitle || relatedTitle}
                        headingLevel="h3"
                        clickableImage
                      />
                    </GridItem>
                  </Styled.RelatedListItem>
                ),
              )}
            </CardList>
          </>
        )}

      </Grid>
    </>
  )
}

export async function getStaticPaths() {
  const articles = await fetchAPI('/articles?_limit=-1')

  return {
    paths: articles.map(({ slug }) => ({
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

  if (!data.articles[0]) {
    return {
      notFound: true,
      revalidate: 1,
    }
  }

  return {
    props: data.articles[0],
    revalidate: 1,
  }
}

export default Article
