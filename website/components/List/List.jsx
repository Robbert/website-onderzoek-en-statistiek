import * as Styled from './List.style'

const List = ({ children, as = 'ul', variant, ...otherProps }) => (
  <Styled.List
    as={variant === 'ordered' ? 'ol' : as}
    variant={variant}
    {...otherProps}
  >
    {children}
  </Styled.List>
)

export default List
