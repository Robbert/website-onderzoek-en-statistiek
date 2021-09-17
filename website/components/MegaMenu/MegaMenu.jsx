import { Heading } from '@amsterdam/asc-ui'

import Link from '../Link/Link'
import HEADER_LINKS from '../../constants/contentLinks'
import * as Styled from './MegaMenu.style'

const MegaMenu = ({ isOpen, currentPath }) => (
  <Styled.MegaMenu
    id="menu"
    isOpen={isOpen}
  >
    <Styled.ItemMobile>
      <Heading as="h2" gutterBottom={28}>Menu</Heading>
      <Styled.List>
        {HEADER_LINKS.menuItems.map(({ label, slug }) => (
          <Styled.Item key={slug}>
            <Link
              href={slug}
              inList
              aria-current={currentPath === slug && 'page'}
            >
              {label}
            </Link>
          </Styled.Item>
        ))}
      </Styled.List>
    </Styled.ItemMobile>
    <Styled.Item>
      <Heading as="h2" gutterBottom={28}>Thema‘s</Heading>
      <Styled.List>
        {HEADER_LINKS.themes.map(({ label, slug }) => (
          <Styled.Item key={slug}>
            <Link
              href={slug}
              inList
              aria-current={currentPath === slug && 'page'}
            >
              {label}
            </Link>
          </Styled.Item>
        ))}
      </Styled.List>
    </Styled.Item>
    <Styled.Item>
      <Heading as="h2" gutterBottom={28}>Categorieën</Heading>
      <Styled.List>
        {HEADER_LINKS.categories.map(({ label, slug }) => (
          <Styled.Item key={slug}>
            <Link
              href={slug}
              inList
              aria-current={currentPath === slug && 'page'}
            >
              {label}
            </Link>
          </Styled.Item>
        ))}
      </Styled.List>
    </Styled.Item>
  </Styled.MegaMenu>
)

export default MegaMenu
