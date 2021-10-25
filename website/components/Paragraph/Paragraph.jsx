import * as Styled from './Paragraph.style'

const Paragraph = ({
  children, as = 'p', ...otherProps
}) => (
  <Styled.Paragraph as={as} {...otherProps}>
    {children}
  </Styled.Paragraph>
)

export default Paragraph
