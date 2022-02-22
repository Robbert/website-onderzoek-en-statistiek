import * as Styled from './Table.style'

const Table = ({ children, as = 'table', ...otherProps }) => (
  <Styled.Table as={as} {...otherProps}>
    {children}
  </Styled.Table>
)

export default Table
