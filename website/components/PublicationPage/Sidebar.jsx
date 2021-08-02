import { forwardRef } from 'react'
import Image from 'next/image'
import NextLink from 'next/link'
import {
  themeColor,
  Button,
  Spinner,
  List,
  ListItem,
  Link,
  Heading,
  CompactThemeProvider,
} from '@amsterdam/asc-ui'
import { Download } from '@amsterdam/asc-assets'
import styled from 'styled-components'

import {
  getStrapiMedia,
  PLACEHOLDER_IMAGE,
  formatBytes,
  flattenFeatureList,
} from '../../lib/utils'
import useDownload from '../../lib/useDownload'

const Container = styled.div`
  background-color: ${themeColor('tint', 'level2')};
  padding: 24px;
`

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${themeColor('tint', 'level3')};
  margin-bottom: 24px;
`

const StyledButton = styled(Button)`
  width: 100%;
  justify-content: center;
  align-items: end;
  margin-bottom: 36px;
`

// TODO: ASC Link is wrapped by this component because it
// doesn't natively work with Next JS link
// Maybe we can fix this in ASC and remove this wrapper?
const AscLink = forwardRef(({ children, ...otherProps }, ref) => (
  <span ref={ref}>
    <Link {...otherProps}>{children}</Link>
  </span>
))

const Sidebar = ({
  image, file, related, theme,
}) => {
  const [, downloadLoading, downloadFile] = useDownload()

  return (
    <CompactThemeProvider>
      <Container>
        <ImageWrapper>
          <Image
            src={
              image
                ? getStrapiMedia(image)
                : PLACEHOLDER_IMAGE
            }
            alt=""
            width="300"
            height="400"
            layout="intrinsic"
            placeholder="blur"
            sizes="384px"
            blurDataURL={PLACEHOLDER_IMAGE}
          />
        </ImageWrapper>
        <StyledButton
          variant="primary"
          iconSize={20}
          iconLeft={downloadLoading ? <Spinner /> : <Download />}
          onClick={() => { downloadFile(getStrapiMedia(file)) }}
        >
          {`Download pdf (${formatBytes(file.size * 1000)})`}
        </StyledButton>
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
        {theme.length > 0 && (
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
    </CompactThemeProvider>
  )
}

export default Sidebar
