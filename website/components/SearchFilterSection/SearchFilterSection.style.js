import styled from 'styled-components'
import { breakpoint } from '@amsterdam/asc-ui'

import { GridItem } from '../Grid/Grid.style'
import FieldsetComponent from '../Fieldset/Fieldset'
import ButtonComponent from '../Button/Button'
import SelectComponent from '../Select/Select'

export const FilterPanel = styled(GridItem)`
  @media screen and ${breakpoint('max-width', 'laptop')} {
    position: absolute;
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    background-color: white;
    left: 0;
    top: 88px;
    width: 100vw;
    max-width: 1440px;
    padding: 16px;
    padding-bottom: 0;
    z-index: 502;
    overflow: auto;
    max-height: calc(100% - 88px);
  }
`

export const MobilePanelHeader = styled.div`
  display: none;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }
`

export const MobilePanelButtonContainer = styled.div`
  display: none;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    display: block;
    padding-top: 16px;
    padding-bottom: 16px;
    position: sticky;
    bottom: 0;
    background-color: white;
    width: 100%;
  }
`

export const MobilePanelButton = styled(ButtonComponent)`
  width: 100%;
  justify-content: center;
`

export const Fieldset = styled(FieldsetComponent)`
  margin-top: 80px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-top: 0;
    margin-bottom: 56px;
  }
`

export const MobilePanelToggle = styled(ButtonComponent)`
  display: none;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    display: block;
    position: sticky;
    bottom: 16px;
    left: 100%;
  }
`

export const SortBar = styled.div`
  display: flex;
  margin-bottom: 24px;
`

export const Select = styled(SelectComponent)`
  width: 220px;
  font-size: 18px;
  margin-bottom: 24px;
`
