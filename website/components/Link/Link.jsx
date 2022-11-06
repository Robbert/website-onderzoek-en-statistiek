import { Link as CommunityLink } from '@utrecht/component-library-react'
import NextComponent from 'next/link'

import * as Styled from './Link.style'

export const Link = ({ href, as = 'a', external, children, ...otherProps }) => {
  return external ? (
    <CommunityLink external href={href} {...otherProps}>
      {children}
    </CommunityLink>
  ) : (
    <NextComponent href={href} passHref as={as} {...otherProps}>
      <CommunityLink>{children}</CommunityLink>
    </NextComponent>
  )
}

export const AmsterdamLink = ({
  href,
  as = 'a',
  external,
  children,
  ...otherProps
}) => {
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

export default AmsterdamLink
