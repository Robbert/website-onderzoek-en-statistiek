import Link from '../Link/Link'
import * as Styled from './LinkList.style'

const LinkList = ({
  links, darkBackground, gutterBottom = 0, columns = 1,
}) => (
  <Styled.List columns={columns} gutterBottom={gutterBottom}>
    {links.map(({ path, title }) => (
      <Styled.ListItem key={path}>
        <Link href={path} darkBackground={darkBackground} inList>
          {title}
        </Link>
      </Styled.ListItem>
    ))}
  </Styled.List>
)

export default LinkList
