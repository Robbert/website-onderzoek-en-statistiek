import { forwardRef } from 'react'
import NextLink from 'next/link'
import { Link as AscLink } from '@amsterdam/asc-ui'

// TODO: ASC Link is wrapped by this component because it
// doesn't natively work with Next JS link
// Maybe we can fix this in ASC and remove this wrapper?
const ForwardedLink = forwardRef(({ children, ...otherProps }, ref) => (
  <span ref={ref}>
    <AscLink {...otherProps}>{children}</AscLink>
  </span>
))

const Link = ({ href, children, ...props }) => (
  <NextLink href={href} passHref>
    <ForwardedLink {...props}>{children}</ForwardedLink>
  </NextLink>
)

export default Link
