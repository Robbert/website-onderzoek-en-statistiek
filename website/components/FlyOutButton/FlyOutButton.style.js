import { Button as ButtonASC, themeColor, breakpoint } from '@amsterdam/asc-ui'
import styled from 'styled-components'

export const Button = styled(ButtonASC)`
  background-color: transparent;
  line-height: 24px;
  height: 100%;
  color: ${themeColor('tint', 'level6')};
  align-items: center;
  font-weight: ${({ isOpen }) => (isOpen ? 700 : 500)};
  padding-left: 20px;
  padding-right: 28px;
  border: none;
  font-size: 18px;
  min-height: 24px;

  :hover {
    outline: none;
    background-color: transparent;
    text-decoration: underline;
  }
`

export const Label = styled.span`
  @media screen and ${breakpoint('max-width', 'laptop')} {
    display: none;
  }
`

export const HamburgerIcon = styled.span`
  transition-timing-function: ${({ isOpen }) => (isOpen ? 'cubic-bezier(0.215, 0.61, 0.355, 1)' : 'cubic-bezier(0.55, 0.055, 0.675, 0.19)')};
  transition-duration: 75ms;
  transition-delay: ${({ isOpen }) => (isOpen ? '0.12s' : 0)};
  transition-property: transform;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(45deg)' : 'none')};
  position: absolute;
  background-color: ${themeColor('tint', 'level6')};
  width: 16px;
  height: 2px;
  border-radius: 4px;
  top: 50%;
  right: 0;

  ::before {
    top: ${({ isOpen }) => (isOpen ? 0 : '-5px')};
    display: block;
    opacity: ${({ isOpen }) => (isOpen ? 0 : 1)};
    content: "";
    position: absolute;
    width: 16px;
    height: 2px;
    border-radius: 4px;
    background-color: inherit;
    transition: ${({ isOpen }) => (isOpen ? 'top 75ms ease, opacity 75ms ease 0.12s' : 'top 75ms ease 0.12s, opacity 75ms ease')};
  }

  ::after {
    bottom: ${({ isOpen }) => (isOpen ? 0 : '-5px')};
    display: block;
    content: "";
    position: absolute;
    width: 16px;
    height: 2px;
    border-radius: 4px;
    background-color: inherit;
    transition: ${({ isOpen }) => (isOpen ? 'bottom 75ms ease, transform 75ms cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s' : 'bottom 75ms ease 0.12s, transform 75ms cubic-bezier(0.55, 0.055, 0.675, 0.19)')};
    transform: ${({ isOpen }) => (isOpen ? 'rotate(-90deg)' : 'none')};
  }
`
