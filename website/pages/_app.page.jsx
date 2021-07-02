import { createContext } from 'react'
import {
  GlobalStyle, ThemeProvider, themeColor,
} from '@amsterdam/asc-ui'
import App from 'next/app'
import Head from 'next/head'
import { ApolloProvider } from '@apollo/client'
import { createGlobalStyle } from 'styled-components'

import { fetchAPI, apolloClient } from '../lib/utils'
import Layout from '../components/Layout'

import '../assets/css/style.css'

const BodyStyle = createGlobalStyle`
  body {
    background-color: ${themeColor('tint', 'level3')};
  }
`

// Store Strapi Global object in context
export const GlobalContext = createContext({})

const MyApp = ({ Component, pageProps }) => {
  const { global } = pageProps

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link href="/fonts/fonts.css" rel="stylesheet" />
      </Head>
      <ThemeProvider>
        <GlobalStyle />
        <BodyStyle />
        <GlobalContext.Provider value={global}>
          <ApolloProvider client={apolloClient}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ApolloProvider>
        </GlobalContext.Provider>
      </ThemeProvider>
    </>
  )
}

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx)
  // Fetch global site settings from Strapi
  const global = await fetchAPI('/global')
  // Pass the data to our page via props
  return { ...appProps, pageProps: { global } }
}

export default MyApp
