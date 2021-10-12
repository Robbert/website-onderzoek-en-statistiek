import Image from 'next/image'
import { useRouter } from 'next/router'
import { Spinner } from '@amsterdam/asc-ui'

import Seo from '../../components/Seo/Seo'
import { Grid, GridItem } from '../../components/Grid/Grid.style'
import Heading from '../../components/Heading/Heading'
import Paragraph from '../../components/Paragraph/Paragraph'
import CardList from '../../components/CardList/CardList'
import LinkList from '../../components/LinkList/LinkList'
import Link from '../../components/Link/Link'
import ThemeSearch from '../../components/ThemeSearch/ThemeSearch'
import {
  fetchAPI, getStrapiMedia, apolloClient, translateColor, PLACEHOLDER_IMAGE, flattenFeatureList,
} from '../../lib/utils'
import QUERY from './theme.query.gql'
import * as Styled from './theme.style'

const Theme = ({
  title,
  slug,
  shortTitle,
  color,
  teaser,
  teaserImage,
  intro,
  visualisation,
  topStory,
  featured,
  collections,
  combiPicture,
}) => {
  const router = useRouter()
  if (router.isFallback) {
    return <div><Spinner /></div>
  }

  return (
    <>
      <Seo
        title={shortTitle || title}
        description={teaser}
        image={getStrapiMedia(teaserImage)}
      />
      <Grid>

        <GridItem colRange={{ small: 4, large: 12 }}>
          <Heading gutterBottom={24}>{title}</Heading>
        </GridItem>

        <Styled.HeroSection colStart={{ small: 1, large: 5 }} colRange={{ small: 4, large: 7 }}>
          { visualisation
          && (
            <Image
              src={getStrapiMedia(visualisation.image)}
              alt=""
              width={3}
              height={2}
              layout="responsive"
              priority
            />
          ) }
          <Styled.Caption gutterBottom={24} darkBackground small>
            {visualisation && `${visualisation.title} Bron: ${visualisation.source}`}
          </Styled.Caption>
          <Paragraph darkBackground>{intro}</Paragraph>
          { topStory && topStory.length > 0
            && <Link href={flattenFeatureList(topStory)[0].path}>Lees verder</Link>}
        </Styled.HeroSection>

        <Styled.ColorBar
          colRange={{ small: 4, large: 12 }}
          color={translateColor(color || 'lichtblauw')}
        />

        <GridItem colStart={1} colRange={{ small: 4, large: 12 }}>
          <CardList
            columns={3}
            items={flattenFeatureList(featured)}
          />
        </GridItem>

        <GridItem colRange={{ small: 4, large: 6 }}>
          <Heading as="h2" gutterBottom={24}>{`Dossiers over ${title}`}</Heading>
          <LinkList
            gutterBottom={40}
            links={collections.map(({ title: collectionTitle, slug: collectionSlug }) => ({ title: collectionTitle, path: `/dossier/${collectionSlug}` }))}
          />
        </GridItem>
        <GridItem colRange={{ small: 4, large: 6 }}>
          <Image
            src={
              combiPicture?.biggerImage
                ? getStrapiMedia(combiPicture.biggerImage)
                : PLACEHOLDER_IMAGE
            }
            alt=""
            width={1}
            height={1}
            layout="responsive"
            priority
          />
          <Image
            src={
              combiPicture?.smallerImage
                ? getStrapiMedia(combiPicture.smallerImage)
                : PLACEHOLDER_IMAGE
            }
            alt=""
            width={1}
            height={1}
            layout="responsive"
            priority
          />
        </GridItem>

        <GridItem colStart={{ small: 1, large: 3 }} colRange={{ small: 4, large: 8 }}>
          <ThemeSearch
            themeTitle={title}
            slug={slug}
          />
        </GridItem>

      </Grid>
    </>
  )
}

export async function getStaticPaths() {
  const themes = await fetchAPI('/themes')

  return {
    paths: themes.map(({ slug }) => ({
      params: { slug },
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
    props: data.themes[0],
    revalidate: 1,
  }
}

export default Theme
