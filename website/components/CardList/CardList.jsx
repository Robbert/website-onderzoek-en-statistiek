import * as Styled from './CardList.style'

const CardList = ({ children, ...otherProps }) => (
  <Styled.List {...otherProps}>{children}</Styled.List>
)

export default CardList
