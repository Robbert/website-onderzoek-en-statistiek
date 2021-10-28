/* eslint-disable indent */
/* stylelint-disable */
import styled, { css } from 'styled-components'
import { Icon as IconASC, breakpoint } from '@amsterdam/asc-ui'

import { Grid } from '../../components/Grid/Grid.style'
import Heading from '../../components/Heading/Heading'
import Paragraph from '../../components/Paragraph/Paragraph'

export const HeroGrid = styled(Grid)`
  margin-bottom: 70px;
  background-color: ${({ $color }) => $color};

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-bottom: 44px;
    background: linear-gradient(white 45%, ${({ $color }) => $color} 45%);
  }
`

export const ChartContainer = styled.div`
  margin-top: -280px;
  padding-bottom: 112px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-top: 0;
    padding-bottom: 24px;
  }
`

export const TitleCaptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-top: 8px;

  color: ${({ backgroundColor }) => ((
    backgroundColor === 'groen'
    || backgroundColor === 'paars'
    || backgroundColor === 'roze'
  ) ? 'white' : 'black')};
`

export const ChartTitle = styled(Heading)`
  color: inherit;
`

export const ChartCaption = styled(Paragraph)`
  color: inherit;
`

export const FeatureListItem = styled.li`
  display: contents;
`

export const CollectionGrid = styled(Grid)`
  margin-top: 32px;
  margin-bottom: 112px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-top: 0;
  }
`

export const CollectionList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  margin-bottom: 32px;

  ${({ twoColumns }) => twoColumns && css`columns: 2;`}
`

export const Icon = styled(IconASC)`
  margin-right: 12px;
`

export const LargeImageWrapper = styled.div`
  position: relative;
  height: 33vw;
  max-height: 540px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    height: 66vw;
    margin-bottom: 32px;
    margin-left: 12px;
  }
`

export const SmallImageWrapper = styled.div`
  position: relative;
  height: 50%;
  width: 40%;
  border: 8px solid white;
  top: 40%;
  margin-left: -20px;
`
