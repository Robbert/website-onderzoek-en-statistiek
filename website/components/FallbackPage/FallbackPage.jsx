import { Spinner } from '@amsterdam/asc-ui'

import { Grid, GridItem } from '../Grid/Grid.style'
import * as Styled from './FallbackPage.style'

const FallbackPage = () => (
  <Grid>
    <GridItem colRange={{ small: 4, large: 12 }}>
      <Styled.Container>
        <Spinner size={40} />
      </Styled.Container>
    </GridItem>
  </Grid>
)

export default FallbackPage
