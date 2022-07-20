import App from 'next/app'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { useState, useEffect } from 'react'
import Fuse from 'fuse.js'
import { createGlobalStyle } from 'styled-components'
import { GlobalStyle, ThemeProvider, ascDefaultTheme } from '@amsterdam/asc-ui'
import qs from 'qs'

import Layout from '~/components/Layout/Layout'
import { prependRootURL, fetchAPI } from '~/lib/utils'
import { startTracking, pushCustomEvent } from '~/lib/analyticsUtils'
import ShortcutContext from '~/lib/ShortcutContext'
import { fuseOptions, SearchContext } from '~/lib/searchUtils'
import appQuery from './app.query'

import '~/public/fonts/fonts.css'

const BodyStyle = createGlobalStyle`
  body {
    background-color: white;
  }
`

const withTypeBreakpoint = (size) => (type) =>
  `(${type}: ${size + (type === 'max-width' ? -1 : 0)}px)`

const MyApp = ({ Component, pageProps, contextData }) => {
  const [searchIndex, setSearchIndex] = useState(null)
  const router = useRouter()
  const { query, asPath } = router

  if (query.slug && query.slug !== query.slug.toLowerCase()) {
    pushCustomEvent('Redirect', 'Slug with uppercase letters', asPath)
    router.push({
      pathname: '[slug]',
      query: {
        ...query,
        slug: query.slug.toLowerCase(),
      },
    })
  }

  const newTheme = {
    ...ascDefaultTheme,
    typography: {
      ...ascDefaultTheme.typography,
      fontFamily: '"Amsterdam Sans",arial,sans-serif',
    },
    breakpoints: {
      ...ascDefaultTheme.breakpoints,
      laptop: withTypeBreakpoint(840),
    },
  }

  useEffect(() => {
    const abortController = new AbortController()

    fetch(prependRootURL('/api/search-content'), {
      signal: abortController.signal,
      mode: 'cors',
    })
      .then((response) => response.json())
      .then((searchContent) => {
        setSearchIndex(new Fuse(searchContent, fuseOptions))
      })
      .catch() // TODO: log errors in Sentry
    return () => abortController.abort()
  }, [])

  useEffect(() => {
    startTracking(router)
  }, [])

  return (
    <ThemeProvider theme={newTheme}>
      <GlobalStyle />
      <BodyStyle />
      <SearchContext.Provider value={searchIndex}>
        <ShortcutContext.Provider value={contextData.data.shortcuts}>
          <Layout>
            <Script id="piwik-pro-code" src="/piwik.js" />
            <Component {...pageProps} />
          </Layout>
        </ShortcutContext.Provider>
      </SearchContext.Provider>
    </ThemeProvider>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)

  const { data } = await fetchAPI(
    `/api/homepage?${qs.stringify(appQuery, {
      encodeValuesOnly: true,
    })}`,
  )

  return { ...appProps, contextData: { data } }
}

export default MyApp
