import * as Styled from './Link.style'

const Link = ({ href, as = 'a', external, children, ...otherProps }) => {
  return external ? (
    <Styled.Link href={href} as={as} {...otherProps}>
      {children}
    </Styled.Link>
  ) : (
    <Styled.NextLink href={href} as={as} {...otherProps}>
      {children}
    </Styled.NextLink>
  )
}

export default Link
