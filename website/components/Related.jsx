import { Heading, ListItem, List } from '@amsterdam/asc-ui'

import Link from './Link'

const Related = ({ related, links, themes }) => (
  <>
    {
      related && related.length > 0 && (
      <>
        <Heading forwardedAs="h2">Zie ook</Heading>
        <List>
          { related.map(({ slug, path, title }) => (
            <ListItem key={slug}>
              <Link href={path} inList>
                {title}
              </Link>
            </ListItem>
          )) }
        </List>
      </>
      )
    }
    {
      links && links.length > 0 && (
      <>
        <Heading forwardedAs="h2">Links</Heading>
        <List>
          { links.map(({ url, text }) => (
            <ListItem key={url}>
              <Link href={url} inList>
                {text}
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
              <Link href={`/thema/${slug}`} inList>
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
