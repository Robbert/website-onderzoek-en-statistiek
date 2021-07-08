import React from 'react'
import Link from 'next/link'
import {
  MenuInline, MenuItem, MenuFlyOut, MenuToggle, MenuButton, breakpoint,
} from '@amsterdam/asc-ui'
import { ChevronRight, Search } from '@amsterdam/asc-assets'
import styled from 'styled-components'

const CATEGORIES = [
  {
    label: 'Artikelen',
    slug: '/artikel',
  },
  {
    label: 'Publicaties',
    slug: '/publicatie',
  },
  {
    label: 'Video',
    slug: '/video',
  },
  {
    label: 'Interactief',
    slug: '/interactief',
  },
  {
    label: 'Dossiers',
    slug: '/dossier',
  },
  {
    label: 'Datasets',
    slug: '/dataset',
  },
]

const THEMES = [
  {
    label: 'Werk en sociale zekerheid',
    slug: '/thema/werk-en-sociale-zekerheid',
  },
  {
    label: 'Cultuur en recreatie',
    slug: '/thema/cultuur-en-recreatie',
  },
  {
    label: 'Wonen',
    slug: '/thema/wonen',
  },
  {
    label: 'Openbare orde en veiligheid',
    slug: '/thema/openbare-orde-en-veiligheid',
  },
  {
    label: 'Ruimte en topografie',
    slug: '/thema/ruimte-en-topografie',
  },
  {
    label: 'Bevolking',
    slug: '/thema/bevolking',
  },
  {
    label: 'Bestuur',
    slug: '/thema/bestuur',
  },
  {
    label: 'Duurzaamheid en milieu',
    slug: '/thema/duurzaamheid-en-milieu',
  },
  {
    label: 'Onderwijs en wetenschap',
    slug: '/thema/onderwijs-en-wetenschap',
  },
  {
    label: 'Economie en toerisme',
    slug: '/thema/economie-en-toerisme',
  },
  {
    label: 'Verkeer',
    slug: '/thema/verkeer',
  },
  {
    label: 'Zorg en welzijn',
    slug: '/thema/zorg-en-welzijn',
  },
]

const StyledMenuInline = styled(MenuInline)`
  width: 100%;

  @media screen and ${breakpoint('max-width', 'laptopM')} {
    display: none;
  }
`

const StyledMenuItem = styled(MenuItem)`
  margin-left: auto;

  @media screen and ${breakpoint('max-width', 'laptopM')} {
    margin-left: initial;
  }
`

const StyledMenuToggle = styled(MenuToggle)`
  margin-left: auto;

  @media screen and ${breakpoint('min-width', 'laptopM')} {
    display: none;
  }
`

// TODO: MenuButton is wrapped by this component because it
// doesn't natively work with Next JS link
// Maybe we can fix this in ASC and remove this wrapper?
const MenuButtonNext = React.forwardRef(({ children, ...otherProps }, ref) => (
  <span ref={ref}>
    <MenuButton {...otherProps}>{children}</MenuButton>
  </span>
))

function dropFocus() {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur()
  }
}

const MenuItems = () => (
  <>
    <MenuFlyOut label="Categorieën">
      {CATEGORIES.map(({ label, slug }) => (
        <MenuItem key={slug}>
          <Link href={slug} passHref>
            <MenuButtonNext
              as="a"
              iconLeft={<ChevronRight />}
              onClick={() => dropFocus()}
            >
              {label}
            </MenuButtonNext>
          </Link>
        </MenuItem>
      ))}
    </MenuFlyOut>
    <MenuFlyOut label="Thema's">
      {THEMES.map(({ label, slug }) => (
        <MenuItem key={slug}>
          <Link href={slug} passHref>
            <MenuButtonNext
              as="a"
              iconLeft={<ChevronRight />}
              onClick={() => dropFocus()}
            >
              {label}
            </MenuButtonNext>
          </Link>
        </MenuItem>
      ))}
    </MenuFlyOut>
  </>
)

const Nav = () => (
  <>
    <StyledMenuInline>
      <MenuItems />
      <StyledMenuItem>
        <Link href="/zoek" passHref>
          <MenuButtonNext
            as="a"
            icon={<Search />}
            iconSize={20}
            onClick={() => dropFocus()}
          />
        </Link>
      </StyledMenuItem>
    </StyledMenuInline>
    <StyledMenuToggle align="right">
      <MenuItems />
      <StyledMenuItem>
        <Link href="/zoek" passHref>
          <MenuButtonNext
            as="a"
            onClick={() => dropFocus()}
          >
            Zoek
          </MenuButtonNext>
        </Link>
      </StyledMenuItem>
    </StyledMenuToggle>
  </>
)

export default Nav
