import { ascDefaultTheme, themeColor } from '@amsterdam/asc-ui'
import styled, { css } from 'styled-components'

import { calculateFluidStyle } from '~/lib/typographyUtils'

export const Container = styled.div`
  padding-right: 16px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`

// attrs is used here to prevent an issue with Styled Components making
// a new class for every change of minValue
export const SliderTrack = styled.div.attrs(
  ({ min, max, minValue, maxValue }) => {
    if (minValue) {
      const minProgress = ((minValue - min) / (max - min)) * 100
      const maxProgress = ((maxValue - min) / (max - min)) * 100

      return {
        style: {
          background: `
        linear-gradient(
          to right,
          ${ascDefaultTheme.colors.tint.level4} 0%,
          ${ascDefaultTheme.colors.tint.level4} ${minProgress}%,
          ${ascDefaultTheme.colors.primary.main} ${minProgress}%,
          ${ascDefaultTheme.colors.primary.main} ${maxProgress}%,
          ${ascDefaultTheme.colors.tint.level4} ${maxProgress}%,
          ${ascDefaultTheme.colors.tint.level4} 100%
        )
      `,
        },
      }
    }
    return null
  },
)`
  grid-column: 1 / span 2;
  grid-row: 1;
  width: 100%;
  pointer-events: none;
  box-shadow: inset 0 0 0 9px white;

  /* override for Firefox */
  @supports (-moz-appearance: none) {
    box-shadow: inset 0 0 0 8px white;
  }
`

export const Slider = styled.input`
  grid-column: 1 / span 2;
  grid-row: 1;
  appearance: none;
  background: none;
  pointer-events: none; /* let clicks pass through */
  width: 100%;

  &::-webkit-slider-thumb {
    appearance: none;
    pointer-events: auto; /* catch clicks */
    height: 22px;
    width: 22px;
    border-radius: 12px;
    border: 2px solid white;
    background-color: ${themeColor('primary')};
    cursor: pointer;
  }
  &::-moz-range-thumb {
    pointer-events: auto; /* catch clicks */
    height: 20px;
    width: 20px;
    border-radius: 12px;
    border: 2px solid white;
    background-color: ${themeColor('primary')};
    cursor: pointer;
  }

  &::-webkit-slider-runnable-track {
    height: 100%;
    width: 100%;
  }
  &::-moz-range-track {
    height: 100%;
    width: 100%;
  }
`

export const NumberBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  ${({ right }) =>
    right &&
    css`
      align-items: end;
    `}
`

export const Label = styled.label`
  font-size: ${calculateFluidStyle(16, 18)};
  line-height: ${calculateFluidStyle(24, 26)};
  margin-bottom: 8px;
`

export const NumberBox = styled.input`
  padding: 4px 0 4px 32px;
  font-size: ${calculateFluidStyle(18, 24)};
  line-height: ${calculateFluidStyle(29, 38)};
  border: 1px solid ${themeColor('tint', 'level7')};
  color: ${themeColor('tint', 'level5')};
  /* max-width is set because Firefox handles input widths strangely */
  max-width: 114px;
`
