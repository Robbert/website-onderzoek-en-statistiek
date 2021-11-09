import App from 'next/app'
import { useState, useEffect } from 'react'
import Fuse from 'fuse.js'
import { createGlobalStyle } from 'styled-components'
import {
  GlobalStyle, ThemeProvider, ascDefaultTheme,
} from '@amsterdam/asc-ui'

import Layout from '../components/Layout/Layout'
import { apolloClient } from '../lib/utils'
import ShortcutContext from '../lib/ShortcutContext'
import QUERY from './app.query.gql'
import { fuseOptions, SearchContext } from '../lib/searchUtils'

import '../public/fonts/fonts.css'

const BodyStyle = createGlobalStyle`
  body {
    background-color: white;
  }
`

const withTypeBreakpoint = (size) => (type) => `(${type}: ${size + (type === 'max-width' ? -1 : 0)}px)`

const MyApp = ({ Component, pageProps }) => {
  const [searchIndex, setSearchIndex] = useState(null)

  const newTheme = {
    ...ascDefaultTheme,
    typography: {
      ...ascDefaultTheme.typography,
      fontFamily: 'Avenir Next W01, Helvetica Neue, Helvetica, Arial, sans-serif',
    },
    breakpoints: {
      ...ascDefaultTheme.breakpoints,
      laptop: withTypeBreakpoint(840),
    },
  }

  useEffect(() => {
    const abortController = new AbortController()

    let uri = 'http://localhost:3000'

    if (process.env.NEXT_PUBLIC_DEPLOY_ENV === 'acceptance') {
      uri = 'https://acc.onderzoek.amsterdam.nl/static/acc'
    } else if (process.env.NEXT_PUBLIC_DEPLOY_ENV === 'production') {
      uri = 'https://onderzoek.amsterdam.nl/static/prod'
    }

    fetch(`${uri}/searchContent.json`, { signal: abortController.signal, mode: 'cors' })
      .then((response) => response.json())
      .then((searchContent) => {
        setSearchIndex(new Fuse(searchContent, fuseOptions))
      })
      .catch() // TODO: log errors in Sentry
    return () => abortController.abort()
  }, [])

  return (
    <ThemeProvider theme={newTheme}>
      <GlobalStyle />
      <BodyStyle />
      <SearchContext.Provider value={searchIndex}>
        <ShortcutContext.Provider value={pageProps?.data?.homepage?.shortcuts}>
          <Layout>
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
