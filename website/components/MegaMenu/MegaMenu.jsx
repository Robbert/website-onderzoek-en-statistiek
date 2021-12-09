import { useContext } from 'react'

import { GridItem } from '../Grid/Grid.style'
import Heading from '../Heading/Heading'
import List from '../List/List'
import Link from '../Link/Link'
import HEADER_LINKS from '../../constants/contentLinks'
import CONTENT_TYPES from '../../constants/contentTypes'
import ShortcutContext from '../../lib/ShortcutContext'
import { normalizeItemList } from '../../lib/utils'
import * as Styled from './MegaMenu.style'

const MegaMenu = ({ isOpen, currentPath }) => {
  const shortcuts = useContext(ShortcutContext)

  return (
    <Styled.MegaMenu
      id="menu"
      isOpen={isOpen}
      /*
      Tab index is set to -1 here, so clicking on the MegaMenu will add it to the
      relatedTarget of the Menu list (/website/components/Navigation/Navigation.jsx#L48-50),
      but it won't be tab focusable.
    */
      tabIndex={-1}
    >
      <Styled.MobileGridItem colRange={{ small: 4, large: 12 }} gutterBottom={40}>
        <Link
          href="/zoek"
          aria-current={currentPath === '/zoek' && 'page'}
          className="analytics-menu-search-link"
        >
          Zoeken
        </Link>
      </Styled.MobileGridItem>

      <GridItem colRange={4}>
        <Heading as="h2" styleAs="h4" gutterBottom={16}>Thema‘s</Heading>
        <List gutterBottom={40}>
          {HEADER_LINKS.themes
            .slice()
            .sort((a, b) => a.label.localeCompare(b.label))
            .map(({ label, slug }) => (
              <Styled.Item key={slug}>
                <Link
                  href={slug}
                  aria-current={currentPath === slug && 'page'}
                  className="analytics-menu-theme-link"
                >
                  {label}
                </Link>
              </Styled.Item>
            ))}
        </List>
      </GridItem>

      <GridItem colRange={4}>
        <Heading as="h2" styleAs="h4" gutterBottom={16}>Categorieën</Heading>
        <List gutterBottom={40}>
          {Object.values(CONTENT_TYPES)
            .filter((cat) => cat.type !== 'theme')
            .map(({ name, plural }) => (
              <Styled.Item key={name}>
                <Styled.LightLink
                  href={`/zoek?categorie=${name}`}
                  aria-current={currentPath === `/zoek?categorie=${name}` && 'page'}
                  className="analytics-menu-content-type-link"
                >
                  {plural}
                </Styled.LightLink>
              </Styled.Item>
            ))}
        </List>
      </GridItem>

      <GridItem colRange={4}>
        <Heading as="h2" styleAs="h4" gutterBottom={16}>Snel naar</Heading>
        <List gutterBottom={40}>
          {normalizeItemList(shortcuts).map(({ path, title, shortTitle }) => (
            <Styled.Item key={path}>
              <Styled.LightLink
                href={path}
                aria-current={currentPath === path && 'page'}
                className="analytics-menu-shortcut-link"
              >
                {shortTitle || title}
              </Styled.LightLink>
            </Styled.Item>
          ))}
          <Styled.Item>
            <Styled.LightLink
              href="/artikel/over-onderzoek-en-statistiek"
              aria-current={currentPath === '/artikel/over-onderzoek-en-statistiek' && 'page'}
              className="analytics-menu-shortcut-link"
            >
              Over Onderzoek en Statistiek
            </Styled.LightLink>
          </Styled.Item>
        </List>
      </GridItem>
    </Styled.MegaMenu>
  )
}

export default MegaMenu
