import {
  GlobalStyle, ThemeProvider, themeColor,
} from '@amsterdam/asc-ui'
import Head from 'next/head'
import { createGlobalStyle } from 'styled-components'

import '../public/fonts/fonts.css'
import Layout from '../components/Layout/Layout'

const BodyStyle = createGlobalStyle`
  body {
    background-color: ${themeColor('tint', 'level3')};
  }
`

const MyApp = ({ Component, pageProps }) => (
  <>
    <Head>
      <link rel="shortcut icon" href="/favicon.ico" />
    </Head>
    <ThemeProvider>
      <GlobalStyle />
      <BodyStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  </>
)

export default MyApp
