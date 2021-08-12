import { breakpoint, Heading } from '@amsterdam/asc-ui'
import styled from 'styled-components'

import ContentContainer from '../ContentContainer'
import { flattenFeatureObject } from '../../lib/utils'
import Card from '../Card'

const Container = styled(ContentContainer)`
  margin-bottom: 20px;
`

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 24px;
  row-gap: 24px;
  margin-bottom: 24px;

  @media screen and ${breakpoint('max-width', 'tabletM')} {
    grid-template-columns: 1fr;
  }
`

const StyledListItem = styled.li`
  margin-bottom: 0;
`

const FeatureSection = ({ features }) => (
  <Container>
    <Heading gutterBottom={24}>Uitgelicht</Heading>
    <StyledList>
      {flattenFeatureObject(features).map(({
        path, title, shortTitle, teaserImage,
      }) => (
        <StyledListItem key={path}>
          <Card
            href={path}
            title={shortTitle || title}
            teaserImage={teaserImage}
            imageAspect={16 / 9}
            backgroundColor="level2"
            shadow
          />
        </StyledListItem>
      ))}
    </StyledList>
  </Container>
)

export default FeatureSection