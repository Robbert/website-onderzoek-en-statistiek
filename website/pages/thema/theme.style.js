/* eslint-disable indent */
/* stylelint-disable */
import styled, { css } from 'styled-components'
import { Icon as IconASC, breakpoint, themeColor } from '@amsterdam/asc-ui'

import { Grid, GridItem } from '../../components/Grid/Grid.style'
import Paragraph from '../../components/Paragraph/Paragraph'
import List from '../../components/List/List'

export const IntroGridItem = styled(GridItem)`
  min-height: 240px;
`

export const HeroGrid = styled(Grid)`
  margin-bottom: 100px;
  background-color: ${({ $color }) => $color};

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-bottom: 52px;
    background: linear-gradient(white 45%, ${({ $color }) => $color} 45%);
  }
`

export const ChartSection = styled.div`
  margin-top: -260px;
  padding-bottom: 80px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-top: 0;
    padding-bottom: 24px;
  }
`

export const ChartContainer = styled.div`
  border: 1px solid ${themeColor('tint', 'level3')};
  padding: 40px 56px;
  background-color: white;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    padding: 24px 16px;
  }
`

export const ChartCaption = styled(Paragraph)`
  text-align: right;
  margin-top: 8px;
  color: ${({ backgroundColor }) => ((
    backgroundColor === 'groen'
    || backgroundColor === 'paars'
    || backgroundColor === 'roze'
  ) ? 'white' : 'black')};
`

export const FeatureListItem = styled.li`
  display: contents;
`

export const CollectionGrid = styled(Grid)`
  margin-top: 100px;
  margin-bottom: 120px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-top: 0;
    margin-bottom: 72px;
  }
`

export const CollectionList = styled(List)`
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
    margin-bottom: 40px;
    margin-left: 16px;
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
