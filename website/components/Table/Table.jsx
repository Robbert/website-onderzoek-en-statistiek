import * as Styled from './Table.style'

const Table = ({ children, as = 'table', ...otherProps }) => {
  const headerArray = children[0]?.props.children[0]?.props.children.map(
    (item) => Array.isArray(item.props.children) && item.props.children[0],
  )

  return (
    <Styled.Table as={as} headerArray={headerArray} {...otherProps}>
      {children}
    </Styled.Table>
  )
}

export default Table
