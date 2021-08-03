import { forwardRef } from 'react'
import NextLink from 'next/link'
import {
  themeColor,
  List,
  ListItem,
  Link,
  Heading,
  CompactThemeProvider,
  breakpoint,
} from '@amsterdam/asc-ui'
import styled from 'styled-components'

import { flattenFeatureList } from '../../lib/utils'

const Container = styled.div`
  background-color: ${themeColor('tint', 'level2')};
  padding: 24px;
  margin-top: 44px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-top: 0;
  }
`

// TODO: ASC Link is wrapped by this component because it
// doesn't natively work with Next JS link
// Maybe we can fix this in ASC and remove this wrapper?
const AscLink = forwardRef(({ children, ...otherProps }, ref) => (
  <span ref={ref}>
    <Link {...otherProps}>{children}</Link>
  </span>
))

const Sidebar = ({ related, theme }) => (
  <CompactThemeProvider>
    <div>
      <Container>
        {related
        && (
        <>
          <Heading as="h2">Zie ook</Heading>
          <List>
            {flattenFeatureList([related]).map(({ path, title }) => (
              <ListItem key={path}>
                <NextLink href={path} passHref>
                  <AscLink inList>
                    {title}
                  </AscLink>
                </NextLink>
              </ListItem>
            ))}
            {related?.links?.map(({ text, url }) => (
              <ListItem key={url}>
                <Link href={url} inList>
                  {text}
                </Link>
              </ListItem>
            ))}
          </List>
        </>
        )}
        {theme?.length > 0 && (
        <>
          <Heading as="h2">Thema</Heading>
          <List>
            {theme.map(({ slug, title }) => (
              <ListItem key={slug}>
                <NextLink href={`/thema/${slug}`} passHref>
                  <AscLink inList>
                    {title}
                  </AscLink>
                </NextLink>
              </ListItem>
            ))}
          </List>
        </>
        )}
      </Container>
    </div>
  </CompactThemeProvider>
)

export default Sidebar
