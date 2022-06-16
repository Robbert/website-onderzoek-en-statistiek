import * as Styled from './Select.style'

const Select = ({ children, as = 'select', ...otherProps }) => (
  <Styled.Select as={as} {...otherProps}>
    {children}
  </Styled.Select>
)

export default Select
