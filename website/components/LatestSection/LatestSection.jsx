import { CompactThemeProvider } from '@amsterdam/asc-ui'

import Card from '../Card/Card'
import Link from '../Link/Link'
import { contentTypes } from '../../lib/utils'
import * as Styled from './LatestSection.style'

const ContentList = ({ type, features }) => (
  <Styled.ListContainer>
    <Styled.Heading gutterBottom={24}>{contentTypes[type].plural}</Styled.Heading>
    <Styled.List>
      {features.map(({
        title, shortTitle, slug, teaserImage,
      }) => (
        <Styled.ListItem key={title}>
          <Card
            href={`/${contentTypes[type].name}/${slug}`}
            title={shortTitle || title}
            image={teaserImage}
            horizontal
            imageSize={80}
            marginBottom={24}
          />

        </Styled.ListItem>
      ))}
    </Styled.List>
    <Link href="/zoek" inList>{`Meer ${contentTypes[type].plural}`}</Link>
  </Styled.ListContainer>
)

const LatestSection = ({
  collections, videos, interactives, articles, publications, datasets,
}) => (
  <CompactThemeProvider>
    <Styled.Wrapper>
      <Styled.Grid>
        {collections.length > 0 && <ContentList type="collection" features={collections} />}
        {videos.length > 0 && <ContentList type="video" features={videos} />}
        {interactives.length > 0 && <ContentList type="interactive" features={interactives} />}
        {articles.length > 0 && <ContentList type="article" features={articles} />}
        {publications.length > 0 && <ContentList type="publication" features={publications} />}
        {datasets.length > 0 && <ContentList type="dataset" features={datasets} />}
      </Styled.Grid>
    </Styled.Wrapper>
  </CompactThemeProvider>
)

export default LatestSection
