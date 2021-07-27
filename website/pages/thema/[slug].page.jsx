import { useRouter } from 'next/router'
import { Spinner } from '@amsterdam/asc-ui'
import { gql } from '@apollo/client'

import Seo from '../../components/Seo'
import HeroSection from '../../components/ThemePage/HeroSection'
import LatestSection from '../../components/ThemePage/LatestSection'
import {
  fetchAPI, getStrapiMedia, apolloClient,
} from '../../lib/utils'

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
      <HeroSection image={coverImage} title={title} intro={intro} />
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
  const contentTypeQuery = `
    title
    shortTitle
    slug
    teaserImage {
      url
    }
  `

  const query = gql`
    query getThemeData($slug: String) {
      themes(where: { slug: $slug }) {
        title
        shortTitle
        teaser
        intro
        teaserImage {
          url
        }
        coverImage {
          url
        }
        collections(limit: 2, sort: "published_at:desc") {
          ${contentTypeQuery}
        }
        videos(limit: 2, sort: "publicationDate:desc") {
          ${contentTypeQuery}
        }
        interactives(limit: 2, sort: "publicationDate:desc") {
          ${contentTypeQuery}
        }
        articles(limit: 2, sort: "publicationDate:desc") {
          ${contentTypeQuery}
        }
        publications(limit: 2, sort: "publicationDate:desc") {
          ${contentTypeQuery}
        }
        datasets(limit: 2, sort: "published_at:desc") {
          title
          slug
        }
      }
    }
  `

  const { data } = await apolloClient.query({ query, variables: { slug: params.slug } })
    .catch((error) => error)

  return {
    props: data.themes[0],
    revalidate: 1,
  }
}

export default Theme
