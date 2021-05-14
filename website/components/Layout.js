import { Header } from '@amsterdam/asc-ui'

import Nav from "./Nav";

const Layout = ({ children }) => (
  <>
    <Header homeLink="/" tall title="Onderzoek en Statistiek" navigation={Nav()} />
    <div className="main">
      {children}
    </div>

    <style jsx global >{`
      nav li { 
        padding: 4px; 
        height: 0px !important; 
      }
      .main { 
        max-width: 800px;
        margin: 16px auto;
      }
    `}</style>


  </>
);

export default Layout;
