import { List, ListItem, breakpoint } from '@amsterdam/asc-ui'
import styled from 'styled-components'

import ContentContainer from '../ContentContainer'
import { flattenFeatureList } from '../../lib/utils'
import FeatureCard from './FeatureCard'

const Container = styled(ContentContainer)`
  margin-bottom: 20px;
`

const StyledList = styled(List)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 24px;
  row-gap: 24px;
  margin-bottom: 24px;

  @media screen and ${breakpoint('max-width', 'tabletM')} {
    grid-template-columns: 1fr;
  }
`

const StyledListItem = styled(ListItem)`
  margin-bottom: 0;
`

/**
 * TODO: this component is exactly the same as the FeatureSection in the HomePage folder.
 * I've kept these as seperate components because these will probably change in the next design
 * iterations. If they don't, we should merge these two components.
 */

const FeatureSection = ({ features }) => (
  <Container>
    <StyledList>
      {flattenFeatureList(features).map(({
        path, title, shortTitle, teaserImage,
      }) => (
        <StyledListItem key={path}>
          <FeatureCard
            href={path}
            title={shortTitle || title}
            teaserImage={teaserImage}
          />
        </StyledListItem>
      ))}
    </StyledList>
  </Container>
)

export default FeatureSection
