import React from "react";
import Link from "next/link";
import { MenuInline, MenuItem } from "@amsterdam/asc-ui";

const Nav = () => {
    return (
      <MenuInline>
        <MenuItem>
        <Link href="/">Voorpagina</Link>
        </MenuItem>
        <MenuItem>
        <Link href="/artikel">Artikelen</Link>
        </MenuItem>
        <MenuItem>
        <Link href="/publicatie">Publicaties</Link>
        </MenuItem>
        <MenuItem>
        <Link href="/specials">Specials</Link>
        </MenuItem>
      </MenuInline>
    )
}

export default Nav;