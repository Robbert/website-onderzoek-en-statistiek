import { Children, cloneElement, isValidElement } from 'react'

import * as Styled from './List.style'

const List = ({
  children, as = 'ul', variant, ...otherProps
}) => (
  <Styled.List
    as={variant === 'ordered' ? 'ol' : as}
    variant={variant}
    {...otherProps}
  >
    {Children.map(
      // All List children are cloned, in order to pass the 'variant' prop
      children, (child) => (isValidElement(child) ? cloneElement(child, { variant }) : child),
    )}
  </Styled.List>
)

export default List
