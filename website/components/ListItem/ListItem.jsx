import * as Styled from './ListItem.style'

const ListItem = ({
  children, ...otherProps
}) => (
  <Styled.ListItem {...otherProps}>
    <span>{children}</span>
  </Styled.ListItem>
)

export default ListItem
