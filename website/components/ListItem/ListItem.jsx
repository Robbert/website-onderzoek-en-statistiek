import * as Styled from './ListItem.style'

const ListItem = ({
  children, ...otherProps
}) => (
  <Styled.ListItem {...otherProps}>
    {children}
  </Styled.ListItem>
)

export default ListItem
