import NextLink from 'next/link'

import * as Styled from './Link.style'

const Link = ({ href, as = 'a', external, children, ...otherProps }) => {
  const baseLink = (
    <Styled.Link href={external && href} as={as} {...otherProps}>
      {children}
    </Styled.Link>
  )

  return external ? (
    baseLink
  ) : (
    <NextLink href={href} passHref>
      {baseLink}
    </NextLink>
  )
}

export default Link
