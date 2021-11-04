import { ChevronDown } from '@amsterdam/asc-assets'

import Button from '../Button/Button'
import * as Styled from './Details.style'

const Details = ({ title, children }) => (
  <Styled.Details>
    <Button as="summary" variant="textButton">
      <Styled.Icon>
        <ChevronDown />
      </Styled.Icon>
      {title}
    </Button>
    <Styled.Container>
      {children}
    </Styled.Container>
  </Styled.Details>
)

export default Details
