import styled, { css } from 'styled-components'
import { Icon as IconASC, breakpoint, themeColor } from '@amsterdam/asc-ui'

import {
  Grid,
  GridItem,
  gridItemStyle,
  subgridStyle,
} from '~/components/Grid/Grid.style'
import LinkComponent from '~/components/Link/Link'
import Paragraph from '~/components/Paragraph/Paragraph'
import List from '~/components/List/List'
import CardListComponent from '~/components/CardList/CardList'
import { calculateFluidStyle } from '~/lib/typographyUtils'
import { getFontColor } from '~/lib/utils'

export const IntroGridItem = styled(GridItem)`
  min-height: 240px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    min-height: 0;
    margin-bottom: 32px;
  }
`

export const Link = styled(LinkComponent)`
  font-size: ${calculateFluidStyle(16, 18)};
  line-height: ${calculateFluidStyle(24, 26)};
  padding-bottom: 2px;
`

export const HeroGrid = styled(Grid)`
  margin-bottom: 100px;
  background-color: ${({ $color }) => $color};

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-bottom: 52px;
    background: linear-gradient(
      white calc(50% - 36px),
      ${({ $color }) => $color} calc(50% - 36px)
    );
  }
`

export const ChartSection = styled.div`
  margin-top: -260px;
  padding-bottom: 80px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-top: 0;
    padding-bottom: 72px;
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
  ${({ backgroundColor }) => backgroundColor && getFontColor(backgroundColor)}
`

export const CardList = styled(CardListComponent)`
  ${subgridStyle}
`

export const FeatureListItem = styled.li`
  ${gridItemStyle}
`

export const CollectionGrid = styled(Grid)`
  margin-top: 60px;
  margin-bottom: 120px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-top: 0;
    margin-bottom: 72px;
  }
`

export const CollectionList = styled(List)`
  ${({ twoColumns }) =>
    twoColumns &&
    css`
      columns: 2;
    `}
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
