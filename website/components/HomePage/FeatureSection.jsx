import { Column } from '@amsterdam/asc-ui'
import styled from 'styled-components'

import ContentContainer from '../ContentContainer'
import { flattenFeatureList } from '../../lib/utils'
import FeatureCard from './FeatureCard'

const Container = styled(ContentContainer)`
  margin-bottom: 20px;
`

const StyledColumn = styled(Column)`
  margin-bottom: 24px;
`

const FeatureSection = ({ features }) => (
  <Container>
    {flattenFeatureList(features).map(({
      path, title, shortTitle, teaserImage,
    }) => (
      <StyledColumn
        key={path}
        span={{
          small: 1, medium: 2, big: 3, large: 6, xLarge: 6,
        }}
      >
        <FeatureCard
          href={path}
          title={shortTitle || title}
          teaserImage={teaserImage}
        />
      </StyledColumn>
    ))}
  </Container>
)

export default FeatureSection
