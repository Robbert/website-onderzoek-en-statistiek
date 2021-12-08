import { useRouter } from 'next/router'
import { Spinner } from '@amsterdam/asc-ui'

import { Grid, GridItem } from '../Grid/Grid.style'
import * as Styled from './FallbackPage.style'

const FallbackPage = () => {
  // check if page with lowercase slug does exist
  const router = useRouter()
  const { asPath } = router
  if (asPath !== asPath.toLowerCase()) {
    router.push(asPath.toLowerCase())
  }

  return (
    <Grid>
      <GridItem colRange={{ small: 4, large: 12 }}>
        <Styled.Container>
          <Spinner size={40} />
        </Styled.Container>
      </GridItem>
    </Grid>
  )
}

export default FallbackPage
