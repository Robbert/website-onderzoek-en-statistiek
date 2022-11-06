import { Heading as CommunityHeading } from '@utrecht/component-library-react/dist/css-module'

import * as Styled from './Heading.style'

export const Heading = ({ children, as = 'h1', ...otherProps }) => {
  // Convert `"h1"` to `1`, et cetera
  const level = parseInt(as.replace(/[^\d]*/gi, ''), 10)
  return (
    <CommunityHeading level={level} {...otherProps}>
      {children}
    </CommunityHeading>
  )
}

export const AmsterdamHeading = ({ children, as = 'h1', ...otherProps }) => (
  <Styled.Heading as={as} {...otherProps}>
    {children}
  </Styled.Heading>
)

export default Heading
