import Link from 'next/link'
import { useRouter } from 'next/router'
import ReactMarkdown from 'react-markdown'
import { Heading, Spinner } from '@amsterdam/asc-ui'

import Seo from '../../components/Seo'
import {
  fetchAPI, flattenFeatureList, getLatestContent, contentTypes, getStrapiMedia,
} from '../../lib/utils'

const Theme = ({
  title, shortTitle, teaser, features, intro, teaserImage, ...props
}) => {
  const router = useRouter()
  if (router.isFallback) {
    return <div><Spinner /></div>
  }

  const featurelist = features.length > 0
    ? flattenFeatureList(features).map(({
      slug, path, name, title: featureTitle,
    }) => (
      <li key={`feature-${slug}`}>
        <Link key={slug} href={path}>
          <a>
            {`${name}: ${featureTitle}`}
          </a>
        </Link>
      </li>
    ))
    : []

  const latestContentLists = Object.values(contentTypes).map(({ type, name, plural }) => {
    if (!props[`${type}s`]) return null
    const items = props[`${type}s`]
    return items.length > 0
      ? (
        <section>
          <Heading forwardedAs="h3">
            {`Laatste ${plural}`}
          </Heading>
          <ul>
            {
              items.map(({ name: contentName, slug, title: contentTitle }) => (
                <li key={`${type}-${slug}`}>
                  <Link key={slug} href={`/${name}/${slug}`}>
                    <a>
                      {`${contentName}: ${contentTitle}`}
                    </a>
                  </Link>
                </li>
              ))
            }
          </ul>
        </section>
      ) : null
  })

  return (
    <>
      <Seo
        title={shortTitle || title}
        description={teaser}
        image={getStrapiMedia(teaserImage)}
      />
      <Heading>
        {`Thema: ${title}`}
      </Heading>
      <ReactMarkdown source={intro} escapeHtml={false} />
      <Heading forwardedAs="h3">Uitgelicht</Heading>
      <ul>{featurelist}</ul>
      {latestContentLists}
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
  const themes = await fetchAPI(
    `/themes?slug=${params.slug}`,
  )

  const {
    articles, publications, videos, interactives, collections, ...props
  } = themes[0]

  props.articles = getLatestContent(articles, 5)
  props.publications = getLatestContent(publications, 5)
  props.videos = getLatestContent(videos, 5)
  props.interactives = getLatestContent(interactives, 5)
  props.collections = getLatestContent(collections, 5)

  return {
    props,
    revalidate: 1,
  }
}

export default Theme
