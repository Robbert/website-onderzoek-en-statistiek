/* eslint-disable import/prefer-default-export */
import styled from 'styled-components'

import { fluidTypoStyle, typographyStyle } from '../../lib/typographyUtils'

export const Heading = styled.h1`
  color: black;
  font-weight: 800;

  ${fluidTypoStyle}
  ${typographyStyle}
`
