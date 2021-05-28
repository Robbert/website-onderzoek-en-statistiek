import { Header } from '@amsterdam/asc-ui'

import Nav from './Nav'

const Layout = ({ children }) => (
  <>
    <Header homeLink="/" tall title="Onderzoek en Statistiek" navigation={Nav()} />
    <div className="main">
      {children}
    </div>
  </>
)

export default Layout
