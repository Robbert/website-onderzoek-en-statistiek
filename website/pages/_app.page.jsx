/* eslint-disable no-underscore-dangle */
import App from 'next/app'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { useState, useEffect } from 'react'
import Fuse from 'fuse.js'
import { createGlobalStyle } from 'styled-components'
import { GlobalStyle, ThemeProvider, ascDefaultTheme } from '@amsterdam/asc-ui'

import Layout from '~/components/Layout/Layout'
import { apolloClient, prependStaticContentUrl } from '~/lib/utils'
import { startTracking, pushCustomEvent } from '~/lib/analyticsUtils'
import ShortcutContext from '~/lib/ShortcutContext'
import QUERY from './app.query.gql'
import { fuseOptions, SearchContext } from '~/lib/searchUtils'

import '~/public/fonts/fonts.css'

const BodyStyle = createGlobalStyle`
  body {
    background-color: white;
  }
`

const withTypeBreakpoint = (size) => (type) =>
  `(${type}: ${size + (type === 'max-width' ? -1 : 0)}px)`

const MyApp = ({ Component, pageProps }) => {
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
      fontFamily:
        'Avenir Next W01, Helvetica Neue, Helvetica, Arial, sans-serif',
    },
    breakpoints: {
      ...ascDefaultTheme.breakpoints,
      laptop: withTypeBreakpoint(840),
    },
  }

  useEffect(() => {
    const abortController = new AbortController()

    fetch(prependStaticContentUrl('/searchContent.json'), {
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
        <ShortcutContext.Provider value={pageProps?.data?.homepage?.shortcuts}>
          <Layout>
            <Script
              id="piwik-pro-code"
              src={prependStaticContentUrl('/piwik.js')}
            />
            <Component {...pageProps} />
          </Layout>
        </ShortcutContext.Provider>
      </SearchContext.Provider>
    </ThemeProvider>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)

  const { data } = await apolloClient.query({ query: QUERY })

  return { ...appProps, pageProps: { data } }
}

export default MyApp
