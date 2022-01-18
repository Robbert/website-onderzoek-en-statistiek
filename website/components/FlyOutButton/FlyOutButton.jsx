import { forwardRef } from 'react'

import * as Styled from './FlyOutButton.style'

const FlyOutButton = forwardRef(
  ({ children, className, isOpen, setIsOpen, ...otherProps }, ref) => (
    <Styled.Button
      className={className}
      isOpen={isOpen}
      onClick={() => setIsOpen(!isOpen)}
      {...otherProps}
      ref={ref}
    >
      <Styled.Label>{children}</Styled.Label>
      <Styled.HamburgerIcon isOpen={isOpen} />
    </Styled.Button>
  ),
)

FlyOutButton.displayName = 'FlyOutButton'

export default FlyOutButton
