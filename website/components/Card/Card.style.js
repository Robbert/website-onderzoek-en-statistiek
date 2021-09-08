import NextImage from 'next/image'
import { themeColor, styles, svgFill } from '@amsterdam/asc-ui'
import styled from 'styled-components'

export const Link = styled.a`
  display: block;
  width: 100%;
  text-decoration: none;
  color: inherit;
  margin-bottom: ${({ marginBottom }) => `${marginBottom}px` || 0};
  border-top: 1px solid;
  border-color: ${({ hasBorder }) => (hasBorder ? themeColor('tint', 'level3') : 'transparent')};

  ${styles.CardContentStyle} {
    min-height: 72px;
    padding: 16px 16px;
  }

  :hover {

    ${styles.CardContentStyle} h6 {
      text-decoration: underline;
      color: ${themeColor('secondary', 'main')};
    }

    ${styles.IconStyle} {
      ${svgFill(themeColor('secondary', 'main'))}
    }
  }
`

export const ImageWrapper = styled.div`
  width: 100%;
  max-width: ${({ imageSize }) => (imageSize ? `${imageSize}px` : '100%')};
  aspect-ratio: ${({ ratio }) => ratio || 1};
  overflow: hidden;
`

// center image vertical if aspect ratio is not 1
export const Image = styled(NextImage)`
  top: ${(props) => (props.ratio ? '-50% !important' : 0)};
`
