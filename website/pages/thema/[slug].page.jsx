import { useRouter } from 'next/router'
import { Spinner, Paragraph } from '@amsterdam/asc-ui'

import Seo from '../../components/Seo/Seo'
import HeroSection from '../../components/HeroSection/HeroSection'
import LatestSection from '../../components/LatestSection/LatestSection'
import {
  fetchAPI, getStrapiMedia, apolloClient,
} from '../../lib/utils'
import QUERY from './theme.query.gql'

const Theme = ({
  title,
  shortTitle,
  teaser,
  teaserImage,
  coverImage,
  intro,
  ...otherProps
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
      <HeroSection image={coverImage} title={title}>
        <Paragraph>{intro}</Paragraph>
      </HeroSection>
      <LatestSection {...otherProps} />
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
