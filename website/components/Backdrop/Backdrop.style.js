/* eslint-disable import/prefer-default-export */
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

export const Backdrop = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 0.2s ease-in-out;

  /*
   * this z-index is set so the backdrop is always shown on top of other content
   * The default is 500, which is a bit high, but this is because Leaflet (a map library we currently often use)
   * sets a z-index of 400.
   */
  z-index: ${({ zIndex }) => (zIndex)};
`
