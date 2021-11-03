import NextImage from 'next/image'
import { useRouter } from 'next/router'
import { Spinner } from '@amsterdam/asc-ui'

import Seo from '../../components/Seo/Seo'
import { Grid, GridItem } from '../../components/Grid/Grid.style'
import Heading from '../../components/Heading/Heading'
import Paragraph from '../../components/Paragraph/Paragraph'
import BodyContent from '../../components/BodyContent/BodyContent'
import ThemeList from '../../components/ThemeList/ThemeList'
import DownloadButton from '../../components/DownloadButton/DownloadButton'
import {
  fetchAPI,
  getStrapiMedia,
  apolloClient,
  PLACEHOLDER_IMAGE,
  formatDate,
} from '../../lib/utils'
import * as Styled from './publication.style'
import QUERY from './publication.query.gql'

const Publication = ({
  title,
  shortTitle,
  publicationDate,
  author,
  intro,
  body,
  file,
  coverImage,
  squareImage,
  rectangularImage,
  theme,
}) => {
  const router = useRouter()
  if (router.isFallback) {
    return <div><Spinner /></div>
  }

  return (
    <>
      <Seo
        title={shortTitle || title}
        image={getStrapiMedia(rectangularImage || squareImage || coverImage)}
        article
      />

      <Grid>
        <GridItem
          colStart={{ small: 1, large: 2 }}
          colRange={{ small: 4, large: 6 }}
          rowStart={1}
        >
          <Heading gutterBottom={16} styleAs="h2">{title}</Heading>
          <Styled.MetaList small gutterBottom={40}>
            <Styled.MetaListItem>Publicatie</Styled.MetaListItem>
            {author && <Styled.MetaListItem>{author}</Styled.MetaListItem>}
            {publicationDate && (
              <Styled.MetaListItem>
                {formatDate(publicationDate)}
              </Styled.MetaListItem>
            )}
          </Styled.MetaList>

        </GridItem>

        <GridItem
          colStart={{ small: 1, large: 9 }}
          colRange={{ small: 4, large: 3 }}
          rowStart={{ small: 2, large: 1 }}
          rowRange={{ small: 1, large: 2 }}
          gutterBottom={56}
        >
          <Styled.CoverImage>
            <NextImage
              src={getStrapiMedia(coverImage)}
              alt={coverImage.alternativeText}
              width={coverImage.width}
              height={coverImage.height}
              layout="responsive"
              placeholder="blur"
              objectFit="cover"
              blurDataURL={PLACEHOLDER_IMAGE}
              priority
            />
          </Styled.CoverImage>
          <DownloadButton file={file} image={coverImage} />
        </GridItem>

        <GridItem
          colStart={{ small: 1, large: 2 }}
          colRange={{ small: 4, large: 6 }}
        >
          <Paragraph intro gutterBottom={80}>{intro}</Paragraph>
        </GridItem>

        {body && <BodyContent content={body} />}

        <GridItem
          colStart={{ small: 1, large: 3 }}
          colRange={{ small: 4, large: 6 }}
        >
          <ThemeList type="publicatie" themes={theme} />
        </GridItem>
      </Grid>
    </>
  )
}

export async function getStaticPaths() {
  const publications = await fetchAPI('/publications?_limit=-1')

  return {
    paths: publications.map(({ slug }) => ({
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
    props: data.publications[0],
    revalidate: 1,
  }
}

export default Publication
