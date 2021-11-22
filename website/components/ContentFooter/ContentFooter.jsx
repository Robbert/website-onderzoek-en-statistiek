import Link from '../Link/Link'
import ShareButtons from '../ShareButtons/ShareButtons'
import * as Styled from './ContentFooter.style'

const ContentFooter = ({ type, themes }) => (
  <Styled.Container>
    {themes.length > 0 && (
      <Styled.Paragraph small forwardedAs="div">
        <span>
          {`${type === 'artikel' || type === 'dossier' ? 'Dit' : 'Deze'}
           ${type} maakt deel uit van
           ${themes.length > 1 ? "de thema's" : ' het thema'}
          `}
        </span>
        <Styled.List small>
          {themes.map(({ title, slug }) => (
            <Styled.ListItem key={slug}>
              <Link
                variant="inline"
                href={`/thema/${slug}`}
                className="analytics-contentpage-theme-link"
              >
                {title}
              </Link>
            </Styled.ListItem>
          ))}
        </Styled.List>
      </Styled.Paragraph>
    )}
    <Styled.ShareContainer small forwardedAs="div">
      Deel deze pagina:
      <ShareButtons />
    </Styled.ShareContainer>
  </Styled.Container>
)

export default ContentFooter
