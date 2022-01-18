import { forwardRef } from 'react'

import * as Styled from './Button.style'

const Button = forwardRef(({ as = 'button', children, ...otherProps }, ref) => (
  <Styled.Button as={as} ref={ref} {...otherProps}>
    {children}
  </Styled.Button>
))

Button.displayName = 'Button'

export default Button
