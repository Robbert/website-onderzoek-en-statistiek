import NextLink from 'next/link'

import * as Styled from './Link.style'

const Link = ({
  href,
  as = 'a',
  variant,
  external,
  children,
  ...otherProps
}) => {
  const baseLink = (
    <Styled.Link
      href={external && href}
      as={as}
      variant={variant}
      {...otherProps}
    >
      {children}
    </Styled.Link>
  )

  return external ? baseLink : <NextLink href={href} passHref>{baseLink}</NextLink>
}

export default Link
