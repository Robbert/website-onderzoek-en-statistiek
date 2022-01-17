import * as Styled from './Blockquote.style'

const Blockquote = ({ children, as = 'blockquote', ...otherProps }) => (
  <Styled.Blockquote as={as} {...otherProps}>
    {children}
  </Styled.Blockquote>
)

export default Blockquote
