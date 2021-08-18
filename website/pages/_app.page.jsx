import {
  GlobalStyle, ThemeProvider, themeColor,
} from '@amsterdam/asc-ui'
import Head from 'next/head'
import { ApolloProvider } from '@apollo/client'
import { createGlobalStyle } from 'styled-components'

import { apolloClient } from '../lib/utils'
import Layout from '../components/Layout'

const BodyStyle = createGlobalStyle`
  body {
    background-color: ${themeColor('tint', 'level3')};
  }
`

const MyApp = ({ Component, pageProps }) => (
  <>
    <Head>
      <link rel="shortcut icon" href="/favicon.ico" />
      <link href="/fonts/fonts.css" rel="stylesheet" />
    </Head>
    <ThemeProvider>
      <GlobalStyle />
      <BodyStyle />
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </ThemeProvider>
  </>
)

export default MyApp
