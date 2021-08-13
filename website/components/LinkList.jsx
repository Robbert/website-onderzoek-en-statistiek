import { ListItem, List } from '@amsterdam/asc-ui'

import Link from './Link'

const LinkList = ({ links }) => (
  <List>
    {links.map(({ path, title }) => (
      <ListItem key={path}>
        <Link href={path} darkBackground inList>
          {title}
        </Link>
      </ListItem>
    ))}
  </List>
)

export default LinkList
