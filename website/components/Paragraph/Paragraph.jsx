import { Paragraph as CommunityParagraph } from '@utrecht/component-library-react/dist/css-module'

import * as Styled from './Paragraph.style'

export const Paragraph = ({ children, intro, ...otherProps }) => (
  <CommunityParagraph lead={intro} {...otherProps}>
    {children}
  </CommunityParagraph>
)

export const AmsterdamParagraph = ({ children, as = 'p', ...otherProps }) => (
  <Styled.Paragraph as={as} {...otherProps}>
    {children}
  </Styled.Paragraph>
)

export default Paragraph
