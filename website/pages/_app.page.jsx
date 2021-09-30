import {
  GlobalStyle, ThemeProvider, themeColor, ascDefaultTheme,
} from '@amsterdam/asc-ui'
import { createGlobalStyle } from 'styled-components'

import Layout from '../components/Layout/Layout'

import '../public/fonts/fonts.css'

const BodyStyle = createGlobalStyle`
  body {
    background-color: ${themeColor('tint', 'level3')};
  }
`

const MyApp = ({ Component, pageProps }) => {
  const newTheme = {
    ...ascDefaultTheme,
    typography: {
      ...ascDefaultTheme.typography,
      fontFamily: 'Avenir Next W01, Helvetica Neue, Helvetica, Arial, sans-serif',
    },
  }

  return (
    <ThemeProvider theme={newTheme}>
      <GlobalStyle />
      <BodyStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp
