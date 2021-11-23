import { useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import FallbackPage from '../../components/FallbackPage/FallbackPage'
import { fetchAPI, getStrapiMedia, apolloClient } from '../../lib/utils'
import Seo from '../../components/Seo/Seo'
import Container from '../../components/Container/Container'
import IFrame from '../../components/IFrame/IFrame'
import { Grid, GridItem } from '../../components/Grid/Grid.style'
import ContentFooter from '../../components/ContentFooter/ContentFooter'
import QUERY from './interactive.query.gql'

const RenderContainer = styled.div`
  width: 100%;
`

const Interactive = ({
  title,
  shortTitle,
  teaser,
  implementation,
  contentLink,
  squareImage,
  rectangularImage,
  assets,
  theme,
}) => {
  const router = useRouter()
  if (router.isFallback) {
    return <FallbackPage />
  }

  useEffect(() => {
    if (implementation === 'link') {
      router.push(contentLink)
    }
  }, [implementation])

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
    <Container>
      <Seo
        title={shortTitle || title}
        description={teaser}
        image={getStrapiMedia(rectangularImage || squareImage)}
        article
      />
      {implementation === 'insert'
        ? <RenderContainer id="micro-frontend" />
        : <IFrame src={contentLink} title={title} />}
      <Grid verticalPadding={0}>
        <GridItem colRange={{ small: 4, large: 8 }}>
          <ContentFooter type="interactieve publicatie" themes={theme} />
        </GridItem>
      </Grid>
    </Container>
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

  if (!data.interactives[0]) {
    return {
      notFound: true,
    }
  }

  const { contentLink, implementation } = data.interactives[0]

  const assets = implementation === 'insert'
    ? await fetch(`${contentLink}/asset-manifest.json`)
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return []
      // eslint-disable-next-line no-console
      }).catch((e) => console.log(e))
    : {}

  return {
    props: {
      ...data.interactives[0],
      assets: assets?.entrypoints ? assets.entrypoints : [],
    },
    revalidate: 1,
  }
}

export default Interactive
