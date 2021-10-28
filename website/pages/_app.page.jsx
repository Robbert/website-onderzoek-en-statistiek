import { useState, useEffect } from 'react'
import Fuse from 'fuse.js'
import { createGlobalStyle } from 'styled-components'
import {
  GlobalStyle, ThemeProvider, ascDefaultTheme,
} from '@amsterdam/asc-ui'

import Layout from '../components/Layout/Layout'
import { fuseOptions, SearchContext } from '../lib/searchUtils'

import '../public/fonts/fonts.css'

const BodyStyle = createGlobalStyle`
  body {
    background-color: white;
  }
`

const MyApp = ({ Component, pageProps }) => {
  const [searchIndex, setSearchIndex] = useState(null)

  const newTheme = {
    ...ascDefaultTheme,
    typography: {
      ...ascDefaultTheme.typography,
      fontFamily: 'Avenir Next W01, Helvetica Neue, Helvetica, Arial, sans-serif',
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
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SearchContext.Provider>
    </ThemeProvider>
  )
}

export default MyApp
