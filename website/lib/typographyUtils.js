import { css } from 'styled-components'
import { svgFill } from '@amsterdam/asc-ui'

export const calculateFluidStyle = (
  minSizePx, maxSizePx, minScreenWidthPx = 320, maxScreenWidthPx = 1920,
) => {
  const defaultBaseSize = 16
  const minSize = minSizePx / defaultBaseSize
  const maxSize = maxSizePx / defaultBaseSize
  const minScreenWidth = minScreenWidthPx / defaultBaseSize
  const maxScreenWidth = maxScreenWidthPx / defaultBaseSize

  return (
    `clamp(
      ${minSize}rem,
      ${minSize}rem + ${maxSize - minSize} * (100vw - ${minScreenWidth}rem) / ${maxScreenWidth - minScreenWidth},
      ${maxSize}rem
    )`
  )
}

export const typographyConfig = {
  h1: {
    minFontSize: 32,
    maxFontSize: 80,
    minLineHeight: 40,
    maxLineHeight: 88,
  },
  h2: {
    minFontSize: 28,
    maxFontSize: 56,
    minLineHeight: 32,
    maxLineHeight: 64,
  },
  h3: {
    minFontSize: 24,
    maxFontSize: 40,
    minLineHeight: 32,
    maxLineHeight: 48,
  },
  h4: {
    minFontSize: 22,
    maxFontSize: 32,
    minLineHeight: 32,
    maxLineHeight: 40,
  },
  h5: {
    minFontSize: 18,
    maxFontSize: 24,
    minLineHeight: 32,
    maxLineHeight: 32,
  },
  intro: {
    minFontSize: 18,
    maxFontSize: 32,
    minLineHeight: 28,
    maxLineHeight: 40,
  },
  p: {
    minFontSize: 18,
    maxFontSize: 24,
    minLineHeight: 28,
    maxLineHeight: 40,
  },
  small: {
    minFontSize: 14,
    maxFontSize: 18,
    minLineHeight: 20,
    maxLineHeight: 24,
  },
  a: {
    minFontSize: 18,
    maxFontSize: 24,
    minLineHeight: 32,
    maxLineHeight: 32,
  },
}

export const typographyStyle = css`
  margin-top: 0;
  margin-bottom: ${({ gutterBottom }) => (typeof gutterBottom === 'number' ? `${gutterBottom}px` : 0)};
  ${({ strong }) => (
    strong
    && css`font-weight: 700;`
  )}
  ${({ darkBackground }) => (
    darkBackground
    && css`
    color: white;
    ${svgFill('white')}
    `
  )}

  ${({
    small, intro, styleAs, as,
  }) => {
    const key = (small && 'small')
    || (intro && 'intro')
    || (Object.keys(typographyConfig).includes(styleAs) && styleAs)
    || (Object.keys(typographyConfig).includes(as) && as)
    || 'p'

    return (
      css`
        /* stylelint-disable indentation */
        font-size:
          ${calculateFluidStyle(
            typographyConfig[key].minFontSize,
            typographyConfig[key].maxFontSize,
          )};
        line-height:
          ${calculateFluidStyle(
            typographyConfig[key].minLineHeight,
            typographyConfig[key].maxLineHeight,
          )};
      `
    )
  }}
`
