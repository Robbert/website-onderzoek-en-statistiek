import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Spinner, Heading } from '@amsterdam/asc-ui'
import styled from 'styled-components'

import { fetchAPI, getStrapiMedia, apolloClient } from '../../lib/utils'
import Seo from '../../components/Seo'
import ContentContainer from '../../components/ContentContainer'
import QUERY from './interactive.query.gql'

const Container = styled.div`
  width: 100%;
`

const Interactive = ({
  title, shortTitle, teaser, contentLink, teaserImage, assets,
}) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div><Spinner /></div>
  }

  useEffect(() => {
    const elements = assets.map((asset) => {
      let element
      if (asset.endsWith('css')) {
        element = document.createElement('link')
        element.rel = 'stylesheet'
        element.href = `${contentLink}/${asset}`
      } else if (asset.endsWith('js')) {
        element = document.createElement('script')
        element.src = `${contentLink}/${asset}`
        element.async = true
      }
      document.head.appendChild(element)
      const promise = new Promise((resolve) => { element.onload = () => { resolve() } })

      return { promise, element }
    })

    const promises = elements.map((element) => element.promise)

    Promise.all(promises).then(() => window.renderApp && window.renderApp())

    return () => elements.forEach((element) => element.element.remove())
  }, [])

  return (
    <ContentContainer>
      <Seo
        title={shortTitle || title}
        description={teaser}
        image={getStrapiMedia(teaserImage)}
        article
      />
      <Heading>{title}</Heading>
      <Container id="micro-frontend" />
    </ContentContainer>
  )
}

export async function getStaticPaths() {
  const interactives = await fetchAPI('/interactives')

  return {
    paths: interactives.map(({ slug }) => (
      {
        params: {
          slug,
        },
      }
    )),
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

  const assets = await fetch(`${data.interactives[0].contentLink}/asset-manifest.json`)
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      throw new Error(`no asset-manifest found for ${data.interactives[0].slug}`)
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error)
    })

  return {
    props: {
      ...data.interactives[0],
      assets: assets?.entrypoints ? assets.entrypoints : [],
    },
    revalidate: 1,
  }
}

export default Interactive
