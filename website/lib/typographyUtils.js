import { css } from 'styled-components'
import { svgFill, breakpoint } from '@amsterdam/asc-ui'

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

export const fluidTypoConfig = {
  h1: {
    default: {
      minFontSize: 32,
      maxFontSize: 80,
      minLineHeight: 40,
      maxLineHeight: 88,
    },
    small: {
      minFontSize: 30,
      maxFontSize: 60,
      minLineHeight: 38,
      maxLineHeight: 64,
    },
  },
  h2: {
    default: {
      minFontSize: 28,
      maxFontSize: 56,
      minLineHeight: 32,
      maxLineHeight: 64,
    },
  },
  h3: {
    default: {
      minFontSize: 24,
      maxFontSize: 40,
      minLineHeight: 32,
      maxLineHeight: 48,
    },
  },
  h4: {
    default: {
      minFontSize: 22,
      maxFontSize: 32,
      minLineHeight: 32,
      maxLineHeight: 40,
    },
    small: {
      minFontSize: 20,
      maxFontSize: 28,
      minLineHeight: 26,
      maxLineHeight: 40,
    },
  },
  h5: {
    default: {
      minFontSize: 18,
      maxFontSize: 24,
      minLineHeight: 32,
      maxLineHeight: 32,
    },
  },
  p: {
    default: {
      minFontSize: 18,
      maxFontSize: 24,
      minLineHeight: 28,
      maxLineHeight: 40,
    },
    intro: {
      minFontSize: 18,
      maxFontSize: 32,
      minLineHeight: 28,
      maxLineHeight: 40,
    },
    small: {
      minFontSize: 14,
      maxFontSize: 18,
      minLineHeight: 20,
      maxLineHeight: 24,
    },
  },
  a: {
    default: {
      minFontSize: 18,
      maxFontSize: 24,
      minLineHeight: 32,
      maxLineHeight: 32,
    },
  },
  button: {
    default: {
      minFontSize: 18,
      maxFontSize: 24,
      minLineHeight: 28,
      maxLineHeight: 40,
    },
    small: {
      minFontSize: 16,
      maxFontSize: 18,
      minLineHeight: 22,
      maxLineHeight: 24,
    },
  },
  blockquote: {
    default: {
      minFontSize: 24,
      maxFontSize: 40,
      minLineHeight: 32,
      maxLineHeight: 48,
    },
  },
  ul: {
    default: {
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
  },
  ol: {
    default: {
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
  },
}

export const fluidTypoStyle = css`
  ${({
  small, intro, styleAs, as,
}) => {
  const tag = (Object.keys(fluidTypoConfig).includes(styleAs) && styleAs)
    || (Object.keys(fluidTypoConfig).includes(as) && as)
    || 'p'

  const prop = (small && Object.keys(fluidTypoConfig[tag]).includes('small') && 'small')
    || (intro && Object.keys(fluidTypoConfig[tag]).includes('intro') && 'intro')
    || 'default'

  return (
    css`
        /* stylelint-disable indentation */
        font-size:
          ${calculateFluidStyle(
            fluidTypoConfig[tag][prop].minFontSize,
            fluidTypoConfig[tag][prop].maxFontSize,
          )};
        line-height:
          ${calculateFluidStyle(
            fluidTypoConfig[tag][prop].minLineHeight,
            fluidTypoConfig[tag][prop].maxLineHeight,
          )};
      `
  )
}}
`

export const typographyStyle = css`
  margin-top: 0;
  margin-bottom: ${({ gutterBottom }) => gutterBottom?.large || gutterBottom || 0}px;

  ${({ gutterBottom }) => gutterBottom?.small && css`
    @media screen and ${breakpoint('max-width', 'laptop')} {
      margin-bottom: ${gutterBottom.small}px;
    }
  `}

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
`
