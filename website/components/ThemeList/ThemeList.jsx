import Link from '../Link/Link'
import * as Styled from './Themelist.style'

const ThemeList = ({ type, themes }) => (
  themes.length > 0 && (
    <Styled.Paragraph small forwardedAs="div">
      <span>{`${type === 'artikel' ? 'Dit' : 'Deze'} ${type} maakt deel uit van ${themes.length > 1 ? "de thema's" : ' het thema'} `}</span>
      <Styled.List small>
        {
          themes.map(({ title, slug }) => (
            <Styled.ListItem key={slug}>
              <Link variant="inline" href={`/thema/${slug}`}>{title}</Link>
            </Styled.ListItem>
          ))
        }
      </Styled.List>
    </Styled.Paragraph>
  )
)

export default ThemeList
