import { themeColor, breakpoint } from '@amsterdam/asc-ui'
import styled from 'styled-components'

import ButtonComponent from '../Button/Button'
import { calculateFluidStyle } from '../../lib/typographyUtils'

export const HamburgerIcon = styled.span`
  transition-timing-function: ${({ isOpen }) =>
    isOpen
      ? 'cubic-bezier(0.215, 0.61, 0.355, 1)'
      : 'cubic-bezier(0.55, 0.055, 0.675, 0.19)'};
  transition-duration: 75ms;
  transition-delay: ${({ isOpen }) => (isOpen ? '0.12s' : 0)};
  transition-property: transform;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(45deg)' : 'none')};
  position: absolute;
  background-color: ${themeColor('tint', 'level6')};
  width: 16px;
  height: 2px;
  bottom: 50%;
  right: 0;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    width: 24px;
    height: 3px;
  }

  &::before {
    top: ${({ isOpen }) => (isOpen ? 0 : '-5px')};
    display: block;
    opacity: ${({ isOpen }) => (isOpen ? 0 : 1)};
    content: '';
    position: absolute;
    width: 16px;
    height: 2px;
    background-color: inherit;
    transition: ${({ isOpen }) =>
      isOpen
        ? 'top 75ms ease, opacity 75ms ease 0.12s'
        : 'top 75ms ease 0.12s, opacity 75ms ease'};

    @media screen and ${breakpoint('max-width', 'laptop')} {
      top: ${({ isOpen }) => (isOpen ? 0 : '-7px')};
      width: 24px;
      height: 3px;
    }
  }

  &::after {
    bottom: ${({ isOpen }) => (isOpen ? 0 : '-5px')};
    display: block;
    content: '';
    position: absolute;
    width: 16px;
    height: 2px;
    background-color: inherit;
    transition: ${({ isOpen }) =>
      isOpen
        ? 'bottom 75ms ease, transform 75ms cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s'
        : 'bottom 75ms ease 0.12s, transform 75ms cubic-bezier(0.55, 0.055, 0.675, 0.19)'};
    transform: ${({ isOpen }) => (isOpen ? 'rotate(-90deg)' : 'none')};

    @media screen and ${breakpoint('max-width', 'laptop')} {
      bottom: ${({ isOpen }) => (isOpen ? 0 : '-7px')};
      width: 24px;
      height: 3px;
    }
  }
`

export const Button = styled(ButtonComponent)`
  position: relative;
  min-height: 44px;
  min-width: 44px;
  line-height: ${calculateFluidStyle(24, 26)};
  background-color: transparent;
  color: ${themeColor('tint', 'level6')};
  font-weight: ${({ isOpen }) => (isOpen ? 800 : 500)};
  padding-right: 24px;

  /*
    Display: grid together with setting the buttons :after and Label to
    start on column 1 and row 1 is used to avoid a layout shift when you open
    the menu and the 'Menu' text becomes bold.
  */
  display: grid;
  grid-template-columns: 1fr;

  &:hover {
    color: ${themeColor('primary')};
    background-color: transparent;

    ${HamburgerIcon} {
      background-color: ${themeColor('primary')};
    }
  }

  &:focus {
    background-color: transparent;
  }

  &:after {
    content: 'Menu';
    grid-row-start: 1;
    grid-column-start: 1;
    visibility: hidden;
    user-select: none;
    pointer-events: none;
    font-weight: 800;

    @media speech {
      display: none;
    }

    @media screen and ${breakpoint('max-width', 'laptop')} {
      display: none;
    }
  }
`

export const Label = styled.span`
  grid-row-start: 1;
  grid-column-start: 1;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    display: none;
  }
`
