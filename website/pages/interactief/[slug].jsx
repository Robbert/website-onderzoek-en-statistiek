import { useEffect } from 'react'
import { fetchAPI } from '../../lib/utils'
import Layout from '../../components/Layout'
import Seo from '../../components/Seo'

const Interactive = ({ interactive, assets }) => {
  const seo = {
    metaTitle: interactive.title,
    metaDescription: interactive.teaser,
    article: true,
  }

  useEffect(() => {
    const elements = assets.map((asset) => {
      let element
      if (asset.endsWith('css')) {
        element = document.createElement('link')
        element.rel = 'stylesheet'
        element.href = `${interactive.contentLink}/${asset}`
      } else if (asset.endsWith('js')) {
        element = document.createElement('script')
        element.src = `${interactive.contentLink}/${asset}`
        element.async = true
      }
      document.head.appendChild(element)
      const promise = new Promise((resolve) => { element.onload = () => { resolve() } })

      return { promise, element }
    })

    const promises = elements.map((element) => element.promise)

    Promise.all(promises).then(() => {
      window.renderApp()
    })

    return () => elements.forEach((element) => element.element.remove())
  }, [])

  return (
    <Layout>
      <Seo seo={seo} />
      <h1>{interactive.title}</h1>
      <div id="micro-frontend" />
    </Layout>
  )
}

export async function getStaticPaths() {
  const interactives = await fetchAPI('/interactives')

  return {
    paths: interactives.map((interactive) => (
      {
        params: {
          slug: interactive.slug,
        },
      }
    )),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const interactives = await fetchAPI(
    `/interactives?slug=${params.slug}`,
  )

  const assets = await fetch(`${interactives[0].contentLink}/asset-manifest.json`).then((res) => res.json())

  return {
    props: {
      interactive: interactives[0],
      assets: assets.entrypoints,
    },
    revalidate: 1,
  }
}

export default Interactive
