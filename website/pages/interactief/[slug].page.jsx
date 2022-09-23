import { useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import qs from 'qs'

import FallbackPage from '~/components/FallbackPage/FallbackPage'
import { fetchAPI, getStrapiMedia } from '~/lib/utils'
import Seo from '~/components/Seo/Seo'
import Container from '~/components/Container/Container'
import IFrame from '~/components/IFrame/IFrame'
import { Grid, GridItem } from '~/components/Grid/Grid.style'
import ContentFooter from '~/components/ContentFooter/ContentFooter'
import interactiveQuery from './interactive.query'

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
  themes,
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
      const promise = new Promise((resolve) => {
        element.onload = () => {
          resolve()
        }
      })

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
      {implementation === 'insert' ? (
        <RenderContainer id="micro-frontend" />
      ) : (
        <IFrame src={contentLink} title={title} />
      )}
      <Grid verticalPadding={0}>
        <GridItem colRange={{ small: 4, large: 8 }}>
          <ContentFooter type="interactieve publicatie" themes={themes} />
        </GridItem>
      </Grid>
    </Container>
  )
}

export async function getStaticPaths() {
  const interactives = await fetchAPI('/api/interactives?fields=id').then(
    (metaResult) =>
      fetchAPI(
        `/api/interactives?fields=slug&pagination[pageSize]=${metaResult.meta.pagination.total}`,
      ),
  )

  return {
    paths: interactives.data.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: true,
  }
}

export async function getStaticProps({ params, preview }) {
  const data = await fetchAPI(
    `/api/interactives?${qs.stringify(
      {
        filters: { slug: { $eq: params.slug } },
        ...interactiveQuery,
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

  const { contentLink, implementation } = data.data[0]

  const assets =
    implementation === 'insert'
      ? await fetch(`${contentLink}/asset-manifest.json`)
          .then((res) => {
            if (res.ok) {
              return res.json()
            }
            return []
          })
          // eslint-disable-next-line no-console
          .catch((e) => console.log(e))
      : {}

  return {
    props: {
      ...data.data[0],
      assets: assets?.entrypoints ? assets.entrypoints : [],
    },
    revalidate: 1,
  }
}

export default Interactive
