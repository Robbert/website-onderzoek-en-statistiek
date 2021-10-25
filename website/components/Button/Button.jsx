import * as Styled from './Button.style'

const Button = ({
  as = 'button',
  children,
  ...otherProps
}) => (
  <Styled.Button
    as={as}
    {...otherProps}
  >
    {children}
  </Styled.Button>
)

export default Button
