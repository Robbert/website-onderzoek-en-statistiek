import * as Styled from './Heading.style'

const Heading = ({ children, as = 'h1', ...otherProps }) => (
  <Styled.Heading as={as} {...otherProps}>
    {children}
  </Styled.Heading>
)

export default Heading
