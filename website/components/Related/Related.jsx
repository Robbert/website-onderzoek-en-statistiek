import { Heading, ListItem, List } from '@amsterdam/asc-ui'

import Link from '../Link/Link'

const Related = ({ linkList, related, themes }) => (
  <>
    {
      linkList && linkList.length > 0 && (
        <>
          <Heading forwardedAs="h2">Zie ook</Heading>
          <List>
            { linkList.map(({ path, title }) => (
              <ListItem key={path}>
                <Link href={path} inList strong>
                  {title}
                </Link>
              </ListItem>
            )) }
          </List>
        </>
      )
    }
    {
      related && related.length > 0 && (
        <>
          <Heading forwardedAs="h2">Ook interessant</Heading>
          <List>
            { related.map(({ path, title }) => (
              <ListItem key={path}>
                <Link href={path} inList strong>
                  {title}
                </Link>
              </ListItem>
            )) }
          </List>
        </>
      )
    }
    {
      themes && themes.length > 0 && (
        <>
          <Heading forwardedAs="h2">{themes.lenght === 1 ? 'Thema' : "Thema's"}</Heading>
          <List>
            { themes.map(({ slug, title }) => (
              <ListItem key={slug}>
                <Link href={`/thema/${slug}`} inList strong>
                  {title}
                </Link>
              </ListItem>
            )) }
          </List>
        </>
      )
    }

  </>
)

export default Related
