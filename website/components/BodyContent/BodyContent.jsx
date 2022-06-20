import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import { List } from '@amsterdam/asc-ui'
import { ChevronRight, ExternalLink } from '@amsterdam/asc-assets'

import { GridItem } from '../Grid/Grid.style'
import Heading from '../Heading/Heading'
import MarkdownToHtml from '../MarkdownToHtml/MarkdownToHtml'
import { normalizeBody } from '../../lib/normalizeUtils'
import * as Styled from './BodyContent.style'

const Visualisation = dynamic(() =>
  import('~/components/Visualisation/Visualisation'),
)

const BodyContent = ({
  content,
  colStartText = { small: 1, large: 3 },
  colRangeText = { small: 4, large: 8 },
  colStartTextWithLink = { small: 1, large: 3 },
  colRangeTextWithLink = { small: 4, large: 6 },
}) => (
  <>
    {normalizeBody(content).map((item) => {
      if (item.type === 'text') {
        return (
          <GridItem
            key={item.id}
            colStart={colStartText}
            colRange={colRangeText}
          >
            <MarkdownToHtml>{item.text}</MarkdownToHtml>
          </GridItem>
        )
      }
      if (item.type === 'text-with-links') {
        return (
          <Fragment key={item.id}>
            <GridItem
              colStart={colStartTextWithLink}
              colRange={colRangeTextWithLink}
            >
              <MarkdownToHtml>{item.text}</MarkdownToHtml>
            </GridItem>
            <GridItem
              colStart={{ small: 1, large: 10 }}
              colRange={{ small: 4, large: 3 }}
            >
              {item.links.length > 0 && (
                <>
                  <Heading as="h2" styleAs="h5" gutterBottom={12}>
                    Zie ook
                  </Heading>
                  <List>
                    {item.links.map(({ name, path, title: linkTitle }) => (
                      <li key={path}>
                        <Styled.Link href={path} variant="inList">
                          <Styled.ChevronIcon size={14}>
                            {name === 'link' ? (
                              <ExternalLink />
                            ) : (
                              <ChevronRight />
                            )}
                          </Styled.ChevronIcon>
                          <Styled.LinkText>
                            {name === 'link'
                              ? linkTitle
                              : `${name} - ${linkTitle}`}
                          </Styled.LinkText>
                        </Styled.Link>
                      </li>
                    ))}
                  </List>
                </>
              )}
            </GridItem>
          </Fragment>
        )
      }
      if (item.type === 'visualisation' || item.type === 'panel-group') {
        return (
          <GridItem
            key={item.id}
            colStart={{ small: 1, large: 1 }}
            colRange={{ small: 4, large: 12 }}
          >
            <Visualisation {...item} />
          </GridItem>
        )
      }
      return null
    })}
  </>
)

export default BodyContent
