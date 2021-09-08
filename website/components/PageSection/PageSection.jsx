import * as Styled from './PageSection.style'

const PageSection = ({ title, children }) => (
  <Styled.Container>
    <Styled.Heading gutterBottom={24}>
      {title}
    </Styled.Heading>
    {children}
  </Styled.Container>
)

export default PageSection
