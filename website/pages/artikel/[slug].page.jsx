import Image from 'next/image'
import { useRouter } from 'next/router'
import qs from 'qs'

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
  formatDate,
} from '~/lib/utils'
import { normalizeItemList } from '~/lib/normalizeUtils'
import articleQuery from './article.query'
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
  themes,
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
          <Paragraph intro gutterBottom={{ small: 56, large: 80 }}>
            {intro}
          </Paragraph>

          {rectangularImage && (
            <Styled.ImageWrapper>
              <Image
                src={getStrapiMedia(rectangularImage)}
                alt=""
                width={rectangularImage.width}
                height={rectangularImage.height}
                placeholder="blur"
                blurDataURL={PLACEHOLDER_IMAGE}
                priority
                sizes="(max-width: 840px) 840px, 920px"
                style={{
                  width: '100%',
                  height: 'auto',
                }}
              />
              {rectangularImage.caption &&
                /*
                  Strapi autofills the 'caption' field with the name of the file.
                  This regex checks if 'caption' doesn't end in an image extension.
                */
                !/\.(jpg|jpeg|png|webp|avif|gif|svg|ico)$/.test(
                  rectangularImage.caption,
                ) && <Paragraph small>{rectangularImage.caption}</Paragraph>}
            </Styled.ImageWrapper>
          )}
        </GridItem>

        <BodyContent content={body} />

        <GridItem
          colStart={{ small: 1, large: 3 }}
          colRange={{ small: 4, large: 8 }}
        >
          <ContentFooter type="artikel" themes={themes} />
        </GridItem>

        {related.length > 0 && (
          <>
            <GridItem colRange={{ small: 4, large: 12 }}>
              <Heading as="h2" styleAs="h4" gutterBottom={40}>
                Ook interessant
              </Heading>
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
                        sizes="(max-width: 840px) 840px, 450px"
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
  const articles = await fetchAPI('/api/articles?fields=id').then(
    (metaResult) =>
      fetchAPI(
        `/api/articles?fields=slug&pagination[pageSize]=${metaResult.meta.pagination.total}`,
      ),
  )

  return {
    paths: articles.data.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: true,
  }
}

export async function getStaticProps({ params, preview }) {
  const data = await fetchAPI(
    `/api/articles?${qs.stringify(
      {
        filters: { slug: { $eq: params.slug } },
        ...articleQuery,
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

export default Article
