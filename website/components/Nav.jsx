import React from 'react'
import Link from 'next/link'
import { MenuInline, MenuItem } from '@amsterdam/asc-ui'

const Nav = () => (
  <MenuInline>
    <MenuItem>
      <Link href="/artikel"><a>Artikelen</a></Link>
    </MenuItem>
    <MenuItem>
      <Link href="/publicatie"><a>Publicaties</a></Link>
    </MenuItem>
    <MenuItem>
      <Link href="/video"><a>Video</a></Link>
    </MenuItem>
    <MenuItem>
      <Link href="/interactief"><a>Interactief</a></Link>
    </MenuItem>
    <MenuItem>
      <Link href="/dossier"><a>Dossiers</a></Link>
    </MenuItem>
  </MenuInline>
)

export default Nav
